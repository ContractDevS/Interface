var web3 = new Web3(new Web3.providers.HttpProvider("http://10.1.202.14:8541"));

console.log(web3);


function login() {
    var log = document.getElementById("loginBox");
    var pass = document.getElementById("pwdBox");
    alert(log.value + " " + pass.value);
    web3.eth.personal.unlockAccount(log.value, pass.value, 600).then(successAuth, failAuth);
    
}
function successAuth(){
    console.log("YEAH!!!");
}

function failAuth(){
    console.log("FUCK!!!");
}
