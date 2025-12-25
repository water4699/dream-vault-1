import "@fhevm/hardhat-plugin";
import "@nomicfoundation/hardhat-chai-matchers";
import "@nomicfoundation/hardhat-ethers";
import "@nomicfoundation/hardhat-verify";
import "@typechain/hardhat";
import "hardhat-deploy";
import "hardhat-gas-reporter";
import type { HardhatUserConfig } from "hardhat/config";
import { vars } from "hardhat/config";
import "solidity-coverage";

import "./tasks/accounts";
import "./tasks/DreamJournal";

// Run 'npx hardhat vars setup' to see the list of variables that need to be set

const MNEMONIC: string = vars.get("MNEMONIC", "test test test test test test test test test test test junk");
const INFURA_API_KEY: string = vars.get("INFURA_API_KEY", "b18fb7e6ca7045ac83c41157ab93f990");
const PRIVATE_KEY: string = vars.get("PRIVATE_KEY", "5e8e4a4a1284f85d996a4a5d124495a896aaef6a69f4c81026316c8226d67c9d");

const config: HardhatUserConfig = {
  // Use Hardhat network for local development and testing
  defaultNetwork: "hardhat",
  // Named accounts for easier contract deployment
  namedAccounts: {
    deployer: 0,
    alice: 1,
    bob: 2,
  },
  // Gas settings for better deployment reliability
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    apiKey: {
      sepolia: vars.get("ETHERSCAN_API_KEY", ""),
    },
  },
  gasReporter: {
    currency: "USD",
    enabled: process.env.REPORT_GAS ? true : false,
    excludeContracts: [],
    outputFile: "gas-report.txt",
    noColors: true,
    showMethodSig: true,
    showTimeSpent: true,
  },
  networks: {
    hardhat: {
      accounts: {
        mnemonic: MNEMONIC,
      },
      chainId: 31337,
      // Configure gas limits for FHE operations
      gas: 8000000,
      gasPrice: 1000000000, // 1 gwei
    },
    anvil: {
      accounts: {
        mnemonic: MNEMONIC,
        path: "m/44'/60'/0'/0/",
        count: 10,
      },
      chainId: 31337,
      url: "http://localhost:8545",
    },
    sepolia: {
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : {
        mnemonic: MNEMONIC,
        path: "m/44'/60'/0'/0/",
        count: 10,
      },
      chainId: 11155111,
      url: `https://sepolia.infura.io/v3/${INFURA_API_KEY}`,
    },
  },
  paths: {
    artifacts: "./artifacts",
    cache: "./cache",
    sources: "./contracts",
    tests: "./test",
  },
  solidity: {
    version: "0.8.27",
    settings: {
      metadata: {
        // Not including the metadata hash
        // https://github.com/paulrberg/hardhat-template/issues/31
        bytecodeHash: "none",
      },
      // Optimize for deployment cost and execution cost balance
      optimizer: {
        enabled: true,
        runs: 1000, // Increased for better execution optimization
        details: {
          yul: true, // Enable Yul optimizer
          yulDetails: {
            stackAllocation: true,
          },
        },
      },
      evmVersion: "cancun",
      viaIR: false, // Use legacy pipeline for better FHE compatibility
    },
  },
  typechain: {
    outDir: "types",
    target: "ethers-v6",
  },
};

export default config;

