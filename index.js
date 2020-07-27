// Generate array
const arr = [];
let value = 5;
for (let i = 0; i < 32; i++) {
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

    draw(array, j);
    yield j;
  }
  return array;
}

//Selection Sort
function selection() {
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

      draw(array, min);
      yield min;
    }
  }
}

//Bubble Sort
function bubble() {
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

        draw(array, j);
        yield j;
      }
    }
  }
}

//Reset Array
function reset() {
  shuffle(arr);
  draw(arr, 0);
}
