async function calculate() {
    var result_loading = document.getElementById("result-loading");
    var result = document.getElementById("result");
    var compareList = document.getElementById("compareList")

    result.style.display = "none";
    compareList.style.display = "none";
    result_loading.style.display = "flex";

    var tlAmount = parseFloat(document.getElementById("tlAmount").value);
    var todayDate = new Date();
    var lastYearTodayDate = new Date(todayDate.getFullYear() - 1, todayDate.getMonth(), todayDate.getDate());

    const annualInflationRate = await getInflationRate()
    var lastYearDollarExchangeRate = await getLastYearDollarExchangeRate(lastYearTodayDate);
    var dollarExchangeRate = await getCurrentYearDollarExchangeRate(todayDate);
    result_loading.style.display = "none";
    compareList.style.display = "block"
    result.style.display = "block"


    var dailyInflationRate = annualInflationRate / 365;
    var dailyLostValue = (tlAmount * dailyInflationRate) / 100;

   
    result.innerHTML = "";
    result.innerHTML += `<div><p class="resultText">Bugün ${dailyLostValue.toFixed(2)} TL fakirleştin</p><br/>Bu kafayla gidersen ayda ${(dailyLostValue * 30).toFixed(2)} TL, yılda ${(dailyLostValue * 365).toFixed(2)} TL fakirleşeceksin.<br/></div>`


  

    var dollarText = document.getElementById("dollarText")
    dollarText.innerHTML = `Geçen Yıl Ortalama: ${Math.floor(tlAmount / lastYearDollarExchangeRate)} dolar<br/>Bu Yıl Ortalama: ${Math.floor(tlAmount / dollarExchangeRate)} dolar<br/>`


    var lastYearBagelPrice = 3.5;
    var currentBagelPrice = 7;

    var lastYearTeaPrice = 4.2; 
    var currentTeaPrice = 7.5;

    var teaText = document.getElementById("teaText")
    var bagelText = document.getElementById("bagelText")

    teaText.innerHTML = `Geçen Yıl Ortalama: ${Math.floor(tlAmount / lastYearTeaPrice)} bardak çay<br/>Bu Yıl Ortalama: ${Math.floor(tlAmount / currentTeaPrice)} bardak çay<br/>`
    bagelText.innerHTML = `Geçen Yıl Ortalama: ${Math.floor(tlAmount / lastYearBagelPrice)} adet simit<br/>Bu Yıl Ortalama: ${Math.floor(tlAmount / currentBagelPrice)} adet simit<br/>`
  
}

async function getInflationRate() {
  try {
    const response = await fetch("https://api.api-ninjas.com/v1/inflation?country=Turkey", {
      method: "GET",
      contentType: 'application/json',
      headers: {
        'X-Api-Key': '4Mefm5naMZkr+rAVYiaPcA==MqsdPZpJpifU6M2r'
      },
    });

    if (!response.ok) {
      throw new Error('API request failed');
    }

    const data = await response.json();
    return data[0].yearly_rate_pct;
  } catch (error) {
    console.error('An error occurred:', error);
    return null;
  }
    /*
    https://api.api-ninjas.com/v1/inflation?country=Turkey
    headers: { 'X-Api-Key': '4Mefm5naMZkr+rAVYiaPcA==MqsdPZpJpifU6M2r'},
  

    [
      {
        "country": "Turkey",
        "type": "CPI",
        "period": "april 2023",
        "monthly_rate_pct": 2.386,
        "yearly_rate_pct": 43.684
      }
    ]
  */
}

async function getLastYearDollarExchangeRate(lastYearTodayDate) {
  try {
    const response = await fetch(`https://api.freecurrencyapi.com/v1/historical?apikey=yTsLyX9C1EHf6qIFv8I5AOdxAaKMCACYuWglMhJw&date_from=${lastYearTodayDate.toLocaleDateString("en-CA")}
    &date_to=${lastYearTodayDate.toLocaleDateString("en-CA")}&currencies=TRY`);

    if (!response.ok) {
      throw new Error('API request failed');
    }

    const data = await response.json();
    return data.data[lastYearTodayDate.toLocaleDateString("en-CA")].TRY;
  } catch (error) {
    console.error('An error occurred:', error);
    return null;
  }
}

async function getCurrentYearDollarExchangeRate(todayDate) {
  try {
    const response = await fetch("https://api.freecurrencyapi.com/v1/latest?apikey=yTsLyX9C1EHf6qIFv8I5AOdxAaKMCACYuWglMhJw&currencies=TRY");

    if (!response.ok) {
      throw new Error('API request failed');
    }

    const data = await response.json();
    return data.data.TRY;
  } catch (error) {
    console.error('An error occurred:', error);
    return null;
  }
}