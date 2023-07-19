const burgerMenu = document.querySelector('.burger-menu');
const nav = document.querySelector('.mobile-menu');

burgerMenu.addEventListener('click', () => {
  nav.classList.toggle('mob-active');
});

document.addEventListener('click', (event) => {
  if (!event.target.closest('.header')) {
    nav.classList.remove('mob-active');
  }
});

// wp-start
document.getElementById("sabitIkon").addEventListener("click", function () {
  document.getElementById("sabitIkon").classList.toggle("aktif");
});

const homeImg = document.querySelector('.HomeMenu');
const headerText = document.querySelector('.Menu-h1 h1');
const smallImages = document.querySelectorAll('.small_img');
const cityNames = document.querySelectorAll('.city_name');
const preloader = document.querySelector('.preloader');
const body = document.querySelector('body');

const fetchImages = async () => {
  window.scrollTo(0,0)
  preloader.classList.add('block');
  body.classList.add('overflow');
  
  try {
    const res = await fetch('https://recentravel.az/header-images');
    const data = await res.json()
    homeImg.style.background = `url(${data[0].headerBackground.path}) center/cover no-repeat`;
    data[0].smallImages.map((el, index) => {
      smallImages[index].src = el.path;
      cityNames[index].innerHTML = el.cityName
    })

  } catch (error) {
    console.log(error)
  } finally {
    preloader.classList.remove('block');
    body.classList.remove('overflow');
  }
}

fetchImages();

const xariciTurSlider = document.querySelector('.xaricitur-slider');
const daxiliTurSlider = document.querySelector('.daxilitur-slider');
const fetchXaricitur = async () => {
  try {
    const res = await fetch('https://recentravel.az/xarici-turlar');
    const data = await res.json();

    data.reverse().map((el) => {
      const product = `<div class="product-card swiper-slide" style="background-color: ${el.background}">
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
    const res = await fetch(`https://recentravel.az/daxili-turlar`);
    const data = await res.json();

    data.reverse().map((el) => {
      const product = `<div class="product-card swiper-slide" style="background-color: ${el.background}">
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

