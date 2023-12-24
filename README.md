<div  align="center">
Voting
</div>

---

### 📝 Introduce

It is a public voting platform based on the Ethereum blockchain. Users can create proposals and invite other users to
vote on the proposals. The following are the front-end and back-end code and usage instructions of the platform.

---

### 🫧 Directory

   ├── backend
   │ ├── coin.sol
   │ └── voting.sol
   └── front
   ├── img
   │ └── index.png
   ├── js
   │ ├── jquery.js
   │ ├── main.js
   │ ├── web3.min.js
   │ └── web3.min.js.map
   ├── main.css
   └── main.html
---

### 🖥 Running environment

1. Start the local Ethereum blockchain or connect to a remote blockchain network.
2. Run the application by opening the index.html file in a web browser.
3. Connect your wallet to the application. Make sure the wallet is connected to the same blockchain network
4. You can run the project on a variety of operating systems, including but not limited to Windows, Mac, and Linux.
5. Node.js and npm: Make sure you have Node.js and npm installed on your system. These are tools for running JavaScript
   code and managing dependencies. You can do this on the official Node.js website
6. Ethereum network: You need to connect to an Ethereum network in order to interact with the smart contract. You can
   choose to connect to the main Ethereum network, a test network (like Ropsten, Kovan, Rinkeby), or a local development
   network (like Ganache). If you don't have your own Ethereum node, you can use an Ethereum browser plugin wallet such
   as MetaMask to connect to the network.

---

### 📲 Key features

1. Create Proposals: The contract allows users to create new proposals. Proposals usually include information such as
   title, content, duration, and required funding. When creating a proposal, the user needs to provide these details and
   add the proposal to the contract.
2. Vote: The contract allows other users to vote on proposals. The user can select a proposal to vote on based on the
   proposal's unique identifier (ID) and specify the amount of money used for the vote.
3. Vote validation: The voting contract verifies that the amount of money used by the voter meets the requirements of
   the proposal. For example, if the proposal requires at least a certain amount of money per vote, the voting contract
   checks whether the voter's investment meets or exceeds that requirement.
4. Transfer of funds: If the vote is successful, that is, the funds used for the vote meet the requirements of the
   proposal, the contract will automatically transfer the voter's funds to the address of the contract. This ensures
   transparency of the voting process and security of funds.
5. Query proposal information: Users can query proposal details such as title, content, duration, current voting status,
   etc. through the unique identifier of the proposal. This enables the user to understand the situation of each
   proposal.

---

### 📖 UI Display
![index](https://github.com/xu200/Voting/blob/07e9aaff9d02ff685d8e8daf7d59012e03678a29/front/img/index.png)
