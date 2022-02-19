export function months() {
  return [
    { title: 'January', value: '1' },
    { title: 'February', value: '2' },
    { title: 'March', value: '3' },
    { title: 'April', value: '4' },
    { title: 'May', value: '5' },
    { title: 'June', value: '6' },
    { title: 'July', value: '7' },
    { title: 'August', value: '8' },
    { title: 'September', value: '9' },
    { title: 'October', value: '10' },
    { title: 'November', value: '11' },
    { title: 'December', value: '12' },
  ];
}

export function years() {
  let time = new Date();
  let year = time.getFullYear();
  let arr = [];

  for (let i = 2020; i <= year; i++) {
    let obj = { title: i, value: i };
    arr.push(obj);
  }

  return arr;
}
