import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  const deployedDreamJournal = await deploy("DreamJournal", {
    from: deployer,
    log: true,
  });

  console.log(`DreamJournal contract: `, deployedDreamJournal.address);
};
export default func;
func.id = "deploy_dreamJournal"; // id required to prevent reexecution
func.tags = ["DreamJournal"];

