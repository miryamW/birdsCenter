const dom = {
    container: document.getElementById("contain"),
    searchForm: document.getElementById("search"),
    btnSearch: document.getElementById("btnSearch"),
    searchInputs: {
        maxPrice: document.getElementById("maxPrice"),
        city: document.querySelector('select')
    },
    makeUpStoresDiv: document.getElementById("storesDiv"),
    userName: document.getElementById("user-name"),
    thisForm: document.thisform,
    formData: {
        inputs: document.getElementById("inputs")
    },
    labels: document.querySelectorAll('label'),
    free: document.getElementById("free-search"),
    bottom: document.getElementById("mapa")
};
const userStr = localStorage.getItem(sessionStorage.getItem("email"));
const user = JSON.parse(userStr);
dom.userName.innerHTML = user.details.name;
for (let i = 0; i < dom.formData.inputs.childNodes.length; i++) {
    dom.formData.inputs.childNodes[i].checked = user.makeUpList.data[i];
}
dom.formData.inputs.childNodes.forEach(inp => {
    inp.onchange = function (event) {
        event.preventDefault();
        for (let i = 0; i < dom.formData.inputs.childNodes.length; i++) {
            user.makeUpList.data[i] = dom.formData.inputs.childNodes[i].checked;
        }
        localStorage.setItem(sessionStorage.getItem("email"), JSON.stringify(user));
    }
})

const drawStores = (makeUpStores) => {
    makeUpStores.forEach((makeUpStore) => {
        dom.makeUpStoresDiv.appendChild(getStore(makeUpStore, "makeUp"));
    })
}
call("../../data/makeup.json", drawStores);

const drawStoresCon = (makeUpStores) => {

    makeUpStores.forEach((makeUpStore) => {
        let flag = false;
        makeUpStore.branches.forEach(branch => {
            if (dom.searchInputs.city.value === branch.adress.city.id || dom.searchInputs.city.value === "0")
                flag = true;
        });
        console.log(makeUpStore.maximumprice);
        if (flag) {
            if (dom.searchInputs.maxPrice.value === "")
                dom.makeUpStoresDiv.appendChild(getStore(makeUpStore, "makeUp"));
            else
                if (JSON.parse(dom.searchInputs.maxPrice.value) >= JSON.parse(makeUpStore.maximumprice))
                    dom.makeUpStoresDiv.appendChild(getStore(makeUpStore, "makeUp"));
        }
        })
}

dom.btnSearch.onclick = (event) => {
    event.preventDefault();
    dom.makeUpStoresDiv.innerHTML = ""
    console.log(dom.searchInputs.city.value);
    console.log("hello");
    call("../../data/makeup.json", drawStoresCon);
}

//אירוע לחיצה על כפתור האיפוס - מביא את כל החנויות שבקטגוריה זו.
btnOff.onclick = () => {
    dom.makeUpStoresDiv.innerHTML = "";
    call("../../data/makeUp.json", drawStores);
}
const findCurrent = (stores, name) => {
    stores.forEach(store => {
        if (store.name === name) {
            drawCurrent(store, "makeUp");
        }
    })
}
//  פונקציה שמבצעת קריאת שרת עבור החנות שהמשתמש בחר לקבל עליה פרטים 
const current = (name) => {
    dom.makeUpStoresDiv.innerHTML = "";
    call2("../../data/makeUp.json", findCurrent, name);
}

//פונקציה זו מבצעת חיפוש של חנות שמוכרת את המוצר שה-label שלו נלחץ.
dom.labels.forEach(label => {
    {
        label.onclick = (event) => {
            dom.makeUpStoresDiv.innerHTML = "";
            event.preventDefault();
            call3("../../data/makeUp.json", searchStoreWithProduct, label.innerHTML, "makeUp");

        }
    }
})
//אירוע הקשת תו ע"י המשתמש לחיפוש החופשי - מפעיל חיפוש על  תוכן ה-input
dom.free.onkeydown = (event) => {
    dom.makeUpStoresDiv.innerHTML = "";
    call3("../../data/makeUp.json", freeSearch, dom.free.value, "makeUp");
}
