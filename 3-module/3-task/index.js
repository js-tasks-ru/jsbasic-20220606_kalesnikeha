function camelize(str) {
  let arr = str.split("-"), result = [];

  for (let a = 0; a < arr.length; a++) {
    if (a === 0 || arr[a] === "") {
      result[a] = arr[a];
    } else {
      result[a] = arr[a].charAt(0).toUpperCase() + arr[a].slice(1);
    }
  }
  return result.join("");
}
