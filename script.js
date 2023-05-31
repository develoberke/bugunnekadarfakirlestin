function calculate() {
    var tlAmount = parseFloat(document.getElementById("tlAmount").value);
    var annualInflationRate = 72.31;
    var dailyInflationRate = annualInflationRate / 365;
    var dailyLostValue = (tlAmount * dailyInflationRate) / 100;

    var result = document.getElementById("result");
    result.innerHTML = "";
    result.innerHTML += `<div><p class="resultText">Bugün ${dailyLostValue.toFixed(2)} TL fakirleştin</p><br/>Bu kafayla gidersen ayda ${(dailyLostValue * 30).toFixed(2)} TL, yılda ${(dailyLostValue * 365).toFixed(2)} TL fakirleşeceksin.<br/></div>`


    var today = new Date();
    var lastYearTodayDate = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());

    const http = new XMLHttpRequest()
    http.open("GET", `https://api.freecurrencyapi.com/v1/historical?apikey=yTsLyX9C1EHf6qIFv8I5AOdxAaKMCACYuWglMhJw&date_from=${lastYearTodayDate.toLocaleDateString("en-CA")}
    &date_to=${lastYearTodayDate.toLocaleDateString("en-CA")}&currencies=TRY`)
    http.send()

    http.onload = () => {
      var lastYearDollarExchangeRate = JSON.parse(http.responseText).data[lastYearTodayDate.toLocaleDateString("en-CA")].TRY
      const http2 = new XMLHttpRequest()
      http2.open("GET", "https://api.freecurrencyapi.com/v1/latest?apikey=yTsLyX9C1EHf6qIFv8I5AOdxAaKMCACYuWglMhJw&currencies=TRY")
      http2.send()

      http2.onload = () => {
      var dollarExchangeRate = JSON.parse(http2.responseText).data.TRY;
      var dailyLostDollarValue = dailyLostValue / dollarExchangeRate;

      var dollarText = document.getElementById("dollarText")
      dollarText.innerHTML = `Geçen Yıl Ortalama: ${Math.floor(tlAmount / lastYearDollarExchangeRate)} dolar<br/>Bu Yıl Ortalama: ${Math.floor(tlAmount / dollarExchangeRate)} dolar<br/>`
      
      var compareList = document.getElementById("compareList")
      compareList.style.display = "block"
    }

  }



  var lastYearBagelPrice = 3.5;
  var currentBagelPrice = 7;

  var lastYearTeaPrice = 4.2; 
  var currentTeaPrice = 7.5;

  var teaText = document.getElementById("teaText")
  var bagelText = document.getElementById("bagelText")

  teaText.innerHTML = `Geçen Yıl Ortalama: ${Math.floor(tlAmount / lastYearTeaPrice)} bardak<br/>Bu Yıl Ortalama: ${Math.floor(tlAmount / currentTeaPrice)} bardak<br/>`
  bagelText.innerHTML = `Geçen Yıl Ortalama: ${Math.floor(tlAmount / lastYearBagelPrice)} adet<br/>Bu Yıl Ortalama: ${Math.floor(tlAmount / currentBagelPrice)} adet<br/>`
}
  