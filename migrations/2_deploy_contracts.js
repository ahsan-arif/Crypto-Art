var ArtFactory = artifacts.require("./ArtFactory.sol");

module.exports = async function(deployer,network, accounts) {
  await deployer.deploy(ArtFactory);
};
