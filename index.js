
async function PosNeg(text){
    document.getElementById("loader").style.display="block";
     const texts =document.getElementsByClassName("result");
     for(let i=0;i<texts.length;i++){
        texts[i].innerText=""
     }
     const answer=document.getElementById("answer");
    if(text===''){document.getElementById("loader").style.display="none";
        answer.innerText="textarea is empty please enter paragraph";
    answer.style="color:red";
    }
    else{
    const url="https://sentim-api.herokuapp.com/api/v1/";
    const response=await fetch(url, {method:"POST",
headers:{
    Accept: "application/json",
    "Content-Type": "application/json",
},
body:JSON.stringify({"text":text}),
});
const result= await response.json();
if(!response.ok){
    const error=result.data[0];
    document.getElementById("loader").style.display="none";
   answer.innerText=`${error.field}+" "+${error.message}`;
    answer.style="color:red";
    throw Error(error.field+" "+error.message);
}
const polarity=document.getElementById("polarity");
let typeOfResult=JSON.stringify(result.result.type);
let polarityOfResult=JSON.stringify(result.result.polarity);

colorOfEmotion(polarityOfResult);
document.getElementById("loader").style.display="none";
polarity.innerText=`polarity:${polarityOfResult}`;
answer.innerText=`Your Result is:${typeOfResult}`;
}   
}
//handle the click event
function clickEvent(){
const text=document.getElementById("text").value;
PosNeg(text);
}
//color the text based on the result polarity
function colorOfEmotion(num){
    const texts =document.getElementsByClassName("result");
    for(let i in texts){
    texts[i].style="color:grey";
    if(num>0){
        texts[i].style="color:green";
    }
    else if(num<0)  texts[i].style="color:red";
}
}

document.getElementById("result").addEventListener("click",clickEvent)