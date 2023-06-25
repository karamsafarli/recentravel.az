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
// wp-start
document.getElementById("sabitIkon").addEventListener("click", function() {
  document.getElementById("sabitIkon").classList.toggle("aktif");
});