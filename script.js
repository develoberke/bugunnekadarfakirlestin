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

    result.innerHTML += `<u>Geçen sene bu parayla ortalama:</u><br/>`
    result.innerHTML +=  `<li>${Math.floor(tlAmount / lastYearBagelPrice)} simit alabiliyordun, Bu yıl ortalama ${Math.floor(tlAmount / currentBagelPrice)} simit alabiliyorsun.</li>`
    result.innerHTML += ` <li>${Math.floor(tlAmount / lastYearTeaPrice)} bardak çay içebiliyordun, Bu yıl ortalama ${Math.floor(tlAmount / currentTeaPrice)} bardak çay içebiliyorsun.</li>`
  }
  