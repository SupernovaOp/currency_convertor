const api_key = "FRrDYEVcDKsG9Tiv3tpFWhiTzHzMjf"
const BASE_URL ="https://www.amdoren.com/api/currency.php"


const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");


//Populating the dropdwons with the values in countryList object
for (let select of dropdowns) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "INR") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "USD") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }
};

//Update Flag for from dropdown
const img1 = document.querySelector('.from img');
fromCurr.addEventListener('change', () => {
  const currCode = fromCurr.value;
  const country = countryList[currCode];
  img1.src = `https://www.flagsapi.com/${country}/flat/64.png`;
});

//Update Flag for to dropdown
const img2 = document.querySelector('.to img');
toCurr.addEventListener('change', () => {
  const currCode = toCurr.value;
  const country = countryList[currCode];
  img2.src = `https://www.flagsapi.com/${country}/flat/64.png`;
});

// Getting the amount that needs to be converted
btn.addEventListener('click',async (e) => {
  e.preventDefault();
 var amount = document.querySelector('.amount input').value;
 
 if(amount === '' || amount<0){
  amount= 1;
  amount.value = 1;
 }
 const URL = `${BASE_URL}?api_key=${api_key}&from=${fromCurr.value}&to=${toCurr.value}&amount=${amount}`;
 try
 {
  ( async()=>{
  const response = await fetch(URL);
  if(!response.ok){
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  msg.textContent = `${amount} ${fromCurr.value} = ${data.amount} ${toCurr.value}`;
})();
 }
 catch(error){
  msg.textContent = "An error occurred while fetching data";
  console.error("Error:", error);
 }

});

 //Configuring the URL based on requirements
 





