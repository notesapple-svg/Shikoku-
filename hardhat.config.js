require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: {
    version: "0.8.0",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    rinkeby: {
      url: 'https://rinkeby.infura.io/v3/YOUR_INFURA_PROJECT_ID',
      accounts: ['0xYOUR_PRIVATE_KEY'],
    },
  },
};