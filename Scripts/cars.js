var allData=[]
let container = document.querySelector(".container")

function fetchData(){
    container.innerText = "isLoading"
    fetch(`https://floating-crag-24295.herokuapp.com/cars`)
    .then((res)=>res.json())
    .then((res)=>{
        allData=res;
        displayData(res)
        console.log(res)
    })
    .catch((err)=>{
        container.innerText="isError"
        console.log(err)
    })
}

fetchData()

function displayData(allData){
    container.innerText=null;
    if(allData?.length==0){
        return (container.innerText="No data Available")
    }
    allData.map((el)=>{
        
        let masterBox = document.createElement("div");
        let mainBox = document.createElement("div")

        let Description=document.createElement("p")
        Description.innerText="Description:" + el.Description;
        Description.setAttribute("class","borderFont")

        let Price = document.createElement("h2")
        Price.innerText = "Price: ₹" + el.Price
        Price.setAttribute("class","price")

        let brand = document.createElement("p")
        brand.innerText="Brand :" + el.brand;
         
        let id=document.createElement("p")
        id.innerText=el.id;

        let kms= document.createElement("p")
         kms.innerText="KMS :" + el.kms;
         kms.setAttribute("class","kms")

        let type= document.createElement("p")
        type.innerText="Type :"+ el.type;

        let year = document.createElement("p")
        year.innerText="Year :" + el.year;

        let img= document.createElement("img")
        img.src="https://imgd-ct.aeplcdn.com/370x208/n/cw/ec/106257/venue-exterior-right-front-three-quarter-2.jpeg?isig=0&q=75";
        
        let buttonBox = document.createElement("div")
        buttonBox.setAttribute("class","icon_box")

        let buttonDelete= document.createElement("i")
        buttonDelete.setAttribute("class","fa-solid fa-trash")
        buttonDelete.addEventListener("click",()=>{
            deleteData(el)
        });

        let buttonEdit = document.createElement("i")
        buttonEdit.setAttribute("class","fa-solid fa-pen-to-square");
        buttonEdit.addEventListener("click",()=>{
            Price.setAttribute("contenteditable",true);
            Price.focus()
            Price.addEventListener("keydown",(e)=>{
                if(e.keyCode==13){
                    Price.setAttribute("contenteditable",true)
                    let newPrice=Price.innerText;
                    EditData(el,newPrice)
                }
            })
        })

        let buttonWishlist = document.createElement("i")
        buttonWishlist.setAttribute("class","fa-solid fa-heart");
        buttonWishlist.addEventListener("click",()=>{
            addWishlistData(el)
        })

        buttonBox.append(buttonDelete,buttonEdit,buttonWishlist)
        mainBox.append(Description,type,brand,kms,year,Price,buttonBox)
        masterBox.append(img,mainBox)
        container.append(masterBox)
    })
}

 function deleteData(el){
    let id=el.id;
    fetch(`https://floating-crag-24295.herokuapp.com/cars/${id}`,{
        method:"DELETE",
        headers:{
            "Content-Type":"application/json"
        },
    }).then((res)=>res.json())
    .then((res)=>{
        console.log(res)
        fetchData()
    }).
    catch((err)=> console.log(err))
 }

 function addWishlistData(el){
    fetch("https://floating-crag-24295.herokuapp.com/wishlisted_cars",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(el)
    })
    .then((res)=>res.json())
    .then((res)=>{
        console.log(res)
        alert("Item Added Wishlist")
    })
    .catch((err)=>{
        console.log(err)
        alert("Item is already added in Wishlist")
    })
 }

 function EditData(el,newPrice){
    let id=el.id;
    let Price = "";
    for(let i=0;i<newPrice.length;i++){
        if(newPrice[i] !=="₹" && newPrice[i] !== ","){
            Price += newPrice[i]
        }
    }
    let data={
        Price,
    }
    fetch(`https://floating-crag-24295.herokuapp.com/cars/${id}`,{
        method:"PATCH",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify(data)
    })
    .then((res)=> res.json())
    .then((res)=>{
        console.log(res)
        fetchData()
    })
    .catch((err)=>{
        console.log(err)
    });
 }

 function SortByPrice(e){
    e.preventDefault()
    let SortByPrice=document.querySelector("#sort")
    let value = SortByPrice.value;
    if(value !== "htl"){
        allData.sort((a,b)=> a.Price-b.Price)
    } else{
        allData.sort((a,b)=>b.Price-a.Price)
    }
    displayData(allData)
 }

 function SortByKms(e){
    e.preventDefault()
    let SortByKms=document.querySelector("#SortKms")
    let value = SortByKms.value;
    if(value!=="htl"){
        allData.sort((a,b)=>a.kms-b.kms)
    } else{
        allData.sort((a,b)=>b.kms-a.kms)
    }
    displayData(allData)
 }

 function filterByBrand(e){
    e.preventDefault()
    let SortByBrand = document.querySelector("#brand")
    let value = SortByBrand.value;
    console.log(value);
    let filterData=allData.filter((el)=>{
        return el.brand.toLowerCase() == value.toLowerCase()
    })
    displayData(filterData)
 }