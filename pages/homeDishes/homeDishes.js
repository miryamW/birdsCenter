// ייבוא כל האלמנטים הנצרכים מהdocument
const dom = {
    divDetails: document.getElementById("current-store"),
    searchForm: document.getElementById("search"),
    searchInputs: {
        maxPrice: document.getElementById("maxPrice"),
        city: document.querySelector('select')
    },
    btnOff: document.getElementById("btnOff"),
    btnSearch: document.getElementById("btnSearch"),
    userName: document.getElementById("user-name"),
    thisForm: document.thisform,
    dishStoresDiv: document.getElementById("storesDiv"),
    formData: {
        inputs: document.getElementById("inputs"),
    },
    labels: document.querySelectorAll('label'),
    free: document.getElementById("free-search"),
    bottom: document.getElementById("mapa")
};
// שליפת שם המשתמש הנוכחי והצגתו על המסך
const userStr = localStorage.getItem(sessionStorage.getItem("email"));
const user = JSON.parse(userStr);
dom.userName.innerHTML = user.details.name;
// מילוי רשימת המוצרים לקניות ב-true או false לפי נתונים קודמים
for (let i = 0; i < dom.formData.inputs.childNodes.length; i++) {
    dom.formData.inputs.childNodes[i].checked = user.homeDishesList.data[i];
}
//שמירת נתונים חדשים על רשימת הקניות בעת שינוי
dom.formData.inputs.childNodes.forEach(inp => {
    inp.onchange = function (event) {
        event.preventDefault();
        for (let i = 0; i < dom.formData.inputs.childNodes.length; i++) {
            user.homeDishesList.data[i] = dom.formData.inputs.childNodes[i].checked;
        }
        localStorage.setItem(sessionStorage.getItem("email"), JSON.stringify(user));
    }
})
//פונקציה שמצירת את החנויות על המסך
const drawStores = (dishStores) => {
    dishStores.forEach((dishStore) => {
        dom.dishStoresDiv.appendChild(getStore(dishStore, "homeDishes", shop, map));
    })
}
// זימון לקריאת שרת לצורך ציור החנויות על המסך
call("../../data/homeDishes.json", drawStores);
// פונקציה שמצירת את החנויות שעמדו בתנאי החיפוש על המסך
const drawStoresCon = (dishStores) => {

    dishStores.forEach((dishStore) => {
        let flag = false;
        dishStore.branches.forEach(branch => {
            if (dom.searchInputs.city.value === branch.adress.city.id || dom.searchInputs.city.value === "0")
                flag = true;
        });
        if (flag) {
            if (dom.searchInputs.maxPrice.value === "")
                dom.dishStoresDiv.appendChild(getStore(dishStore, "homeDishes"));
            else
                if (JSON.parse(dom.searchInputs.maxPrice.value) >= JSON.parse(dishStore.maximumprice))
                    dom.dishStoresDiv.appendChild(getStore(dishStore, "homeDishes"));
        }
    })
}
// פונקציה שפועלת בעת לחיצה כפתור הפעלת החיפוש
dom.btnSearch.onclick = (event) => {
    event.preventDefault();
    dom.dishStoresDiv.innerHTML = ""
    call("../../data/homeDishes.json", drawStoresCon);
}
//אירוע לחיצה על כפתור האיפוס - מביא את כל החנויות שבקטגוריה זו.
btnOff.onclick = () => {
    dom.dishStoresDiv.innerHTML = "";
    call("../../data/homeDishes.json", drawStores);
}
//פונקציה שמוצאת את החנות שהמשתמש בחר לקבל עליה פרטים 
const findCurrent = (stores, name) => {
    stores.forEach(store => {
        if (store.name === name) {
            drawCurrent(store, "homeDishes");


        }
    })
}
//  פונקציה שמבצעת קריאת שרת עבור החנות שהמשתמש בחר לקבל עליה פרטים 
const current = (name) => {
    dom.dishStoresDiv.innerHTML = "";
    call2("../../data/homeDishes.json", findCurrent, name);
}

//פונקציה זו מבצעת חיפוש של חנות שמוכרת את המוצר שה-label שלו נלחץ.
dom.labels.forEach(label => {
    {
        label.onclick = (event) => {
            dom.dishStoresDiv.innerHTML = "";
            event.preventDefault();
            call3("../../data/homeDishes.json", searchStoreWithProduct, label.innerHTML, "homeDishes");

        }
    }
})
//אירוע הקשת תו ע"י המשתמש לחיפוש החופשי - מפעיל חיפוש על  תוכן ה-input
dom.free.onkeydown = (event) => {
    dom.dishStoresDiv.innerHTML = "";
    call3("../../data/homeDishes.json", freeSearch, dom.free.value, "homeDishes");
}