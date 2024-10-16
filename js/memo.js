const lists = document.querySelector(".memo .list");
const input = document.querySelector(".memo form input");
const submitBtn = document.querySelector(".memo .buttons #submit");
const closeBtn = document.querySelector(".memo .buttons #cancel");
const memoDay = document.querySelector(".memo .day");
const dateList = document.querySelectorAll('.dates li');
const calendar = document.querySelector('#calendar');
const h3 = document.querySelector('.information h3');
const todayTodos = document.querySelector('.information .todo');

let day = memoDay.textContent.replace(/-/g, "");

let todos = [];

const save = () => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

const delItem = (e) => {
  const target = e.target.parentElement;
  todos = todos.filter((todo) => todo.id !== parseInt(target.id));
  save();
  target.remove();

  // todayTodos의 li 중 target.id 와 같은 id를 가진 li를 찾아서 삭제.
  // 삭제 후 todayTodosList에 li 자식이 없다면 "일정없음" 표시.
  const todayTodosList = document.querySelectorAll('.information .todo li');
  if(todayTodosList.length !== 0) {
    todayTodosList.forEach(list => {
      if(parseInt(list.id) === parseInt(target.id)) {
        list.remove();
      };
    });
  };
};

const addItem = (todo) => {

  if(todo.day === day) {
    const li = document.createElement("li");
    const button = document.createElement("button");
    const span = document.createElement("span");
  
    span.innerText = todo.memo;
    button.setAttribute("type", "button");
    button.innerText = "삭제";
    button.addEventListener("click", delItem);
    li.append(span, button);
    lists.appendChild(li);
    li.id = todo.id;
  }

  addInformation(todo);
};

const addInformation = (todo) => {
  if(todo.day === day) {
    const li = document.createElement("li");
    const span = document.createElement("span");
    
    h3.innerText = "";
    span.innerText = todo.memo;
    li.append(span);
    todayTodos.appendChild(li);
    li.id = todo.id;
  }
};

const handle = (e) => {
  const todo = {
    id: Date.now(),
    memo: input.value,
    day: day,
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
  day = memoDay.textContent.replace(/-/g, '');
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
  const todayTodosList = document.querySelectorAll('.information .todo li');
  if(todayTodosList.length === 0) {
    h3.innerText = "일정이 없어요...";
  };
  calendar.style.transform = 'translateX(0%)';
}

init();
input.addEventListener("keydown", enterkey);
submitBtn.addEventListener("click", handle);
closeBtn.addEventListener("click", closeCalender);
dateList.forEach(date => {
  date.addEventListener('click', clickDate);
})

