const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('ShikokuToken', function () {
    let ShikokuToken;
    let shikokuToken;
    let owner;
    let addr1;
    let addr2;
    const initialSupply = ethers.utils.parseUnits('1000', 18);

    beforeEach(async function () {
        ShikokuToken = await ethers.getContractFactory('ShikokuToken');
        [owner, addr1, addr2] = await ethers.getSigners();
        shikokuToken = await ShikokuToken.deploy(initialSupply);
    });

    it('should have the correct initial supply', async function () {
        const supply = await shikokuToken.totalSupply();
        expect(supply).to.equal(initialSupply);
    });

    it('should assign the initial supply to the owner', async function () {
        const ownerBalance = await shikokuToken.balanceOf(owner.address);
        expect(ownerBalance).to.equal(initialSupply);
    });

    it('should transfer tokens between accounts', async function () {
        await shikokuToken.transfer(addr1.address, 50);
        const addr1Balance = await shikokuToken.balanceOf(addr1.address);
        expect(addr1Balance).to.equal(50);
        await shikokuToken.connect(addr1).transfer(addr2.address, 20);
        const addr2Balance = await shikokuToken.balanceOf(addr2.address);
        expect(addr2Balance).to.equal(20);
    });

    it('should fail if sender doesn’t have enough tokens', async function () {
        const initialAddr2Balance = await shikokuToken.balanceOf(addr2.address);
        await expect(shikokuToken.connect(addr1).transfer(addr2.address, 1)).to.be.revertedWith('Not enough tokens');
    });
});