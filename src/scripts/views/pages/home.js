import ThemRestaurant from "../../data/them-restaurant";
import { createTampilanAwal } from "../templates/tampilan-awal";

const Home = {
  async render() {
    return `
    <div class="hero-image">
      <img src="./images/heros/hero-image_2.jpg" alt="gambarmakan" />
      <h1 class="hero-text">Restaurant Apps</h1>
      <p>Temukan berbagai pilihan restoran terbaik di sekitar Anda</p>
    </div>
  
    <div class="explorer">
      <h2>Restaurant Explorer</h2>
    </div>
    <div class="explore">
      <div class="restaurant" id="rumah"> <!-- Tambahkan id="rumah" di sini -->
        <!-- Your restaurant content goes here -->
      </div>
    </div>
    `;
  },

  async afterRender() {
    const listRestaurant = await ThemRestaurant.getRestaurants();
    const restaurantContainer = document.getElementById("rumah");
    restaurantContainer.innerHTML = "";
    listRestaurant.forEach((restaurant) => {
      restaurantContainer.innerHTML += createTampilanAwal(restaurant);
    });
  },
};

export default Home;
