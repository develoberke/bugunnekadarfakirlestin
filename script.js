function calculate() {
    var tlAmount = parseFloat(document.getElementById("tlAmount").value);

    var annualInflationRate = 72.31;
    var dailyInflationRate = annualInflationRate / 365;
    var dollarExchangeRate = 20.40;
  
    // Hesaplamaları yap
    var dailyLostValue = (tlAmount * dailyInflationRate) / 100;
    var dailyLostDollarValue = dailyLostValue / dollarExchangeRate;

    var lastYearBagelPrice = 3.5;
    var currentBagelPrice = 7;

    var lastYearTeaPrice = 4;
    var currentTeaPrice = 8;
  
    // Sonuçları göster
    var result = document.getElementById("result");
    result.innerHTML = "";
    result.innerHTML += `<p> Bugün ${dailyLostValue.toFixed(2)} TL fakirleştin,<br/>Bu kafayla gidersen ayda ${(dailyLostValue * 30).toFixed(2)} TL, yılda ${(dailyLostValue * 365).toFixed(2)} TL fakirleşeceksin.</p>`

    var compareList = document.getElementById("compareList")
    compareList.style.display = "block"

    var teaText = document.getElementById("teaText")
    var bagelText = document.getElementById("bagelText")

    teaText.innerHTML = `Geçen Yıl Ortalama: ${Math.floor(tlAmount / lastYearTeaPrice)} bardak<br/>Bu Yıl Ortalama: ${Math.floor(tlAmount / currentTeaPrice)} bardak<br/>`
    bagelText.innerHTML = `Geçen Yıl Ortalama: ${Math.floor(tlAmount / lastYearBagelPrice)} adet<br/>Bu Yıl Ortalama: ${Math.floor(tlAmount / currentBagelPrice)} adet<br/>`
  }
  