if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    let removeCartItemButtons = document.getElementsByClassName('btn-danger')
    for (let i = 0; i < removeCartItemButtons.length; i++) {
        let button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    let quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (let i = 0; i < quantityInputs.length; i++) {
        let input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    let addToCartButtons = document.getElementsByClassName('shop-item-button')
    for (let i = 0; i < addToCartButtons.length; i++) {
        let button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

    document.getElementsByClassName('checkout')[0].addEventListener('click', purchaseClicked)

    // Retrieve and populate cart data from sessionStorage
    populateCartData();
}

function purchaseClicked() {
    alert('Thank you for your purchase')
    let cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal();

    // Clear cart data in sessionStorage
    sessionStorage.removeItem('cartData');
}

function removeCartItem(event) {
    let buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal();

    // Update cart data in sessionStorage
    updateCartData();
}

function quantityChanged(event) {
    let input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal();

    // Update cart data in sessionStorage
    updateCartData();
}

function addToCartClicked(event) {
    let button = event.target
    let shopItem = button.parentElement.parentElement
    let title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    let price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    let imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
    addItemToCart(title, price, imageSrc)
    updateCartTotal();

    // Update cart data in sessionStorage
    updateCartData();
}

function addItemToCart(title, price, imageSrc) {
    let cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    let cartItems = document.getElementsByClassName('cart-items')[0]
    let cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for (let i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('This item is already added to the cart')
            return
        }
    }
    let cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
    updateCartData();
}

function updateCartTotal() {
    let cartItemContainer = document.getElementsByClassName('cart-items')[0];
    let cartRows = cartItemContainer.getElementsByClassName('cart-row');
    let subtotal = 0;
    let taxRate = 0.06;
    let totalQuantity = 0; // Add this line to track the total quantity

    for (let i = 0; i < cartRows.length; i++) {
        let cartRow = cartRows[i];
        let priceElement = cartRow.getElementsByClassName('cart-price')[0];
        let quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0];
        let price = parseFloat(priceElement.innerText.replace('$', ''));
        let quantity = quantityElement.value;
        subtotal += price * quantity;
        totalQuantity += parseInt(quantity); // Add this line to calculate the total quantity
    }

    let taxAmount = subtotal * taxRate;
    let total = subtotal + taxAmount;

    taxAmount = Math.round(taxAmount * 100) / 100;
    total = Math.round(total * 100) / 100;

    document.getElementsByClassName('cart-tax-amount')[0].innerText = '$' + taxAmount;
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total;

    // Update the cart-quantity total element
    let cartQuantityTotalElement = document.getElementById('cart-quantity-total');
    if (totalQuantity < 10) {
        cartQuantityTotalElement.innerText = '0' + totalQuantity;
    } else {
        cartQuantityTotalElement.innerText = totalQuantity;
    }

     // Store the updated quantity in sessionStorage
  sessionStorage.setItem('cartQuantity', totalQuantity);
}

function updateCartData() {
    let cartItems = document.getElementsByClassName('cart-items')[0];
    let cartData = [];

    for (let i = 0; i < cartItems.children.length; i++) {
        let cartRow = cartItems.children[i];
        let title = cartRow.querySelector('.cart-item-title').innerText;
        let price = cartRow.querySelector('.cart-price').innerText;
        let quantity = cartRow.querySelector('.cart-quantity-input').value;
        let imageSrc = cartRow.querySelector('.cart-item-image').src;

        cartData.push({
            title: title,
            price: price,
            quantity: quantity,
            imageSrc: imageSrc
        });
    }

    // Store cart data in sessionStorage
    sessionStorage.setItem('cartData', JSON.stringify(cartData));
}

// Retrieve and populate cart data from sessionStorage
function populateCartData() {
    let cartItems = document.getElementsByClassName('cart-items')[0];
    let cartData = sessionStorage.getItem('cartData');
    let totalQuantity = sessionStorage.getItem('cartQuantity');

    if (cartData) {
        cartData = JSON.parse(cartData);

        for (let i = 0; i < cartData.length; i++) {
            let item = cartData[i];
            addItemToCart(item.title, item.price, item.imageSrc);
            let quantityInput = cartItems.getElementsByClassName('cart-quantity-input')[i];
            quantityInput.value = item.quantity;
        }
    }

     // Update the cart-quantity total element
  let cartQuantityTotalElement = document.getElementById('cart-quantity-total');
  if (totalQuantity < 10) {
    if(totalQuantity === null) {
        cartQuantityTotalElement.innerText = '00';
    } else { 
        cartQuantityTotalElement.innerText = '0' + totalQuantity;
    }
    
} else {
    cartQuantityTotalElement.innerText = totalQuantity;
}

}

window.addEventListener("DOMContentLoaded", function () {
    const cartButton = document.getElementById("cart-icon");
    const cartItem = document.getElementById("cart-form-container");
    const cartIcon = document.getElementById("cart-icon");
    cartItem.style.display = "none";

    cartButton.addEventListener("click", function () {
        if (cartItem.style.display === "none") {
            cartItem.style.display = "block";
        } else {
            cartItem.style.display = "none";
        }
        // Calculate the maximum position within the window
        const maxTop = (window.innerHeight - cartItem.offsetHeight);
        const maxLeft = (window.innerWidth - cartItem.offsetWidth);

        // First solution
        // // Get the position of the cart icon
        // const cartIconRect = cartIcon.getBoundingClientRect();
        // const cartIconTop = cartIconRect.top + window.pageYOffset;
        // const cartIconLeft = cartIconRect.left + window.pageXOffset;
        // const cartIconHeight = cartIconRect.height;

        // // Set the position of the form container relative to the cart icon
        // cartItem.style.top = (cartIconTop + cartIconHeight) + "px";
        // cartItem.style.left = cartIconLeft + "px";

        // Second solution
        var cartIconRect = cartIcon.getBoundingClientRect();
        var cartIconTop = cartIconRect.top + window.pageYOffset;
        var cartIconLeft = cartIconRect.left + window.pageXOffset;
        var cartIconHeight = cartIconRect.height;
        var cartIconWidth = cartIconRect.width;

        // Set the position of the form container relative to the cart icon
        cartItem.style.top = (cartIconTop + cartIconHeight) + "px";
        cartItem.style.left = (cartIconLeft + cartIconWidth / 2 - cartItem.offsetWidth / 2) + "px";
    });
});
