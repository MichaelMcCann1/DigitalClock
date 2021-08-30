# DigitalClock

I created a clock that is styled like an old digital clock you might find on a nightstand. The clock shows the current time and the date. This project was created using vanilla JavaScript and has a responsive design.

The numbers for the time are not from a font. Each line segment in a digit is a div element and the correct elements are changed to a red color for the appropriate number. The other numbers are given a gray color. This effect creates the appearance of what a number would look like on a real digital clock.

<img src="https://github.com/MichaelMcCann1/DigitalClock/blob/main/DigitalClockScreenshot.png" height="300px">


# Code Explanation

It is important to understand the HTML for a single digit on the clock. Each digit is comprised of seven different line segments. To show a number on the clock the correct line segments must be colored red. For example, to create the number 0 on the clock we need every line segment except the middle to be red. Each div has a class that describes which line segment it is in the digit. Each line segment also has a class name of every number that requires that particular line. For the number 0, you will see that every div has a class of "zero" except for the div that has a class of "middle". 

```html
<div class="digit">
  <div class="top zero two three five six seven eight nine"></div>
  <div class="topRight zero one two three four seven eight nine"></div>
  <div class="bottomRight zero one three four five six seven eight nine"></div>
  <div class="bottomLeft zero two six eight"></div>
  <div class="topLeft zero four five six eight nine"></div>
  <div class="middle two three four five six eight nine"></div>
  <div class="bottom two zero three five six eight"></div>
</div>
```

## JavaScript

The app works by running the following functions repeatedly every 200ms. These functions are repeated every 200ms instead of every second to make the clock more accurate with the actual time. If you refresh the page when the interval is set to repeat every 1000ms, you could potentially almost be an entire second behind the actual time. With an interval of 200ms the clock is at least accurate to within a fifth of second. 

``` javascript
setInterval(() => {
  getTimeData();
  createWordArray()
  clearColor();
  displayTime();
  displayAMPM();
  displayDate();
}, 200);
```

### getTimeData()

This function is responsible for getting the data needed to display the time. It makes use of the `Date` object. 

``` javascript
let date = new Date();
time = {
  year: date.getFullYear(),
  month: date.getMonth(),
  date: date.getDate(),
  hours: date.getHours(),
  minutes: date.getMinutes(),
  seconds: date.getSeconds()
};
```

The only complication with this data is the hours variable. For instance if it is 12:04 AM then `date.getHours()` will return 0. We want to make sure the clock shows a 12 in this case and not 0. Also if it is any time after 12:00 PM the value returned will be greater than 12. So we need to subtract 12 from these values to make sure the clock doesn't display a time that is greater than 12. The following lines of code will fix this issue. 

``` javascript
if (time.hours === 0) time.hours = 12;
if (time.hours !== 12) time.hours = time.hours % 12;
```


### createWordArray()

This function takes the time data and produces what I call a "word array". For example if the current time is 4:23:03, this function will return `[zero, four, two, three, zero, three]`. This array is the word form of each number in the current time. The word form of each number is needed to select the appropriate class of each line segment in a digit as shown in the HTML above.

First the numbers are padded with zero if necessary. In the previous example a zero was padded before the four in the word array. The numbers are then converted to the word form.

``` javascript
let numbers = ['zero','one','two','three','four','five','six','seven','eight','nine'];
for (let i=0; i<numberString.length; i++){
  wordArray.push(numbers[numberString[i]])
  }
```


### Displaying the Data

Next all of the line segments are colored gray using the `clearColor()` function. Then the correct line segments are colored red using the `displayTime()` function. This function works by first looping through each digit in the clock. The digits are selected by using `let digitSelector = document.querySelectorAll('.digit')`. Inside each digit all the line segemets that need to be colored are selected by their class name ``let digitDiv = digit.getElementsByClassName(`${time.wordArray[i]}`)``. This returns an html collection. This collection is then converted to an Array so we can perform Array operations on it. Then the background color of each element in the array is changed to red. 

``` javascript
function displayTime(){
  let digitSelector = document.querySelectorAll('.digit')
  for (let i=0; i<time.wordArray.length; i++){
    let digit = digitSelector[i]
    let digitDiv = digit.getElementsByClassName(`${time.wordArray[i]}`)
    digitDiv = Array.from(digitDiv);
    digitDiv.forEach(node => node.style.background = red)
  }
}
```

Finally the correct ending (AM or PM) is colored in and the date is displayed at the top.

To make the webpage responsive to any size device the font-size and the size of the line segments get smaller as the width of the page decreases.
