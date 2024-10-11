const lists = document.querySelector(".memo .list");
const input = document.querySelector(".memo form input");
const submitBtn = document.querySelector(".memo .buttons #submit");
const memoDay = document.querySelector(".memo .day");

let day = memoDay.textContent.replace(/-/g, '');

let todos = [];

const save = () => {
    localStorage.setItem('todos', JSON.stringify(todos));
}

const delItem = (e) => {
    const target = e.target.parentElement;
    todos = todos.filter((todo) => todo.id !== parseInt(target.id));
    save();
    target.remove();
}

const addItem = (todo) => {
        const li = document.createElement('li');
        const button = document.createElement('button');
        const span = document.createElement('span');

        span.innerText = todo.memo;
        button.setAttribute("type", "button");
        button.innerText = "삭제";
        button.addEventListener('click', delItem);
        li.append(span, button);
        lists.appendChild(li);
        li.id = todo.id;
};

const handle = (e) => {

    const todo = {
        id : Date.now(),
        memo : input.value,
        day : day
    }
    if(todo.memo !== "") {
        todos.push(todo);
        addItem(todo);
        save();
    }
    input.value = "";
};



const init = () => {
    const saveTodos = JSON.parse(localStorage.getItem('todos'));
    if(saveTodos !== null) {
        saveTodos.forEach(todo => {
            addItem(todo);
        });
        todos = saveTodos;
    }
};

const enterkey = (event) => {
    if(event.keyCode == 13) {
        handle();
    }
}

init();

input.addEventListener('keydown', enterkey);
submitBtn.addEventListener('click', handle);


