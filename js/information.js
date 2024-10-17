const info = document.querySelector('.information > h3');
const addBtn = document.querySelector('.information .add_todo');
const calendar = document.querySelector('#calendar');

addBtn.addEventListener('click', (e) => {
    calendar.style.transform = 'translateX(-43%)';
});