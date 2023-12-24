//创建web3实例
const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
//打印
console.log("web3=", web3);

//获取当前外部账户的地址

var account = new web3.eth.getAccounts().then(function (accounts) {
	accounts = accounts;
	console.log("当前账户的地址为===>", accounts[0])
})

//定义账户列表
let accounts = [];
//定义合法的提取用户余额
let Raccounts = [
	"0x5B38Da6a701c568545dCfcB03FcB875f56beddC4",//账户2
	"0x8E8a29997C90855d9C88e755dCDFe338fe38e68a",//账户3
	"0x523fB28bA074122bE0b760e83cC886b77049d421" //账户1
];
//定义一些状态变量,以便在函数外使用
var Money = 0;



//公开投票平台的abi
const contractAbi = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "symbol",
				"type": "string"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "subtractedValue",
				"type": "uint256"
			}
		],
		"name": "decreaseAllowance",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "addedValue",
				"type": "uint256"
			}
		],
		"name": "increaseAllowance",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			}
		],
		"name": "allowance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

//公共投票的合约地址
var myContract = new web3.eth.Contract(contractAbi, "0xd9145CCE52D386f254917e481eB44e9943F39138");


// 得到区块链当前时间
async function xuqingyao_getBlockTime() {
	myContract.methods.xuqingyao_getBlockTime().call(function (error, result) {
		alert("当前时间戳为===>" + result);
		console.log("当前时间戳为===>", result);
	});
}


//创建提案

function sub1() {
	var Title = document.getElementById("title").value
	var Content = document.getElementById("content").value
	var Time = document.getElementById("time").value
	var Money1 = document.getElementById("money1").value

	Money = Money1;

	//提交提案
	myContract.methods.xuqingyao_createProposal(Title, Content, Time, Money1).send({ from: accounts[0] })
		.on('transactionHash', function (hash) {
			console.log("xuqingyao_createProposal hash===>", hash)
		}).on('confirmation', function (confirmationNumber, receipt) {
			console.log("xuqingyao_createProposal confirmationNumber===>", confirmationNumber)
		}).on('receipt', function (receipt) {
			console.log("xuqingyao_createProposal receipt===>", receipt);
		}).on('error', function (error, receipt) {
			console.log("xuqingyao_createProposal error===>", error)
		});

	//通过once方法获取pid
	myContract.once('xuqingyao_ProposeEvt', {
		fromBlock: 0
	}, function (error, event) {
		alert("返回值pId===>" + event.returnValues[1]);
		console.log("返回值Pid===>", event.returnValues[1]);
	})
}



//开始投票
function _doVoting() {
	//获取pid
	var Pid = document.getElementById("pid").value
	//获取费用
	var Money2 = document.getElementById("money2").value

	//先判断用户所交的费用是否大于或等于该提案预定的费用,如果不符合,直接报错并return
	if (Money2 < Money) {
		alert("您所提交的费用少于该提案的预定费用,您至少要需要:" + Money + "的费用才能正常交易")
		return
	}

	myContract.methods.xuqingyao_doVoting(Pid, Money2).send({ from: accounts[0] })//(对)
		.on('transactionHash', function (hash) {
			console.log("xuqingyao_doVoting hash===>", hash)
		}).on('confirmation', function (confirmationNumber, receipt) {
			console.log("xuqingyao_doVoting receipt===>", receipt)
			console.log("xuqingyao_doVoting confirmationNumber===>", confirmationNumber)
		}).on('receipt', function (receipt) {
			console.log("xuqingyao_doVoting receipt===>", receipt);
		}).on('error', function (error, receipt) {
			console.log("xuqingyao_doVoting receipt===>", receipt)
			console.log("xuqingyao_doVoting error===>", error)
		});

	//向该合约地址转账(√)
	web3.eth.sendTransaction({
		from: accounts[0],
		to: '0xd4669b10B51bFCf8D1AB7EBa8e88e15858E5d5b5',
		value: Money2
	}).on('transactionHash', function (hash) {
		console.log("sendTransaction hash===>", hash)
	}).on('confirmation', function (confirmationNumber, receipt) {
		console.log("sendTransaction confirmationNumber===>", confirmationNumber)
	}).on('receipt', function (receipt) {
		console.log("sendTransaction receipt===>", receipt);
	}).on('error', function (error, receipt) {
		console.log("sendTransaction error===>", error)
	});

	//获得10个erc20代币
	myContract.methods.xuqingyaoTransactionTo1("0x6820D27e9603AfFcE30D1eE3a0Bc8C3007Fd25D4", accounts[0], 10).send({ from: accounts[0] })
		.on('transactionHash', function (hash) {
			console.log("xuqingyaoTransactionTo1 hash===>", hash)
		}).on('confirmation', function (confirmationNumber, receipt) {
			console.log("xuqingyaoTransactionTo1 confirmationNumber===>", confirmationNumber)
		}).on('receipt', function (receipt) {
			console.log("xuqingyaoTransactionTo1 receipt===>", receipt);
		}).on('error', function (error, receipt) {
			console.log("xuqingyaoTransactionTo1 error===>", error)
		}).then(function () {
			alert("投票成功！");
		});

}

//根据提案编号来查询提案信息
async function _message() {
	//获取pid
	var pid2 = document.getElementById("pid2").value
	// 所有提案列表
	myContract.methods.xuqingyao_proposals(pid2).call()
		.then(console.log);

	//总费用:
	console.log("提案费用合计===>", Money)
}

async function _trans() {
	//遍历合法提取余额账户,查看当前账户是否为合法提取账户
	for (let index = 0; index < Raccounts.length; index++) {
		if (accounts[0] == Raccounts[index]) {
			myContract.methods.xuqingyaotransactionTo2(Raccounts[index], 1000).send({ from: accounts[0] })
				.on('transactionHash', function (hash) {
					console.log("xuqingyaotransactionTo2 hash===>", hash)
				}).on('confirmation', function (confirmationNumber, receipt) {
					console.log("xuqingyaotransactionTo2 confirmationNumber===>", confirmationNumber)
				}).on('receipt', function (receipt) {
					console.log("xuqingyaotransactionTo2 receipt===>", receipt);
				}).on('error', function (error, receipt) {
					console.log("xuqingyaotransactionTo2 error===>", error)
				})
		}
	}

}





