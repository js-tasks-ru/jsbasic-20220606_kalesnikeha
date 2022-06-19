function filterRange(arr, a, b) {
  let newAr = [], min, max;
  if (a < b){
    min = a;
    max = b;
  } else {
    min = b;
    max = a;
  }
  arr.forEach((e) => {
    if (e >= min && e <= max) {
      newAr.push(e)
    }
  })
  return newAr
}
