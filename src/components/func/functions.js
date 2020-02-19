export function addActive(items) {
  if (!items) return false;
  removeActive(items);

  if (this.counter >= items.length) this.counter = 0;
  if (this.counter < 0) this.counter = items.length - 1;

  items[this.counter].classList.add('hover');
}

export function removeActive(items) {
  for (let i = 0; i < items.length; i++) {
    items[i].classList.remove('hover');
  }
}

export function formatDate(date) {
  const monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];

  const dt = new Date(date);

  let day = dt.getDate();
  let monthIndex = dt.getMonth();
  let year = dt.getFullYear();

  return day + ' ' + monthNames[monthIndex].slice(0, 3) + ', ' + year;
}


