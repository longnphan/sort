const bubbleBtn = document.querySelector(".bubble-btn");
const selectionBtn = document.querySelector(".selection-btn");
const insertionBtn = document.querySelector(".insertion-btn");
const resetBtn = document.querySelector(".reset-btn");
let numOfSwaps = document.querySelector(".swap-text");
let swaps = 0;

// Generate array
const arr = [];
let value = 5;
for (let i = 0; i < 29; i++) {
  arr.push(value);
  value += 25;
}

//shuffles the array elements using the Fisher-Yates shuffle
function shuffle(array) {
  let currentIndex = array.length, tempValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    tempValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = tempValue;
  }
  return array;
}

//Generate canvas drawing
function draw(array, color) {
  let ctx = canvas.getContext("2d");
  let width = 23;
  let x = 4;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < array.length; i++) {
    if (i === color) {
      ctx.fillStyle = "red";
    } else {
      ctx.fillStyle = "white";
    }
    let barHeight = array[i];
    ctx.font = "12px serif";
    ctx.fillText(array[i], x, canvas.height - (barHeight + 8));
    ctx.fillRect(x, canvas.height - (barHeight + 2), width, barHeight);
    x += width + 2;
  }
}

//Sorting Algorithm
function sortingAlgorithm(sortMethod, time) {
  //Disables buttons from being press while sorting algorithm is running
  disableButtons(time);
  //Displays new shuffled array on canvas
  reset();

  //Animates the Sorting Algorithm swaps
  function animate() {
    requestAnimationFrame(animate);
    sortMethod.next();
  }
  animate(arr);
}

//Generator function for Bubble Sort Algorithm
function* bubbleSort(array) {
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      if (array[j] > array[j + 1]) {
        let temp = array[j + 1];
        array[j + 1] = array[j];
        array[j] = temp;

        //Update swap counter
        swaps++;
        numOfSwaps.innerHTML = `Swaps: ${swaps}`;
        draw(array, j);
        yield j;
      }
    }
  }
}

//Generator function for Select Sort Algorithm
function* selectSort(array) {
  for (i = 0; i < array.length; i++) {
    let min = i;
    for (j = i + 1; j < array.length; j++) {
      if (array[j] < array[min]) {
        min = j;
      }
    }
    if (min !== i) {
      //Swap elements
      let temp = array[i];
      array[i] = array[min];
      array[min] = temp;

      //Update swap counter
      swaps++;
      numOfSwaps.innerHTML = `Swaps: ${swaps}`;

      draw(array, min);
      yield min;
    }
  }
}

//Generator function for Insertion Sort Algorithm
function* insertionSort(array) {
  for (let i = 1; i < array.length; i++) {
    let temp = array[i];
    let j = i - 1;
    while (j >= 0 && array[j] > temp) {
      array[j + 1] = array[j];
      j = j - 1;
    }
    array[j + 1] = temp;

    //Update swap counter
    swaps++;
    numOfSwaps.innerHTML = `Swaps: ${swaps}`;

    draw(array, j);
    yield j;
  }
  return array;
}

//Disable buttons while sorting is in progress
function disableButtons(time) {
  //Disables buttons when button is pressed
  insertionBtn.disabled = true;
  selectionBtn.disabled = true;
  bubbleBtn.disabled = true;
  resetBtn.disabled = true;
  //Enables buttons to be pressed
  setTimeout(function(){insertionBtn.removeAttribute("disabled")}, time);
  setTimeout(function(){selectionBtn.removeAttribute("disabled")}, time);
  setTimeout(function(){bubbleBtn.removeAttribute("disabled")}, time);
  setTimeout(function(){resetBtn.removeAttribute("disabled")}, time);
}

//Reset Array
function reset() {
  swaps = 0;
  numOfSwaps.innerHTML = `Swaps: ${swaps}`;
  shuffle(arr);
  draw(arr, 0);
}

//Loads canvas with shuffled array
window.onload = () => {
  canvas = document.querySelector("#myCanvas");
  shuffle(arr);
  draw(arr, 0);
}
