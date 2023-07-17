const form = document.getElementById("itemForm");
const itemController = new ItemController();
const displayItems = async () => {
  try {
    const items = await itemController.getItemsFromBackend();

    const itemRows = document.getElementById("itemRows");
    itemRows.innerHTML = '';

    items.forEach(item => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td><img src="${item.url}" alt="Item Image"></td>
        <td>${item.description}</td>
        <td>${item.category}</td>
        <td>$${item.price}</td>
      `;
      itemRows.appendChild(row);
    });
  } catch (error) {
    console.error("An error occurred while displaying items:", error);
  }
};

displayItems();


document.getElementById('itemForm').addEventListener('submit', function(event) {
  event.preventDefault();
  submitForm();
});
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

