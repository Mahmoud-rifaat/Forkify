import * as model from './model.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import recipeView from './views/recipeView.js';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};


///////////////////////////////////////


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
    alert(error.message);
  }
};


// window.addEventListener('hashchange', controlRecipes);
// window.addEventListener('load', controlRecipes);
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipes));

