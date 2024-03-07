const dom = {
    formSearch: document.search,
    searchData: {
        btnSearch: document.getElementById("btnSearch"),
        cityInput: document.getElementById("city-choose"),
        priceInput: document.getElementById("maxPrice")
    },

    userName: document.getElementById("user-name"),
    thisForm: document.thisform,
    formData: {
        inputs: document.getElementById("inputs"),
    },
    wigMakersDiv: document.getElementById("storesDiv"),
    labels: document.querySelectorAll('label'),
    free: document.getElementById("free-search"),
    bottom: document.getElementById("mapa")
};
const userStr = localStorage.getItem(sessionStorage.getItem("email"));
const user = JSON.parse(userStr);
if (user != null) {
    dom.userName.innerHTML = user.details.name;

    for (let i = 0; i < dom.formData.inputs.childNodes.length; i++) {
        dom.formData.inputs.childNodes[i].checked = user.wigsList.data[i];
    }
    dom.formData.inputs.childNodes.forEach(inp => {
        inp.onchange = function (event) {
            event.preventDefault();
            for (let i = 0; i < dom.formData.inputs.childNodes.length; i++) {
                user.wigsList.data[i] = dom.formData.inputs.childNodes[i].checked;
            }
            localStorage.setItem(sessionStorage.getItem("email"), JSON.stringify(user));
        }
    })
}
const drawStores = (wigMakers) => {
    wigMakers.forEach((wigMaker) => {
        dom.wigMakersDiv.appendChild(getStore(wigMaker, "wigs"));
    })
}
call("../../data/wigs.json", drawStores);
const drawWigMakersCon = (wigMakers) => {

    wigMakers.forEach((wigMaker) => {
        let flag = false;
        wigMaker.branches.forEach(branch => {
            if (dom.searchData.cityInput.value === branch.adress.city.id || dom.searchData.cityInput.value === "0")
                flag = true;
        });

        if (flag) {
            if (dom.searchData.priceInput.value === "")
                dom.wigMakersDiv.appendChild(getStore(wigMaker, "wigs"));
            else
                if (JSON.parse(dom.searchData.priceInput.value) > JSON.parse(wigMaker.maximumprice))
                    dom.wigMakersDiv.appendChild(getStore(wigMaker, "wigs"));
        }

    })
}

dom.searchData.btnSearch.onclick = (event) => {
    event.preventDefault();
    dom.wigMakersDiv.innerHTML = ""
    call("../../data/wigs.json", drawWigMakersCon);
}

const findCurrent = (stores, name) => {
    stores.forEach(store => {
        if (store.name === name) {
            drawCurrent(store, "wigs");
        }
    })
}
//אירוע לחיצה על כפתור האיפוס - מביא את כל החנויות שבקטגוריה זו.
btnOff.onclick = () => {
    dom.wigMakersDiv.innerHTML = "";
    call("../../data/wigs.json", drawStores);
}
//  פונקציה שמבצעת קריאת שרת עבור החנות שהמשתמש בחר לקבל עליה פרטים 
const current = (name) => {
    dom.wigMakersDiv.innerHTML = "";
    call2("../../data/wigs.json", findCurrent, name);
}
//פונקציה זו מבצעת חיפוש של חנות שמוכרת את המוצר שה-label שלו נלחץ.
dom.labels.forEach(label => {
    {
        label.onclick = (event) => {
            dom.wigMakersDiv.innerHTML = "";
            event.preventDefault();
            call3("../../data/wigs.json", searchStoreWithProduct, label.innerHTML, "homeDishes");

        }
    }
})
//אירוע הקשת תו ע"י המשתמש לחיפוש החופשי - מפעיל חיפוש על  תוכן ה-input
dom.free.onkeydown = (event) => {
    dom.wigMakersDiv.innerHTML = "";
    call3("../../data/wigs.json", freeSearch, dom.free.value, "wigs");
}
