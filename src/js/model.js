import { API_URL, RESULTS_PER_PAGE } from "./config";
import { getJSON } from "./helpers";

export const state = {
    recipe: {},
    search: {
        query: '',
        result: [],
        page: 1,
        resultsPerPage: RESULTS_PER_PAGE
    }
}


export const loadRecipe = async function (id) {

    try {
        const data = await getJSON(`${API_URL}/${id}`);

        const { recipe } = data.data;
        state.recipe = {
            id: recipe.id,
            title: recipe.title,
            publisher: recipe.publisher,
            sourceUrl: recipe.source_url,
            image: recipe.image_url,
            servings: recipe.servings,
            cookingTime: recipe.cooking_time,
            ingredients: recipe.ingredients,
        };
        // console.log(state.recipe);
    } catch (error) {
        throw error;
    }
}

export const loadSearchResults = async function (query) {
    try {
        state.search.query = query;

        const data = await getJSON(`${API_URL}?search=${query}`);

        state.search.result = data.data.recipes.map(recipe => {
            return {
                id: recipe.id,
                title: recipe.title,
                publisher: recipe.publisher,
                image: recipe.image_url
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