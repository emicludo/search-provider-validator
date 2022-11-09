import express, { Application, NextFunction, Request, Response } from 'express'
import * as bodyParser from 'body-parser';
import cors from 'cors';

//Controllers
import SearchProviderController from './controllers/searchprovider.controller';

const app: Application = express()

const port = 3000

//Middlewares
app.use(logger);
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  SearchProviderController.findSearch(req, res, next);
})
//To do:
//1. Isolate css classes and look for search
/* 
2. Use criteria from the exploration. These are some observations:

General
  - "Søg" / "Search" / etc, as placeholder of an <input />
  - "search" contained in elements classes 
  - <input /> type="search"
  - <form method="post" action="" role="search" .../>

Google
  <div class="gcse-search"></div>
  <div class="gcse-searchresults"></div> 
  <script async src="https://cse.google.com/cse.js?cx=YOUR_ENGINE_ID"></script>

Algolia
  <div class="aa-Autocomplete" role="combobox" aria-expanded="false" aria-haspopup="listbox" aria-labelledby="autocomplete-0-label">...</div>
  <input class="aa-Input" aria-autocomplete="both" aria-labelledby="autocomplete-0-label" id="autocomplete-0-input" autocomplete="off" autocorrect="off" autocapitalize="off" enterkeyhint="search" spellcheck="false" placeholder="Add a product to cart to get started!" maxlength="512" type="search">

Swiftype
  <form class="sui-search-box"><input class="sui-search-box__text-input" type="text" placeholder="Search Swiftype.com" value="">...</form>

Coveo
  <div class="mh-search" role="search"><input id="mh-search-input" type="search" class="mh-search-input" placeholder="Search Dell" tabindex="0" autocomplete="off"> 
  <button class="mh-search-btn mh-search-cancel" tabindex="0" aria-label="Cancel Search"></button>
  </div>

Raffle
  <form method="post" action="" role="search" autocomplete="off" class="search-form" data-v-6c1e8e38="">
    <div class="search-form__field">
      <input type="search" name="term" placeholder="Hvad leder du efter?" title="Search for the product" autocomplete="off" required="required" class="search-form__input"> 
      <div class="search-form__icon"></div>
    </div>
  </form>

SearchUnify
  <form id="searchForm" class="su__search-forms su__w-100 su__px-3 su__px-sm-1 su__m-0 ng-pristine ng-valid" ng-submit="clickSearch(true, true)">
            ...
                          <input autocomplete="off" id="md-auto" class="su__form-control su__autocomplete-input su__md-autocomplete-rtl ng-pristine ng-untouched ng-valid ng-empty" type="text" placeholder="Search here" ng-model="searchString" ng-change="search(searchString)" ng-focus="search(searchString)" ng-keyup="($event.key == 'ArrowUp' || $event.key == 'ArrowDown' || $event.key == 'Enter') &amp;&amp; upOrDownKeyPress($event)" ng-model-options="{ debounce: 500 }" aria-invalid="false" style="">

  </form>
 
*/

app.listen(port, function () {
  console.log(`App is listening on port ${port} !`)
})

function logger(request: express.Request, response: express.Response, next: () => void) {
  console.log(`${new Date().toISOString()}: ${request.method} request received on endpoint:  ${request.path}`);
  next();
}