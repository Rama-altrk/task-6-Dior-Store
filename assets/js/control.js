let init = [
    {
        id : "1" ,
        imgUrl : "https://www.dior.com/dw/image/v2/BGXS_PRD/on/demandware.static/-/Library-Sites-DiorSharedLibrary/default/dw3bb745b2/images/beauty/02-MAKEUP/2026/ADDICT/Y0000163_E000001063_E01_GHC.jpg?sw=640" ,
        name : "Lip Glow Oil" ,
        description : "24h Hydrating Lip Oil - 3 Ultra-Glossy Finishes 16 shades available" ,
        price : "42" ,
        category : "Make up" ,
    } ,
    {
        id : "2" ,
        imgUrl : "https://www.dior.com/dw/image/v2/BGXS_PRD/on/demandware.static/-/Sites-master_dior/default/dw69553985/Y0319000/Y0319000_E000001940_E01_GHC.jpg?sw=800" ,
        name : "Lip Maximizer" ,
        description : "24h Hydrating Lip Oil - 3 Ultra-Glossy Finishes 16 shades available" ,
        price : "42" ,
        category : "Make up" ,
    } ,
    {
        id : "3" ,
        imgUrl : "https://www.dior.com/dw/image/v2/BGXS_PRD/on/demandware.static/-/Sites-master_dior/default/dw6d4b95c3/Y0000002/Y0000002_E000000243_E01_GHC.jpg?sw=800" ,
        name : "Diorshow Overvolume" ,
        description : "24h Hydrating Lip Oil - 3 Ultra-Glossy Finishes 16 shades available" ,
        price : "38" ,
        category : "Make up" ,
    } ,
]

const list = document.querySelector(".list")
let cards = JSON.parse(localStorage.getItem("cards")) || init
let lastId = parseInt(localStorage.getItem("lastId")) || 3

const controlForm = document.querySelector("#controlForm")
const productUrl = document.querySelector("#imageProduct")
const productName = document.querySelector("#nameProduct")
const productDescription = document.querySelector("#descriptionProduct") 
const productPrice = document.querySelector("#priceProduct")
const productCategory = document.querySelector("#categoryOfProduct")



cards.forEach(card =>{
    localStorage.setItem("cards" , JSON.stringify(cards))
})

const read = () => {
    list.innerHTML= ""
    cards.forEach(oneOfList =>{
        list.innerHTML +=
            `<div class="oneOfList" id = "list${oneOfList.id}">
                    <img src="${oneOfList.imgUrl}" alt="${oneOfList.name}">
                    <p>${oneOfList.name}</p>
                    <p><span id="price">${oneOfList.price}</span>$</p>
                    <p>${oneOfList.category}</p>
                    <div class="editDelete">
                        <button class="edit" id="edit${oneOfList.id}"><i class="fa-solid fa-pen"></i></button>
                        <button class="delete" id="delete${oneOfList.id}"><i class="trash fa-solid fa-trash-can"></i></button>
                    </div>
                </div>
            `
    })
}

read()

controlForm.addEventListener("submit" , () =>{
    
    let newCard = {
        id : ++lastId,
        imgUrl : productUrl.value ,
        name : productName.value ,
        description : productDescription.value || "" , 
        price : productPrice.value , 
        category : productCategory.value
    }
    
    cards.push(newCard)
    localStorage.setItem("cards" , JSON.stringify(cards))
    localStorage.setItem("lastId" , lastId)
    productUrl.value = ""
    productName.value = ""
    productDescription.value = ""
    productPrice.value = ""
    
})

// edit product



list.addEventListener("click", (event) => {
    const editElement = event.target.closest(".edit") 
    // let editedProduct = []
    if (editElement) {
        
        const idEdit = editElement.getAttribute("id")
        console.log(idEdit);
        
        let arrayId = idEdit.split("edit")
        
    // }
    let finitId = parseInt(arrayId.join(""))
    console.log(finitId);
    
    let editedProduct = cards.find(card => card.id == finitId)
    console.log(editedProduct);
    controlForm.innerHTML = `
            <form action="" id="controlForm">
                <div class="formStyle">
                    <label for="nameProduct">Product Name:</label>
                    <input type="text" name="nameProduct" id="nameProduct" placeholder="enter your product name:" value="${editedProduct.name}" required>
                </div>
                <div class="formStyle">
                    <label for="priceProduct">Product Price:</label>
                    <input type="number" min="0" name="priceProduct" id="priceProduct" placeholder="enter your product price:" value="${editedProduct.price}" required>
                </div>
                <div class="formStyle">
                    <label for="descriptionProduct">Product Description:</label>
                    <input type="text" name="descriptionProduct" id="descriptionProduct" placeholder="enter product description:" value="${editedProduct.description}">
                </div>
                <div class="formStyle">
                    <label for="imageProduct">Product Image URL:</label>
                    <input type="url" name="imageProduct" id="imageProduct" placeholder="paste URL:" pattern="https?://.+" value="${editedProduct.imgUrl}" required>
                </div>
                <select name="categoryOfProduct" id="categoryOfProduct" required>
                    <option value="${editedProduct.category}">${editedProduct.category}</option>
                    <option value="">Select the product category:</option>
                    <option value="Makeup">Makeup</option>
                    <option value="Nail">Nail</option>
                    <option value="Perfume">Perfume</option>
                    <option value="Accessories">Accessories</option>
                </select>
                <input type="submit" value="Publish Product" id="add" class="myBottun addButton">
            </form>
    `
    }
})



// Delete product


list.addEventListener("click", (event) => {
    const deleteElement = event.target.closest(".delete")
    console.log(cards)
    if (deleteElement) {
        const idDelete = deleteElement.getAttribute("id")
        console.log(idDelete);
        let arrayId = idDelete.split("delete")
        let finitDelete = parseInt(arrayId.join(""))
        console.log(finitDelete);
        
        let deletedProduct = JSON.parse(localStorage.getItem(idDelete))
        console.log(deletedProduct)
        // let confirm = prompt("Are you sure you want to delete this product? enter 1 or 0")
        // if(confirm == 1){
            localStorage.removeItem(deletedProduct)
            cards = cards.filter(card => card.id !== finitDelete)
            
            localStorage.setItem("cards", JSON.stringify(cards))
            read()
            console.log(cards);
            
        // }
    }
})
