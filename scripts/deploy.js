async function main() {
    const [deployer] = await ethers.getSigners();
    console.log('Deploying contracts with account:', deployer.address);
    const initialSupply = ethers.utils.parseUnits('1000000', 18); // 1 million tokens
    const ShikokuToken = await ethers.getContractFactory('ShikokuToken');
    const shikokuToken = await ShikokuToken.deploy(initialSupply);
    await shikokuToken.deployed();
    console.log('ShikokuToken deployed to:', shikokuToken.address);
}

main() 
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });