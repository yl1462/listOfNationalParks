'use strict'

const apikey = 'cX0WvkKcEHNczztkteWQeQ03WyZe6tqtRA9HiMUr';
const searchURL = 'https://developer.nps.gov/api/v1/parks';

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    console.log("watchForm running");
    
  })