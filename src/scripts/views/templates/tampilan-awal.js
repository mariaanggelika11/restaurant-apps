/* eslint-disable object-curly-newline */
/* eslint-disable comma-dangle */
/* eslint-disable indent */
/* eslint-disable max-len */
import CONFIG from "../../globals/config";

const createTampilanAwal = (restaurant) => `
<div class="restaurant-container">
  <div class="restaurant">
  <picture>
  <source
    srcset="${CONFIG.BASE_IMAGE_SMALL_URL + restaurant.pictureId}"
    type="image/webp"
    media="(max-width: 300px)"
  />
  <source
    srcset="${CONFIG.BASE_IMAGE_SMALL_URL + restaurant.pictureId}"
    type="image/jpeg"
    media="(max-width: 300px)"
  />
  <source
    srcset="${CONFIG.BASE_IMAGE_MEDIUM_URL + restaurant.pictureId}"
    type="image/webp"
    media="(min-width: 301px) and (max-width: 700px)"
  />
  <source
    srcset="${CONFIG.BASE_IMAGE_MEDIUM_URL + restaurant.pictureId}"
    type="image/jpeg"
    media="(min-width: 301px) and (max-width: 700px)"
  />
  <source
    srcset="${CONFIG.BASE_IMAGE_LARGE_URL + restaurant.pictureId}"
    type="image/webp"
    media="(min-width: 701px)"
  />
  <source
    srcset="${CONFIG.BASE_IMAGE_LARGE_URL + restaurant.pictureId}"
    type="image/jpeg"
    media="(min-width: 701px)"
  />
  <img
    class="restaurant-img lazyload"
    data-srcset="${CONFIG.BASE_IMAGE_MEDIUM_URL + restaurant.pictureId}"
    alt="${restaurant.name}"
    width="300"
    height="200"
  />
</picture>


    <a href="${`/#/detail/${restaurant.id}`}" class="link-detail">See More...</a>
    <h2 class="restaurant__name">${restaurant.name}</h2>
    <p class="restaurant__rating">⭐ ${restaurant.rating}</p>
    <hr class="restaurant__separator" />
    <p class="restaurant__place">${restaurant.city}</p>
    <p class="deskripsi">${restaurant.description}</p>
  
  </div>
</div>`;

const createTampilanKedua = (restaurant) => `
<div class="restaurant-detail">
  <h2 class="restaurant-title">${restaurant.name}</h2>
  <div class="restaurant-info">
  <picture>
      <source
        class="restaurant-img lazyload"
        data-src="${CONFIG.BASE_IMAGE_SMALL_URL + restaurant.pictureId}"
        type="image/webp"
        media="(max-width: 300px)"
      />
      <source
        class="restaurant-img lazyload"
        data-src="${CONFIG.BASE_IMAGE_SMALL_URL + restaurant.pictureId}"
        type="image/jpeg"
        media="(max-width: 300px)"
      />
      <source
        class="restaurant-img lazyload"
        data-src="${CONFIG.BASE_IMAGE_SMALL_URL + restaurant.pictureId}"
        type="image/webp"
        media="(min-width: 301px) and (max-width: 700px)"
      />
      <source
        class="restaurant-img lazyload"
        data-src="${CONFIG.BASE_IMAGE_SMALL_URL + restaurant.pictureId}"
        type="image/jpeg"
        media="(min-width: 301px) and (max-width: 700px)"
      />
      <source
        class="restaurant-img lazyload"
        data-src="${CONFIG.BASE_IMAGE_MEDIUM_URL + restaurant.pictureId}"
        type="image/webp"
        media="(min-width: 701px) and (max-width: 900px)"
      />
      <source
        class="restaurant-img lazyload"
        data-src="${CONFIG.BASE_IMAGE_MEDIUM_URL + restaurant.pictureId}"
        type="image/jpeg"
        media="(min-width: 701px) and (max-width: 900px)"
      />
      <source
        class="restaurant-img lazyload"
        data-src="${CONFIG.BASE_IMAGE_LARGE_URL + restaurant.pictureId}"
        type="image/webp"
        media="(min-width: 901px)"
      />
      <source
        class="restaurant-img lazyload"
        data-src="${CONFIG.BASE_IMAGE_LARGE_URL + restaurant.pictureId}"
        type="image/jpeg"
        media="(min-width: 901px)"
      />
      <img
        class="restaurant-img lazyload"
        data-src="${CONFIG.BASE_IMAGE_MEDIUM_URL + restaurant.pictureId}"
        alt="${restaurant.name}"
        width="300"
        height="200"
      />
    </picture>

    <div class="restaurant-description">
      <ul class="detail-info">
        <li class="rest-name">
          <p class="label-one" id="name">${restaurant.name}</p>
        </li>
        <li class="rest-address">
          <p class="label-one" id="address">${restaurant.address}, ${restaurant.city}</p>
        </li>
        <li class="rest-rating">
          <p class="label-one" id="rating">⭐${restaurant.rating}</p>
        </li>
        <li class="rest-description">
          <p class="label-one">${restaurant.description}</p>
        </li>
      </ul>
    </div>
    <div tabindex="0" class="detail-menu">
      <div class="detail-food">
        <h4>Food</h4>
        <table>
          <tr>
            <th>Food Item</th>
          </tr>
          ${restaurant.menus.foods
            .map(
              (food) => `
                <tr>
                  <td>${food.name}</td>
                </tr>
              `
            )
            .join("")}
        </table>
      </div>
      <div class="detail-drink">
        <h4>Drink</h4>
        <table>
          <tr>
            <th>Drink Item</th>
          </tr>
          ${restaurant.menus.drinks
            .map(
              (drink) => `
                <tr>
                  <td>${drink.name}</td>
                </tr>
              `
            )
            .join("")}
        </table>
      </div>
    </div>
    <div class="container-review">
      <h3 tabindex="0" class="title-review">Reviews</h3>
      <div tabindex="0" class="detail-review">
        <table>
          <tr>
            <th>User</th>
            <th>Date</th>
            <th>Review</th>
          </tr>
          ${restaurant.customerReviews
            .map(
              (review) => `
                <tr>
                  <td>${review.name}</td>
                  <td>${review.date}</td>
                  <td>${review.review}</td>
                </tr>
                `
            )
            .join("")}
        </table>
      </div>
    </div>
  </div>
</div>`;

const createLikeRestaurantButtonTemplate = () => `
<button aria-label="like this restaurant" id="likeButton" class="like">
  <i class="fa fa-heart-o" aria-hidden="true"></i>
</button>
`;

const createUnlikeRestaurantButtonTemplate = () => `
<button aria-label="unlike this restaurant" id="likeButton" class="like">
  <i class="fa fa-heart" aria-hidden="true"></i>
</button>
`;

export { createTampilanAwal, createTampilanKedua, createLikeRestaurantButtonTemplate, createUnlikeRestaurantButtonTemplate };
