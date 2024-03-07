//dom כללי- מיבא פריטים שנמצאים בכמה עמודים באותו שם
const generaldom = {
  divDetails: document.getElementById("current-store"),
  searchForm: document.getElementById("search"),
  searchInputs: {
    maxPrice: document.getElementById("maxPrice"),
    city: document.querySelector('select')
  },
  btnOff: document.getElementById("btnOff"),
  btnSearch: document.getElementById("btnSearch"),
  bottom: document.getElementById("mapa"),
  thisForm: document.thisform,
  storesDiv: document.getElementById("storesDiv"),
  maessage: document.getElementById("message"),
  btnClose: document.getElementById("btnClose"),
  middle: document.getElementById("middle"),
  shop: document.getElementById("shop"),
  shopInputs: {
    name: document.getElementById("name-card"),
    adress: document.getElementById("adress"),
    cardNum: document.getElementById("card-number"),
    date: document.getElementById("date"),
    cvv: document.getElementById("cvv"),

  },
  cardLink: document.getElementById("cardLink"),
  closeButton: document.getElementById("close-button")
};
//פונקציה שמחזירה div המכיל את כל פרטי החנות שנשלחה כאוביקט.
const getStore = (store, type) => {
  const myDiv = document.createElement('div');
  myDiv.classList.add('store');
  const img = document.createElement('img');
  img.src = `../../assets/${type}/${store.picturesrc}`;
  myDiv.appendChild(img);
  const dataDiv = document.createElement('div');
  const name = document.createElement('h3');
  name.innerHTML = store.name;
  const prod = document.createElement('p');
  // prod.appendChild(shop);
  for (let i = 0; i < store.products.length && i < 4; i++) {
    prod.innerHTML += " " + store.products[i] + ",";

  }
  prod.innerHTML += "ועוד...";
  const branches = document.createElement('p');
  // branches.appendChild(map);
  let i = 0;
  for (i = 0; i < store.branches.length && i < 4; i++) {
    branches.innerHTML += " " + store.branches[i].adress.city.name + ", ";
  }
  if (i < store.branches.length)
    branches.innerHTML += "ובערים נוספות.";
  branches.innerHTML += ""
  const link = document.createElement('a');
  link.href = store.link;
  link.innerHTML = "קישור לאתר החנות";
  const btn = document.createElement('button');
  btn.onclick = (event) => {
    event.preventDefault();
    console.log(store.name);
    current(store.name);
  }
  btn.innerHTML = "לפרטים נוספים>>"
  dataDiv.appendChild(name);
  dataDiv.appendChild(prod);
  dataDiv.appendChild(branches);
  dataDiv.appendChild(link);
  myDiv.appendChild(dataDiv);
  myDiv.appendChild(btn);
  return myDiv;

}
//פונקציה המצירת על המסך div ובו פרטים מורחבים על החנות שנבחרה.
const drawCurrent = (store, type) => {
  const name = document.createElement('h3');
  name.innerHTML = store.name;
  const desc = document.createElement('p');
  desc.innerHTML += store.description;

  const img = document.createElement('img');
  img.src = `../../assets/${type}/${store.picturesrc}`;
  img.classList.add("branch");
  const shop = document.getElementById("shop-car");
  const prod = document.createElement('p');

  prod.appendChild(shop);
  store.products.forEach(product => {
    prod.innerHTML += " " + product + ".";
  })
  const branches = document.createElement('div');
  branches.classList.add("branches");
  const map = document.getElementById("map");
  const phone = document.getElementById("phone");
  const clock = document.getElementById("clock");
  store.branches.forEach(branch => {
    const adress = document.createElement('p');
    adress.appendChild(map);
    adress.innerHTML += " " + branch.adress.city.name + " " + branch.adress.street + " " + branch.adress.number;
    const openHours = document.createElement('p');
    openHours.appendChild(clock);
    openHours.innerHTML += " " + branch.openhours;
    const tel = document.createElement('p');
    tel.appendChild(phone);
    tel.innerHTML += " " + branch.phone;
    const thisBranch = document.createElement('div');
    thisBranch.classList.add("branch")
    thisBranch.appendChild(adress);
    thisBranch.appendChild(openHours);
    thisBranch.appendChild(tel);
    branches.appendChild(thisBranch);
  })

  const btnClose = document.createElement('button');
  btnClose.onclick = (event) => {
    event.preventDefault();
    call(`../../data/${type}.json`, drawStores);
    generaldom.searchForm.style.opacity = 1;
    generaldom.bottom.style.opacity = 0;
    generaldom.thisForm.style.opacity = 1;
    generaldom.divDetails.style.visibility = "hidden";
    generaldom.divDetails.innerHTML = "";

    generaldom.divDetails.appendChild(shop);
    generaldom.divDetails.appendChild(map);
    generaldom.divDetails.appendChild(phone);
    generaldom.divDetails.appendChild(clock);
  }
  btnClose.innerHTML = "סגור"
  const btnAdd = document.createElement('button');
  btnAdd.innerHTML = "הוספה למועדפים";
  // ארוע שמוסיף את החנות המועדפת לlocalStorage
  btnAdd.onclick = () => {
    const favStore = {
      type,
      img: store.picturesrc
    }
    let flag = true;
    user.favoriteList.my.forEach(store => {
      console.log(store);
      if (store.img === favStore.img) {
        flag = false;
        alert("חנות זו כבר קימת ברשימה!")
      }
    });
    if (flag) {
      user.favoriteList.my.push(favStore);
      localStorage.setItem(sessionStorage.getItem("email"), JSON.stringify(user));
      alert("החנות נוספה בהצלחה לרשימת המועדפים💕")
    }

  }
  generaldom.divDetails.appendChild(img);
  generaldom.divDetails.appendChild(desc);
  // dom.divDetails.appendChild(name);
  generaldom.divDetails.appendChild(prod);
  generaldom.divDetails.appendChild(branches);
  generaldom.divDetails.appendChild(btnClose);
  generaldom.divDetails.appendChild(btnAdd);
  generaldom.searchForm.style.opacity = 0.3;
  generaldom.bottom.style.opacity = 0;
  generaldom.thisForm.style.opacity = 0.3;

  generaldom.divDetails.style.visibility = "visible";

}
// פונקציה שמחפשת חנויות עם המוצר שהמשתמש לחץ עליו ומציירת אותן על המסך
const searchStoreWithProduct = (stores, text, type) => {
  let flag = false;
  stores.forEach(store => {
    flag = false;
    store.products.forEach(product => {

      if (text.startsWith(product))
        flag = true;
    })
    if (flag)
      generaldom.storesDiv.appendChild(getStore(store, type));

  })
}

// פונקציה זו מציגה את החנויות שמכילות את המחרוזת שהוקשה ע"י המשתמש
const freeSearch = (stores, str, type) => {
  stores.forEach(store => {
    console.log(JSON.stringify(store));
    if (JSON.stringify(store).includes(str))
      generaldom.storesDiv.appendChild(getStore(store, type));
  })
  if (generaldom.storesDiv.innerHTML === "") {
    const span = document.createElement('span');
    span.innerHTML = "☹ לא נמצאו תוצאות....";
    span.style.fontSize = "100px"
    generaldom.storesDiv.appendChild(span);
  }
}
//פונקציה שמציגה את חלונית הזמנת כרטיס הנחה בעת לחיצה על הקישור. 
generaldom.cardLink.onclick = (event) => {
  event.preventDefault();
  generaldom.shop.style.visibility = "visible";
}
//פונקציה שסוגרת את חלונית הזמנת הכרטיס בעת לחיצה על כפתור הסגירה.
generaldom.closeButton.onclick = () => {
  generaldom.shop.style.visibility = "hidden";

}
//.פונקציה שפועלת בעת הזנת נתונים לשדה מספר אשראי ומאפשרת למשתמש להקיש רק מספרים
generaldom.shopInputs.cardNum.onkeydown = (event) => {
  const key = event.key;
  if ((key < '0' || key > '9')&& key != 127) {
    event.preventDefault();
  }
}
// פונקציה שפועלת בעת הזנת נתונים לשדה שם ומאפשרת למשתמש להקיש רק אותיות בעברית/ אנגלית.
generaldom.shopInputs.name.onkeydown = (event) => {
  const key = event.key;
  if (generaldom.shopInputs.name.value.length < 1) {
    if ((key < 'א' || key > 'ת') && (key < 'a' || key > 'z') && (key < 'A' || key > 'Z')) {
      event.preventDefault();
    }
  }
  else {
    if (generaldom.shopInputs.name.value[0] >= 'א' && generaldom.shopInputs.name.value[0] <= 'ת') {
      if ((key < 'א' || key > 'ת') && !' -'.includes(key) && key != ' ' && key != 127) {
        event.preventDefault();
      }
    }
    if ((generaldom.shopInputs.name.value[0] >= 'A' && generaldom.shopInputs.name.value[0] <= 'Z') || (generaldom.shopInputs.name.value[0] >= 'a' && generaldom.shopInputs.name.value[0] <= 'z'))
      if (!' -'.includes(key) && (key < 'a' || key > 'z') && (key < 'A' || key > 'Z') && key != ' ' && key != 127) {
        event.preventDefault();
      }
  }
}
//  שפועלת בעת הזנת נתונים לשדה שם ומאפשרת למשתמש להקיש רק בתבנית המתאימה.
generaldom.shopInputs.date.onkeydown = (event) => {
  const key = event.key;
  if (generaldom.shopInputs.date.value.length == 5) {
    event.preventDefault();
    alert("mm/yy על תאריך להיות בתבנית ");
  }
  if (generaldom.shopInputs.date.value.length === 2) {
    if (key != '/'&& key != '/') {
      event.preventDefault();
      alert("mm/yy על תאריך להיות בתבנית ");
    }
  }
  else
    if (key < '0' || key > '9') {
      event.preventDefault();
      alert("mm/yy על תאריך להיות בתבנית ");
    }

}
generaldom.shopInputs.cvv.onkeydown = (event) => {
  const key = event.key;
  if (generaldom.shopInputs.cvv.value.length === 3 ){
    event.preventDefault();
    alert("להיות בעל 3 ספרות cvv על מספר ");
  }
  else
    if (key < '0' || key > '9') {
      event.preventDefault();
      alert(" להיות בעל ספרות בלבד cvv על מספר ");
    }

}