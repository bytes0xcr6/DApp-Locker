// import abi from "./utils/ABI.json";

const lockButton = document.querySelector(".button-lock");
const connectButton = document.querySelector(".button-connect");
const inputs = document.querySelector(".inputs-container");

const asset = document.querySelector("#asset");
const lockPeriod = document.querySelector("#lockPeriod");
const amount = document.querySelector("#amount");
let signed;

// contract ABI
// const ABI = [
//   {
//     anonymous: false,
//     inputs: [
//       {
//         indexed: true,
//         internalType: "address",
//         name: "user",
//         type: "address",
//       },
//       {
//         indexed: false,
//         internalType: "uint256",
//         name: "amount",
//         type: "uint256",
//       },
//       {
//         indexed: false,
//         internalType: "uint256",
//         name: "timeLocked",
//         type: "uint256",
//       },
//       {
//         indexed: false,
//         internalType: "uint256",
//         name: "totalValueLocked",
//         type: "uint256",
//       },
//     ],
//     name: "newLocked",
//     type: "event",
//   },
//   {
//     anonymous: false,
//     inputs: [
//       {
//         indexed: true,
//         internalType: "address",
//         name: "user",
//         type: "address",
//       },
//       {
//         indexed: false,
//         internalType: "uint256",
//         name: "valueRetrived",
//         type: "uint256",
//       },
//       {
//         indexed: false,
//         internalType: "uint256",
//         name: "totalValueLocked",
//         type: "uint256",
//       },
//     ],
//     name: "newRetrived",
//     type: "event",
//   },
//   {
//     inputs: [],
//     name: "SCValueLocked",
//     outputs: [
//       {
//         internalType: "uint256",
//         name: "",
//         type: "uint256",
//       },
//     ],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [],
//     name: "claimBack",
//     outputs: [],
//     stateMutability: "payable",
//     type: "function",
//   },
//   {
//     inputs: [
//       {
//         internalType: "uint256",
//         name: "_amount",
//         type: "uint256",
//       },
//       {
//         internalType: "uint256",
//         name: "_time",
//         type: "uint256",
//       },
//     ],
//     name: "lock",
//     outputs: [],
//     stateMutability: "payable",
//     type: "function",
//   },
//   {
//     inputs: [],
//     name: "usersLocking",
//     outputs: [
//       {
//         internalType: "uint256",
//         name: "",
//         type: "uint256",
//       },
//     ],
//     stateMutability: "view",
//     type: "function",
//   },
// ];

//Deployed to Goerli
const contractAddress = "0x2703D28Ad0f924e20b17775D89263cff764aA3f8";

// Wallet connection logic
const isWalletConnected = async () => {
  try {
    const { ethereum } = window;

    const accounts = await ethereum.request({ method: "eth_accounts" });
    console.log("accounts: ", accounts);

    if (accounts.length > 0) {
      const account = accounts[0];
      console.log("wallet is connected! " + account);
    } else {
      console.log("make sure MetaMask is connected");
    }
  } catch (error) {
    console.log("error: ", error);
  }
};

// Connect wallet
const connect = async () => {
  console.log("Hola");
  if (signed) {
    window.alert("You are already connected");
    return;
  }
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = await provider.send("eth_requestAccounts", []);
  signed = true;
  connectButton.innerHTML = `<span> &#128994 Connected to: <span>`;
  lockButton.classList.remove("hidde");
  inputs.classList.remove("hidde");
  console.log(signer);

  const showAccount = document.createElement("span");
  showAccount.textContent = `${signer[0].slice(0, 5)} ... ${signer[0].slice(
    38
  )}`;
  connectButton.appendChild(showAccount);
};

// const contract = new ethers.Contract(lockerSCAddress, contractABI, signer);

async function lock() {
  const ethersToLock = await ethers.utils.parseEther(amount.value);
  await contract.lock(ethersToLock, lockPeriod);
  console.log(`total Ethers locked: ${ethersToLock}`);
}

if (typeof window.ethereum !== "undefined") {
  console.log("MetaMask is installed!");
}

lockButton.addEventListener("click", () => {
  if (!lockPeriod.value || !amount.value) {
    window.alert("All the values are required!");
  }
  lock();
  console.log(asset.value, lockPeriod.value, amount.value);
});
