import { API_URL, RESULTS_PER_PAGE, KEY } from "./config";
// import { getJSON, sendJSON } from "./helpers";
import { AJAX } from './helpers';

export const state = {
    recipe: {},
    search: {
        query: '',
        result: [],
        page: 1,
        resultsPerPage: RESULTS_PER_PAGE
    },
    bookmarks: JSON.parse(localStorage.getItem('bookmarks')) || []
}

const createRecipeObject = function (data) {
    const { recipe } = data.data;
    return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        sourceUrl: recipe.source_url,
        image: recipe.image_url,
        servings: recipe.servings,
        cookingTime: recipe.cooking_time,
        ingredients: recipe.ingredients,
        ...(recipe.key && { key: recipe.key })
    };
}


export const loadRecipe = async function (id) {

    try {
        const data = await AJAX(`${API_URL}/${id}?key=${KEY}`);
        state.recipe = createRecipeObject(data);

        if (state.bookmarks.some(bookmark => bookmark.id === id))
            state.recipe.bookmarked = true;
        else state.recipe.bookmarked = false;

    } catch (error) {
        throw error;
    }
}

export const loadSearchResults = async function (query) {
    try {
        state.search.query = query;

        const data = await AJAX(`${API_URL}?search=${query}&key=${KEY}`);

        state.search.result = data.data.recipes.map(recipe => {
            return {
                id: recipe.id,
                title: recipe.title,
                publisher: recipe.publisher,
                image: recipe.image_url,
                ...(recipe.key && { key: recipe.key })
            }
        });

    } catch (error) {
        throw error;
    }
}

// We consider that "loadSearchResults" is already called and the global state "search.result" is set with data.
export const getSearchResultsPage = function (page = state.search.page) {
    state.search.page = page;
    const first = (page - 1) * state.search.resultsPerPage;
    const last = page * state.search.resultsPerPage;

    return state.search.result.slice(first, last);
}

export const updateServings = function (newServings) {
    state.recipe.ingredients.forEach(ingredient => {
        ingredient.quantity = (ingredient.quantity / state.recipe.servings) * newServings;
    });
    state.recipe.servings = newServings;
}

const persistBookmarks = function () {
    localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
}

export const addBookmark = function (recipe) {
    state.bookmarks.push(recipe);
    state.recipe.bookmarked = true;
    persistBookmarks();
}

export const deleteBookmark = function (id) {
    const index = state.bookmarks.findIndex(rec => rec.id === id);
    state.bookmarks.splice(index, 1);
    state.recipe.bookmarked = false;
    persistBookmarks();
}

export const uploadRecipe = async function (newRecipe) {
    const ingredients = Object.entries(newRecipe)
        .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
        .map(ing => {
            // const ingArr = ing[1].replaceAll(' ', '').split(',');
            const ingArr = ing[1].split(',').map(el => el.trim());

            if (ingArr.length !== 3) throw new Error('Wrong Ingredient format! Please use the correct format :)');

            const [quantity, unit, description] = ingArr;
            return { quantity: quantity ? +quantity : null, unit, description };
        });

    const recipe = {
        title: newRecipe.title,
        source_url: newRecipe.sourceUrl,
        image_url: newRecipe.image,
        publisher: newRecipe.publisher,
        cooking_time: newRecipe.cookingTime,
        servings: newRecipe.servings,
        ingredients,
    }

    const data = await AJAX(`${API_URL}?key=${KEY}`, recipe);
    state.recipe = createRecipeObject(data);
    addBookmark(state.recipe);
}