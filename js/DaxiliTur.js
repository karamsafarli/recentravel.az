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
// wp-start
document.getElementById("sabitIkon").addEventListener("click", function () {
  document.getElementById("sabitIkon").classList.toggle("aktif");
});

const DaxiliTurlar = document.querySelector('.daxilitur_container')
const fetchPosts = async () => {
  const res = await fetch('http://localhost:3000/daxili-turlar');
  const data = await res.json()

  data.reverse().map((el) => {
    const card = `
    <div class="col-lg-4 col-6 col-md-6">
    <a href="/daxili-turlar/${el._id}">
      <img src="${el.imagePath}" alt="">
    </a>
    
    <div class="img-m">
      <h4>${el.cityName}</h4>
      <span>${el.title}</span>
      <h3>${el.price}Azn</h3>
      <i class="fa-solid fa-star"></i>
      <i class="fa-solid fa-star"></i>
      <i class="fa-solid fa-star"></i>
      <i class="fa-solid fa-star"></i>
      <i class="fa-solid fa-star"></i>  
    </div>
  </div>
    `;

    DaxiliTurlar.innerHTML += card;
  })
}

fetchPosts()