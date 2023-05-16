let navbar = document.querySelector('.header .navbar');
let searchForm = document.querySelector('.header .search-form');
let loginForm = document.querySelector('.header .login-form');
let contactInfo = document.querySelector('.contact-info');
const reviews = [
   { stars: 5 },
   { stars: 5 },
   { stars: 5 },
   { stars: 5 },
   { stars: 5 }
];

const starsElement = document.querySelector('.stars');
const ratingElement = document.querySelector('.rating');

const averageStars = reviews.reduce((total, review) => {
   return total + review.stars;
}, 0) / reviews.length;

starsElement.innerHTML = getStars(averageStars);
ratingElement.innerHTML = `${averageStars.toFixed(1)} out of 5`;

starsElement.addEventListener('click', (event) => {
   const starRating = parseInt(event.target.getAttribute('data-rating'));
   if (starRating) {
      reviews.push({ stars: starRating });
      updateRating();
   }
});

function updateRating() {
   const averageStars = reviews.reduce((total, review) => {
      return total + review.stars;
   }, 0) / reviews.length;

   starsElement.innerHTML = getStars(averageStars);
   ratingElement.innerHTML = `${averageStars.toFixed(1)} out of 5`;

   const stars = document.querySelectorAll('.stars i');
   stars.forEach((star, index) => {
      star.addEventListener('click', () => {
         const starRating = index + 5;
         reviews.push({ stars: starRating });
         updateRating();
      });
   });
}

function getStars(count) {
   const stars = '<i class="fas fa-star" data-rating="1"></i>';
   const halfStar = '<i class="fas fa-star-half-alt" data-rating="0.5"></i>';
   const emptyStar = '<i class="far fa-star" data-rating="0"></i>';
   const fullStars = Math.floor(count);
   const hasHalfStar = count % 1 !== 0;
   const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
   return `${stars.repeat(fullStars)}${hasHalfStar ? halfStar : ''}${emptyStar.repeat(emptyStars)}`;
}


document.querySelector('#menu-btn').onclick = () => {
   navbar.classList.toggle('active');
   searchForm.classList.remove('active');
   loginForm.classList.remove('active');
};

document.querySelector('#search-btn').onclick = () => {
   searchForm.classList.toggle('active');
   navbar.classList.remove('active');
   loginForm.classList.remove('active');
};

// document.querySelector('#login-btn').onclick = () =>{
//    loginForm.classList.toggle('active');
//    navbar.classList.remove('active');
//    searchForm.classList.remove('active'); 
// };

document.querySelector('#info-btn').onclick = () => {
   contactInfo.classList.add('active');
}

document.querySelector('#close-contact-info').onclick = () => {
   contactInfo.classList.remove('active');
}

window.onscroll = () => {
   navbar.classList.remove('active');
   searchForm.classList.remove('active');
   loginForm.classList.remove('active');
   contactInfo.classList.remove('active');
}

var swiper = new Swiper(".home-slider", {
   loop: true,
   grabCursor: true,
   autoplay: {
      delay: 4000, // 5 seconds delay between slides
   },
   navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
   },
});

var swiper = new Swiper(".client1-slider", {
   loop: true,
   grabCursor: true,
   autoplay: {
      delay: 4000, // 5 seconds delay between slides
   },
   navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
   },
});

var swiper = new Swiper('.swiper-container', {
   slidesPerView: 'auto',
   spaceBetween: 30,
   centeredSlides: true,
   loop: true,
   autoplay: {
      delay: 5000,
      disableOnInteraction: false,
   },
   pagination: {
      el: '.swiper-pagination',
      clickable: true,
   },
   navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
   },
});


var swiper = new Swiper(".logo-slider", {
   loop: true,
   grabCursor: true,
   spaceBetween: 20,
   breakpoints: {
      450: {
         slidesPerView: 2,
      },
      640: {
         slidesPerView: 3,
      },
      768: {
         slidesPerView: 4,
      },
      1000: {
         slidesPerView: 5,
      },
   },
});

var slideIndex = 0;
var timer;

// function to display the current slide
function showSlide() {
   var slides = document.querySelectorAll('#slider figure img');
   for (var i = 0; i < slides.length; i++) {
      slides[i].style.display = 'none';
   }
   slideIndex++;
   if (slideIndex > slides.length) {
      slideIndex = 1;
   }
   slides[slideIndex - 1].style.display = 'block';

   // set a timer to automatically switch to the next slide
   timer = setTimeout(showSlide, 3000); // 3 seconds
}

// call the showSlide function to start the slideshow
showSlide();

// pause the slideshow when the user hovers over an image
var galleryImgs = document.querySelectorAll('#slider figure img');
for (var i = 0; i < galleryImgs.length; i++) {
   galleryImgs[i].addEventListener('mouseover', function () {
      clearTimeout(timer);
   });
   galleryImgs[i].addEventListener('mouseout', function () {
      timer = setTimeout(showSlide, 3000);
   });
}