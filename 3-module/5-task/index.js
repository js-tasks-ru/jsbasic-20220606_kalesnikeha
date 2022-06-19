function getMinMax(str) {
  let arr = str.split(" ");
  let result = arr.filter((e) => {
    return Number(e);
  }).map((e) => Number(e));
  result.sort((a, b) => {return a - b});
  return {min: result[0], max: result[result.length - 1]}
}
