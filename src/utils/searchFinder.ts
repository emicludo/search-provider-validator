import { HTMLElement } from 'node-html-parser';

class SearchFinder {
  static hasSearch(html: HTMLElement): boolean {
    const buttonQuery = html.querySelectorAll('button')?.some(element => element.classList.value.some(className => className.search(/search/gi) != -1));
    const divQuery = html.querySelectorAll('div')?.some(element => element.classList.value.some(className => className.search(/search/gi) != -1));
    const inputQuery = html.querySelectorAll('input')?.some(element => element.classList.value.some(className => className.search(/search/gi) != -1));
    
    const contains = (Boolean(buttonQuery)) || (Boolean(divQuery)) || (Boolean(inputQuery));
    return contains
  }
}

export default SearchFinder;