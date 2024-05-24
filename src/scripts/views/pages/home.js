import ThemRestaurant from "../../data/them-restaurant";
import { createTampilanAwal } from "../templates/tampilan-awal";

const Home = {
  async render() {
    return `
    <div class="hero-image">
      <div class="text-container">
        <h1 class="hero-text">Restaurant Apps</h1>
      </div>
      <picture>
        <source media="(max-width: 600px)" srcset="./images/hero-image_2-small.jpg">
        <img src="./images/hero-image_2-large.jpg" alt="gambarmakan"id="hero-image" loading="lazy">
      </picture>  
    </div>
    <div class="explorer">
      <h2>Restaurant Explorer</h2>
    </div>
    <div class="explore">
      <div class="restaurant" id="rumah">
        <!-- Your restaurant content goes here -->
      </div>
    </div>`;
  },

  async afterRender() {
    // Preload gambar LCP
    const heroImage = document.getElementById("hero-image");
    if (heroImage.complete) {
      return; // Gambar sudah dimuat, tidak perlu dilakukan preload
    }
    const heroImagePreload = new Image();
    heroImagePreload.src = "./images/hero-image_2-large.jpg";

    // Mendapatkan daftar restoran dan menampilkan tampilan awal restoran
    const listRestaurant = await ThemRestaurant.getRestaurants();
    const restaurantContainer = document.getElementById("rumah");
    restaurantContainer.innerHTML = "";
    listRestaurant.forEach((restaurant) => {
      restaurantContainer.innerHTML += createTampilanAwal(restaurant);
    });
  },
};

export default Home;
