const logEmail = document.querySelector(".logEmail");
const logPwd = document.querySelector(".logPwd");
const logSend = document.querySelector(".logSend");
let token = "";
logSend.addEventListener("click", (e) => callLogin(), false);

function callLogin() {
  if (logEmail.value == "" || logPwd.value == "") {
    alert("請確認欄位已全數完成填寫！");
    return;
  }

  let logObj = {
    user: {
      email: logEmail.value,
      password: logPwd.value,
    },
  };
  axios
    .post("https://todoo.5xcamp.us/users/sign_in", logObj)
    .then((response) => {
      const token = response.headers.authorization;
      const nickname = response.data.nickname;
      if (response.data.message == "登入成功") {
        localStorage.setItem("Authorization", token);
        localStorage.setItem("nickname", nickname);
        // console.log(response);
        alert("恭喜您，登入成功！");
        window.location = "../template/list.html";
      }
    })
    .catch((error) => {
      console.log(error);
      alert("登入失敗，請重新登入！");
    });
  logEmail.value = "";
  logPwd.value = "";
}
