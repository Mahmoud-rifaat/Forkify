import icons from 'url:../../img/icons.svg';
import View from './view';
import * as model from '../model'

class PaginationView extends View {
    _parentElement = document.querySelector('.pagination');

    _generateMarkup() {
        // Set the number of results pages
        const numberOfPages = Math.ceil(this._data.result.length / this._data.resultsPerPage);
        const prev = this._data.page - 1;
        const next = this._data.page + 1;

        return (prev > 0 ? `
                    <button data-goto="${prev}" class="btn--inline pagination__btn--prev">
                        <svg class="search__icon">
                            <use href="${icons}#icon-arrow-left"></use>
                        </svg>
                        <span>${prev == 1 ? 'First Page' : 'Page ' + prev}</span>
                    </button>` : "")
            +
            (next <= numberOfPages ? `
                    <button data-goto="${next}" class="btn--inline pagination__btn--next">
                        <span>${next == numberOfPages ? 'Last Page' : 'Page ' + next}</span>
                        <svg class="search__icon">
                            <use href="${icons}#icon-arrow-right"></use>
                        </svg>
                    </button>` : "")


        // return `${prev} ${next}`;
    }

    addHandlerClick(handler) {
        this._parentElement.addEventListener('click', function (e) {

            const btn = e.target.closest('.btn--inline');

            // Guard clause in case we click outside of a button
            if (!btn) return;

            const page = +btn.dataset.goto;

            handler(page);
        })
    }
}

export default new PaginationView();
