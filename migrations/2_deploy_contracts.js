// deploy script , for deploying contracts

const Tether = artifacts.require('Tether')
const RWD = artifacts.require('RWD')
const DecentralBank = artifacts.require('DecentralBank')


// async and await to process asynchronously , after waiting for an event to occur, then operate
module.exports = async function(deployer, network, accounts) {
  await deployer.deploy(Tether)
  const tether = await Tether.deployed()

  await deployer.deploy(RWD) //deploy
  const rwd = await RWD.deployed() //call once deployed

  await deployer.deploy(DecentralBank, rwd.address, tether.address)
  const decentralBank = await DecentralBank.deployed()

  //want to move all the reward tokens to the decentral bank
  // Transfer all tokens to DecentralBank (1 million)
  await rwd.transfer(decentralBank.address, '1000000000000000000000000')

  //want to transfer Tether token to vesters

  // Transfer 100 Mock Tether tokens to investor
  await tether.transfer(accounts[1], '100000000000000000000')
};