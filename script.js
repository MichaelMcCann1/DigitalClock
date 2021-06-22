function getTimeData() {
  let date = new Date();
  let time = {};
  time.year = date.getFullYear();
  time.month = date.getMonth();
  time.date = date.getDate();
  time.hours = date.getHours();
  time.minutes = date.getMinutes();
  time.seconds = date.getSeconds();

  let months = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
  time.month = months[time.month - 1];

  time.hours < 12 ? time.ampm = 'AM' : time.apmp = "PM";

  time.hours = time.hours % 12;

  return time
}

function serparateDigits(time, slot) {
  for (let i=0; i<3; i++) {

    let first, second;

    if (time[`${slot[i]}`] > 9) {
      first = time[`${slot[i]}`].toString()[0];
      second = time[`${slot[i]}`].toString()[1];
    } else {
      first = 0;
      second = time[`${slot[i]}`].toString()[0];
    }
  
    let numbers = ['zero','one','two','three','four','five','six','seven','eight','nine'];
  
    first = numbers[first];
    second = numbers[second];
  
    time[`${slot[i]}`] = [first, second];
  }

  return time
}

function clearColor(){
  let digitDivSelector = document.querySelectorAll('.digit div');
  digitDivSelector.forEach(node => node.style.background = black)
  let ampmSelector = document.querySelectorAll('.ampm > h1');
  ampmSelector.forEach(node => node.style.color = black)
}

function updateDigits(digits, slot){
  for (let i=0; i<2; i++) {
    let firstSecond;
    i === 0 ? firstSecond = 'first' : firstSecond = 'second';
      let digitSelector = document.querySelectorAll(`.${slot} .${firstSecond} .${digits[i]}`);
      digitSelector.forEach(node => node.style.background = red)
  }
}

function updateAMPM(ampm) {
  let ampmSelector = document.querySelectorAll('.ampm > h1');
  let number;
  ampm === 'AM' ? number = 0 : number =  1;
  ampmSelector[number].style.color = red
}

function updateDate(time){
  let month = document.querySelector('.month > h1');
  let day = document.querySelector('.day > h1');
  let year = document.querySelector('.year > h1');

  month.textContent = time.month;
  day.textContent = time.date;
  year.textContent = time.year;
}

//MAIN
let red = 'rgba(255, 25, 25, 0.7)';
let black = 'rgba(36, 36, 36, 0.5)';

setInterval(() => {
  let time = getTimeData();
  let digits = serparateDigits(time, ['hours','minutes','seconds']);

  clearColor();
  updateAMPM(digits.ampm);
  updateDigits(digits.hours, 'hour');
  updateDigits(digits.minutes, 'minute');
  updateDigits(digits.seconds, 'seconds');
  updateDate(time);
}, 1000);