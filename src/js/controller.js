import * as model from './model.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';
import { MODAL_CLOSE_SECONDS } from './config.js';
import View from './views/view.js';

// if (module.hot) {
//   module.hot.accept();
// }

const controlRecipes = async function () {
  try {
    // Pick the recipe id from hash
    const id = window.location.hash.slice(1);

    //  Guard Clause
    if (!id) return;

    recipeView.renderSpinner();

    // 0) Update results view to mark selected search result
    resultsView.update(model.getSearchResultsPage());

    // 1) Loading recipe
    await model.loadRecipe(id);

    // 2) Rendering recipe & bookmarks
    recipeView.render(model.state.recipe);
    bookmarksView.render(model.state.bookmarks);
  } catch (error) {
    console.log(error);
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    // 1) Display a spinner
    resultsView.renderSpinner();

    // 2) Get the search query
    const query = searchView.getQuery();
    if (!query) return;

    // 3) Load search results
    await model.loadSearchResults(query);

    // 4) Render result page
    resultsView.render(model.getSearchResultsPage(1));

    // 5) Render pagination buttons
    paginationView.render(model.state.search);

  } catch (error) {
    console.log(error);
    recipeView.renderError(error);
  }
}

const controlPagination = function (page) {
  // Render NEW results
  resultsView.render(model.getSearchResultsPage(page));
  // Render NEW pagination
  paginationView.render(model.state.search);
}

const controlServings = function (newServings) {
  // update servings, ingredients quantities for the recipe in state.
  model.updateServings(newServings);

  // update the UI (servings and ingredients quantities)
  // recipeView.render(model.state.recipe);

  recipeView.update(model.state.recipe);
}

const controlAddBookmark = function (recipe) {
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(recipe);

  recipeView.update(model.state.recipe);
  bookmarksView.render(model.state.bookmarks);
}

const controlAddRecipe = async function (newRecipe) {
  try {
    // Render a spinner
    addRecipeView.renderSpinner();

    // Upload the new recipe data
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);

    // Render recipe
    recipeView.render(model.state.recipe);

    // Display a success message
    addRecipeView.renderMessage();

    // Render bookmark view
    bookmarksView.render(model.state.bookmarks);

    // Change id in the url
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    // Close form window
    setTimeout(function () {
      addRecipeView.toggleWindow()
    },
      MODAL_CLOSE_SECONDS * 1000);
  } catch (err) {
    console.log(err);
    addRecipeView.renderError(err.message);
  }
}

function Init() {
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
}

Init();

