const signEmail = document.querySelector(".email");
const nickname = document.querySelector(".nickname");
const signPwd = document.querySelector(".pwd");
const pwdAgain = document.querySelector(".pwdAgain");
const signSend = document.querySelector(".send");
signSend.addEventListener("click", (e) => callSignup(), false);

function callSignup() {
  let ary = [signEmail.value, nickname.value, signPwd.value, pwdAgain.value];
  for (let i = 0; i < ary.length; i++) {
    if (ary[i] == "") {
      alert("請確認欄位已全數完成填寫！");
      return;
    }
  }

  let obj = {
    user: {
      email: signEmail.value,
      nickname: nickname.value,
      password: signPwd.value,
      password: pwdAgain.value,
    },
  };
  axios
    .post("https://todoo.5xcamp.us/users", obj)
    .then((response) => {
      console.log(response.data);
      if (
        signPwd.value == pwdAgain.value &&
        response.data.message == "註冊成功"
      ) {
        alert("恭喜您，帳號註冊成功！");
      } else {
        alert("請再次確認「再次輸入密碼」是否正確！");
      }
    })
    .catch((error) => {
      console.log(error);
      alert("註冊失敗，已有重複帳號，請再次確認。");
    });
  signEmail.value = "";
  nickname.value = "";
  signPwd.value = "";
  pwdAgain.value = "";
}

// loginBtn.addEventListener("click", (e) => goLoginPage(), false);
//透過事件監聽點擊導向其他頁面
//window.location = "../template/login.html";

// function goLoginPage() {
// }
