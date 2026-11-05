let editId = null;


// ----------------------------------
// GET ALL PRODUCTS
// ----------------------------------

async function getProducts() {

    const response = await fetch("/products");

    const data = await response.json();

    displayProducts(data);
}


// ----------------------------------
// DISPLAY PRODUCTS
// ----------------------------------

function displayProducts(products) {

    const productList =
        document.getElementById("productList");

    productList.innerHTML = "";


    products.forEach((product) => {

        const row = document.createElement("tr");


        row.innerHTML = `

            <td>${product.name}</td>

            <td>₹${product.price}</td>

            <td>${product.quantity}</td>

            <td>

                <button
                    onclick="viewProduct('${product._id}')">
                    View
                </button>

                <button
                    onclick="editProduct('${product._id}')">
                    Edit
                </button>

                <button
                    onclick="deleteProduct('${product._id}')">
                    Delete
                </button>

            </td>

        `;


        productList.appendChild(row);

    });
}


// ----------------------------------
// SHOW ADD FORM
// ----------------------------------

function showAddForm() {

    editId = null;

    document.getElementById("formTitle")
        .innerText = "Add Product";


    document.getElementById("name")
        .value = "";

    document.getElementById("description")
        .value = "";

    document.getElementById("price")
        .value = "";

    document.getElementById("quantity")
        .value = "";


    document.getElementById("formSection")
        .style.display = "block";
}


// ----------------------------------
// CANCEL FORM
// ----------------------------------

function cancelForm() {

    document.getElementById("formSection")
        .style.display = "none";

}


// ----------------------------------
// SAVE PRODUCT
// ----------------------------------

async function saveProduct() {

    const name =
        document.getElementById("name").value;

    const description =
        document.getElementById("description").value;

    const price =
        document.getElementById("price").value;

    const quantity =
        document.getElementById("quantity").value;


    if (
        name === "" ||
        description === "" ||
        price === "" ||
        quantity === ""
    ) {

        alert("Please fill all fields");

        return;
    }


    const product = {

        name: name,

        description: description,

        price: price,

        quantity: quantity

    };


    // ----------------------------------
    // ADD
    // ----------------------------------

    if (editId === null) {

        const response = await fetch(
            "/products",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(product)
            }
        );


        const data = await response.json();

        alert(data.message);

    }


    // ----------------------------------
    // UPDATE
    // ----------------------------------

    else {

        const response = await fetch(
            `/products/${editId}`,
            {
                method: "PUT",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(product)
            }
        );


        const data = await response.json();

        alert(data.message);

    }


    cancelForm();

    getProducts();
}


// ----------------------------------
// VIEW PRODUCT
// ----------------------------------

async function viewProduct(id) {

    const response = await fetch(
        `/products/${id}`
    );

    const product = await response.json();


    const details =
        document.getElementById("productDetails");


    details.innerHTML = `

        <h2>Product Details</h2>

        <p>
            <b>Name:</b>
            ${product.name}
        </p>

        <p>
            <b>Description:</b>
            ${product.description}
        </p>

        <p>
            <b>Price:</b>
            ₹${product.price}
        </p>

        <p>
            <b>Quantity:</b>
            ${product.quantity}
        </p>

        <p>
            <b>Created At:</b>
            ${product.createdAt}
        </p>

        <button onclick="closeDetails()">
            Back to Products
        </button>

    `;


    details.style.display = "block";
}


// ----------------------------------
// CLOSE DETAILS
// ----------------------------------

function closeDetails() {

    document.getElementById("productDetails")
        .style.display = "none";
}


// ----------------------------------
// EDIT PRODUCT
// ----------------------------------

async function editProduct(id) {

    const response = await fetch(
        `/products/${id}`
    );

    const product = await response.json();


    editId = id;


    document.getElementById("formTitle")
        .innerText = "Update Product";


    document.getElementById("name")
        .value = product.name;


    document.getElementById("description")
        .value = product.description;


    document.getElementById("price")
        .value = product.price;


    document.getElementById("quantity")
        .value = product.quantity;


    document.getElementById("formSection")
        .style.display = "block";
}


// ----------------------------------
// DELETE PRODUCT
// ----------------------------------

async function deleteProduct(id) {

    const answer =
        confirm("Are you sure you want to delete this product?");


    if (!answer) {

        return;

    }


    const response = await fetch(
        `/products/${id}`,
        {
            method: "DELETE"
        }
    );


    const data = await response.json();


    alert(data.message);


    getProducts();
}


// ----------------------------------
// SEARCH PRODUCT
// ----------------------------------

async function searchProduct() {

    const name =
        document.getElementById("search").value;


    if (name === "") {

        alert("Enter product name");

        return;

    }


    const response = await fetch(
        `/search?name=${encodeURIComponent(name)}`
    );


    const data = await response.json();


    displayProducts(data);


    if (data.length === 0) {

        alert("Product not found");

    }
}


// ----------------------------------
// LOAD PRODUCTS WHEN PAGE OPENS
// ----------------------------------

getProducts();