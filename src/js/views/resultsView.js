import previewView from "./previewView";
import View from "./view";

class ResultsView extends View {
    _parentElement = document.querySelector('.results');
    _errorMessage = "No recipes found! please try another query ;)";
    _message = '';

    _generateMarkup() {
        return this._data.map(recipe => previewView.render(recipe, false)).join('');
    }
}

export default new ResultsView();