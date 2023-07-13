const form = document.getElementById("itemForm");

const itemController = new ItemController()

const displayItem = function(){

    let itemArr = itemController.getLocalStorage()
    
    itemCards.innerHTML = ''
    itemArr.forEach(item => {
        let card = document.createElement("div");
        card.innerHTML = `
        <div class="card">
        <img src="${item.url}" class="card-img-top shop-item-image" alt="Card image">
        <div class="card-body">
          <h5 class="card-title shop-item-title">${item.description}</h5>
          <p class="card-text">${item.category}</p>
          <hr>
          <p class="card-price shop-item-price">$${item.price}</p>
          <p class="card-text">PBET-Clothing</p>
          <button type="button" class="btn btn-warning add-to-cart-btn shop-item-button">Add to Cart</button>
          <button type="button" class="btn btn-danger buy-now-btn">Buy Now</button>
        </div>
      </div>`
        itemCards.append(card)
    })
    console.log(itemArr)
}

displayItem();