//ייבוא כל האלמנטים הנצרכים מה-document
const dom = {
    menuButton: document.getElementById("menu"),
    menuDiv: document.getElementById("the-menu"),
    userName: document.getElementById("user-name"),
    formData: {
        homeDishesForm:
            document.getElementById("hd"),
        textilForm:
            document.getElementById("te"),
        clothForm:
            document.getElementById("cs"),
        makeUpForm:
            document.getElementById("mu"),
        wigsForm:
            document.getElementById("w"),
        myfavorite: {
            homeDishes: document.getElementById("homeDishes"),
            textil: document.getElementById("textil"),
            cloth: document.getElementById("cloth"),
            makeUp: document.getElementById("makeUp"),
            wigs: document.getElementById("wigs")
        }
    },
    count: {
        days: document.getElementById("wedding-days"),
        countProducts: document.getElementById("count-products"),
        maxProducts: document.getElementById("max-products"),
        minProducts: document.getElementById("min-products"),
        avgProducts: document.getElementById("avg-products")
    }

};
dom.menuButton.onclick = (event) => {
    event.preventDefault();
    if (dom.menuDiv.style.visibility === "hidden")
        dom.menuDiv.style.visibility = "visible";
    else
        dom.menuDiv.style.visibility = "hidden"
}
const userStr = localStorage.getItem(sessionStorage.getItem("email"));
const user = JSON.parse(userStr);
dom.userName.innerHTML = user.details.name;
let cProducts = 70;
let max = 0;
let maxCat = "";
let min = 20;
let minCat = "";
let countThis = 0;
const checkList = (form, list, type) => {
    countThis = 0;
    for (let i = 0; i < form.childNodes.length; i++) {
        if (list.data[i] === true) {
            countThis++;
            cProducts--;
        }
        form.childNodes[i].checked = list.data[i];
    }
    if (countThis > max) {
        max = countThis;
        maxCat = type;
    }
    if (countThis < min) {
        min = countThis;
        minCat = type;
    }
}
checkList(dom.formData.clothForm, user.clothList, "הלבשה והנעלה");
checkList(dom.formData.homeDishesForm, user.homeDishesList, "כלי בית");
checkList(dom.formData.makeUpForm, user.makeUpList, "איפור");
checkList(dom.formData.textilForm, user.textilList, "נדוניה");
checkList(dom.formData.wigsForm, user.wigsList, "פיאות");

dom.formData.homeDishesForm.childNodes.forEach(inp => {

    inp.onchange = function (event) {
        event.preventDefault();
        for (let i = 0; i < dom.formData.homeDishesForm.childNodes.length; i++) {
            user.homeDishesList.data[i] = dom.formData.homeDishesForm.childNodes[i].checked;
        }
        localStorage.setItem(sessionStorage.getItem("email"), JSON.stringify(user));
        let url = new URL(location);//רענון הדף
        location.href = url;
    }
})
dom.formData.textilForm.childNodes.forEach(inp => {
    inp.onchange = function (event) {
        event.preventDefault();
        for (let i = 0; i < dom.formData.textilForm.childNodes.length; i++) {
            user.textilList.data[i] = dom.formData.textilForm.childNodes[i].checked;
        }
        localStorage.setItem(sessionStorage.getItem("email"), JSON.stringify(user));
        let url = new URL(location);//רענון הדף
        location.href = url;
    }
})
dom.formData.clothForm.childNodes.forEach(inp => {
    inp.onchange = function (event) {
        event.preventDefault();
        for (let i = 0; i < dom.formData.clothForm.childNodes.length; i++) {
            user.clothList.data[i] = dom.formData.clothForm.childNodes[i].checked;
        }
        localStorage.setItem(sessionStorage.getItem("email"), JSON.stringify(user));
        let url = new URL(location);//רענון הדף
        location.href = url;
    }
})
dom.formData.makeUpForm.childNodes.forEach(inp => {
    inp.onchange = function (event) {
        event.preventDefault();
        for (let i = 0; i < dom.formData.makeUpForm.childNodes.length; i++) {
            user.makeUpList.data[i] = dom.formData.makeUpForm.childNodes[i].checked;
        }
        localStorage.setItem(sessionStorage.getItem("email"), JSON.stringify(user));
        let url = new URL(location);//רענון הדף
        location.href = url;

    }
})
dom.formData.wigsForm.childNodes.forEach(inp => {
    inp.onchange = function (event) {
        event.preventDefault();
        for (let i = 0; i < dom.formData.wigsForm.childNodes.length; i++) {
            user.wigsList.data[i] = dom.formData.wigsForm.childNodes[i].checked;
        }
        localStorage.setItem(sessionStorage.getItem("email"), JSON.stringify(user));
        let url = new URL(location);//רענון הדף
        location.href = url;
    }
})

const drawLikes = () => {
    user.favoriteList.my.forEach(store => {

        const logo = document.createElement('div');
        logo.style.backgroundImage = `url("../../assets/${store.type}/${store.img}")`;
        logo.innerHTML = "למחיקה";
        logo.onclick = (event) => {
            event.preventDefault();
            const newLikes = [];
            let j = 0;
            for (let i = 0; i < user.favoriteList.my.length; i++) {
                if (user.favoriteList.my[i].img != store.img)
                    newLikes[j++] = user.favoriteList.my[i];
            }
            console.log(newLikes);
            user.favoriteList.my = newLikes;
            console.log(user.favoriteList.my);
            localStorage.setItem(sessionStorage.getItem("email"), JSON.stringify(user));
            dom.formData.myfavorite.textil.innerHTML = "";
            dom.formData.myfavorite.homeDishes.innerHTML = "";
            dom.formData.myfavorite.cloth.innerHTML = "";
            dom.formData.myfavorite.makeUp.innerHTML = "";
            dom.formData.myfavorite.wigs.innerHTML = "";
            console.log("hello");
            drawLikes();


        }
        switch (store.type) {
            case "homeDishes":
                dom.formData.myfavorite.homeDishes.appendChild(logo);
                break;
            case "textil":
                {
                    dom.formData.myfavorite.textil.appendChild(logo);
                    break;
                }
            case "clothing&shoes":
                {
                    dom.formData.myfavorite.cloth.appendChild(logo);
                    break;
                }
            case "makeUp":
                {
                    dom.formData.myfavorite.makeUp.appendChild(logo);
                    break;
                }
            case "wigs":
                {
                    dom.formData.myfavorite.wigs.appendChild(logo);
                    break;
                }
        }

    })
}
drawLikes();
const today = new Date();
const wedDate = new Date(user.details.weddingDate);
const diff = wedDate - today;
const dayDiff = diff / (1000 * 60 * 60 * 24);
const final = dayDiff - dayDiff % 1;
dom.count.days.innerHTML = `${final} ימים`;
dom.count.countProducts.innerHTML = cProducts;
dom.count.maxProducts.innerHTML = `${maxCat}- ${max}`;
dom.count.minProducts.innerHTML = `${minCat}- ${min}`;
dom.count.avgProducts.innerHTML = (70 - cProducts) / 5;