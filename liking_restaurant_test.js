/* eslint-disable no-plusplus */
/* eslint-disable no-undef */
const assert = require("assert");

Feature("Liking Restaurants");

Before(({ I }) => {
  I.amOnPage("/#/favorite");
});

Scenario("showing empty liked Restaurants", ({ I }) => {
  I.see("Tidak ada favorite restaurant yang ditampilkan", ".restaurant-item__not__found");
  I.saveScreenshot("empty_favorite.png");
});

Scenario("liking one restaurant", async ({ I }) => {
  I.see("Tidak ada favorite restaurant yang ditampilkan", ".restaurant-item__not__found");

  I.amOnPage("/");
  I.saveScreenshot("home_page.png");

  I.seeElement(".link-detail");
  const firstRest = locate(".link-detail").first();
  const firstRestName = await I.grabTextFrom(firstRest);
  I.click(firstRest);

  I.seeElement("#likeButton");
  I.saveScreenshot("detail_page.png");
  I.click("#likeButton");

  I.amOnPage("/#/favorite");
  I.seeElement(".restaurant-container .restaurant");
  I.saveScreenshot("liked_restaurant.png");
  const likedRestName = await I.grabTextFrom(".restaurant-container .restaurant .link-detail");

  assert.strictEqual(firstRestName, likedRestName);
});

Scenario("unliking one restaurant", async ({ I }) => {
  I.see("Tidak ada favorite restaurant yang ditampilkan", ".restaurant-item__not__found");

  I.amOnPage("/");
  I.seeElement(".link-detail");
  const firstRest = locate(".link-detail").first();
  I.click(firstRest);

  I.seeElement("#likeButton");
  I.saveScreenshot("detail_page_before_liking.png");
  I.click("#likeButton");

  I.amOnPage("/#/favorite");
  I.seeElement(".restaurant-container .restaurant");
  I.saveScreenshot("favorite_page_after_liking.png");

  I.click(".link-detail");

  I.seeElement("#likeButton");
  I.saveScreenshot("detail_page_before_unliking.png");
  I.click("#likeButton");

  I.amOnPage("/#/favorite");
  I.saveScreenshot("favorite_page_after_unliking.png");
  I.see("Tidak ada favorite restaurant yang ditampilkan", ".restaurant-item__not__found");
});

Scenario("viewing detail of a liked restaurant", async ({ I }) => {
  I.see("Tidak ada favorite restaurant yang ditampilkan", ".restaurant-item__not__found");

  I.amOnPage("/");
  I.seeElement(".link-detail");
  const firstRest = locate(".link-detail").first();
  I.click(firstRest);

  I.seeElement("#likeButton");
  I.saveScreenshot("detail_page.png");
  I.click("#likeButton");

  I.amOnPage("/#/favorite");
  I.seeElement(".restaurant-container .restaurant");
  I.saveScreenshot("liked_restaurant.png");

  I.click(".link-detail");
  I.seeElement(".restaurant-detail");
  I.saveScreenshot("detail_liked_restaurant.png");
});

Scenario("liking and unliking multiple restaurants", async ({ I }) => {
  I.see("Tidak ada favorite restaurant yang ditampilkan", ".restaurant-item__not__found");

  I.amOnPage("/");
  I.seeElement(".link-detail");
  const restaurants = locate(".link-detail");
  for (let i = 0; i < 3; i++) {
    I.click(restaurants.at(i + 1));

    I.seeElement("#likeButton");
    I.saveScreenshot(`detail_page_${i + 1}.png`);
    I.click("#likeButton");
    I.amOnPage("/");
  }

  I.amOnPage("/#/favorite");
  I.seeElement(".restaurant-container .restaurant");
  I.saveScreenshot("all_liked_restaurants.png");
  const likedRestaurants = await I.grabNumberOfVisibleElements(".restaurant-container .restaurant");
  assert.strictEqual(likedRestaurants, 3);

  // Unliking the first liked restaurant
  I.click(locate(".link-detail").first());

  I.seeElement("#likeButton");
  I.saveScreenshot("unlike_first_restaurant.png");
  I.click("#likeButton");

  I.amOnPage("/#/favorite");
  I.saveScreenshot("remaining_liked_restaurants.png");
  const remainingLikedRestaurants = await I.grabNumberOfVisibleElements(".restaurant-container .restaurant");
  assert.strictEqual(remainingLikedRestaurants, 2);
});
