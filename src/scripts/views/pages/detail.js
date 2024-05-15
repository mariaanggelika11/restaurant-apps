import ThemRestaurant from "../../data/them-restaurant";
import UrlParser from "../../routes/url-parser";
import { createTampilanKedua } from "../templates/tampilan-awal";
import PostReview from "../../utils/postreview-initiator";
import LikeButtonInit from "../../utils/like-button-iniator";

const Detail = {
  async render() {
    return `
    <div class="hero-image">
      <img src="./images/heros/hero-image_2.jpg" alt="gambarmakan" />
      <h1 class="hero-text">Restaurant Apps</h1>
      <p>Temukan berbagai pilihan restoran terbaik di sekitar Anda</p>
    </div>
    <div class="main">
        <section id="detail-rest"></section>
        <div id="likeButtonContainer"></div>
        <div class="form-review">
        <h4>Berikan Review</h4>
          <form>
            <div class="input-here">
              <label for="inputName" class="form-label">Name</label>
              <input name="inputName" type="text" class="form-control" id="inputName" required>
            </div>
            <div class="input-here">
              <label for="inputReview" class="form-label">Review</label>
              <textarea name="inputReview" class="form-control" id="inputReview" required></textarea>
            </div>
            <button id="submit-review" type="submit" class="btn">Submit</button>
          </form>
        </div>
      </div>
    `;
  },
  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const restaurant = await ThemRestaurant.detailRestauran(url.id);
    const restaurantContainer = document.getElementById("detail-rest");
    restaurantContainer.innerHTML = createTampilanKedua(restaurant);

    // favorite
    LikeButtonInit.init({
      likeButtonContainer: document.querySelector("#likeButtonContainer"),
      restaurant: {
        id: restaurant.id,
        name: restaurant.name,
        description: restaurant.description,
        pictureId: restaurant.pictureId,
        city: restaurant.city,
        rating: restaurant.rating,
      },
    });

    // post review
    const submitReview = document.getElementById("submit-review");
    submitReview.addEventListener("click", (event) => {
      event.preventDefault();
      PostReview();
    });

    const skipLinkElem = document.querySelector(".skip-link");
    skipLinkElem.addEventListener("click", (event) => {
      event.preventDefault();
      document.querySelector("#mainContent").focus();
    });
  },
};

export default Detail;
