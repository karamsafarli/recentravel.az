const burgerMenu = document.querySelector('.burger-menu');
const nav = document.querySelector('.nav');

burgerMenu.addEventListener('click', () => {
  nav.classList.toggle('active');
});

document.addEventListener('click', (event) => {
  if (!event.target.closest('.header')) {
    nav.classList.remove('active');
  }
});
// header

// JavaScript kodu
const prevButton = document.querySelector('.pre-btn');
const nextButton = document.querySelector('.nxt-btn');
const productContainer = document.querySelector('.product-container');

let position = 0;
const slideWidth = 300;

prevButton.addEventListener('click', slideLeft);
nextButton.addEventListener('click', slideRight);

function slideLeft() {
  position += slideWidth;
  if (position > 0) {
    position = 0;
  }
  productContainer.style.transform = `translateX(${position}px)`;
}

function slideRight() {
  const containerWidth = productContainer.offsetWidth;
  const productCount = productContainer.children.length;
  const maxPosition = -((productCount * slideWidth) - containerWidth);

  position -= slideWidth;
  if (position < maxPosition) {
    position = maxPosition;
  }
  productContainer.style.transform = `translateX(${position}px)`;
}
// wp-start
document.getElementById("sabitIkon").addEventListener("click", function () {
  document.getElementById("sabitIkon").classList.toggle("aktif");
});

const homeImg = document.querySelector('.home_image');
const headerText = document.querySelector('.Menu-h1 h1');
const smallImages = document.querySelectorAll('.small_img');
const cityNames = document.querySelectorAll('.city_name');

const fetchImages = async () => {
  try {
    const res = await fetch('https://lively-bee-beanie.cyclic.app/header-images');
    const data = await res.json()
    homeImg.setAttribute('src', `${data[0].headerBackground.path}`);
    data[0].smallImages.map((el, index) => {
      smallImages[index].setAttribute('src', `${el.path}`);
      cityNames[index].innerHTML = el.cityName
    })

  } catch (error) {
    console.log(error)
  }
}

fetchImages();

const xariciTurSlider = document.querySelector('.xaricitur-slider');
const daxiliTurSlider = document.querySelector('.daxilitur-slider');
const fetchXaricitur = async () => {
  try {
    const res = await fetch('https://lively-bee-beanie.cyclic.app/xarici-turlar');
    const data = await res.json();

    data.reverse().map((el) => {
      const product = `<div class="product-card">
      <div class="product-image">
          <a href="/xarici-turlar/${el._id}">
          <img src="${el.imagePath}" class="product-thumb" alt="">
        </a>
    
      </div>
      <div class="product-info">
          <h2 class="product-brand">${el.cityName}</h2>
          <p class="product-short-description">${el.title}</p>
          <span class="price">${el.price} AZN</span> <br>
          <i class="fa-sharp fa-solid fa-star"></i>
          <i class="fa-sharp fa-solid fa-star"></i>
          <i class="fa-sharp fa-solid fa-star"></i>
          <i class="fa-sharp fa-solid fa-star"></i>
          <i class="fa-sharp fa-solid fa-star"></i>
      </div>
    </div>`


      xariciTurSlider.innerHTML += product;
    });

  } catch (error) {
    console.log(error)
  }
}

const fetchDaxilitur = async () => {
  try {
    const res = await fetch(`https://lively-bee-beanie.cyclic.app/daxili-turlar`);
    const data = await res.json();

    data.reverse().map((el) => {
      const product = `<div class="product-card">
      <div class="product-image">
          <a href="/daxili-turlar/${el._id}">
          <img src="${el.imagePath}" class="product-thumb" alt="">
        </a>
    
      </div>
      <div class="product-info">
          <h2 class="product-brand">${el.cityName}</h2>
          <p class="product-short-description">${el.title}</p>
          <span class="price">${el.price} AZN</span> <br>
          <i class="fa-sharp fa-solid fa-star"></i>
          <i class="fa-sharp fa-solid fa-star"></i>
          <i class="fa-sharp fa-solid fa-star"></i>
          <i class="fa-sharp fa-solid fa-star"></i>
          <i class="fa-sharp fa-solid fa-star"></i>
      </div>
    </div>`


      daxiliTurSlider.innerHTML += product;
    });

  } catch (error) {
    console.log(error)
  }
}
fetchXaricitur();
fetchDaxilitur();