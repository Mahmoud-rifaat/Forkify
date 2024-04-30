import * as model from './model.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';

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

    // 1) Loading recipe
    await model.loadRecipe(id);

    // 2) Rendering recipe
    recipeView.render(model.state.recipe);
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


function Init() {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
}

Init();

