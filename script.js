const search = document.querySelector("#search");
const ingredientSearch = document.querySelector("#ingredientSearch");
const form = document.querySelector("#form");
const ingredientForm = document.querySelector("#ingredientForm");
const cards = document.querySelector("#cards");
const IngredientsCards = document.querySelector("#IngredientsCards");
const mealSearchIcon = document.querySelector(".mealSearchSvg");
const indredientSearchIcon = document.querySelector(".indredientSearchSvg");
const meal_details = document.querySelector(".meal-details");
const meal_details_content = document.querySelector(".meal-details-content");
const close = document.querySelector(".close");
const closeBtn = document.querySelector(".closeBtn");
const menu = document.querySelector(".menu");
const OpenMenu = document.querySelector(".OpenMenu");
const closeMenu = document.querySelector(".closeMenu");
const services = document.querySelector(".service");
const services_lists = document.querySelector(".services-lists");

async function getMeal() {
  const resp = await fetch(
    "https://www.themealdb.com/api/json/v1/1/search.php?s=" + search.value
  );
  const respData = await resp.json();
  let html = "";
  if (respData.meals) {
    respData.meals.forEach((meal) => {
      html += `
                <div class="card" data-id="${
                  meal.idMeal
                }" style="width: 20rem; height: 20rem; margin: 0 15px;">
                    <img src=${
                      meal.strMealThumb
                    } class="card-img-top" alt="..." />
                    <div class="card-body">
                        <h5 class="card-title">${meal.strMeal.slice(0, 24)}</h5>
                        <a href="#" class="btn btn-primary getRecipeBtn">Get Recipe</a>
                    </div>
                </div>
            `;
    });
  } else {
    html += `<h2 class="error">Sorry, we did not get that Item😪</h2>`;
  }
  cards.innerHTML = html;
  search.value = "";
}
form.addEventListener("submit", (e) => {
  e.preventDefault();
  getMeal();
});

mealSearchIcon.addEventListener("click", getMeal);

async function getIngredient() {
  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredientSearch.value}`
  );
  const resData = await res.json();

  let html = "";
  if (resData.meals) {
    resData.meals.forEach((meal) => {
      html += `
                <div class="card" data-id="${
                  meal.idMeal
                }" style="width: 20rem; height: 20rem; margin: 0 15px;">
                    <img src=${
                      meal.strMealThumb
                    } class="card-img-top" alt="..." />
                    <div class="card-body">
                        <h5 class="card-title">${meal.strMeal.slice(0, 24)}</h5>
                        <a href="#" class="btn btn-primary getRecipeBtn">Get Recipe</a>
                    </div>
                </div>
            `;
    });
  } else {
    html += `<h2 class="error">Sorry, we did not get that Item😪</h2>`;
  }
  IngredientsCards.innerHTML = html;
  ingredientSearch.value = "";
}

ingredientForm.addEventListener("submit", (e) => {
  e.preventDefault();
  getIngredient();
});

indredientSearchIcon.addEventListener("click", getIngredient);

async function getRecipe(e) {
  e.preventDefault();
  // console.log(e.target);
  let selectedMealId = e.target.parentElement.dataset.id;

  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${selectedMealId}`
  );
  const data = await response.json();
  console.log(data);
  showRecipeModal(data.meals);
}

function showRecipeModal(meal) {
  console.log(meal[0]);
  meal = meal[0];
  let html = `
        <div class="meal-container">
        <h1 class="meal-title">${meal.strMeal}</h1>
        <h6 class="meal-category">Category : <span>${meal.strCategory}</span> </h6>
        <img class="meal-img" src=${meal.strMealThumb} alt="" style="width: 100px" />
        <p class="instruction">
        <b>Instruction </b>:
        <span>${meal.strInstructions}</span>
        </p>
        </div>
    `;
  meal_details_content.innerHTML = html;
  meal_details.style.display = "block";
}

cards.addEventListener("click", getRecipe);
IngredientsCards.addEventListener("click", getRecipe);
closeBtn.addEventListener("click", () => {
  meal_details.style.display = "none";
});


OpenMenu.addEventListener('click',() => {
  services.classList.toggle("listRes");
  services_lists.classList.toggle("listResItems");
})