import LikeButtonInit from "../../src/scripts/utils/like-button-iniator";

const createLikeButtonInitWithRestaurant = async (restaurant) => {
  await LikeButtonInit.init({
    likeButtonContainer: document.querySelector("#likeButton"),
    restaurant,
  });
};

// eslint-disable-next-line import/prefer-default-export
export { createLikeButtonInitWithRestaurant };
