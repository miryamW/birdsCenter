const dom={
    userName:document.getElementById("user-name"),
    user:document.getElementById("user-name"),
    alert:document.getElementById("alrt"),
    container:document.getElementById("container"),
    closeButton:document.getElementById("close-button"),
    closeBtn:document.getElementById("close"),
    name:document.getElementById("name"),
    days:document.getElementById("days"),
    buy:document.getElementById("buy"),
    shop:document.getElementById("shop"),
    order:document.getElementById("order"),
    card:document.getElementById("card")
};
const mail = sessionStorage.getItem("email");
const userStr = localStorage.getItem(mail);
const user = JSON.parse(userStr);
dom.userName.innerHTML=user.details.name;
dom.user.innerHTML=user.details.name;
dom.name.innerHTML=user.details.name;
const today = new Date();
const wedDate = new Date(user.details.weddingDate);
const diff = wedDate - today;
const dayDiff = diff / (1000 * 60 * 60 * 24);
const final = dayDiff - dayDiff % 1;
dom.days.innerHTML = `${final}`;
let value=2;
const intervalFunc = setInterval(() => {
    value--;
    if(value===0)
     { dom.alert.style.visibility="visible";
      
      clearInterval(intervalFunc);
      dom.container.style.filter="blur(3px)"
      dom.container.style.opacity=0.7;}
}, 2000);
dom.closeBtn.onclick=(event)=>{
    dom.alert.style.visibility="hidden";
    dom.container.style.filter="blur(0px)"
    dom.container.style.opacity=1;
}
dom.closeButton.onclick=()=>{
    dom.shop.style.visibility="hidden";
    dom.container.style.filter="blur(0px)"
    dom.container.style.opacity=1;
}
dom.buy.onclick=(event)=>{
    dom.alert.style.visibility="hidden";
    event.preventDefault();
    dom.shop.style.visibility="visible";
}
