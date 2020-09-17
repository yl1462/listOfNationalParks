'use strict'

const apikey = 'cX0WvkKcEHNczztkteWQeQ03WyZe6tqtRA9HiMUr';
const searchURL = 'https://developer.nps.gov/api/v1/parks';

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const stateAbb = $('#stateAbb').val().split(',');
    const resultNumber = $('#resultNumber').val();
    const searchTerm = `${searchURL}?stateCode=${stateAbb}&limit=${resultNumber}&api_key=${apikey}`;
    getList(searchTerm);
  })
}

function getList(searchTerm) {
  fetch(searchTerm)
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return res.json().then(error => Promise.reject(error))
    })
    .then(resJson => showResults(resJson))
    .catch(error => {
      errorMessage(error)
    });
}

function showResults(resJson, resultNumber) {
  let html = '';
  for (let i = 0; i < resJson.data.length; i++) {
    html += `
    <li>
    <h3>${resJson.data[i].fullName}</h3>
    <p>${resJson.data[i].description}</p>
    <a href="${resJson.data[i].url}" target="_blank">${resJson.data[i].url}</a>
    <address>
    <p>${resJson.data[i].addresses[0].line1}</p>
    <p>${resJson.data[i].addresses[0].city}, ${resJson.data[i].addresses[0].stateCode} ${resJson.data[i].addresses[0].postalCode}</p>
    </address>
    </li>`
  }
  $('#results').html(
    html
  )
}

$(
  watchForm()
)
