if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    var removeCartItemButtons = document.getElementsByClassName('item-delete')
    // console.log(removeCartItemButtons)
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)

    }

    var quantityInput = document.getElementsByClassName("item-quantity")
    for (var i = 0; i < quantityInput.length; i++) {
        var input = quantityInput[i]
        input.addEventListener('change', quantityChanged)
    }

    var addToCartButtons = document.getElementsByClassName('add-to-cart')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }
    document.getElementsByClassName('purchase')[0].addEventListener('click', purchaseClicked)
}

function purchaseClicked() {
    alert('Thank You for your purchase')
    var cartItem = document.getElementsByClassName('cart-items')[0]
    while (cartItem.hasChildNodes()) {
        cartItem.removeChild(cartItem.firstChild)
    }
    updateCartTotal()
}

function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}
function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}
function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement
    var title = shopItem.getElementsByClassName('p-name')[0].innerText
    var price = shopItem.getElementsByClassName('p-price')[0].innerText
    addItemToCart(title, price)

}

function addItemToCart(title, price) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('c-cart')
    cartRow.classList.add('c-cart-row')

    var cartItem = document.querySelector('.cart-items');
    var cartRowContents = `
        <div class="c-item c-detail c-item-detail">
            <p class="item-name">${title}</p>
        </div>
        <div class="c-price c-detail c-item-price">
            <p class="item-price">${price}</p>
        </div>
        <div class="c-quantity c-detail c-item-quantity">
            <input class="item-quantity ${title}" type="number" placeholder="1"  value="1">
            <button class="item-delete">Delete</button>
        </div>`
    cartRow.innerHTML = cartRowContents
    cartItem.append(cartRow)
    cartRow.getElementsByClassName('item-delete')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('item-quantity')[0].addEventListener('change', quantityChanged)
    updateCartTotal();
}

var removeCartItemButtons = document.getElementsByClassName('item-delete')
// console.log(removeCartItemButtons)
for (var i = 0; i < removeCartItemButtons.length; i++) {
    var button = removeCartItemButtons[i]
    button.addEventListener('click', function (event) {
        var buttonClicked = event.target
        buttonClicked.parentElement.parentElement.remove()
        updateCartTotal()
    })
}
function updateCartTotal() {
    var cartItemContainer = document.querySelector('.c-carts');
    var cartItems = document.querySelectorAll('cart-items');
    var cartRow = document.querySelectorAll('.c-cart-row');
    var total = 0
    // console.log(cartRow.length);

    let arr = Array.from(cartRow);

    arr.forEach(item => {
        var priceElement = item.getElementsByClassName('c-item-price')[i]
        var quantityElement = item.getElementsByClassName('item-quantity')[i]
        var price = parseFloat(priceElement.innerText.replace('RS. ', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    });
    document.getElementsByClassName('total')[0].innerText = 'Total: RS. ' + total
}
