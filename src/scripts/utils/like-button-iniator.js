import FavoriteRestoIDB from "../data/favorite-resto-db";
import { createLikeRestaurantButtonTemplate, createUnlikeRestaurantButtonTemplate } from "../views/templates/tampilan-awal";

const LikeButtonInit = {
  async init({ likeButtonContainer, restaurant }) {
    this._likeButtonContainer = likeButtonContainer;
    this._restaurant = restaurant;

    await this._renderButton();
  },

  async _renderButton() {
    const { id } = this._restaurant;

    if (await this._isRestaurantExist(id)) {
      this._renderLikedButton();
    } else {
      this._renderLikeButton();
    }
  },

  async _isRestaurantExist(id) {
    const restaurant = await FavoriteRestoIDB.getRestaurant(id);
    return !!restaurant;
  },

  _renderLikeButton() {
    this._likeButtonContainer.innerHTML = createLikeRestaurantButtonTemplate();

    const likeButton = document.getElementById("likeButton");
    likeButton.addEventListener("click", async () => {
      await FavoriteRestoIDB.putRestaurant(this._restaurant);
      this._renderButton();
    });
  },

  _renderLikedButton() {
    this._likeButtonContainer.innerHTML = createUnlikeRestaurantButtonTemplate();

    const likedButton = document.getElementById("likeButton");
    likedButton.addEventListener("click", async () => {
      await FavoriteRestoIDB.deleteRestaurant(this._restaurant.id);
      this._renderButton();
    });
  },
};

export default LikeButtonInit;
