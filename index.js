const bubbleBtn = document.querySelector(".bubble-btn");
const selectionBtn = document.querySelector(".selection-btn");
const insertionBtn = document.querySelector(".insertion-btn");
const resetBtn = document.querySelector(".reset-btn");
let numOfSwaps = document.querySelector(".swap-text");
let swaps = 0;

//Button event listeners
bubbleBtn.addEventListener("click", bubble);
selectionBtn.addEventListener("click", selection);
insertionBtn.addEventListener("click", insertion);
resetBtn.addEventListener("click", reset);

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

//Initial canvas drawing
window.onload = () => {
  canvas = document.querySelector("#myCanvas");
  shuffle(arr);
  draw(arr, 0);
}


//Insertion Sort Algorithm
function insertion() {
  disableButtons(700);
  reset();
  let sortMethod = insertionSort(arr);

  function animate() {
    requestAnimationFrame(animate);
    sortMethod.next();
  }
  animate(arr);
}
//Generator function for Insertion Sort
function* insertionSort(array) {
  for (let i = 1; i < array.length; i++) {
    let temp = array[i];
    let j = i - 1;
    while (j >= 0 && array[j] > temp) {
      array[j + 1] = array[j];
      j = j - 1;
    }
    array[j + 1] = temp;

    swaps++;
    numOfSwaps.innerHTML = `Swaps: ${swaps}`;

    draw(array, j);
    yield j;
  }
  return array;
}

//Selection Sort
function selection() {
  disableButtons(600);
  reset();
  let sortMethod = selectSort(arr);

  function animate() {
    requestAnimationFrame(animate);
    sortMethod.next();
  }
  animate(arr);
}
//Generator function for Selection Sort Algorithm
function* selectSort(array) {
  for (i = 0; i < array.length; i++) {
    let min = i;

    for (j = i + 1; j < array.length; j++) {
      if (array[j] < array[min]) {
        min = j;
      }
    }
    if (min !== i) {

      let temp = array[i];
      array[i] = array[min];
      array[min] = temp;

      swaps++;
      numOfSwaps.innerHTML = `Swaps: ${swaps}`;

      draw(array, min);
      yield min;
    }
  }
}

//Bubble Sort
function bubble() {
  disableButtons(4100);
  reset();
  let sortMethod = bubbleSort(arr);

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

        swaps++;
        numOfSwaps.innerHTML = `Swaps: ${swaps}`;
        draw(array, j);
        yield j;
      }
    }
  }
}

//Disable buttons while sorting is in progress
function disableButtons(time) {
  insertionBtn.disabled = true;
  selectionBtn.disabled = true;
  bubbleBtn.disabled = true;
  resetBtn.disabled = true;
  setTimeout(function(){insertionBtn.removeAttribute("disabled")},time);
  setTimeout(function(){selectionBtn.removeAttribute("disabled")},time);
  setTimeout(function(){bubbleBtn.removeAttribute("disabled")},time);
  setTimeout(function(){resetBtn.removeAttribute("disabled")},time);
}

//Reset Array
function reset() {
  swaps = 0;
  shuffle(arr);
  draw(arr, 0);
}
