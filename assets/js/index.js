//تخزين البيانات باللوكل ستورج
let init = [
    {
        id : "1" ,
        imgUrl : "https://www.dior.com/dw/image/v2/BGXS_PRD/on/demandware.static/-/Library-Sites-DiorSharedLibrary/default/dw3bb745b2/images/beauty/02-MAKEUP/2026/ADDICT/Y0000163_E000001063_E01_GHC.jpg?sw=640" ,
        name : "Lip Glow Oil" ,
        description : "24h Hydrating Lip Oil - 3 Ultra-Glossy Finishes 16 shades available" ,
        price : "42" ,
        category : "Makeup" 
    } ,
    {
        id : "2" ,
        imgUrl : "https://www.dior.com/dw/image/v2/BGXS_PRD/on/demandware.static/-/Sites-master_dior/default/dw69553985/Y0319000/Y0319000_E000001940_E01_GHC.jpg?sw=800" ,
        name : "Lip Maximizer" ,
        description : "24h Hydrating Lip Oil - 3 Ultra-Glossy Finishes 16 shades available" ,
        price : "42" ,
        category : "Makeup" 
    } ,
    {
        id : "3" ,
        imgUrl : "https://www.dior.com/dw/image/v2/BGXS_PRD/on/demandware.static/-/Sites-master_dior/default/dw6d4b95c3/Y0000002/Y0000002_E000000243_E01_GHC.jpg?sw=800" ,
        name : "Diorshow Overvolume" ,
        description : "24h Hydrating Lip Oil - 3 Ultra-Glossy Finishes 16 shades available" ,
        price : "38" ,
        category : "Makeup" 
    } ,
    {
        id : "4" ,
        imgUrl : "https://www.dior.com/dw/image/v2/BGXS_PRD/on/demandware.static/-/Sites-master_dior/default/dwc6ed50e7/Y0381009/Y0381009_C038100849_E01_GHC.jpg?sw=800" ,
        name : "Dior Vernis" ,
        description : "24h Hydrating Lip Oil - 3 Ultra-Glossy Finishes 16 shades available" ,
        price : "34" ,
        category : "Nail" 
    } ,
]
const all = document.querySelector(".all")
let cards = JSON.parse(localStorage.getItem("cards")) || init

if(localStorage.getItem("cards") == null){
    cards.forEach(card =>{
        localStorage.setItem("cards" , JSON.stringify(cards))
    })
    localStorage.setItem("lastId", init.length); 
    cards = init
    lastId = init.length
    console.log("test");
}
read()

const read = () => {
    all.innerHTML= ""
    cards.forEach(card =>{
        all.innerHTML +=
            `<div class="publicCard">
                <img src="${card.imgUrl}" alt="${card.name}">
                <div class="description">
                    <h4>${card.name}</h4>
                    <p class="secondryDescription">${card.description || ""}</p>
                    <p><span class="price">${card.price}</span>$</p>
                </div>
            </div>
            `
    })
}

read()

let filteredCard = []

// الفلترة حسب الاسم 
const nameSearch = document.querySelector("#textSearch")
nameSearch.addEventListener("input" , () => {
    const searchValue = event.target.value.toLowerCase()
    filteredCard = cards.filter(cards => {return card.name.toLowerCase()})
    read(filteredCard)
    
})

//عرض المنتجات بعد الفلترة
// const allFilter = document.querySelector(".all")

const showFilteredCard = (cardDisplay) =>{
    if (!all) return;

    all.innerHTML = ""
    if (cardDisplay.length == 0) {
        all.innerHTML = `<p>No products found</p>`;
        return
    }
    
        cardDisplay.forEach(card => {
            all.innerHTML +=
                `<div class="publicCard">
                    <img src="${card.imgUrl}" alt="${card.name}">
                    <div class="description">
                        <h4>${card.name}</h4>
                        <p class="secondryDescription">${card.description || ""}</p>
                        <p><span class="price">${card.price}</span>$</p>
                    </div>
                </div>
                `
        })
    }
// read(filteredCard)


const categoryFilter = document.querySelector(".categories")
categoryFilter.addEventListener("click" , (event) => {
    const clickButton = event.target.closest(".myBottun")

    if (clickButton) {
        const selectedCategory = clickButton.getAttribute("value")
        
        if (selectedCategory == "") {
            showFilteredCard(cards)
            return
        }

        const filteredResult = cards.filter(card => card.category.toLowerCase() === selectedCategory.toLowerCase())
        showFilteredCard(filteredResult)

    }
})


//الترتيب التصاعدي و التنازلي

const sorted = document.querySelector("#orderedByPrice")

sorted.addEventListener("change" , (event) =>{
    const sortedValue = event.target.value

    let result = [...cards]
    if (sortedValue == "Ascending") {
        result.sort((a, b) => parseInt(a.price) - parseInt(b.price))
    }
    else if(sortedValue == "Descending"){
        result.sort((a, b) => parseInt(b.price) - parseInt(a.price))
    }

    showFilteredCard(result);
})

// السلايدر


const left = document.querySelector(".left")
const right = document.querySelector(".right")
const cardsSlider = document.querySelector(".cards")
const sliders = document.querySelectorAll(".silderCard")
let count = 0


const readSlider = () => {
    cardsSlider.innerHTML= ""
    cards.forEach(card =>{
        cardsSlider.innerHTML +=
            `<div class="silderCard">
                <img src="${card.imgUrl}" alt="${card.name}">
                <h4>${card.name}</h4>
                <p><span>${card.price}</span>$</p>
            </div>
            `
    })
}


left.addEventListener("click" , () =>{
    if (count == cards.length-4) {
        count = 0
    } else {
        count++
    }
    const sliders = document.querySelectorAll(".silderCard")
    sliders.forEach(slide => {
        slide.style.transform = `translateX(calc(${count} *(-100% - 10px)) )`
        console.log("leftTest");
        
    })
})



right.addEventListener("click" , () =>{
    if (count == 0) {
        count = cards.length-4
    } else {
        count--
    }
    const sliders = document.querySelectorAll(".silderCard")
    sliders.forEach(slide => {
        slide.style.transform = `translateX(calc(${count} *(-100% - 10px)) )`
        console.log("rightTest");
        
    })
})

readSlider()

const reset = document.querySelector("#reset")
reset.addEventListener("click" , ()=>{
    localStorage.clear
    console.log("done")
    
})