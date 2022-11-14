import { HTMLElement } from 'node-html-parser';

class SearchFinder {
  static hasSearch(html: HTMLElement): boolean {
    const buttonQuery = html.querySelectorAll('button')?.some(element => element.classList.value.some(className => className.search(/search/gi) != -1));
    const divQuery = html.querySelectorAll('div')?.some(element => element.classList.value.some(className => className.search(/search/gi) != -1));
    const inputQuery = html.querySelectorAll('input')?.some(element => element.classList.value.some(className => className.search(/search/gi) != -1));
    const formQuery = html.querySelectorAll('form')?.some(element => element.attributes.role == 'search');
    const inputTypeQuery = html.querySelectorAll('input')?.some(element => element.attributes.type == 'search');
    const inputPlaceHolderQuery = html.querySelectorAll('input')?.some(element => element.attributes.placeholder.toLowerCase().search(/search/gi) != -1
                                                                                || element.attributes.placeholder.toLowerCase().search(/buscar/gi) != -1
                                                                                || element.attributes.placeholder.toLowerCase().search(/søg/gi) != -1)

    const contains = buttonQuery || divQuery || inputQuery || formQuery || inputTypeQuery || inputPlaceHolderQuery;
    return contains
  }
}

export default SearchFinder;