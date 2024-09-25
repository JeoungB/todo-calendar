const header = document.querySelector("#calendar h2");
const dates = document.querySelector(".dates");
const navs = document.querySelectorAll("#prev, #next");
const memoDay = document.querySelector('.memo .day');

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let date = new Date();
let month = date.getMonth();
let year = date.getFullYear();

function renderCalendar() {
  const start = new Date(year, month, 1).getDay();
  const endDate = new Date(year, month + 1, 0).getDate();
  const end = new Date(year, month, endDate).getDay();
  const endDatePrev = new Date(year, month, 0).getDate();

  let datesHtml = "";

  for (let i = start; i > 0; i--) {
    datesHtml += `<li class="inactive">${endDatePrev - i + 1}</li>`;
  };

  for (let i = 1; i <= endDate; i++) {
    let className =
      i === date.getDate() &&
      month === new Date().getMonth() &&
      year === new Date().getFullYear()
        ? ' class="today"'
        : ' class="oder"';
    datesHtml += `<li${className}>${i}</li$>`;
  };

  for (let i = end; i < 6; i++) {
    datesHtml += `<li class="inactive">${i - end + 1}</li>`;
  };

  dates.innerHTML = datesHtml;
  header.textContent = `${months[month]} ${year}`;
  memoDay.innerHTML = `<h3>${year+'.'+(month+1)+'.'+date.getDate()}</h3>`

  const dateList = document.querySelectorAll('.dates li');

  dateList.forEach((date) => {
    date.addEventListener('click', (e) => {
      for(let i = 0 ; i < dateList.length ; i++) {
        dateList[i].style.setProperty('--dateBorderColor', 'transparent');
      }
      date.style.setProperty('--dateBorderColor', 'rgb(3, 222, 149)');
      memoDay.innerHTML = `<h3>${year+'.'+(month+1)+'.'+e.target.textContent}</h3>`
    })
  });
};

navs.forEach((nav) => {
  nav.addEventListener('click', (e) => {
    const btnId = e.target.id;

    if (btnId === "prev" && month === 0) {
      year--;
      month = 11;
    } else if (btnId === "next" && month === 11) {
      year++;
      month = 0;
    } else {
      month = btnId === "next" ? month + 1 : month - 1;
    }

    renderCalendar();
  });
});

renderCalendar();
