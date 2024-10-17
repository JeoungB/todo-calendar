const lists = document.querySelector(".memo .list");
const input = document.querySelector(".memo form input");
const submitBtn = document.querySelector(".memo .buttons #submit");
const closeBtn = document.querySelector(".memo .buttons #cancel");
const memoDay = document.querySelector(".memo .day");
const calendar = document.querySelector("#calendar");
const h3 = document.querySelector(".information h3");
const todayTodos = document.querySelector(".information .todo");
const navs = document.querySelectorAll("#prev, #next");
let dateList = document.querySelectorAll(".dates li");

// 이제 넘친 텍스트 확인을 위해서 텍스트 모달창을 만들어보자.

let day = memoDay.textContent.replace(/-/g, "");
let todos = [];

let date = new Date();
let hours = ("0" + date.getHours()).slice(-2);
let minutes = ("0" + date.getMinutes()).slice(-2);
let timeString = hours + ":" + minutes;

const changeDateList = () => {
  dateList = document.querySelectorAll(".dates li");

  dateList.forEach((date) => {
    date.addEventListener("click", clickDate);
  });
};

const save = () => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

const delItem = (e) => {
  const target = e.target.parentElement;
  todos = todos.filter((todo) => todo.id !== parseInt(target.id));
  save();
  target.remove();

  // todayTodos의 li 중 target.id 와 같은 id를 가진 li를 찾아서 삭제.
  const todayTodosList = document.querySelectorAll(".information .todo li");
  if (todayTodosList.length !== 0) {
    todayTodosList.forEach((list) => {
      if (parseInt(list.id) === parseInt(target.id)) {
        list.remove();
      }
    });
  }
};

const addItem = (todo) => {
  if (todo.day === day) {
    const div = document.createElement("div");
    const li = document.createElement("li");
    const button = document.createElement("button");
    const span = document.createElement("span");

    span.innerText = todo.memo;
    div.setAttribute("class", "point");
    button.setAttribute("type", "button");
    button.addEventListener("click", delItem);
    li.append(div, span, button);
    lists.appendChild(li);
    li.id = todo.id;
  }

  addInformation(todo);
};

const addInformation = (todo) => {
  if (todo.day === day) {
    const li = document.createElement("li");
    const span = document.createElement("span");
    const div = document.createElement('div');

    div.setAttribute('class', 'time');
    div.innerText = todo.time;
    h3.innerText = "";
    span.innerText = todo.memo;
    li.append(div, span);
    todayTodos.appendChild(li);
    li.id = todo.id;
  }

  // todayTodos에 암것도 없으면 일정 없다.
  const todayTodosList = document.querySelectorAll(".information .todo li");
  if (todayTodosList.length === 0) {
    h3.innerText = "일정이 없어요...";
  }
};

const handle = (e) => {
  const todo = {
    id: Date.now(),
    memo: input.value,
    day: day,
    time: timeString,
  };
  if (todo.memo !== "") {
    todos.push(todo);
    addItem(todo);
    save();
  }
  input.value = "";
};

const init = () => {
  const saveTodos = JSON.parse(localStorage.getItem("todos"));
  if (saveTodos !== null) {
    saveTodos.forEach((todo) => {
      addItem(todo);
    });
    todos = saveTodos;
  }
};

const enterkey = (event) => {
  if (event.keyCode == 13) {
    handle();
  }
};

const clickDate = () => {
  day = memoDay.textContent.replace(/-/g, "");
  const saveTodos = JSON.parse(localStorage.getItem("todos"));
  lists.replaceChildren();
  todayTodos.replaceChildren();
  if (saveTodos !== null) {
    saveTodos.forEach((todo) => {
      addItem(todo);
    });
  }
};

const closeCalender = () => {
  const todayTodosList = document.querySelectorAll(".information .todo li");
  if (todayTodosList.length === 0) {
    h3.innerText = "일정이 없어요...";
  }
  calendar.style.transform = "translateX(0%)";
};

init();
input.addEventListener("keydown", enterkey);
submitBtn.addEventListener("click", handle);
closeBtn.addEventListener("click", closeCalender);
// dateList가 월이 넘어가도 이전의 date들만 가지고 있기때문에
// 월이 넘어갈 때 마다 새로 dateList를 받아와줘야 함.
navs.forEach((nav) => {
  nav.addEventListener("click", changeDateList);
});
dateList.forEach((date) => {
  date.addEventListener("click", clickDate);
});
