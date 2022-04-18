const vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

function getTimeData() {
  const date = new Date();
  const time = {
    year: date.getFullYear(),
    month: date.getMonth(),
    date: date.getDate(),
    hours: date.getHours(),
    minutes: date.getMinutes(),
    seconds: date.getSeconds()
  };

  const months = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
  time.month = months[time.month];

  time.hours < 12 ? time.ampm = 'AM' : time.ampm = "PM";
  if (time.hours === 0) time.hours = 12;
  if (time.hours !== 12) time.hours = time.hours % 12;

  return time
}

function createWordArray(time){
  if (time.hours <= 9) time.hours = `0${time.hours}`
  if (time.minutes <= 9) time.minutes = `0${time.minutes}`
  if (time.seconds <= 9) time.seconds = `0${time.seconds}`

  time.hours = time.hours.toString()
  time.minutes = time.minutes.toString()
  time.seconds = time.seconds.toString()

  const numberString = (time.hours + time.minutes + time.seconds)
  const wordArray = []
  const numbers = ['zero','one','two','three','four','five','six','seven','eight','nine'];

  for (let i=0; i<numberString.length; i++){
    wordArray.push(numbers[numberString[i]])
  }

  return wordArray
}

function clearColor(){
  const digitDivSelector = document.querySelectorAll('.digit > div');
  const ampmSelector = document.querySelectorAll('.ampm > h1');

  digitDivSelector.forEach(d => d.style.background = grayColorCode)
  ampmSelector.forEach(d => d.style.color = grayColorCode)
}

function displayTime(wordArray){
  const digitSelector = document.querySelectorAll('.digit')
  for (let i=0; i<wordArray.length; i++){
    const digit = digitSelector[i]
    const digitDiv = Array.from(digit.getElementsByClassName(`${wordArray[i]}`))
    digitDiv.forEach(node => node.style.background = redColorCode)
  }
}

function displayAMPM(time) {
  const AM = document.querySelector('.AM')
  const PM = document.querySelector('.PM')
  time.ampm === 'AM' ? AM.style.color = redColorCode : PM.style.color = redColorCode;
}

function displayDate(time){
  const month = document.querySelector('.month > p');
  const day = document.querySelector('.day > p');
  const year = document.querySelector('.year > p');

  month.textContent = time.month;
  day.textContent = time.date;
  year.textContent = time.year;
}


//MAIN

let redColorCode;
let grayColorCode;
let time;

window.onload = () => {
  redColorCode = getComputedStyle(document.documentElement).getPropertyValue('--red')
  grayColorCode = getComputedStyle(document.documentElement).getPropertyValue('--gray')
}

setInterval(() => {
  const timeInfo = getTimeData();
  const wordArray = createWordArray(timeInfo)
  clearColor();
  displayTime(wordArray);
  displayAMPM(timeInfo);
  displayDate(timeInfo);
}, 1000);