//dom - ייבוא פריטים מהמסמך.
const dom = {
  loginform: document.loginform,
  loginformData: {
    name: document.getElementById("userName"),
    email: document.getElementById("mail"),
    phone: document.getElementById("phone"),
    password: document.getElementById("password"),
    wedDate: document.getElementById("wedDate")
  }

};
// פונקציה שפועלת בעת הזנת נתונים לשדה שם ומאפשרת למשתמש להקיש רק אותיות בעברית/ אנגלית.
dom.loginformData.name.onkeydown = (event) => {
  const key = event.key;
  if (dom.loginformData.name.value.length < 1) {
    if ((key < 'א' || key > 'ת') && (key < 'a' || key > 'z') && (key < 'A' || key > 'Z')) {
      event.preventDefault();
    }
  }
  else {
    if (form.name.value[0] >= 'א' && form.name.value[0] <= 'ת') {
      if ((key < 'א' || key > 'ת') && !' -'.includes(key) && key != ' '&&key!=127) {
        event.preventDefault();
      }
    }
    if ((form.name.value[0] >= 'A' && form.name.value[0] <= 'Z') || (form.name.value[0] >= 'a' && form.name.value[0] <= 'z'))
      if (!' -'.includes(key) && (key < 'a' || key > 'z') && (key < 'A' || key > 'Z') && key != ' '&&key!=127) {
        event.preventDefault();
      }
  }
}
//  .פונקציה שפועלת בעת הזנת נתונים לשדה מייל ומאפשרת למשתמש להקיש רק אותיות באנגלית /מספרים
dom.loginformData.email.onkeydown = (event) => {
  const key = event.key;
  if ((key < 'a' || key > 'z') && (key < 'A' || key > 'Z') && key != '@' && key != '.'
  &&(key<'0'||key>'9')&&key!=127) {
    event.preventDefault();
  }
}
//.פונקציה שפועלת בעת הזנת נתונים לשדה טלפון ומאפשרת למשתמש להקיש רק מספרים
dom.loginformData.phone.onkeydown = (event) => {
  const key = event.key;
  if ((key < '0' || key > '9') && (key != '-')&&key!=127) {
    event.preventDefault();
  }
}

console.log(dom);
dom.loginform.onsubmit = (event) => {
  event.preventDefault();
  if (dom.loginformData.phone.value.length < 8)
    alert("מס' טלפון אמור להכיל 9 או 10 תווים")
  else {
    const userData = {
      details: {
        name: dom.loginformData.name.value,
        gmail: dom.loginformData.email.value,
        telephone: dom.loginformData.phone.value,
        password: dom.loginformData.password.value,
        weddingDate: dom.loginformData.wedDate.value
      },
      textilList: { data: [] },
      homeDishesList: { data: [] },
      clothList: { data: [] },
      wigsList: { data: [] },
      makeUpList: { data: [] },
      favoriteList:{my:[]}
    }
    console.log(userData);
    localStorage.setItem(userData.details.gmail, JSON.stringify(userData));
    sessionStorage.setItem("email", userData.details.gmail)
    dom.loginform.reset();
    window.location.href = "../home/home.html";
  }
}
signUp.addEventListener("click", () => {

  container.classList.add("active");
});
loginform.addEventListener("click", () => {
  container.classList.remove("active");
});