// const form = document.getElementById("itemForm");

// const itemController = new ItemController()

// const displayItem = function(){

//     let itemArr = itemController.getLocalStorage()
    
//     itemRows.innerHTML = ''
//     itemArr.forEach(item => {
//         const table = document.getElementById("itemRows");
//         let row = table.insertRow(-1);
//         row.innerHTML = `
//         <td><img src="${item.url}"></td>
//         <td id=description-table>${item.description}</td>
//         <td>${item.category}</td>
//         <td>$${item.price}</td>
//         `
//         itemRows.append(row)
//     })
// }

// form.addEventListener("submit", function (event) {
//   // prevents the page from refreshing
//   event.preventDefault();
//   // console.log("hello")
//   const itemImageurl = document.getElementById("url").value;
//   const itemDescription = document.getElementById("description").value;
//   const itemCategory = document.getElementById("category").value;
//   const itemUnitPrice = document.getElementById("price").value;
//   // console.log(itemImageurl, itemDescription, itemCategory, itemUnitPrice)
  
//   itemController.addItem(itemImageurl, itemDescription, itemCategory, itemUnitPrice)
//   itemController.setLocalStorage()
//   // console.log(itemController.itemArray)
     
//   displayItem()

//   form.reset();
// });


document.getElementById('itemForm').addEventListener('submit', function(event) {
  event.preventDefault();
  submitForm();
});
// const form = document.getElementById('itemForm');
// form.addEventListener('submit', function(event){
//   event.preventDefault();
//   const payload = new FormData(form);

//   console.log([...payload])
//   submitForm();
// })
function submitForm() {
  const urlInput = document.getElementById('url').value;
  const descriptionInput = document.getElementById('description').value;
  const priceInput = parseFloat(document.getElementById('price').value);
  const categoryInput = document.getElementById('category').value;
  const sizeInput = document.getElementById('size').value;
  const quantityInput = parseInt(document.getElementById('quantity').value);

  const data = {
    url: urlInput,
    description: descriptionInput,
    price: priceInput,
    category: categoryInput,
    quantity: quantityInput,
    size: sizeInput
  };
fetch('http://localhost:8080/shopitem/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => {
        if (response.ok) {
          // Form submitted successfully
          console.log('Form submitted successfully');
        } else {
          // Handle error cases
          console.error('Error submitting the form');
        }
      })
      .catch(error => {
        console.error('Error submitting the form', error);
      });
    }
// function submitForm() {
//   const url = 'http://localhost:8080/shopitem/add';
//   const urlInput = document.getElementById('url').value;
//   const descriptionInput = document.getElementById('description').value;
//   const priceInput = document.getElementById('price').value;
//   const categoryInput = document.getElementById('category').value;

//   const data = {
//     url: urlInput,
//     description: descriptionInput,
//     price: priceInput,
//     category: categoryInput
//   };

//   fetch(url, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(data)
//   })
//     .then(response => {
//       if (response.ok) {
//         // Form submitted successfully
//         console.log('Form submitted successfully');
//       } else {
//         // Handle error cases
//         console.error('Error submitting the form');
//       }
//     })
//     .catch(error => {
//       console.error('Error submitting the form', error);
//     });
// }





// displayItem();
