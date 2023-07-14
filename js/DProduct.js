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




const fetchProduct = async () => {
  const path = window.location.pathname.split('/')[2];
  try {
    const res = await fetch(`http://localhost:3000/daxili-turlar/${path}`);
    const data = res.json();
    console.log(data)
  } catch (err) {
    console.log(err)
  }
}

fetchProduct();