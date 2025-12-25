import { FhevmType } from "@fhevm/hardhat-plugin";
import { task } from "hardhat/config";
import type { TaskArguments } from "hardhat/types";

/**
 * Tutorial: Deploy and Interact Locally (--network localhost)
 * ===========================================================
 *
 * 1. From a separate terminal window:
 *
 *   npx hardhat node
 *
 * 2. Deploy the DreamJournal contract
 *
 *   npx hardhat --network localhost deploy
 *
 * 3. Interact with the DreamJournal contract
 *
 *   npx hardhat --network localhost task:create-dream --title "My Dream" --content "I dreamt of flying"
 *   npx hardhat --network localhost task:list-dreams
 *   npx hardhat --network localhost task:decrypt-dream --id 0
 *
 *
 * Tutorial: Deploy and Interact on Sepolia (--network sepolia)
 * ===========================================================
 *
 * 1. Deploy the DreamJournal contract
 *
 *   npx hardhat --network sepolia deploy
 *
 * 2. Interact with the DreamJournal contract
 *
 *   npx hardhat --network sepolia task:create-dream --title "My Dream" --content "I dreamt of flying"
 *   npx hardhat --network sepolia task:list-dreams
 *   npx hardhat --network sepolia task:decrypt-dream --id 0
 *
 */

/**
 * Example:
 *   - npx hardhat --network localhost task:address
 *   - npx hardhat --network sepolia task:address
 */
task("task:address", "Prints the DreamJournal address").setAction(async function (_taskArguments: TaskArguments, hre) {
  const { deployments } = hre;

  const dreamJournal = await deployments.get("DreamJournal");

  console.log("DreamJournal address is " + dreamJournal.address);
});

/**
 * Example:
 *   - npx hardhat --network localhost task:create-dream --title "My Dream" --content "I dreamt of flying"
 *   - npx hardhat --network sepolia task:create-dream --title "My Dream" --content "I dreamt of flying"
 */
task("task:create-dream", "Creates a new dream entry")
  .addOptionalParam("address", "Optionally specify the DreamJournal contract address")
  .addParam("title", "The dream title")
  .addParam("content", "The dream content")
  .setAction(async function (taskArguments: TaskArguments, hre) {
    const { ethers, deployments, fhevm } = hre;

    await fhevm.initializeCLIApi();

    const DreamJournalDeployment = taskArguments.address
      ? { address: taskArguments.address }
      : await deployments.get("DreamJournal");
    console.log(`DreamJournal: ${DreamJournalDeployment.address}`);

    const signers = await ethers.getSigners();
    const dreamJournalContract = await ethers.getContractAt("DreamJournal", DreamJournalDeployment.address);

    // Convert content string to bytes and encrypt each byte
    const contentBytes = ethers.toUtf8Bytes(taskArguments.content);
    const encryptedInput = fhevm.createEncryptedInput(DreamJournalDeployment.address, signers[0].address);

    // Add each byte as euint8
    for (let i = 0; i < contentBytes.length; i++) {
      encryptedInput.add8(contentBytes[i]);
    }

    const encrypted = await encryptedInput.encrypt();

    // Convert handles to externalEuint8 array format
    const externalEuint8Array = encrypted.handles.map((handle: string) => ({
      data: handle,
    }));

    const tx = await dreamJournalContract
      .connect(signers[0])
      .createDream(taskArguments.title, externalEuint8Array, encrypted.inputProof);
    console.log(`Wait for tx:${tx.hash}...`);

    const receipt = await tx.wait();
    console.log(`tx:${tx.hash} status=${receipt?.status}`);

    console.log(`DreamJournal createDream("${taskArguments.title}") succeeded!`);
  });

/**
 * Example:
 *   - npx hardhat --network localhost task:list-dreams
 *   - npx hardhat --network sepolia task:list-dreams
 */
task("task:list-dreams", "Lists all dreams for the first account")
  .addOptionalParam("address", "Optionally specify the DreamJournal contract address")
  .setAction(async function (taskArguments: TaskArguments, hre) {
    const { ethers, deployments } = hre;

    const DreamJournalDeployment = taskArguments.address
      ? { address: taskArguments.address }
      : await deployments.get("DreamJournal");
    console.log(`DreamJournal: ${DreamJournalDeployment.address}`);

    const signers = await ethers.getSigners();
    const dreamJournalContract = await ethers.getContractAt("DreamJournal", DreamJournalDeployment.address);

    const count = await dreamJournalContract.getDreamCount(signers[0].address);
    console.log(`Total dreams: ${count}`);

    if (count > 0n) {
      const dreamIds = await dreamJournalContract.getDreamIds(signers[0].address);
      console.log(`Dream IDs: [${dreamIds.join(", ")}]`);

      for (let i = 0; i < dreamIds.length; i++) {
        const [owner, title, createdAt] = await dreamJournalContract.getDreamMeta(dreamIds[i]);
        const date = new Date(Number(createdAt) * 1000);
        console.log(`\nDream #${dreamIds[i]}:`);
        console.log(`  Title: ${title}`);
        console.log(`  Owner: ${owner}`);
        console.log(`  Created: ${date.toLocaleString()}`);
      }
    }
  });

/**
 * Example:
 *   - npx hardhat --network localhost task:decrypt-dream --id 0
 *   - npx hardhat --network sepolia task:decrypt-dream --id 0
 */
task("task:decrypt-dream", "Decrypts and displays a dream entry")
  .addOptionalParam("address", "Optionally specify the DreamJournal contract address")
  .addParam("id", "The dream ID")
  .setAction(async function (taskArguments: TaskArguments, hre) {
    const { ethers, deployments, fhevm } = hre;

    await fhevm.initializeCLIApi();

    const DreamJournalDeployment = taskArguments.address
      ? { address: taskArguments.address }
      : await deployments.get("DreamJournal");
    console.log(`DreamJournal: ${DreamJournalDeployment.address}`);

    const signers = await ethers.getSigners();
    const dreamJournalContract = await ethers.getContractAt("DreamJournal", DreamJournalDeployment.address);

    const dreamId = BigInt(taskArguments.id);
    const [owner, title, createdAt] = await dreamJournalContract.getDreamMeta(dreamId);
    console.log(`\nDream #${dreamId}:`);
    console.log(`  Title: ${title}`);
    console.log(`  Owner: ${owner}`);
    console.log(`  Created: ${new Date(Number(createdAt) * 1000).toLocaleString()}`);

    const length = await dreamJournalContract.getDreamContentLength(dreamId);
    console.log(`  Content length: ${length} bytes`);

    // Decrypt each byte
    const decryptedBytes: number[] = [];
    for (let i = 0; i < Number(length); i++) {
      const encByte = await dreamJournalContract.getDreamContentByte(dreamId, i);
      const clearByte = await fhevm.userDecryptEuint(
        FhevmType.euint8,
        encByte,
        DreamJournalDeployment.address,
        signers[0],
      );
      decryptedBytes.push(Number(clearByte));
    }

    // Convert bytes to string
    const content = ethers.toUtf8String(new Uint8Array(decryptedBytes));
    console.log(`  Content: ${content}`);
  });

