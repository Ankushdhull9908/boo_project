var trendBooks;
var bestsellers;
var newArrivals;
var img;

var admin_data;
var admin_name;
var admin_image;
var internationalBest;

var ReviewData;

 var data = [
    {book_name:"Vagabond vol 1", book_author:"Takehiko Inoue", book_price:1200, book_url:"Book_images/trend_books/vagabond1.jpg", book_type:"anime", book_section:"trendBooks"},
    {book_name:"Vagabond vol 2", book_author:"Takehiko Inoue", book_price:1300, book_url:"Book_images/trend_books/vagabond2.jpg", book_type:"anime", book_section:"trendBooks"},
    {book_name:"Vagabond vol 4", book_author:"Takehiko Inoue", book_price:2400, book_url:"Book_images/trend_books/vagabond4.jpg", book_type:"anime", book_section:"trendBooks"},
    {book_name:"Chainsaw Man vol 1", book_author:"Tatsuki Fujimoto", book_price:600, book_url:"Book_images/trend_books/chainsaw.jpg", book_type:"anime", book_section:"trendBooks"},
    {book_name:"Heaven Officials", book_author:"Mo Xiang Tong Xiu", book_price:1700, book_url:"Book_images/trend_books/heaven.jpg", book_type:"anime", book_section:"trendBooks"},
    {book_name:"Jujutsu Kaisen Vol1", book_author:"Gege Akutami", book_price:563, book_url:"Book_images/trend_books/_jujutsu.jpg", book_type:"anime", book_section:"trendBooks"},
    {book_name:"20th Century Boys", book_author:"Naoki Urasawa", book_price:1228, book_url:"Book_images/best_seller/_20century.jpg", book_type:"anime", book_section:"trendBooks"},
    {book_name:"karma", book_author:"sadhguru", book_price:100, book_url:"Book_images/best_seller/sadhguru.jpg", book_type:"life", book_section:"bestseller"},
    {book_name:"Atomic Habbits", book_author:"James Clear", book_price:551, book_url:"Book_images/best_seller/atomic habits.jpg", book_type:"anime", book_section:"bestseller"},
    {book_name:"Doglapan", book_author:"Ashneer Grover", book_price:459, book_url:"Book_images/best_seller/doglapan.jpg", book_type:"life", book_section:"bestseller"},
    {book_name:"Ikigai", book_author:"Francesc Miralles", book_price:396, book_url:"Book_images/best_seller/ikigai.jpg", book_type:"life", book_section:"bestseller"},
    {book_name:"General Knowledge 2022", book_author:"RPH editorial Board", book_price:20, book_url:"Book_images/best_seller/gk2022.jpg", book_type:"general_knowledge", book_section:"bestseller"},
    {book_name:"Psychology of Money", book_author:"Morgan Housel", book_price:303, book_url:"Book_images/best_seller/pschology of money.jpg", book_type:"business", book_section:"bestseller"},
    {book_name:"It Ends with Us", book_author:"Collen Hoover", book_price:351, book_url:"Book_images/best_seller/it ends with us.jpg", book_type:"love", book_section:"newarrivals"},
    {book_name:"All He Left Me Was", book_author:"Shehnaz Treasury", book_price:30, book_url:"Book_images/new_arrivals/all he left.jpg", book_type:"love", book_section:"newarrivals"},
    {book_name:"Finding the Oasis", book_author:"Sandeep Mall", book_price:339, book_url:"Book_images/new_arrivals/oasis.jpg", book_type:"life", book_section:"newarrivals"},
    {book_name:"Art Of Habits", book_author:"Gauranga Das", book_price:205, book_url:"Book_images/new_arrivals/art of habits.jpg", book_type:"life", book_section:"newarrivals"},
    {book_name:"Curse Of the Pir", book_author:"Anupama Pandey", book_price:303, book_url:"Book_images/new_arrivals/curse of pir.jpg", book_type:"life", book_section:"newarrivals"},
    {book_name:"The Golden Touch", book_author:"T.S. Kalyanarman", book_price:489, book_url:"Book_images/new_arrivals/golden touch.jpg", book_type:"business", book_section:"newarrivals"},
    {book_name:"The Scrapper's Way", book_author:"Damodar Padhi", book_price:324, book_url:"Book_images/new_arrivals/scrapper.jpg", book_type:"biography", book_section:"newarrivals"},
    {book_name:"Girl Murder", book_author:"Holly Jackson", book_price:200, book_url:"Book_images/international_best_seller/girl_murder.jpg", book_type:"love", book_section:"internationalBest"},
    {book_name:"Gone Girl", book_author:"chemin Chris", book_price:500, book_url:"Book_images/international_best_seller/gone_girl.jpg", book_type:"love", book_section:"internationalBest"},
    {book_name:"Good Girl", book_author:"piper Lawson", book_price:600, book_url:"Book_images/international_best_seller/good_girl.jpg", book_type:"love", book_section:"internationalBest"},
    {book_name:"Kid From Space", book_author:"Ross Welford", book_price:280, book_url:"Book_images/international_best_seller/kid_from_space.jpg", book_type:"love", book_section:"internationalBest"},
    {book_name:"The Love Hypothesis", book_author:"Ali Hazelwood", book_price:900, book_url:"Book_images/international_best_seller/love.jpg", book_type:"love", book_section:"internationalBest"},
    {book_name:"The Shinning", book_author:"Stephen King", book_price:400, book_url:"Book_images/international_best_seller/the_shinning.jpg", book_type:"love", book_section:"internationalBest"}
];

    
window.onload = function () {
    
    trendBooks = data.filter(function (elem) {
        return elem.book_section === "trendBooks";
    });

    bestsellers = data.filter(function (elem) {
        return elem.book_section === "bestseller";
    });

    newArrivals = data.filter(function (elem) {
        return elem.book_section === "newarrivals";
    });
    internationalBest = data.filter(function (elem) {
        return elem.book_section === "internationalBest";
    });
   
            fun(trendBooks);
            fun1(bestsellers);
            fun2(newArrivals);
            fun4(internationalBest)

            cartFun(data);
          //  handleSearch(data);

            BuyButton(data);
         //  clickOnHeart(data)
   // fetchReviewData()
    //bookLoad();
    ScrollNav();  
    
};




setInterval(slideShow, 3000);



    function fun(trendBooks) {
        //xyz(ReviewData)
   // var ankush2 = ReviewData
        var clutter = "";
    
        trendBooks.forEach(function (book,index) {
            clutter += `<div class="book">
                <div class="image2">
                    <img src="${book.book_url}">
                </div>
                <div class="book_content">
                    <div class="name-author-price-content">
                        <div class="name">
                            <p>Name: ${book.book_name}</p>
                        </div>
                        <div class="author">
                            <p>By: ${book.book_author}</p>
                        </div>
                        <div class="price">
                            <p>Price: ₹${book.book_price}</p>
                        </div>
                        <div class="rating">`;
    
            
           // var reviewsCount = ankush2.filter(review => review.book_name === book.book_name).length;

            

          // var reviewsCount = ankush2.filter(function(review) {
         //   return review.book_name === book.book_name;
       // }).length;
        

            

            
           // clutter += `<img src="images/4star.png">
           // <p>(${reviewsCount})</p><img id="heart" src="images/heart.png">`;
    
            clutter += `</div>
                    </div>
                    <div class="addtoCart-buyNow-buttons">
                        <div class="addToCart">
                            <button data-book="${index}" data-section="trendBooks" class="cartBtn">Add to cart</button>
                        </div>
                       
                    </div>
                </div>
            </div>`;
        });
    
        document.querySelector(".books_section").innerHTML = clutter;
    }
    

function fun2(newArrivals) {
 //   xyz(ReviewData)
  //  var ankush2 = ReviewData
        var clutter = "";
    
        newArrivals.forEach(function (book,index) {
            clutter += `<div class="book">
                <div class="image2">
                    <img src="${book.book_url}">
                </div>
                <div class="book_content">
                    <div class="name-author-price-content">
                        <div class="name">
                            <p>Name: ${book.book_name}</p>
                        </div>
                        <div class="author">
                            <p>By: ${book.book_author}</p>
                        </div>
                        <div class="price">
                            <p>Price: ₹${book.book_price}</p>
                        </div>
                        <div class="rating">`;
    
            // Find reviews count for the current book
          //  var reviewsCount = ankush2.filter(review => review.book_name === book.book_name).length;
          //  clutter += `<img src="images/4star.png">
           // <p>(${reviewsCount})</p><img id="heart" src="images/heart.png">`;
    
            clutter += `</div>
                    </div>
                    <div class="addtoCart-buyNow-buttons">
                        <div class="addToCart">
                            <button data-book="${index}" data-section="newArrivals" class="cartBtn">Add to cart</button>
                        </div>
                        
                    </div>
                </div>
            </div>`;
        });
    
        document.querySelector(".books_section2").innerHTML = clutter;
}



function fun4(internationalBest) {
   // xyz(ReviewData)
   // var ankush2 = ReviewData
        var clutter = "";
    
        internationalBest.forEach(function (book,index) {
            clutter += `<div class="book">
                <div class="image2">
                    <img src="${book.book_url}">
                </div>
                <div class="book_content">
                    <div class="name-author-price-content">
                        <div class="name">
                            <p>Name: ${book.book_name}</p>
                        </div>
                        <div class="author">
                            <p>By: ${book.book_author}</p>
                        </div>
                        <div class="price">
                            <p>Price: ₹${book.book_price}</p>
                        </div>
                        <div class="rating">`;
    
            // Find reviews count for the current book
          //  var reviewsCount = ankush2.filter(review => review.book_name === book.book_name).length;
           // clutter += `<img src="images/4star.png">
           // <p>(${reviewsCount})</p><img id="heart" src="images/heart.png">`;
    
            clutter += `</div>
                    </div>
                    <div class="addtoCart-buyNow-buttons">
                        <div class="addToCart">
                            <button data-book="${index}" data-section="internationalBest" class="cartBtn">Add to cart</button>
                        </div>
                        
                    </div>
                </div>
            </div>`;
        });
    
        document.querySelector(".books_section4").innerHTML = clutter;
}

function fun1(bestsellers) {
   // xyz(ReviewData)
   // var ankush2 = ReviewData
        var clutter = "";
    
        bestsellers.forEach(function (book,index) {
            clutter += `<div class="book">
                <div class="image2">
                    <img src="${book.book_url}">
                </div>
                <div class="book_content">
                    <div class="name-author-price-content">
                        <div class="name">
                            <p>Name: ${book.book_name}</p>
                        </div>
                        <div class="author">
                            <p>By: ${book.book_author}</p>
                        </div>
                        <div class="price">
                            <p>Price: ₹${book.book_price}</p>
                        </div>
                        <div class="rating">`;
    
            // Find reviews count for the current book
         //   var reviewsCount = ankush2.filter(review => review.book_name === book.book_name).length;
          //  clutter += `<img src="images/4star.png">
          //  <p>(${reviewsCount})</p><img id="heart" src="images/heart.png">`;
    
            clutter += `</div>
                    </div>
                    <div class="addtoCart-buyNow-buttons">
                        <div class="addToCart">
                            <button data-book="${index}" data-section="bestsellers" class="cartBtn">Add to cart</button>
                        </div>
                        
                    </div>
                </div>
            </div>`;
        });
    
        document.querySelector(".books_section1").innerHTML = clutter;
}


function cartFun(data) {
    var cartBtns = document.querySelectorAll(".cartBtn");
    cartBtns.forEach(function (btn) {
        btn.addEventListener("click", function () {
            var index = parseInt(this.dataset.book);
            console.log(index)
            var section = this.dataset.section;
            var sectionData;
            switch (section) {
                case "trendBooks":
                    sectionData = trendBooks;
                    break;
                case "bestsellers":
                    sectionData = bestsellers;
                    break;
                case "newArrivals":
                    sectionData = newArrivals;
                    break;
                case "internationalBest":
                        sectionData = internationalBest;
                    break;
                default:
                    sectionData = [];
                    break;
            }
            if (sectionData.length > 0) {
                cart.push({
                    url: sectionData[index].book_url,
                    name: sectionData[index].book_name,
                    author: sectionData[index].book_author,
                    price: sectionData[index].book_price
                });
                
                CartItemDisplay();
                document.querySelector(".notification").style.display = "block";
                document.querySelector("#CartLogo").style.animation = "shake 4s ease-in-out"
                ShowCartFromLeft()
                setTimeout(ShowCartFromright,4000)

                
                console.log(cart);
            }
        });
    });
}

function BuyButton(data) {
    var buyBtns = document.querySelectorAll(".buyNow");
    
    buyBtns.forEach(function(btn) {
        btn.addEventListener("click", function(e) {
            var index = parseInt(this.dataset.book);
            var section = this.dataset.section;
            var sectionData;
            switch (section) {
                case "trendBooks":
                    sectionData = trendBooks;
                    break;
                case "bestsellers":
                    sectionData = bestsellers;
                    break;
                case "newArrivals":
                    sectionData = newArrivals;
                    break;
                case "internationalBest":
                    sectionData = internationalBest;
                    break;
                default:
                    sectionData = [];
                    break;
            }

            if (sectionData.length > 0) {
                // Get the clicked book details
                var instantBuy = [{
                    url: sectionData[index].book_url,
                    name: sectionData[index].book_name,
                    author: sectionData[index].book_author,
                    price: sectionData[index].book_price
                }];

                // Store the clicked book details in localStorage
                localStorage.setItem('instantBuy', JSON.stringify(instantBuy));

                // Redirect the user to BuySignIn.html
                window.location.href = "instantBuySignIn.html";
            }
        });
    });
}


var account_logo = document.getElementById("admin")

var flag2 = 0;
account_logo.addEventListener("click", function () {
    if (flag2 == 0) {
        document.querySelector(".account-manager").style.top = "110";
        flag2 = 1;
    } else {
        document.querySelector(".account-manager").style.top = "-160";
        flag2 = 0;
    }


})
var index = 0;

function slideShow() {
    var images = document.querySelectorAll(".image");

    for (var i = 0; i < images.length; i++) {
        images[i].style.display = "none";
    }

    if (index >= images.length) {
        index = 0;
    }

    images[index].style.display = "block";
    index++;
}


function ShowCartFromLeft()
{
    document.querySelector(".cart-box").style.left = "1260";
}

function ShowCartFromright()
{
    document.querySelector(".cart-box").style.left = "1600";
}

var cart = [];


var flag1 = 0;
var showCart = document.getElementById("CartLogo");
var cartBox = document.querySelector(".cart-box");

showCart.addEventListener("click", function () {
    cartBox = document.querySelector(".cart-box");

 if (flag1 == 0) {
     
    document.querySelector(".cart-box").style.left = "1260";
     
     flag1 = 1;
 } else if (flag1 == 1) {
    // document.querySelector(".cart-box").style.display = "none";
    document.querySelector(".cart-box").style.left = "1600";
     flag1 = 0;
 }
 //CartItemDisplay();
});


var closeLogo = document.getElementById("close");
var y = document.querySelector(".slideShow");
var x = document.querySelector(".search_container");
var search_logo = document.getElementById("search_logo");

var flag = 0;
var count = 0;
var emptyInput;
var searchInput = document.getElementById("search_input")


function handleSearch(data) {
  //  alert("handle search opened")
    var search_input_data = document.getElementById("search_input").value;
    window.localStorage.setItem('searchinputdata',JSON.stringify(search_input_data))
    window.localStorage.setItem('searchdata',JSON.stringify(data))
    window.location.href="search.html"
    
    
}

searchInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        handleSearch(data);
    }
});

search_logo.addEventListener("click", function () {
   // var searchContainer = document.querySelector(".container");
    if (flag === 0) {
       // alert("u clicked on searchlogo")
        
        handleSearch(data)
        searchContainer.innerHTML = x.innerHTML;
        searchContainer.style.display = "block";
        search_logo.src = "images/close.png";
        flag = 1;
    } else if(flag===1){
        searchContainer.innerHTML = y.innerHTML;
        search_logo.src = "images/search.png";
        flag = 0;
    }
});

function CartItemDisplay() {
    var clutter = '';
    cart.forEach(function (elem) {
        clutter += `<div class="cart-items">
            <div class="cart-image">
                <img src="${elem.url}">
            </div>
            <div class="cart-name">
                <p>${elem.name}</p>
            </div>
            <div class="cart-price">
                <p>${elem.price}</p>
            </div>
            
        </div>`;
    });
    document.querySelector(".cart-box").innerHTML = clutter;
}

var showCart = document.getElementById("showCart")
showCart.addEventListener("click",function(){
    window.localStorage.setItem('BuyFromCart',JSON.stringify(cart))
    window.location.href="updatedCart.html"
})

function admin_showName()
{
   
    var value = `<h4>ADMIN</h4>
    <p>${admin_name}</p>`
    document.querySelector(".admin-name").innerHTML = value;
    
}

var BuyNow = []

function ScrollNav(){
    document.getElementById('newArrivals').addEventListener('click', function(event) {
        event.preventDefault();
        document.querySelector('.newArrivals_books_section').scrollIntoView({ behavior: 'smooth' });
    });
    document.getElementById('TrendingNow').addEventListener('click', function(event) {
        event.preventDefault();
        document.querySelector('.trending_books_section').scrollIntoView({ behavior: 'smooth' });
    });
    document.getElementById('BestSeller').addEventListener('click', function(event) {
        event.preventDefault();
        document.querySelector('.BestSeller_books_section').scrollIntoView({ behavior: 'smooth' });
    });
    document.getElementById('newArrivals').addEventListener('click', function(event) {
        event.preventDefault();
        document.querySelector('.newArrivals_books_section').scrollIntoView({ behavior: 'smooth' });
    });
    document.getElementById('FictionBooks').addEventListener('click', function(event) {
        event.preventDefault();
        document.querySelector('.fiction_and_manga_book').scrollIntoView({ behavior: 'smooth' });
    });
    document.getElementById('FeaturedAuthors').addEventListener('click', function(event) {
        event.preventDefault();
        document.querySelector('.author_section').scrollIntoView({ behavior: 'smooth' });
    });
    document.getElementById('social1').addEventListener('click', function(event) {
        event.preventDefault();
        document.querySelector('.author_section').scrollIntoView({ behavior: 'smooth' });
    });
}


function search_author(id){
    var author_name = id

    switch(author_name)
    {
        case "arun": document.getElementById("search_input").value = "arun"
        
        break;
        case "stephen coonts": document.getElementById("search_input").value = "stephen coonts"
        
        break;
        case "stephen king": document.getElementById("search_input").value = "stephen king"
        
        break;
        case "Jhon Green": document.getElementById("search_input").value = "Jhon Green"
        
        break;
        case "Gillian Flynn": document.getElementById("search_input").value = "Gillian Flynn"
        
        break;
        case "Eric Segal": document.getElementById("search_input").value = "Eric Segal"
        
        break;
    }
    document.getElementById("search_logo").click();
    
}


function clickOnHeart(data){
    var heartImg = document.getElementById("heart")
    var heart = document.querySelectorAll(".rating #heart")
    heart.forEach(function(btn){
        btn.addEventListener("click",function(){
           // heartImg.style.height = "30px"
            //heartImg.style.width = "30px"
            
        })
    })
}















