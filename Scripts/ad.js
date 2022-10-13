let data;
let inputNext = document.querySelectorAll(".model input");
function handleform(e){
    e.preventDefault()
    let form = document.querySelector("form")
    let brand=form.Brand.value;
    let type=form.Type.value;
    let year = form.Year_of_purchase.value;
    let kms= form.km.value;
    let Description = form.Description.value;
    let Price = form.Price.value;
     data={brand,type,year,kms,Description,Price}

    document.querySelector(".model_main").style.display="block";
    inputNext[0].focus();
}

function postData(){
    fetch("https://floating-crag-24295.herokuapp.com/cars",{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify(data)
    })
    .then((res)=> res.json())
    .then((res)=>{
        window.location.reload()
        console.log(res)
    })
    .catch((err)=> console.log(err))
}


function otpSubmit(){
    let i1= document.querySelector("#input_1").value;
    let i2= document.querySelector("#input_2").value;
    let i3= document.querySelector("#input_3").value;
    let i4= document.querySelector("#input_4").value;

    let otp=i1+i2+i3+i4;
    if(otp=="1234"){
        alert("otp submitted Successfully")
        for(let i=0;i<inputNext.length;i++){
            inputNext[i].style.border="2px solid green"
        }
        postData()
    }
    else{
        alert("Wrong otp")
        for(let i=0;i<inputNext.length;i++){
            inputNext[i].style.border="2px solid red"
        }
        inputNext[3].focus()
    }
}

let i=0;
for(let i=0;i<inputNext.length;i++){
    inputNext[i].addEventListener("keydown",handleAllotp)
}

function handleAllotp(e){
    //console.log(e.keyCode)
    if(e.keyCode !== 8){
        inputNext[i++].focus()
    } else{
        inputNext[--i].focus()
    }
    //console.log(e.path[0],"work")
}

