// 'use strict';
async function PosNeg(text){
    // console.log(text);
    const url="https://sentim-api.herokuapp.com/api/v1/";
    const response=await fetch(url, {method:"POST",
headers:{
    Accept: "application/json",
    "Content-Type": "application/json",
},
body:JSON.stringify({"text":text}),
})
const result= await response.json();
if(!response.ok){
    const error=result.data[0];
    throw Error(error.field+" "+error.message);
}
console.log(JSON.stringify(result.result.polarity))
console.log(JSON.stringify(result.result.type))
let typeOfResult=JSON.stringify(result.result.type)
let polarityOfResult=JSON.stringify(result.result.polarity)

const answer=document.getElementById("answer")
colorOfEmotion(polarityOfResult)
answer.innerText=`Your Result is:${typeOfResult}`
}   

function clickEvent(){
const text=document.getElementById("text").value
PosNeg(text)
}

function colorOfEmotion(num){
    const answer=document.getElementById("answer")
    if(num>0){
        answer.style="color:blue"
    }
    else (num<0)= answer.style="color:red"
}

document.getElementById("result").addEventListener("click",clickEvent)