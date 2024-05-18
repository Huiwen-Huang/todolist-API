//name 要帶入登入的 nickname
const apiUrl = "https://todoo.5xcamp.us";

const addTodo = document.querySelector(".addTodo");
const addBtn = document.querySelector(".addBtn");
//從 localstorage 取得 token 值
const token = localStorage.getItem("Authorization");
getTodo();
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
      data.push(obj);
      alert("代辦新增成功!");
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
    str += `<li><input type="checkbox" class="checkbox" /><p>${item.content}</p><img src="../img/delete.png" class="delete" data-num="${index}"></li>`;
  });
  const list = document.querySelector(".list");
  list.innerHTML = str;
}
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
        data.push(obj);
      }
      renderData();
    })
    .catch((err) => console.log(err.response));
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
function todoDown(todoId) {
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
    .then((res) => alert("代辦已標記完成"))
    .catch((err) => alert("請注意！代辦標記失敗，請再試一次！"));
}

//刪除待辦
const list = document.querySelector(".list");
list.addEventListener("click", deldeteTodo, false);

function deldeteTodo(todoId) {
  axios
    .delete(`${apiUrl}/todos/${todoId}`, {
      headers: {
        Authorization: token,
      },
    })
    .then((res) => {
      if (e.target.getAttribute("class") !== "delete") {
        return;
      }
      let num = e.target.getAttribute("data-num");
      data.splice(num, 1);
      alert("代辦已刪除");
      //資料刪除後，要再 render 一次 data 讓 num 正常運作
      renderData();
    })
    .catch((err) => alert("請注意！代辦刪除失敗，請再試一次！"));
}
