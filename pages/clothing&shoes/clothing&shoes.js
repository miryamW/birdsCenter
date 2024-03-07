const dom = {
    clothStoresDiv: document.getElementById("storesDiv"),
    userName: document.getElementById("user-name"),
    thisForm: document.thisform,
    btnOff: document.getElementById("btnOff"),
    btnSearch: document.getElementById("btnSearch"),
    searchInputs: {
        maxPrice: document.getElementById("maxPrice"),
        city: document.querySelector('select')
    },
    formData: {
        inputs: document.getElementById("inputs"),
    },
    labels: document.querySelectorAll('label'),
    free: document.getElementById("free-search"),
};
const userStr = localStorage.getItem(sessionStorage.getItem("email"));
const user = JSON.parse(userStr);
if (user != null)
  dom.userName.innerHTML = user.details.name;

for (let i = 0; i < dom.formData.inputs.childNodes.length; i++) {
    dom.formData.inputs.childNodes[i].checked = user.clothList.data[i];
}

dom.formData.inputs.childNodes.forEach(inp => {
    inp.onchange = function (event) {
        event.preventDefault();
        console.log(event.target.checked);
        for (let i = 0; i < dom.formData.inputs.childNodes.length; i++) {
            user.clothList.data[i] = dom.formData.inputs.childNodes[i].checked;
        }
        localStorage.setItem(sessionStorage.getItem("email"), JSON.stringify(user));
    }
})

const drawStores = (clothStores) => {
    console.log(clothStores[0]);
    clothStores.forEach((clothStore) => {
        dom.clothStoresDiv.appendChild(getStore(clothStore, "clothing&shoes"));
    })
}

call("../../data/clothing&shoes.json", drawStores);

const drawStoresCon = (clothStores) => {
    clothStores.forEach((clothStore) => {
        let flag = false;
        clothStore.branches.forEach(branch => {
            if (dom.searchInputs.city.value === branch.adress.city.id || dom.searchInputs.city.value === "0")
                flag = true;
        });
        console.log(flag);
        if (flag) {
            if (dom.searchInputs.maxPrice.value === "")
                dom.clothStoresDiv.appendChild(getStore(clothStore, "clothing&shoes"));
            else
                if (JSON.parse(dom.searchInputs.maxPrice.value) >= JSON.parse(clothStore.maximumprice))
                    dom.clothStoresDiv.appendChild(getStore(clothStore, "clothing&shoes"));
        }
    })
}

dom.btnSearch.onclick = (event) => {
    event.preventDefault();
    dom.clothStoresDiv.innerHTML = ""
    console.log(dom.searchInputs.city.value);
    call("../../data/clothing&shoes.json", drawStoresCon);
}
const findCurrent = (stores, name) => {
    stores.forEach(store => {
        if (store.name === name) {
            drawCurrent(store, "clothing&shoes");
        }
    })
}
//  פונקציה שמבצעת קריאת שרת עבור החנות שהמשתמש בחר לקבל עליה פרטים 
const current = (name) => {
    console.log("hello");
    dom.clothStoresDiv.innerHTML = "";
    call2("../../data/clothing&shoes.json", findCurrent, name);
}
//אירוע לחיצה על כפתור האיפוס - מביא את כל החנויות שבקטגוריה זו.
btnOff.onclick = () => {
    dom.clothStoresDiv.innerHTML = "";
    call("../../data/clothing&shoes.json", drawStores);
}

//פונקציה זו מבצעת חיפוש של חנות שמוכרת את המוצר שה-label שלו נלחץ.
dom.labels.forEach(label => {
    {
        label.onclick = (event) => {
            dom.clothStoresDiv.innerHTML = "";
            event.preventDefault();
            call3("../../data/clothing&shoes.json", searchStoreWithProduct, label.innerHTML, "clothing&shoes");
        }
    }
})

//אירוע הקשת תו ע"י המשתמש לחיפוש החופשי - מפעיל חיפוש על  תוכן ה-input
dom.free.onkeydown = (event) => {
    dom.clothStoresDiv.innerHTML = "";
    call3("../../data/clothing&shoes.json", freeSearch, dom.free.value, "clothing&shoes");
}

