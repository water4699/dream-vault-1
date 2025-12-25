import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";
import { ethers, fhevm } from "hardhat";
import { DreamJournal, DreamJournal__factory } from "../types";
import { expect } from "chai";
import { FhevmType } from "@fhevm/hardhat-plugin";

type Signers = {
  deployer: HardhatEthersSigner;
  alice: HardhatEthersSigner;
  bob: HardhatEthersSigner;
};

async function deployFixture() {
  const factory = (await ethers.getContractFactory("DreamJournal")) as DreamJournal__factory;
  const dreamJournalContract = (await factory.deploy()) as DreamJournal;
  const dreamJournalContractAddress = await dreamJournalContract.getAddress();

  return { dreamJournalContract, dreamJournalContractAddress };
}

describe("DreamJournal", function () {
  let signers: Signers;
  let dreamJournalContract: DreamJournal;
  let dreamJournalContractAddress: string;
  let fhevm: FhevmType;

  before(async function () {
    const ethSigners: HardhatEthersSigner[] = await ethers.getSigners();
    signers = { deployer: ethSigners[0], alice: ethSigners[1], bob: ethSigners[2] };
  });

  beforeEach(async function () {
    // Check whether the tests are running against an FHEVM mock environment
    if (!fhevm.isMock) {
      console.warn(`This hardhat test suite cannot run on Sepolia Testnet`);
      this.skip();
    }

    ({ dreamJournalContract, dreamJournalContractAddress } = await deployFixture());
  });

  it("should have zero dreams after deployment", async function () {
    const count = await dreamJournalContract.getDreamCount(signers.alice.address);
    expect(count).to.eq(0n);
  });

  it("should create a dream entry", async function () {
    const title = "Flying Dream";
    const content = "I dreamt of flying in the forest.";
    const contentBytes = ethers.toUtf8Bytes(content);

    // Encrypt each byte
    const encryptedInput = fhevm
      .createEncryptedInput(dreamJournalContractAddress, signers.alice.address);

    for (let i = 0; i < contentBytes.length; i++) {
      encryptedInput.add8(contentBytes[i]);
    }

    const encrypted = await encryptedInput.encrypt();

    // Convert handles to externalEuint8 array format
    const externalEuint8Array = encrypted.handles.map((handle: string) => ({
      data: handle,
    }));

    const tx = await dreamJournalContract
      .connect(signers.alice)
      .createDream(title, externalEuint8Array, encrypted.inputProof);
    await tx.wait();

    const count = await dreamJournalContract.getDreamCount(signers.alice.address);
    expect(count).to.eq(1n);

    const dreamIds = await dreamJournalContract.getDreamIds(signers.alice.address);
    expect(dreamIds.length).to.eq(1);
    expect(dreamIds[0]).to.eq(0n);

    const [owner, storedTitle, createdAt] = await dreamJournalContract.getDreamMeta(dreamIds[0]);
    expect(owner).to.eq(signers.alice.address);
    expect(storedTitle).to.eq(title);
    expect(createdAt).to.be.gt(0n);
  });

  it("should decrypt dream content", async function () {
    const title = "Flying Dream";
    const content = "I dreamt of flying in the forest.";
    const contentBytes = ethers.toUtf8Bytes(content);

    // Encrypt and create dream
    const encryptedInput = fhevm
      .createEncryptedInput(dreamJournalContractAddress, signers.alice.address);

    for (let i = 0; i < contentBytes.length; i++) {
      encryptedInput.add8(contentBytes[i]);
    }

    const encrypted = await encryptedInput.encrypt();
    const externalEuint8Array = encrypted.handles.map((handle: string) => ({
      data: handle,
    }));

    const tx = await dreamJournalContract
      .connect(signers.alice)
      .createDream(title, externalEuint8Array, encrypted.inputProof);
    await tx.wait();

    const dreamIds = await dreamJournalContract.getDreamIds(signers.alice.address);
    const dreamId = dreamIds[0];

    // Decrypt each byte
    const length = await dreamJournalContract.getDreamContentLength(dreamId);
    const decryptedBytes: number[] = [];

    for (let i = 0; i < Number(length); i++) {
      const encByte = await dreamJournalContract.getDreamContentByte(dreamId, i);
      const clearByte = await fhevm.userDecryptEuint(
        FhevmType.euint8,
        encByte,
        dreamJournalContractAddress,
        signers.alice,
      );
      decryptedBytes.push(Number(clearByte));
    }

    // Convert bytes to string
    const decryptedContent = ethers.toUtf8String(new Uint8Array(decryptedBytes));
    expect(decryptedContent).to.eq(content);
  });

  it("should allow multiple dreams per user", async function () {
    const title1 = "First Dream";
    const content1 = "First dream content.";
    const contentBytes1 = ethers.toUtf8Bytes(content1);

    const encryptedInput1 = fhevm
      .createEncryptedInput(dreamJournalContractAddress, signers.alice.address);
    for (let i = 0; i < contentBytes1.length; i++) {
      encryptedInput1.add8(contentBytes1[i]);
    }
    const encrypted1 = await encryptedInput1.encrypt();
    const externalEuint8Array1 = encrypted1.handles.map((handle: string) => ({
      data: handle,
    }));

    const tx1 = await dreamJournalContract
      .connect(signers.alice)
      .createDream(title1, externalEuint8Array1, encrypted1.inputProof);
    await tx1.wait();

    const title2 = "Second Dream";
    const content2 = "Second dream content.";
    const contentBytes2 = ethers.toUtf8Bytes(content2);

    const encryptedInput2 = fhevm
      .createEncryptedInput(dreamJournalContractAddress, signers.alice.address);
    for (let i = 0; i < contentBytes2.length; i++) {
      encryptedInput2.add8(contentBytes2[i]);
    }
    const encrypted2 = await encryptedInput2.encrypt();
    const externalEuint8Array2 = encrypted2.handles.map((handle: string) => ({
      data: handle,
    }));

    const tx2 = await dreamJournalContract
      .connect(signers.alice)
      .createDream(title2, externalEuint8Array2, encrypted2.inputProof);
    await tx2.wait();

    const count = await dreamJournalContract.getDreamCount(signers.alice.address);
    expect(count).to.eq(2n);

    const dreamIds = await dreamJournalContract.getDreamIds(signers.alice.address);
    expect(dreamIds.length).to.eq(2);
    expect(dreamIds[0]).to.eq(0n);
    expect(dreamIds[1]).to.eq(1n);
  });

  it("should isolate dreams between different users", async function () {
    const title = "Alice's Dream";
    const content = "Alice's private dream.";
    const contentBytes = ethers.toUtf8Bytes(content);

    const encryptedInput = fhevm
      .createEncryptedInput(dreamJournalContractAddress, signers.alice.address);
    for (let i = 0; i < contentBytes.length; i++) {
      encryptedInput.add8(contentBytes[i]);
    }
    const encrypted = await encryptedInput.encrypt();
    const externalEuint8Array = encrypted.handles.map((handle: string) => ({
      data: handle,
    }));

    const tx = await dreamJournalContract
      .connect(signers.alice)
      .createDream(title, externalEuint8Array, encrypted.inputProof);
    await tx.wait();

    const aliceCount = await dreamJournalContract.getDreamCount(signers.alice.address);
    const bobCount = await dreamJournalContract.getDreamCount(signers.bob.address);

    expect(aliceCount).to.eq(1n);
    expect(bobCount).to.eq(0n);
  });

  it("Should validate input constraints", async function () {
    const { dreamJournalContract } = await deployFixture();

    // Test empty content
    await expect(
      dreamJournalContract.createDream("Test Title", [], "0x")
    ).to.be.revertedWith("Empty content");

    // Test empty title (create a minimal valid encrypted content for testing)
    const encryptedEmpty = fhevm.createEncryptedInput([], signers.alice.address);
    await expect(
      dreamJournalContract.createDream("", encryptedEmpty.handles, encryptedEmpty.inputProof)
    ).to.be.revertedWith("Empty title");

    // Test title too long
    const longTitle = "a".repeat(201); // 201 characters
    const encryptedContent = fhevm.createEncryptedInput([fhevm.encrypt8(72)], signers.alice.address); // "H"
    await expect(
      dreamJournalContract.createDream(longTitle, encryptedContent.handles, encryptedContent.inputProof)
    ).to.be.revertedWith("Title too long");
  });

  it("Should enforce access control", async function () {
    const { dreamJournalContract } = await deployFixture();

    // First create a dream with Alice
    const title = "Alice's Dream";
    const content = "Secret dream content";
    const contentBytes = ethers.toUtf8Bytes(content);
    const encryptedContent = fhevm.createEncryptedInput(
      contentBytes.map(b => fhevm.encrypt8(b)),
      signers.alice.address
    );

    await dreamJournalContract.connect(signers.alice).createDream(
      title,
      encryptedContent.handles,
      encryptedContent.inputProof
    );

    const dreamIds = await dreamJournalContract.getDreamIds(signers.alice.address);
    const dreamId = dreamIds[0];

    // Bob should not be able to access Alice's encrypted content
    await expect(
      dreamJournalContract.connect(signers.bob).getDreamContentByte(dreamId, 0n)
    ).to.be.revertedWith("Access denied: not the owner");
  });

  it("Should prevent duplicate dreams", async function () {
    const { dreamJournalContract } = await deployFixture();

    const title = "Duplicate Dream";
    const content = "This dream will be duplicated";
    const contentBytes = ethers.toUtf8Bytes(content);
    const encryptedContent = fhevm.createEncryptedInput(
      contentBytes.map(b => fhevm.encrypt8(b)),
      signers.alice.address
    );

    // Create first dream
    await dreamJournalContract.connect(signers.alice).createDream(
      title,
      encryptedContent.handles,
      encryptedContent.inputProof
    );

    // Try to create the same dream again (same title, content length, and owner)
    await expect(
      dreamJournalContract.connect(signers.alice).createDream(
        title,
        encryptedContent.handles,
        encryptedContent.inputProof
      )
    ).to.be.revertedWith("Duplicate dream content detected");
  });

  it("Should handle edge cases properly", async function () {
    const { dreamJournalContract } = await deployFixture();

    // Test maximum content length
    const maxContent = "a".repeat(10000);
    const maxContentBytes = ethers.toUtf8Bytes(maxContent);
    const encryptedMaxContent = fhevm.createEncryptedInput(
      maxContentBytes.map(b => fhevm.encrypt8(b)),
      signers.alice.address
    );

    await dreamJournalContract.connect(signers.alice).createDream(
      "Max Content Dream",
      encryptedMaxContent.handles,
      encryptedMaxContent.inputProof
    );

    // Test content too large
    const tooLargeContent = "a".repeat(10001);
    const tooLargeBytes = ethers.toUtf8Bytes(tooLargeContent);
    const encryptedTooLarge = fhevm.createEncryptedInput(
      tooLargeBytes.map(b => fhevm.encrypt8(b)),
      signers.alice.address
    );

    await expect(
      dreamJournalContract.connect(signers.alice).createDream(
        "Too Large Dream",
        encryptedTooLarge.handles,
        encryptedTooLarge.inputProof
      )
    ).to.be.revertedWith("Content too large");
  });
});

