document.addEventListener("DOMContentLoaded", function () {
  // DOM Ready!
});
const apiUrl = "https://todoo.5xcamp.us";

const addTodo = document.querySelector(".addTodo");
const addBtn = document.querySelector(".addBtn");
//從 localstorage 取得 token 值
const token = localStorage.getItem("Authorization");

//一進到頁面就要顯示這個帳號的 todo
getTodo();

//讀取待辦
function getTodo() {
  axios
    .get(`${apiUrl}/todos`, {
      headers: {
        Authorization: token,
      },
    })
    .then((res) => {
      let obj;
      for (let i = 0; i < res.data.todos.length; i++) {
        obj = {}; //在每次迴圈時創建一個新的物件
        obj.content = res.data.todos[i].content;
        obj.id = res.data.todos[i].id;
        data.push(obj);
      }
      renderData();
    })
    .catch((err) => console.log(err.response));
}

//點擊新增按鈕才會新增 todo
addBtn.addEventListener("click", callAddTodo, false);

//新增待辦
function callAddTodo() {
  const list = addTodo.value;
  if (list == "") {
    alert("請先填寫代辦事項！");
    return;
  }
  axios
    .post(
      `${apiUrl}/todos`,
      {
        todo: {
          content: list,
        },
      },
      {
        headers: {
          Authorization: token,
        },
      }
    )
    .then((res) => {
      let obj = {};
      obj.content = res.data.content;
      obj.id = res.data.id; // 保存返回的 ID
      data.push(obj);
      renderData();
    })
    .catch((err) => alert("請注意！代辦新增失敗"));
  addTodo.value = "";
}
let data = [];
//資料初始化渲染：透過 JS 將資料寫進 HTML
function renderData() {
  let str = "";
  data.forEach((item, index) => {
    str += `<li data-id="${item.id}"><input type="checkbox" class="checkbox" /><img class="checked" src="../img/check.png" alt="" /><p>${item.content}</p><img src="../img/delete.png" class="delete" data-num="${index}"></li>`;
  });
  const list = document.querySelector(".list");
  list.innerHTML = str;
  //在渲染待辦事項後添加事件監聽器：
  addCheckboxEventListeners();
}

const nickname = localStorage.getItem("nickname");
const name = document.querySelector(".name");

//右上角顯示登入帳號的 nickname
renderName();

//也可以使用以下程式碼，DOMContentLoaded 事件在整個 HTML 文件完全加載並解析後觸發，不必等待樣式表、圖片或子框架完成加載。

// document.addEventListener("DOMContentLoaded", () => {
//   const nickname = localStorage.getItem("nickname");
//   renderName(nickname);
// });

function renderName() {
  let str = `<p>${nickname} 的代辦</p>`;
  name.innerHTML = str;
}

//更新待辦
function updateTodo(list, todoId) {
  axios
    .put(
      `${apiUrl}/todos/${todoId}`,
      {
        id: todoId,
        content: list,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    )
    .then((res) => alert("代辦已修改成功!"))
    .catch((err) => alert("請注意！代辦修改失敗，請再試一次！"));
}

//標記為已完成
// 添加 checkbox 事件監聽器
function addCheckboxEventListeners() {
  const checkboxes = document.querySelectorAll(".checkbox");
  checkboxes.forEach((checkbox, index) => {
    checkbox.addEventListener("change", () => todoDown(index));
  });
}

//改變 list 的樣式
const list = document.querySelector(".list");

function todoDown(index) {
  const todoId = data[index].id;
  axios
    .patch(
      `${apiUrl}/todos/${todoId}/toggle`,
      {
        id: todoId,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    )
    .then((res) => {
      alert("代辦已標記完成");
      const todoItem = document.querySelector(`li[data-id="${todoId}"]`);
      //檢查 todoItem 是否存在，存在就新增 class name，不影響既有 class name
      if (todoItem) {
        todoItem.classList.add("listDown");
      }
    })
    .catch((err) => alert("請注意！代辦標記失敗，請再試一次！"));
}

//刪除待辦
// list.addEventListener("click", deldeteTodo, false);

// function deldeteTodo(todoId) {
//   axios
//     .delete(`${apiUrl}/todos/${todoId}`, {
//       headers: {
//         Authorization: token,
//       },
//     })
//     .then((res) => {
//       if (e.target.getAttribute("class") !== "delete") {
//         return;
//       }
//       let num = e.target.getAttribute("data-num");
//       data.splice(num, 1);
//       alert("代辦已刪除");
//       //資料刪除後，要再 render 一次 data 讓 num 正常運作
//       renderData();
//     })
//     .catch((err) => alert("請注意！代辦刪除失敗，請再試一次！"));
// }
