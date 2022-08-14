var productName = document.getElementById("productName")
var productPrice = document.getElementById("productPrice")
var productCategory = document.getElementById("productCategory")
var productDescription = document.getElementById("productDescription")
var mybtn = document.getElementById("mybtn")
var searchInput = document.getElementById("search");
var currentIndex = 0;

var productContainer;
if (localStorage.getItem("productData") == null) {
    productContainer = [];
}
else {
    productContainer = JSON.parse(localStorage.getItem("productData"))
    displayData();
}
function add() {
    if (mybtn.innerHTML == "Add Product") {
        addProduct()
    }
    else {
        edite()
    }
}
function addProduct() {
    if (validateProductName() && ValidatePrice()) {
        var product = {
            name: productName.value,
            price: productPrice.value,
            category: productCategory.value,
            description: productDescription.value,
        }
        productContainer.push(product);
        localStorage.setItem("productData", JSON.stringify(productContainer))
        displayData();
        clearform();
    }

    else {
        return false;
    }




}

function clearform() {
    productName.value = "";
    productPrice.value = "";
    productCategory.value = "";
    productDescription.value = "";

}
function displayData() {
    var cartona = "";

    for (i = 0; i < productContainer.length; i++) {
        cartona += ` <tr>
        <td>${i}</td>
        <td>${productContainer[i].name}</td>
        <td>${productContainer[i].price}</td>
        <td>${productContainer[i].category}</td>
        <td> ${productContainer[i].description}</td>
        <td> <button class="btn btn-warning" onclick="UpdateData(${i})">Update</button></td>
        <td> <button class="btn btn-danger" onclick="deleteProduct(${i})">Delete</button></td>
    </tr>`
    }
    document.getElementById("tableBody").innerHTML = cartona;


}
function deleteProduct(index) {
    productContainer.splice(index, 1);
    displayData();
}
function UpdateData(index) {
    currentIndex = index;
    productName.value = productContainer[index].name;
    productPrice.value = productContainer[index].price;
    productCategory.value = productContainer[index].category;
    productDescription.value = productContainer[index].description;
    mybtn.innerHTML = "update Data";



}
function edite() {
    productContainer[currentIndex].name = productName.value;
    productContainer[currentIndex].price = productPrice.value;
    productContainer[currentIndex].category = productCategory.value;
    productContainer[currentIndex].description = productDescription.value;
    mybtn.innerHTML = "add Product";
    clearform()
    displayData();



}
function search(trim) {
    var temp = "";
    for (var i = 0; i < productContainer.length; i++) {
        if (productContainer[i].name.toLowerCase().includes(trim.toLowerCase()) == true) {
            temp += ` <tr>
            <td>${i}</td>
            <td>${productContainer[i].name}</td>
            <td>${productContainer[i].price}</td>
            <td>${productContainer[i].category}</td>
            <td> ${productContainer[i].description}</td>
            <td> <button class="btn btn-warning" onclick="UpdateData(${i})">Update</button></td>
            <td> <button class="btn btn-warning" onclick="deleteProduct(${i})">Delete</button></td>
        </tr>`
        }
        else {
            console.log("not include")
        }
        document.getElementById("tableBody").innerHTML = temp;

    }


}

function validateProductName() {
    var regex = /^[A-Z][a-z]{3,8}$/
    if (regex.test(productName.value)) {
        document.getElementById("vallidNameAlert").style.display = "none"
        return true;

    }
    else {
        document.getElementById("vallidNameAlert").style.display = "block"

        return false;
    }
}
function ValidatePrice() {
    var regexPrice = /^[0-9]{1,5}$/
    if (regexPrice.test(productPrice.value)) {
        document.getElementById("vallidPriceAlert").style.display = "none"
        return true;
    }
    else {
        document.getElementById("vallidPriceAlert").style.display = "block"
        return false;
    }
}


