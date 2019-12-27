'use strict'
// stock price of microsoft on 2017-january-11 
// const actualURL = 
// 'https://api.worldtradingdata.com/api/v1/history_multi_single_day?symbol=msft&date=2017-01-11&api_token=P8gRk7VBaTFtWMr6tY5Q30Q3faTvzL46rG8q7xR2IU9ScxkmRWD1pJbwbmSj';

function formatURL(company, balance, initial, end) {
    const apiKey = 'P8gRk7VBaTFtWMr6tY5Q30Q3faTvzL46rG8q7xR2IU9ScxkmRWD1pJbwbmSj'; 
    const searchURL = 'https://api.worldtradingdata.com/api/v1/history_multi_single_day';
    let firstDate = initial.replace(/-/g, '');
    let secondDate = end.replace(/-/g, '');
    const beginning = firstDate.slice(0,4) + '-' + firstDate.slice(4,6) + '-' + firstDate.slice(6,8);
    const ending = secondDate.slice(0,4) + '-' + secondDate.slice(4,6) + '-' + secondDate.slice(6,8);
    const firstURL = searchURL + '?symbol=' + company + '&date=' + beginning + '&' + 'api_token=' + apiKey;
    const secondURL = searchURL + '?symbol=' + company + '&date=' + ending + '&' + 'api_token=' + apiKey;
    fetchCall(firstURL, secondURL, company, balance);
}

function fetchCall(firstURL, secondURL, company, balance) {
    fetch(firstURL)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(firstResponse => {
      fetch(secondURL)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.statusText);
      })
      .then(secondResponse => {
        console.log(firstResponse, secondResponse);
        displayResults(firstResponse, secondResponse, company, balance);
      })
    })
}

function displayResults(firstResponse, secondResponse, company, balance) {
    console.log(firstResponse, secondResponse);
    console.log(firstResponse.Message, secondResponse.Message);
    if (firstResponse.Message || secondResponse.Message) {
      alert('no data on that date');
    } else {
      let newCompany = company.toUpperCase();
      let firstStock = parseFloat(firstResponse.data[newCompany].close);
      let secondStock = parseFloat(secondResponse.data[newCompany].close);
      let shares = balance / firstStock; 
      let secondValue = (shares * secondStock).toFixed(2);
      $('.answer').html(`<p>$${secondValue}</p>`);
    }
    // let newCompany = company.toUpperCase();
    // let firstStock = parseFloat(firstResponse.data[newCompany].close);
    // let secondStock = parseFloat(secondResponse.data[newCompany].close);
    // let shares = balance / firstStock; 
    // let secondValue = (shares * secondStock).toFixed(2);
    // $('.answer').html(`<p>$${secondValue}</p>`);
}

function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        const company = $('#company-name').val();
        const balance = $('#initial-amount').val();
        const initial = $('#initial-date').val();
        const end = $('#end-date').val();
        formatURL(company, balance, initial, end);
    })
}

$(watchForm);
