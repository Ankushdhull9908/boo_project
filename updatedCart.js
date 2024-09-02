

var price;
var quantity;
var totalprice
var Bookname;

var TotalPrice2;


var cartBook_name;

window.onload = function () {
    
        var value1 = "";
   

        var numberofitem = 0;
        var cartItems = JSON.parse(window.localStorage.getItem('BuyFromCart'))
        cartBook_name = cartItems[0].name;
        console.log(cartBook_name)
        


    console.log(cartItems)
    
    cartItems.forEach(function (elem, index) {

        value1 += `
            <div class="cart-book">
                <div class="book-image">
                   <img src="${elem.url}">
                </div>
                <div class="name-quantity">
                    <div class="book-name">
                        <p>NAME: ${elem.name}</p>
                    </div>
                    <div class="book-weight">
                        <p>Weight: 500g</p>
                    </div>
                    <div class="book-seller">
                        <p>Seller: BooksHUB</p>
                        <img src="images/shield.png">
                    </div>

                    <div class="book-author">
                        <p>Author: ${elem.author}</p>
                    </div>
                    <div class="book-quantity">
                        <p>QUANTITY</p>
                        <input type="number" id="quantity" value="1" disabled>
                        <button onclick="plusQuantity()" class="plus">+</button>
                        <button onclick="minusQuantity()" class="minus">-</button>
                    
                    </div>
                    <div class="removeItem">
                    <button id="remove" data-button="${index}">Remove Book</button>
                    </div>

                </div>
                
                
                <hr>
                <div class="price_section">
                    <div class="price_heading">
                        <div class="initial-price">
                        <p>PRICE</p>
                        ₹<input type="number" value = "${elem.price}" id="initialprice" disabled>
                           
                        </div>
                        
                        <div class="total-price">
                            <p>Total Price:</p>
                            ₹<input type="number" value = "${elem.price}" id="totalprice" disabled>
                        </div>
                        
                    </div>
                
                </div>
            </div>`

        console.log("value is", elem[index])

        numberofitem++;

        price = elem.price
        Bookname = elem.name;

    });

    
    rotateImgup()
    rotateImgdown()
    if (numberofitem == 0) {
        document.querySelector(".container").innerHTML = `<div class="emptycart"><img src="images/shopping-cart.png" id="emptyCartImg">
            <p>your cart is empty</p>
            <button class="proceedToShop">Proceed To Shop</button>
            
            </div>`;
        proceedToShop()
    }
    var container = document.querySelector(".main-cart-items");
    document.querySelector(".main-cart-items").innerHTML = `<p>Resuts: No. of Books in cart: ${numberofitem}</p>`;
    container.innerHTML = value1;
   

    price = document.getElementById("initialprice")
    quantity = document.getElementById("quantity")
    totalprice = document.getElementById("totalprice")


    document.querySelector(".total_price").innerHTML = `<p> TOTAL PRICE:${totalprice.value}</P>`;
    if (totalprice.value < 500) {
        document.querySelector(".deliveryoption").innerHTML = `<p id="charge">Note* - Not Eligible for Free Delivery<br>
            Delivery Charges May Apply</p>`


    }
    else if (totalprice.value > 500) {
        document.querySelector(".deliveryoption").innerHTML = `<p id="charge2">Eligible for Free Delivery</p>`


    }

    var removeButtons = document.querySelectorAll(".removeItem button");
    removeButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            var indexToRemove = parseInt(this.getAttribute("data-button"));
            removeFromCart(indexToRemove);
        });
    });

    var commentData = document.getElementById('hi');
        var commentValue = commentData.value;
        console.log("Textarea value:", commentValue);


    function fetchReviewData(){
        
        var value=""
        fetch('/reviews')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
    
            console.log('Fetched data:', data);
           
            data.forEach(function(elem){
                if(cartBook_name==elem.book_name)
            {
                value+=`
                <div class="feebackBoxinside">
                <div class="commentUserId">
                <img src=images/user-icon.png>
                <p>@AnonymousUserabc${elem.user_id}</p>
                </div>
                <div class="reviewBookName">
                <p>Views on: ${elem.book_name}</p>
                </div>
                <div class="comment">
                <p>${elem.user_comment}</p>
                </div>
            </div>`
            }
            document.querySelector(".feedbackBoxmain").innerHTML = value;
            })

            window.localStorage.setItem('commnetData',JSON.stringify(cartBook_name))
            
        })
        .catch(error => {
            console.error('Error fetching books:', error);
        });   
    }

    fetchReviewData()
 
}


function plusQuantity() {
    quantity.value = parseInt(quantity.value) + 1
    totalprice.value = quantity.value * parseInt(price.value)
    document.querySelector(".total_price").innerHTML = `<p> TOTAL PRICE:${totalprice.value}</P>`;
    TotalPrice2 = totalprice.value;

    if (totalprice.value < 500) {
        document.querySelector(".deliveryoption").innerHTML = `<p id="charge">NOTE* - Not Eligible for Free Delivery<br>
            Delivery Charges May Apply</p>`


    }
    else if (totalprice.value > 500) {
        document.querySelector(".deliveryoption").innerHTML = `<p>Eligible for Free Delivery</p>`


    }
}

function minusQuantity() {
    if (quantity.value == 1) {
        alert("cannot minus")
        return;
    }
    quantity.value = parseInt(quantity.value) - 1
    totalprice.value = quantity.value * parseInt(price.value)

    document.querySelector(".total_price").innerHTML = `<p> TOTAL PRICE:${totalprice.value}</P>`;

    if (totalprice.value < 500) {
        document.querySelector(".deliveryoption").innerHTML = `<p id="charge">NOTE* - Not Eligible for Free Delivery<br>
            Delivery Charges May Apply</p>`


    }
    else if (totalprice.value > 500) {
        document.querySelector(".deliveryoption").innerHTML = `<p>Eligible for Free Delivery</p>`


    }

}


var buyBtn = document.getElementById("buy")

buyBtn.addEventListener("click", function () {
    var cartDataObj = { book_price: totalprice.value, book_name: Bookname, book_quantity: quantity.value };
    console.log(cartDataObj)
    window.localStorage.setItem('buyFromCart', JSON.stringify(cartDataObj))
    window.location.href = "buySignIn.html";
})

function rotateImgup() {
    document.querySelector(".account").addEventListener("mouseover", function () {
        document.getElementById("down-arrow").style.transform = "rotate(180deg)"
    })
}

function rotateImgdown() {
    document.querySelector(".account").addEventListener("mouseout", function () {
        document.getElementById("down-arrow").style.transform = "rotate(0deg)"
    })
}

function proceedToShop() {
    document.querySelector(".proceedToShop").addEventListener("click", function () {
        window.location.href = "index.html"
    })
}

function submitComment(){
    var commentData = document.getElementById('hi');
        var commentValue = commentData.value;
        console.log("hey hey hey hey")
        if(commentValue===""){
            alert("comment cannot be null")
        }

}


function removeFromCart(index) {
    var cartItems = JSON.parse(window.localStorage.getItem('BuyFromCart'));
    cartItems.splice(index, 1);
    window.localStorage.setItem('BuyFromCart', JSON.stringify(cartItems));
    location.reload();
}








