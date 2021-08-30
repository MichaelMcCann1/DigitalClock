function getTimeData() {
  let date = new Date();
  time = {
    year: date.getFullYear(),
    month: date.getMonth(),
    date: date.getDate(),
    hours: date.getHours(),
    minutes: date.getMinutes(),
    seconds: date.getSeconds()
  };

  let months = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
  time.month = months[time.month];

  time.hours < 12 ? time.ampm = 'AM' : time.ampm = "PM";
  if (time.hours === 0) time.hours = 12;
  if (time.hours !== 12) time.hours = time.hours % 12;
}

function createWordArray(){
  if (time.hours <= 9) time.hours = `0${time.hours}`
  if (time.minutes <= 9) time.minutes = `0${time.minutes}`
  if (time.seconds <= 9) time.seconds = `0${time.seconds}`

  time.hours = time.hours.toString()
  time.minutes = time.minutes.toString()
  time.seconds = time.seconds.toString()

  let numberString = (time.hours + time.minutes + time.seconds)
  let wordArray = []
  let numbers = ['zero','one','two','three','four','five','six','seven','eight','nine'];

  for (let i=0; i<numberString.length; i++){
    wordArray.push(numbers[numberString[i]])
  }

  time.wordArray = wordArray
}

function clearColor(){
  const digitDivSelector = document.querySelectorAll('.digit > div');
  const ampmSelector = document.querySelectorAll('.ampm > h1');

  digitDivSelector.forEach(node => node.style.background = gray)
  ampmSelector.forEach(node => node.style.color = gray)
}

function displayTime(){
  let digitSelector = document.querySelectorAll('.digit')
  for (let i=0; i<time.wordArray.length; i++){
    let digit = digitSelector[i]
    let digitDiv = digit.getElementsByClassName(`${time.wordArray[i]}`)
    digitDiv = Array.from(digitDiv);
    digitDiv.forEach(node => node.style.background = red)
  }
}

function displayAMPM() {
  const AM = document.querySelector('.AM')
  const PM = document.querySelector('.PM')
  time.ampm === 'AM' ? AM.style.color = red : PM.style.color = red;
}

function displayDate(){
  const month = document.querySelector('.month > h1');
  const day = document.querySelector('.day > h1');
  const year = document.querySelector('.year > h1');

  month.textContent = time.month;
  day.textContent = time.date;
  year.textContent = time.year;
}


//MAIN

let red;
let gray;
let time;

window.onload = () => {
  red = getComputedStyle(document.documentElement).getPropertyValue('--red')
  gray = getComputedStyle(document.documentElement).getPropertyValue('--gray')
}

setInterval(() => {
  getTimeData();
  createWordArray()
  clearColor();
  displayTime();
  displayAMPM();
  displayDate();
}, 1000);