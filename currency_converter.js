const apiUrl = 'https://api.exchangerate-api.com/v4/latest/USD';

const currencies = [
    'USD', 'EUR', 'JPY', 'GBP', 'AUD', 
    'CAD', 'CHF', 'CNY', 'HKD', 'NZD', 'INR'
];

let exchangeRates = {};

async function fetchExchangeRates() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        exchangeRates = data.rates;
        populateCurrencyDropdowns();
    } catch (error) {
        console.error('Error fetching exchange rates:', error);
        alert('Failed to fetch exchange rates. Please try again later.');
    }
}

function populateCurrencyDropdowns() {
    const fromCurrency = document.getElementById('from-currency');
    const toCurrency = document.getElementById('to-currency');

    currencies.forEach(currency => {
        const option1 = new Option(currency, currency);
        const option2 = new Option(currency, currency);
        fromCurrency.add(option1);
        toCurrency.add(option2);
    });

    // Set default values
    fromCurrency.value = 'USD';
    toCurrency.value = 'EUR';
}

function convertCurrency() {
    const amount = parseFloat(document.getElementById('amount').value);
    const fromCurrency = document.getElementById('from-currency').value;
    const toCurrency = document.getElementById('to-currency').value;
    const resultInput = document.getElementById('result');

    if (isNaN(amount)) {
        alert('Please enter a valid number');
        return;
    }

    const fromRate = exchangeRates[fromCurrency];
    const toRate = exchangeRates[toCurrency];

    if (!fromRate || !toRate) {
        alert('Unable to convert. Please try again.');
        return;
    }

    const convertedAmount = (amount / fromRate) * toRate;
    resultInput.value = `${convertedAmount.toFixed(2)} ${toCurrency}`;
}

// Fetch exchange rates when the page loads
fetchExchangeRates();