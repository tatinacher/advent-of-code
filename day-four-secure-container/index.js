const MAX = 787419;
const MIN = 246540;

const getNumberOfPasswords = (min, max) => {
  let number = 0;
  const array = [];
  for (let i = min; i <= max; i++) {
    let IsDecreasing = false;
    let hasDoubleNumber = false;
    let arr = Array.from(i.toString()).map(el => parseInt(el));
    for (let j = 0; j < arr.length - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        IsDecreasing = true;
      }
      if (arr[j] == arr[j + 1]) {
        hasDoubleNumber = true;
        //advanced
        //222233
        // if (
        //   (j < arr.length - 2 && arr[j] == arr[j + 2]) ||
        //   (j > 0 && arr[j] == arr[j - 1])
        // ) {
        //   hasDoubleNumber = false;
        // }
      }
    }

    if (hasDoubleNumber && !IsDecreasing) {
      number += 1;
      array.push(i);
    }
  }

  array.forEach(numb => {
    //console.log(numb);
    let isValid = false;
    let arr = Array.from(numb.toString()).map(el => parseInt(el));
    if (arr[0] == arr[1] && arr[0] != arr[2]) {
      isValid = true;
    }
    //788777
    if (arr[1] == arr[2] && arr[0] != arr[1] && arr[2] != arr[3]) {
      isValid = true;
    }
    //778877
    if (arr[2] == arr[3] && arr[2] != arr[1] && arr[3] != arr[4]) {
      isValid = true;
    }
    //777667
    if (arr[3] == arr[4] && arr[3] != arr[2] && arr[4] != arr[5]) {
      isValid = true;
    }
    if (arr[5] == arr[4] && arr[5] != arr[3]) {
      isValid = true;
    }
    if (!isValid) {
      number -= 1;
      //console.log(numb);
    } else {
      console.log(numb);
    }
  });

  return number;
};

const number = getNumberOfPasswords(MIN, MAX);
console.log(number);

//936 high
//621 low
