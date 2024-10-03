const lists = document.querySelector('.memo .list');
const input = document.querySelector('.memo form input');
const submitBtn = document.querySelector('.memo .buttons #submit');
const memoDay = document.querySelector('.memo .day');

let memoList = [JSON.parse(window.localStorage.getItem('memo'))];
// 나중에 요일에 따라 내용 다르게 보이게 할때 쓰기.
let day = memoDay.textContent;
let content = "";

input.addEventListener('input', function (e) {
    content = e.target.value;
});


submitBtn.addEventListener('click', function (e) {
    let memo = {
        content : content,
        day : day.replace(/-/g, '')
    }
    if(memoList[0] === null) {
        memoList.splice(0, 1);
    }
    memoList[memoList.length] = memo;
    console.log(memoList);

    //window.localStorage.setItem('memo', JSON.stringify(memoList));

    // forEach 여기서 innerHTML 에 계속 += 때문에 추가추가 되서 겹쳐서 생김.
    // map 써볼까
    memoList.forEach((memo) => {
        console.log(memo);
        lists.innerHTML += `<li>${memo.content}</li>`
    })
})

