const baseURL =   "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");  // selecting the select tag from dropdown
const btn = document.querySelector("form button");
const frmCurr = document.querySelector(".from select")
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for(let select of dropdowns){                                 // for each loop on dropdowns items
    for(currCode in countryList){   // accessing each country code from countryList
        let newOption = document.createElement("option");  // creating new option in select tag
        newOption.innerText = currCode;  // setting innerText of newly created option to currCode
        newOption.value = currCode;  // setting value attribute of select tag to currCode
        if(select.name === "from" && currCode === "USD"){  
            newOption.selected = "selected";  // selecting USD as default value in "from" dropdown
        }else if(select.name === "to" && currCode === "INR"){
            newOption.selected = "selected";  // selecting INR as default value in "to" dropdown
        }
        select.append(newOption); // creating new options for the select tag
    }
    select.addEventListener("change", (evt) => {  // if select value if changed then we'll call updateFlag
        updateFlag(evt.target);  // function to update the flag
        // console.log(evt.target); // here select tag will pass as argument 
    })
}

const updateFlag = (element) => {  // it will select tag as argument
    let currCode = element.value;  // currCode is accessing value attribute of option tag in select
    let countryCode = countryList[currCode];  // countryCode is country code present on "currCode"th index in FlagList
    let newSrc = `https://flagsapi.com/${countryCode}/shiny/64.png`; // updating src to newSrc by putting "countryCode" in the src path
    let img = element.parentElement.querySelector("img");  // selecting img tag from html file
    img.src = newSrc;  // updating src of img tag in html
};

btn.addEventListener("click", (event) => {
    event.preventDefault();
    updateExchangeRate();

});

const updateExchangeRate =  async () => {
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if(amtVal === "" || amtVal < 1){
        amtVal = 1;
        amtVal.value = "1";
    }
    // console.log(frmCurr.value.toLowerCase(), toCurr.value.toLowerCase());
    const URL = `${baseURL}/${frmCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[toCurr.value.toLowerCase()];

    let finalAmount = amtVal * rate;
    msg.innerText = `${amtVal} ${frmCurr.value} = ${finalAmount} ${toCurr.value}`;
    // console.log(rate);
}

window.addEventListener("load", () => {
    updateExchangeRate();
})