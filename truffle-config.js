const path = require("path");
var HDWalletProvider = require("@truffle/hdwallet-provider");
const infuraKey = "INFURA_KEY_PLACED;"
const fs = require('fs');
const mnemonic = fs.readFileSync(".secret").toString().trim();

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  networks: {
    development: {
      host : "127.0.0.1",
      port: 7545,
      network_id : "*"
    },
    ropsten: {
      provider: function() {
        return new HDWalletProvider(mnemonic, "https://ropsten.infura.io/v3/820e21fda59d4daba361d2dcff006b9e")
      },
      network_id: 3,
      networkCheckTimeout: 10000000,
      confirmations: 2,
      timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true ,
      gas: 5500000      //make sure this gas allocation isn't over 4M, which is the max
    }
  },
  contracts_directory: './contracts/',
  contracts_build_directory: './client/src/contracts/',
  compilers: {
    solc: {
      optimizer: {
        enabled: true,
        runs: 200,
       version: "^0.5.0"
      },
      evmVersion: "petersburg"
    }
  }
};
