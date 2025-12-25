import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";
import { ethers, fhevm, deployments } from "hardhat";
import { DreamJournal } from "../types";
import { expect } from "chai";
import { FhevmType } from "@fhevm/hardhat-plugin";

type Signers = {
  alice: HardhatEthersSigner;
};

describe("DreamJournalSepolia", function () {
  let signers: Signers;
  let dreamJournalContract: DreamJournal;
  let dreamJournalContractAddress: string;
  let step: number;
  let steps: number;

  function progress(message: string) {
    console.log(`${++step}/${steps} ${message}`);
  }

  before(async function () {
    if (fhevm.isMock) {
      console.warn(`This hardhat test suite can only run on Sepolia Testnet`);
      this.skip();
    }

    try {
      const DreamJournalDeployment = await deployments.get("DreamJournal");
      dreamJournalContractAddress = DreamJournalDeployment.address;
      dreamJournalContract = await ethers.getContractAt("DreamJournal", DreamJournalDeployment.address);
    } catch (e) {
      (e as Error).message += ". Call 'npx hardhat deploy --network sepolia'";
      throw e;
    }

    const ethSigners: HardhatEthersSigner[] = await ethers.getSigners();
    signers = { alice: ethSigners[0] };
  });

  beforeEach(async () => {
    step = 0;
    steps = 0;
  });

  it("should create and decrypt a dream entry", async function () {
    steps = 15;

    this.timeout(4 * 40000);

    const title = "Flying Dream";
    const content = "I dreamt of flying in the forest.";
    const contentBytes = ethers.toUtf8Bytes(content);

    progress(`Encrypting dream content (${contentBytes.length} bytes)...`);
    const encryptedInput = fhevm
      .createEncryptedInput(dreamJournalContractAddress, signers.alice.address);

    for (let i = 0; i < contentBytes.length; i++) {
      encryptedInput.add8(contentBytes[i]);
    }

    const encrypted = await encryptedInput.encrypt();
    const externalEuint8Array = encrypted.handles.map((handle: string) => ({
      data: handle,
    }));

    progress(
      `Call createDream() DreamJournal=${dreamJournalContractAddress} signer=${signers.alice.address}...`,
    );
    const tx = await dreamJournalContract
      .connect(signers.alice)
      .createDream(title, externalEuint8Array, encrypted.inputProof);
    await tx.wait();

    progress(`Call getDreamCount()...`);
    const count = await dreamJournalContract.getDreamCount(signers.alice.address);
    expect(count).to.eq(1n);

    progress(`Call getDreamIds()...`);
    const dreamIds = await dreamJournalContract.getDreamIds(signers.alice.address);
    expect(dreamIds.length).to.eq(1);
    const dreamId = dreamIds[0];

    progress(`Call getDreamMeta()...`);
    const [owner, storedTitle, createdAt] = await dreamJournalContract.getDreamMeta(dreamId);
    expect(owner).to.eq(signers.alice.address);
    expect(storedTitle).to.eq(title);
    progress(`Dream metadata: owner=${owner}, title=${storedTitle}, createdAt=${createdAt}`);

    progress(`Call getDreamContentLength()...`);
    const length = await dreamJournalContract.getDreamContentLength(dreamId);
    expect(length).to.eq(BigInt(contentBytes.length));
    progress(`Content length: ${length} bytes`);

    progress(`Decrypting dream content...`);
    const decryptedBytes: number[] = [];

    for (let i = 0; i < Number(length); i++) {
      progress(`  Decrypting byte ${i + 1}/${length}...`);
      const encByte = await dreamJournalContract.getDreamContentByte(dreamId, i);
      const clearByte = await fhevm.userDecryptEuint(
        FhevmType.euint8,
        encByte,
        dreamJournalContractAddress,
        signers.alice,
      );
      decryptedBytes.push(Number(clearByte));
    }

    const decryptedContent = ethers.toUtf8String(new Uint8Array(decryptedBytes));
    progress(`Decrypted content: ${decryptedContent}`);
    expect(decryptedContent).to.eq(content);
  });
});

