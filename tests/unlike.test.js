/* eslint-disable no-undef */
import FavoriteRestoIDB from "../src/scripts/data/favorite-resto-db";
import * as TestFactory from "./helper/test-factory";

// eslint-disable-next-line no-undef
describe("Unliking A Restaurant", () => {
  const setupLikeButtonContainer = () => {
    document.body.innerHTML = '<div id="likeButton"></div>';
  };

  // eslint-disable-next-line no-undef
  beforeEach(async () => {
    setupLikeButtonContainer();
    global.structuredClone = jest.fn((val) => JSON.parse(JSON.stringify(val)));
    await FavoriteRestoIDB.putRestaurant({ id: 1 });
  });

  afterEach(async () => {
    await FavoriteRestoIDB.deleteRestaurant(1);
  });

  it("should display the unlike button when the restaurant has been liked", async () => {
    await TestFactory.createLikeButtonInitWithRestaurant({ id: 1 });
    expect(document.querySelector('[aria-label="unlike this restaurant"]')).toBeTruthy();
  });

  it("should not display the like button when the restaurant has been liked", async () => {
    await TestFactory.createLikeButtonInitWithRestaurant({ id: 1 });
    expect(document.querySelector('[aria-label="like this restaurant"]')).toBeFalsy();
  });

  it("should be able to remove liked restaurant from the list", async () => {
    await TestFactory.createLikeButtonInitWithRestaurant({ id: 1 });
    document.querySelector("#likeButton").dispatchEvent(new Event("click"));
    expect(await FavoriteRestoIDB.getAllRestaurant()).toEqual([]);
  });

  it("should not throw an error when the unlike button is clicked if the restaurant is not in the list", async () => {
    await TestFactory.createLikeButtonInitWithRestaurant({ id: 1 });
    await FavoriteRestoIDB.deleteRestaurant(1);
    document.querySelector('[aria-label="unlike this restaurant"]').dispatchEvent(new Event("click"));
    expect(await FavoriteRestoIDB.getAllRestaurant()).toEqual([]);
  });
});
