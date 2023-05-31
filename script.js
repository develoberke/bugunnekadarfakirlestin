function calculate() {
    const http = new XMLHttpRequest()
    http.open("GET", "https://api.freecurrencyapi.com/v1/latest?apikey=yTsLyX9C1EHf6qIFv8I5AOdxAaKMCACYuWglMhJw&currencies=TRY")
    http.send()
    http.onload = () => {
    var tlAmount = parseFloat(document.getElementById("tlAmount").value);
    var annualInflationRate = 72.31;
    var dailyInflationRate = annualInflationRate / 365;
    // Hesaplamaları yap
    var dailyLostValue = (tlAmount * dailyInflationRate) / 100;
    var dailyLostDollarValue = dailyLostValue / dollarExchangeRate;
    var dollarExchangeRate = JSON.parse(http.responseText).data.TRY;
    var lastYearBagelPrice = 3.5;
    var currentBagelPrice = 7;

    var lastYearTeaPrice = 4;
    var currentTeaPrice = 8;
  
    // Sonuçları göster
    var result = document.getElementById("result");
    result.innerHTML = "";
    result.innerHTML += `<p> Bugün ${dailyLostValue.toFixed(2)} TL fakirleştin,<br/>Bu kafayla gidersen ayda ${(dailyLostValue * 30).toFixed(2)} TL, yılda ${(dailyLostValue * 365).toFixed(2)} TL fakirleşeceksin.</p>`
    result.innerHTML += `<p>Dolar kuru saatlik güncellenir: ${dollarExchangeRate} </p>`
    result.innerHTML += `<p>Elindeki para suan ${Math.floor(tlAmount / dollarExchangeRate)} dolar ediyor</p>`

    var compareList = document.getElementById("compareList")
    compareList.style.display = "block"

    var teaText = document.getElementById("teaText")
    var bagelText = document.getElementById("bagelText")

    teaText.innerHTML = `Geçen Yıl Ortalama: ${Math.floor(tlAmount / lastYearTeaPrice)} bardak<br/>Bu Yıl Ortalama: ${Math.floor(tlAmount / currentTeaPrice)} bardak<br/>`
    bagelText.innerHTML = `Geçen Yıl Ortalama: ${Math.floor(tlAmount / lastYearBagelPrice)} adet<br/>Bu Yıl Ortalama: ${Math.floor(tlAmount / currentBagelPrice)} adet<br/>`
  }}
  