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

let day = memoDay.textContent.replace(/-/g, "");
let todos = [];
let date = new Date();
let hours = ("0" + date.getHours()).slice(-2);
let minutes = ("0" + date.getMinutes()).slice(-2);
let timeString = hours + ":" + minutes;

// 클릭마다 화면 날짜 업데이트.
const changeDateList = () => {
  dateList = document.querySelectorAll(".dates li");

  dateList.forEach((date) => {
    date.addEventListener("click", clickDate);
  });
};

const save = () => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

// todo 삭제.
const delItem = (e) => {
  // 삭제 버튼 클릭 시 이벤트 버블링을 막으면서
  // li 클릭 시 생성되는 modal 함수 막기.
  e.stopPropagation();
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

let listNum;

// 모달창 생성.
const setModal = (e, name) => {
  const target = e.target;
  const body = document.querySelector("body");
  const box = document.createElement("div");
  const modal = document.createElement("section");
  const content = document.createElement("input");
  const modifyBtn = document.createElement("button");
  const closeBtn = document.createElement("button");
  listNum = target.parentElement.id;

  box.setAttribute("id", "modal_container");
  modal.setAttribute("class", "modal");
  content.value = target.textContent;
  content.setAttribute("disabled", true);
  content.setAttribute("type", "text");
  modifyBtn.setAttribute("id", "modify");
  modifyBtn.setAttribute("type", "button");
  closeBtn.setAttribute("id", "closeBtn");

  if(name === "todo") {
    modal.append(content, modifyBtn, closeBtn);
    box.appendChild(modal);
    body.appendChild(box);
  };

  if(name === "infor") {
    modal.append(content, closeBtn);
    box.appendChild(modal);
    body.appendChild(box);
    // info 에서 자세히 볼때는 수정버튼이 없기때문에 박스의 높이를 줄임.
    modal.style.setProperty('--modal--height', '53px');
  };

  modifyBtn.addEventListener("click", modify);
  closeBtn.addEventListener("click", closeModal);
};

// 모달창 닫기.
const closeModal = () => {
  const box = document.querySelector("#modal_container");
  box.remove();
};

// todo 수정.
const modify = () => {
  const content = document.querySelector(".modal input");
  const modifyBtn = document.querySelector(".modal #modify");
  const modal = document.querySelector(".modal");
  const modifyCheckBtn = document.createElement("button");

  modifyCheckBtn.setAttribute("id", "check");
  modifyCheckBtn.setAttribute("type", "button");
  modifyBtn.remove();
  modal.appendChild(modifyCheckBtn);
  content.removeAttribute("disabled");

  modifyCheckBtn.addEventListener('click', (e) => modifyTodo(e, content.value));
};

const modifyTodo = (e, text) => {
  e.stopPropagation();
  // 화면에 보이는 부분 바꿔주기
  const todayTodosText = document.querySelectorAll(".information .todo li span");
  const memoText = document.querySelectorAll(".memo .list li span");
  const box = document.querySelector("#modal_container");

  Array.from(todayTodosText).forEach((el) => { // NodeList는 배열이 아니기 때문에 forEach 쓰려면 Array.from() 사용.
    if(el.parentElement.id === listNum) {
      el.innerText = text;
    };
  });

  Array.from(memoText).forEach((el) => {
    if(el.parentElement.id === listNum) {
      el.innerText = text;
    };
  });

  // localstorage 수정하기
  todos.forEach((todo) => {
    if(todo.id === parseInt(listNum)) {
      todo.memo = text;
    };
  });
  save();
  box.remove();
};

// todo 새롭게 그리기.
const addItem = (todo) => {
  if (todo.day === day) {
    const div = document.createElement("div");
    const li = document.createElement("li");
    const button = document.createElement("button");
    const span = document.createElement("span");
    const name = "todo"; // 모달창 수정버튼 존재 유무를 위해 클릭한 위치 구분.

    span.innerText = todo.memo;
    div.setAttribute("class", "point");
    button.setAttribute("type", "button");
    button.addEventListener("click", delItem);
    li.addEventListener("click", (e) => setModal(e, name));
    li.append(div, span, button);
    lists.appendChild(li);
    li.id = todo.id;
  }

  addInformation(todo);
};

// todo 미리보기 업데이트.
const addInformation = (todo) => {
  if (todo.day === day) {
    const li = document.createElement("li");
    const span = document.createElement("span");
    const div = document.createElement("div");
    const name = "infor"; // 모달창 수정버튼 존재 유무를 위해 클릭한 위치 구분.

    div.setAttribute("class", "time");
    div.innerText = todo.time;
    h3.innerText = "";
    span.innerText = todo.memo;
    li.append(div, span);
    todayTodos.appendChild(li);
    li.id = todo.id;
    li.addEventListener('click', (e) => setModal(e, name));
  };

  // todayTodos에 암것도 없으면 일정 없다.
  const todayTodosList = document.querySelectorAll(".information .todo li");
  if (todayTodosList.length === 0) {
    h3.innerText = "일정이 없어요...";
  };
};

// todo 추가.
const handle = (e) => {
  const todo = {
    id: Date.now(),
    memo: input.value,
    day: day,
    time: timeString,
  };
  if (todo.memo !== "") {
    todos.push(todo); // 배열에 저장.
    addItem(todo); // 화면에 그리기.
    save(); // localStorage에 저장.
  }
  input.value = "";
};

// 첫 렌더링 시 금일 날짜에 맞는 날짜 가져와 화면에 그리기.
const init = () => {
  const saveTodos = JSON.parse(localStorage.getItem("todos"));
  if (saveTodos !== null) {
    saveTodos.forEach((todo) => {
      addItem(todo);
    });
    todos = saveTodos;
  }
};

// todo 추가 시 엔터키 이벤트.
const enterkey = (event) => {
  if (event.keyCode == 13) {
    handle();
  }
};

// 달력에 날짜 다르게 클릭 시 이전 todo내용 지우고
// localStorage에서 todo정보를 받아와
// 선택한 날짜에 해당하는 todo리스트를 새로 그린다.
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

// 달력 todo모드 접기.
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
