var price;
        var quantity;
        var totalprice
        var Bookname;

        var TotalPrice2;

        window.onload = function()
    {
       
        var value1 = "";
       
        var numberofitem = 0;
        var searchAddToCartData = JSON.parse(window.localStorage.getItem('searchAddToCart'))
        
        console.log(searchAddToCartData)
        searchAddToCartData.forEach(function(elem,index) {
            value1 += `
            <div class="cart-book">
                <div class="book-image">
                   <img src="${elem.book_url}">
                </div>
                <div class="name-quantity">
                    <div class="book-name">
                        <p>NAME: ${elem.book_name}</p>
                    </div>
                    <div class="book-weight">
                        <p>Weight: 500g</p>
                    </div>
                    <div class="book-seller">
                        <p>Seller: BooksHUB</p>
                        <img src="images/shield.png">
                    </div>

                    <div class="book-author">
                        <p>Author: ${elem.book_author}</p>
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
                        ₹<input type="number" value = "${elem.book_price}" id="initialprice" disabled>
                           
                        </div>
                        
                        <div class="total-price">
                            <p>Total Price:</p>
                            ₹<input type="number" value = "${elem.book_price}" id="totalprice" disabled>
                        </div>
                        
                    </div>
                
                </div>
            </div>`;

                console.log("value is",elem[index])

                
                numberofitem++;
             
              price = elem.book_price
              Bookname = elem.book_name;
                   
        });

       
        rotateImgup()
        rotateImgdown()


        

        if(numberofitem==0)
        {
            document.querySelector(".container").innerHTML = `<div class="emptycart"><img src="images/shopping-cart.png" id="emptyCartImg">
            <p>your cart is empty</p>
            <button class="proceedToShop">Proceed To Shop</button>
            
            </div>`;
            proceedToShop()
        }
        var container = document.querySelector(".main-cart-items");
        document.querySelector(".main-cart-items").innerHTML = `<p>Resuts: No. of Books in cart: ${numberofitem}</p>`;
        container.innerHTML = value1;

        

        /*    price section     quantity manage       */ 
        price = document.getElementById("initialprice")
        quantity = document.getElementById("quantity")
        totalprice = document.getElementById("totalprice")
        
        
        document.querySelector(".total_price").innerHTML = `<p> TOTAL PRICE:${totalprice.value}</P>`;
        if(totalprice.value<500){
            document.querySelector(".deliveryoption").innerHTML = `<p id="charge">Note* - Not Eligible for Free Delivery<br>
            Delivery Charges May Apply</p>`
            
            
        }
        else if(totalprice.value>500){
            document.querySelector(".deliveryoption").innerHTML = `<p id="charge2">Eligible for Free Delivery</p>`
            
            
        }

        

        var removeButtons = document.querySelectorAll(".removeItem button");
              removeButtons.forEach(function(button) {
              button.addEventListener("click", function() {
              var indexToRemove = parseInt(this.getAttribute("data-button"));
              removeFromCart(indexToRemove);
        });
    });
       
        
    }

    function plusQuantity()
        {
           quantity.value = parseInt(quantity.value)+1
           totalprice.value = quantity.value*parseInt(price.value)
           document.querySelector(".total_price").innerHTML = `<p> TOTAL PRICE:${totalprice.value}</P>`;
           TotalPrice2 = totalprice.value;
           //quantity = quantity.value
          // console.log("quant",quantity.value)
          if(totalprice.value<500){
            document.querySelector(".deliveryoption").innerHTML = `<p id="charge">NOTE* - Not Eligible for Free Delivery<br>
            Delivery Charges May Apply</p>`
            
            
        }
        else if(totalprice.value>500){
            document.querySelector(".deliveryoption").innerHTML = `<p>Eligible for Free Delivery</p>`
            
            
        }
        }

        function minusQuantity()
        {
            if(quantity.value==1){
                alert("cannot minus")
                return;
            }
           quantity.value = parseInt(quantity.value)-1
           totalprice.value = quantity.value*parseInt(price.value)

           document.querySelector(".total_price").innerHTML = `<p> TOTAL PRICE:${totalprice.value}</P>`;
          // quantity = quantity.value
          // console.log("quant",quantity.value)
          if(totalprice.value<500){
            document.querySelector(".deliveryoption").innerHTML = `<p id="charge">NOTE* - Not Eligible for Free Delivery<br>
            Delivery Charges May Apply</p>`
            
            
        }
        else if(totalprice.value>500){
            document.querySelector(".deliveryoption").innerHTML = `<p>Eligible for Free Delivery</p>`
            
            
        }
            
        }

        //var totalpriceobj = {price:totalprice}

        var buyBtn = document.getElementById("buy")

        buyBtn.addEventListener("click",function(){
            var cartDataObj = { book_price: totalprice.value,book_name:Bookname,book_quantity:quantity.value};
            console.log(cartDataObj)
            window.localStorage.setItem('searchbuyFromCart', JSON.stringify(cartDataObj))
            window.location.href = "searchCartBuySignIn.html";
        })

        function rotateImgup(){
            document.querySelector(".account").addEventListener("mouseover",function(){
            document.getElementById("down-arrow").style.transform = "rotate(180deg)"
            })
        }

        function rotateImgdown(){
            document.querySelector(".account").addEventListener("mouseout",function(){
            document.getElementById("down-arrow").style.transform = "rotate(0deg)"
            })
        }

        function proceedToShop(){
            document.querySelector(".proceedToShop").addEventListener("click",function(){
                window.location.href = "index.html"
            })
        }

        function removeFromCart(index) {
            var searchAddToCartData = JSON.parse(window.localStorage.getItem('searchAddToCart'));
            searchAddToCartData.splice(index, 1);
            window.localStorage.setItem('searchAddToCart', JSON.stringify(searchAddToCartData));
            location.reload(); 
        }

        document.querySelector("#buy").addEventListener("click",function(){
            window.location.href="searchCartBuySignIn.html"
        })