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


const aboutContainer = document.querySelector('.about_container');
const preloader = document.querySelector('.preloader');
const body = document.querySelector('body');
const fetchEmployees = async () => {
  preloader.classList.add('block');
  body.classList.add('overflow');
  try {
    const res = await fetch('https://recentravel.az/about-employee');
    const data = await res.json();

    data.map((el) => {
      const card = `<div class="col-lg-4 col-md-6 col-sm-12 col-12 emp_card">
      <img src="${el.photo}" alt="">
      <div class="haqqimizda-m">
        <h2>${el.name}</h2>
        <h3>${el.job}</h3>
        <span>${el.description}</span>
      </div>
    </div>`;

      aboutContainer.innerHTML += card;

    })
  } catch (error) {
    console.log(error)
  } finally {
    preloader.classList.remove('block');
    body.classList.remove('overflow');
  }
}

fetchEmployees();