// Web3 Dashboard Script

const CONTRACT_ADDRESS = "PASTE_CONTRACT_ADDRESS";
const CONTRACT_ABI = [/* PASTE ABI HERE */];

let provider, signer, contract;

async function connectWallet() {
  provider = new ethers.BrowserProvider(window.ethereum);
  signer = await provider.getSigner();
  contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

  document.getElementById("walletDisplay").innerText =
    "Connected: " + await signer.getAddress();
}

async function deposit() {
  let amount = document.getElementById("depositAmount").value;
  await signer.sendTransaction({
    to: CONTRACT_ADDRESS,
    value: ethers.parseEther(amount)
  });
  alert("Deposit sent!");
}

async function withdraw() {
  let amount = document.getElementById("withdrawAmount").value;
  await contract.withdraw(ethers.parseEther(amount));
  alert("Withdraw sent!");
}

async function invest() {
  let amount = document.getElementById("investAmount").value;
  await contract.invest(ethers.parseEther(amount));
  alert("Invested!");
}

async function createEscrow() {
  let seller = document.getElementById("seller").value;
  let amount = document.getElementById("escrowAmount").value;
  await contract.createEscrow(seller, ethers.parseEther(amount));
  alert("Escrow created!");
}

async function fundEscrow() {
  let id = document.getElementById("fundId").value;
  let e = await contract.escrows(id);
  await contract.fundEscrow(id, { value: e.amount });
  alert("Escrow funded!");
}

async function releaseEscrow() {
  let id = document.getElementById("releaseId").value;
  await contract.releaseEscrow(id);
  alert("Escrow released!");
}

async function refundEscrow() {
  let id = document.getElementById("refundId").value;
  await contract.refundEscrow(id);
  alert("Escrow refunded!");
}
