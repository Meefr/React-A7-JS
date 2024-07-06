var products = null;
var productsContainer = document.getElementById("product-tabel-container");
var warningMessage = document.getElementById("warning-msg");
var tabelBody = document.getElementById("tabel-body");

function handelREnderData() {
  if (products && products.length !== 0) {
    productsContainer.classList.remove("d-none");
    productsContainer.classList.add("d-block");
    warningMessage.classList.add("d-none");
    warningMessage.classList.remove("d-block");
    var rows_eleemnts = "";

    for (var i = 0; i < products.length; i++) {
      rows_eleemnts += `
             <tr>
            <th>${i + 1}</th>
            <td>${products[i].name}</td>
            <td>${products[i].cat}</td>
            <td>${products[i].price}</td>
            <td>
            ${products[i].dec}
            </td>
            <td>
              <button class="btn btn-outline-success" onclick="editData(${i})">
                <i class="fa-solid fa-pen-to-square"></i>
              </button>
            </td>
            <td>
              <button class="btn btn-outline-danger" onclick="deleteData(${i})">
                <i class="fa-solid fa-trash"></i>
              </button>
            </td>
          </tr>
          
        `;
    }

    tabelBody.innerHTML = rows_eleemnts;
  } else {
    warningMessage.classList.remove("d-none");
    warningMessage.classList.add("d-block");
    productsContainer.classList.add("d-none");
    productsContainer.classList.remove("d-block");
  }
}
var productName = document.getElementById("product_name");
var productCat = document.getElementById("product_category");
var productPrice = document.getElementById("product_price");
var productDesc = document.getElementById("prodct_desc");

var createBtn = document.getElementById("create-btn");
var productForm = document.getElementById("product-form");

var isEditMode = false;
var editIndex = -1;

handelREnderData();

productForm.onsubmit = function (event) {
  event.preventDefault();

  var product = {
    name: productName.value,
    cat: productCat.value,
    price: productPrice.value,
    dec: productDesc.value,
  };

  if (isEditMode) {
    products[editIndex] = product;
    isEditMode = false;
    createBtn.innerText = "Add Product";
  } else {
    if (!products) {
      products = [];
    }
    products.push(product);
  }

  handelREnderData();
  productForm.reset();
};

function editData(id) {
  editIndex = id;
  productName.value = products[editIndex].name;
  productCat.value = products[editIndex].cat;
  productPrice.value = products[editIndex].price;
  productDesc.value = products[editIndex].dec;

  isEditMode = true;
  createBtn.innerText = "Update Product";
}

function deleteData(id) {
  Swal.fire({
    title: "Do you want to delete item ?",
    showDenyButton: false,
    showCancelButton: true,
    confirmButtonText: "Delete",
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      products.splice(id, 1);
      handelREnderData();
      Swal.fire("Deleted!", "", "success");
    } else if (result.isDenied) {
      Swal.fire("item didn't deleted", "", "info");
    }
  });
}
