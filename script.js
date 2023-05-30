function calculate() {
    var tlAmount = parseFloat(document.getElementById("tlAmount").value);

    var annualInflationRate = 72.31;
    var dailyInflationRate = annualInflationRate / 365;
    var dollarExchangeRate = 20.40;
  
    // Hesaplamaları yap
    var dailyLostValue = (tlAmount * dailyInflationRate) / 100;
    var dailyLostDollarValue = dailyLostValue / dollarExchangeRate;
  
    // Sonuçları göster
    var result = document.getElementById("result");
    result.innerHTML = `Bugün ${dailyLostValue.toFixed(2)} TL fakirleştin, Ayda: ${(dailyLostValue * 30).toFixed(2)} TL, Yılda ${(dailyLostValue * 365).toFixed(2)} TL fakirleşeceksin`
  }
  