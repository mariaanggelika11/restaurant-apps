import FavoriteRestoIDB from "../../data/favorite-resto-db";
import { createTampilanAwal } from "../templates/tampilan-awal";

const Favorite = {
  async render() {
    return `
    <div class="hero-image">
    <picture>
    <source media="(max-width: 600px)" srcset="./images/hero-image_2-small.jpg">
    <img src="./images/hero-image_2-large.jpg" alt="gambarmakan" id="hero-image" loading="lazy">
  </picture>
  
    <h1 class="hero-text">Restaurant Apps</h1>
  </div>
   
  <div class="container">
  <h2 tabindex="0" class="explore-restaurant__label">Favorite</h2>
  <h2 class="restaurant-item__not__found"></h2>
  <section id="explore-restaurant-list"></section>
</div>

    `;
  },

  async afterRender() {
    const restaurants = await FavoriteRestoIDB.getAllRestaurant();
    const restaurantContainer = document.getElementById("explore-restaurant-list");
    const empty = document.querySelector(".restaurant-item__not__found");
    if (restaurants.length === 0) {
      empty.innerHTML = `
      <h2>Tidak ada favorite restaurant yang ditampilkan</h2>
      `;
    }

    restaurants.forEach((restaurant) => {
      restaurantContainer.innerHTML += createTampilanAwal(restaurant);
    });

    const skipLinkElem = document.querySelector(".skip-link");
    skipLinkElem.addEventListener("click", (event) => {
      event.preventDefault();
      document.querySelector("#mainContent").focus();
    });
  },
};

export default Favorite;
