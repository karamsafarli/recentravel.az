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
// header
// wp-start
document.getElementById("sabitIkon").addEventListener("click", function () {
  document.getElementById("sabitIkon").classList.toggle("aktif");
});

const XariciTurlar = document.querySelector('.xaricitur_container')
const fetchPosts = async () => {
  const res = await fetch('https://lively-bee-beanie.cyclic.app/xarici-turlar');
  const data = await res.json()

  data.reverse().map((el) => {
    const card = `
    <div class="col-lg-4 col-12 col-sm-6 col-md-6">
          <div class="product-card" style="background-color: ${el.background}">
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
          </div>
        </div>
    `;

    XariciTurlar.innerHTML += card;
  })
}

fetchPosts()