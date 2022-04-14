const inspercoin = artifacts.require("inspercoin");

module.exports = function (deployer) {
  deployer.deploy(inspercoin);
};
