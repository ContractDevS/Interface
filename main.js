var web3 = new Web3(new Web3.providers.HttpProvider("http://10.1.202.14:8541"));
var address;
var contract;
var contractABI = [
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_homeAddress",
				"type": "uint256"
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
		"constant": false,
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_homeAddress",
				"type": "uint256"
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
				"internalType": "uint256",
				"name": "_recipientMoney",
				"type": "uint256"
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
				"internalType": "uint256",
				"name": "_homeAddress",
				"type": "uint256"
			}
		],
		"name": "registration",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
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
	}
];
var contractAddr = "0x12628A0fCe47A3F15210c1840B2F9e267545475F";
//console.log(web3);

function login() {
    var log = document.getElementById("loginBox");
    var pass = document.getElementById("pwdBox");
    //alert(log.value + " " + pass.value);
    address = log.value;
    web3.eth.personal.unlockAccount(log.value, pass.value, 600).then(successAuth, failAuth);
}

function registrate() {
    var pwd1 = document.getElementById("pwdBoxRegFirst");
    var pwd2 = document.getElementById("pwdBoxRegSecond");
    if(pwd1.value === pwd2.value) {
        web3.eth.personal.newAccount(pwd1.value).then(successReg, failAuth);
    } else {
        alert("Пароли не совпадают!");
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
