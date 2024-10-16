const info = document.querySelector('.information > h3');
const todoList = document.querySelector('.information .todo');
const addBtn = document.querySelector('.information .add_todo');
const calendar = document.querySelector('#calendar');

function renderList() {

}

addBtn.addEventListener('click', (e) => {
    calendar.style.transform = 'translateX(-43%)';
})

renderList();