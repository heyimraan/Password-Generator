window.onload =  function(){
const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');
const clipboardEl = document.getElementById('clipboard');




const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
}

clipboardEl.addEventListener('click',()=>{
    const textArea =  this.document.createElement('textarea');
    const password = resultEl.innerText;

    if(!password){
        return '';
    }
    textArea.value = password;
    this.document.body.appendChild(textArea);
    textArea.select();
    this.document.execCommand('copy');
    textArea.remove();
    this.alert("Password Copied to clipboard!");
});

generateEl.addEventListener('click', () => {
    const length = +lengthEl.value;             //yeh value string return karra hai isko number ma karna hai toh use + operator in front of it
    const hasLower = lowercaseEl.checked;
    const hasUpper = uppercaseEl.checked;
    const hasNumber = numbersEl.checked;
    const hasSymbol = symbolsEl.checked;

    resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length );
});



function generatePassword(lower,upper,number,symbol,length){
    let generatedPassword = '';
    const typesCount = lower + upper + number + symbol;
    //console.log(typesCount);

    const typesArr = [{lower},{upper},{number},{symbol}].filter(                        //takes true removes the false
        item =>Object.values(item)[0],
       
    );
    //console.log(typesArr);

    if(typesCount === 0){
        return '';
    }

    for(let i=0;i<length;i += typesCount){
        typesArr.forEach(type =>{
            const functName = Object.keys(type)[0];
            //console.log(functName);
            generatedPassword += randomFunc[functName]();
            //console.log(randomFunc[functName]);
        });
    }
    //console.log(generatedPassword);
    const finalPassword = generatedPassword.slice(0,length);
    console.log(finalPassword);
    return finalPassword;
    
}



function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
    const symbols = "!@#$%^&*()~_+={}[]<>/\|.,;";
    return symbols[Math.floor(Math.random() * symbols.length)];
}

}