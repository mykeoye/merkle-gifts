const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';

const  { input } = require('@inquirer/prompts');

async function main() {

  const name = await input({ message: 'What is your name' });
  
  const leafIndex = niceList.findIndex(n => n === name);

  const merkleTree = new MerkleTree(niceList);
  const proof =  merkleTree.getProof(leafIndex);

  const { data: gift } = await axios.post(`${serverUrl}/gift`, { name, proof });
  console.log({ gift });
}

main();
