function truncate(str, maxlength) {
  const dots = "…";
  if (str.length <= maxlength) return str;
  return str.slice(0, maxlength - 1) + dots;
}
