/* eslint-disable no-undef */
// eslint-disable-next-line linebreak-style
import * as TestFactory from "./helper/test-factory";
import FavoriteRestoIDB from "../src/scripts/data/favorite-resto-db";

describe("Liking A Restaurant", () => {
  const addLikeButtonContainer = () => {
    document.body.innerHTML = '<div id="likeButton"></div>';
  };

  beforeEach(() => {
    addLikeButtonContainer();
  });

  it("should display the like button when the restaurant has not been liked before", async () => {
    await TestFactory.createLikeButtonInitWithRestaurant({ id: 1 });
    expect(document.querySelector('[aria-label="like this restaurant"]')).toBeTruthy();
  });

  it("should not display the unlike button when the restaurant has not been liked before", async () => {
    await TestFactory.createLikeButtonInitWithRestaurant({ id: 1 });

    expect(document.querySelector('[aria-label="unlike this restaurant"]')).toBeFalsy();
  });

  it("should be able to like the restaurant", async () => {
    await TestFactory.createLikeButtonInitWithRestaurant({ id: 1 });

    document.querySelector("#likeButton").dispatchEvent(new Event("click"));

    // Ensure the restaurant is successfully liked
    const restaurant = await FavoriteRestoIDB.getRestaurant(1);
    expect(restaurant).toEqual({ id: 1 });

    await FavoriteRestoIDB.deleteRestaurant(1);
  });

  it("should not add a restaurant again when it is already liked", async () => {
    await TestFactory.createLikeButtonInitWithRestaurant({ id: 1 });

    // Add the restaurant with ID 1 to the liked restaurants list
    await FavoriteRestoIDB.putRestaurant({ id: 1 });

    // Simulate the user clicking the like button again
    document.querySelector("#likeButton").dispatchEvent(new Event("click"));

    // Ensure no duplicate restaurant is added
    expect(await FavoriteRestoIDB.getAllRestaurant()).toEqual([{ id: 1 }]);

    await FavoriteRestoIDB.deleteRestaurant(1);
  });

  it("should not add a restaurant when it has no ID", async () => {
    await TestFactory.createLikeButtonInitWithRestaurant({});

    document.querySelector("#likeButton").dispatchEvent(new Event("click"));

    expect(await FavoriteRestoIDB.getAllRestaurant()).toEqual([]);
  });
});
