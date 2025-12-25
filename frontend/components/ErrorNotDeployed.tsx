export function errorNotDeployed(chainId: number | undefined) {
  return (
    <div className="grid w-full gap-4 mx-auto font-semibold bg-none">
      <div className="col-span-full mx-20">
        <p className="text-4xl leading-relaxed">
          {" "}
          <span className="font-mono bg-red-500">Error</span>:{" "}
          <span className="font-mono bg-white">DreamJournal.sol</span> Contract
          Not Deployed on{" "}
          <span className="font-mono bg-white">chainId={chainId}</span>{" "}
          {chainId === 11155111 ? "(Sepolia)" : ""} or Deployment Address
          Missing.
        </p>
        <p className="text-xl leading-relaxed mt-8">
          It appears that the{" "}
          <span className="font-mono bg-white">DreamJournal.sol</span> contract
          has either not been deployed yet, or the deployment address is missing
          from the ABI directory{" "}
          <span className="font-mono bg-white">frontend/abi</span>. To
          deploy <span className="font-mono bg-white">DreamJournal.sol</span> on
          Sepolia, run the following command:
        </p>
        <p className="font-mono text-2xl leading-relaxed bg-black text-white p-4 mt-12">
          <span className="opacity-50 italic text-red-500">
            #from pro16 directory
          </span>
          <br />
          npx hardhat deploy --network{" "}
          {chainId === 11155111 ? "sepolia" : "your-network-name"}
        </p>
        <p className="text-xl leading-relaxed mt-12">
          <strong>Recommended:</strong> Switch to the local{" "}
          <span className="font-mono bg-white">Hardhat Node</span> using the
          Rainbow wallet browser extension.
        </p>
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="font-semibold text-blue-800 mb-2">To use local Hardhat network:</p>
          <ol className="list-decimal list-inside space-y-2 text-blue-700">
            <li>Make sure Hardhat node is running: <code className="bg-blue-100 px-2 py-1 rounded">npx hardhat node</code></li>
            <li>In Rainbow wallet, add custom network:
              <ul className="list-disc list-inside ml-4 mt-1">
                <li>Network Name: <code className="bg-blue-100 px-1 rounded">Hardhat Local</code></li>
                <li>RPC URL: <code className="bg-blue-100 px-1 rounded">http://localhost:8545</code></li>
                <li>Chain ID: <code className="bg-blue-100 px-1 rounded">31337</code></li>
                <li>Currency Symbol: <code className="bg-blue-100 px-1 rounded">ETH</code></li>
              </ul>
            </li>
            <li>Switch to Hardhat Local network in Rainbow wallet</li>
            <li>Refresh this page</li>
          </ol>
        </div>
      </div>
    </div>
  );
}

