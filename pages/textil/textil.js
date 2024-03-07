const dom = {
    searchForm: document.getElementById("search"),
    searchInputs: {
        maxPrice: document.getElementById("maxPrice"),
        city: document.querySelector('select')
    },
    btnSearch: document.getElementById("btnSearch"),
    userName: document.getElementById("user-name"),
    thisForm: document.thisform,
    formData: {
        inputs: document.getElementById("inputs")
    },
    storesDiv: document.getElementById("storesDiv"),
    labels: document.querySelectorAll('label'),
    free: document.getElementById("free-search"),
    bottom: document.getElementById("mapa")
};
const userStr = localStorage.getItem(sessionStorage.getItem("email"));
const user = JSON.parse(userStr);

dom.userName.innerHTML = user.details.name;
for (let i = 0; i < dom.formData.inputs.childNodes.length; i++) {
    dom.formData.inputs.childNodes[i].checked = user.textilList.data[i];
}
dom.formData.inputs.childNodes.forEach(inp => {
    inp.onchange = function (event) {
        event.preventDefault();
        for (let i = 0; i < dom.formData.inputs.childNodes.length; i++) {
            user.textilList.data[i] = dom.formData.inputs.childNodes[i].checked;
        }
        localStorage.setItem(sessionStorage.getItem("email"), JSON.stringify(user));
    }
})



const drawStores = (textilStores) => {
    textilStores.forEach((textilStore) => {
        dom.storesDiv.appendChild(getStore(textilStore, "textil"));
    })
}

call("../../data/textil.json", drawStores);
const drawStoresCon = (textilStores) => {

    textilStores.forEach((textilStore) => {
        let flag = false;
        textilStore.branches.forEach(branch => {
            if (dom.searchInputs.city.value === branch.adress.city.id || dom.searchInputs.city.value === "0")
                flag = true;
        });
        console.log(flag);
        if (flag) {
            if (dom.searchInputs.maxPrice.value === "")
                dom.storesDiv.appendChild(getStore(textilStore, "textil"));
            else
                if (JSON.parse(dom.searchInputs.maxPrice.value) >= JSON.parse(textilStore.maximumprice))
                    dom.storesDiv.appendChild(getStore(textilStore, "textil"));
        }
    })
}

dom.btnSearch.onclick = (event) => {
    event.preventDefault();
    dom.storesDiv.innerHTML = ""
    console.log(dom.searchInputs.city.value);
    call("../../data/textil.json", drawStoresCon);
}
//אירוע לחיצה על כפתור האיפוס - מביא את כל החנויות שבקטגוריה זו.
btnOff.onclick = () => {
    dom.storesDiv.innerHTML = "";
    call("../../data/textil.json", drawStores);
}
const findCurrent = (stores, name) => {
    stores.forEach(store => {
        if (store.name === name) {
            drawCurrent(store, "textil");


        }
    })
}
//  פונקציה שמבצעת קריאת שרת עבור החנות שהמשתמש בחר לקבל עליה פרטים 
const current = (name) => {
    dom.storesDiv.innerHTML = "";
    call2("../../data/textil.json", findCurrent, name);
}
//פונקציה זו מבצעת חיפוש של חנות שמוכרת את המוצר שה-label שלו נלחץ.
dom.labels.forEach(label => {
    {
        label.onclick = (event) => {
            dom.storesDiv.innerHTML = "";
            event.preventDefault();
            call3("../../data/textil.json", searchStoreWithProduct, label.innerHTML, "textil");

        }
    }
})
//אירוע הקשת תו ע"י המשתמש לחיפוש החופשי - מפעיל חיפוש על  תוכן ה-input
dom.free.onkeydown = (event) => {
    dom.storesDiv.innerHTML = "";
    call3("../../data/textil.json", freeSearch, dom.free.value, "textil");
}





