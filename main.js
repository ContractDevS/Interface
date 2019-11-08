var web3 = new Web3(new Web3.providers.HttpProvider("http://10.1.202.14:8541"));
var address;
var contract;
var contractABI = [
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "address payable",
				"name": "_recipientMoney",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_sumMoney",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_timeOfLife",
				"type": "uint256"
			}
		],
		"name": "createTransfer",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_homeAddress",
				"type": "string"
			}
		],
		"name": "registration",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "cancelTransfer",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "deactivateUser",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "viewUser",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "getTransfer",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "address payable",
				"name": "_to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_eth",
				"type": "uint256"
			}
		],
		"name": "pay",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_homeAddress",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_role",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "_user",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_postalIndex",
				"type": "string"
			}
		],
		"name": "createByAdmin",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_homeAddress",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "chengePrivInfo",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "viewMoney",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "viewTransfer",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "address payable",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	}
];
var contractAddr = "0x4c1EaF37FceE92A2b1b14C020B729FE094AC6938";

function login() {
    var log = document.getElementById("loginBox");
	var pass = document.getElementById("pwdBox");
	if(pass.value === "" || log.value === "") {
		alert("пароль и/или логин не введен");
	} else {
		web3.eth.personal.unlockAccount(log.value, pass.value, 600).then(successAuth, failAuth);
		address = log.value;
		web3.eth.defaultAccount = log.value;
	}
}

function registrate() {
    var pwd1 = document.getElementById("pwdBoxRegFirst");
	var pwd2 = document.getElementById("pwdBoxRegSecond");
	if(pwd1.value === "" || pwd2.value === ""){
		alert("пароль не введен");
	} else if(pwd1.value === pwd2.value) {
        web3.eth.personal.newAccount(pwd1.value).then(successReg, failAuth);
    } else {
        alert("Пароли не совпадают!");
    }
}
async function showInfo() {
	var userid = document.getElementById("idBox");
	var userInfo;
	if(userid.value !== "") {
		userInfo = await contract.methods.viewUser(userid.value).call().catch(console.error);
		if(userInfo !== undefined) {
			document.getElementById("userInfoBox").style.display = "block";
			document.getElementById("userName").innerHTML = userInfo[0];
			document.getElementById("userHomeAddr").innerHTML = userInfo[1];
		} else {
			alert("Пользователь не найден!");
		}
	} else {
		alert("id не введен");
	}
}	


function showLogin() {
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("regForm").style.display = "block";
}
function showReg() {
    document.getElementById("regForm").style.display = "none";
    document.getElementById("loginForm").style.display = "block";
}

function showProfile() {
     document.getElementById("loginForm").style.display = "none";
     document.getElementById("profileForm").style.display = "block";
   
}


function successReg(_result) {
    alert(_result);
    address = _result;
}

function successAuth(){
    console.log("YEAH!!!");
    showProfile();
    contract = new web3.eth.Contract(contractABI, contractAddr, {from: address, gasPrice: "300000000"});
}

function failAuth(){
    console.log("FUCK!!!");
}

function success(_result) {
    
}
