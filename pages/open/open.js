//dom - ייבוא פריטים מהמסמך.
const dom = {
    userName: document.getElementById("user-name"),
    formEnter: document.enter,
    formData: {
        mail: document.getElementById("mail"),
        password: document.getElementById("password")
    }
};
//  .פונקציה שפועלת בעת הזנת נתונים לשדה מייל ומאפשרת למשתמש להקיש רק אותיות באנגלית /מספרים
dom.formData.mail.onkeydown = (event) => {
    const key = event.key;
    if ((key < 'a' || key > 'z') && (key < 'A' || key > 'Z') && key != '@' && key != '.'&&
    (key<'0'||key>'9')&&key!=127) {
      event.preventDefault();
    }
}
//פונקציה שפועלת בעת התחברות ובודקת אם קיים משתמש עם פרטים אלו.
dom.formEnter.onsubmit = (event) => {
    event.preventDefault();
    if (localStorage.getItem(dom.formData.mail.value) === null)
        alert("לא קיימת משתמשת עם נתונים אלו. אנא בדקי את הנתונים והקישי שוב או הרשמי");
    else {
        const user = JSON.parse(localStorage.getItem(dom.formData.mail.value));
        if (user.details.password != dom.formData.password.value)
            alert("הסיסמה שהוקשה שגויה. אנא נסי שוב");
        else {
            sessionStorage.setItem("email", dom.formData.mail.value);
            dom.formEnter.reset();
            window.location.href = "../home/home.html";
        }
    }
}