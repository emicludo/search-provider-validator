# Search Provider Validator

Tool to detect if a domain has some search service provider implemented.
This is a demo version with minimun functionality

This repository uses [Cludo.WebRenderService](https://github.com/Cludo/Cludo.WebRenderService) as a service to render async content.

## Getting Started

### Prerequisites

Start by installing the latest Node.js and npm

https://www.npmjs.com/get-npm
https://nodejs.dev/en/download/

### Installing

Once you have npm installed, clone this repository by opening it in the Github desktop client or via command line:

```
git clone https://github.com/emicludo/search-provider-validator.git
```

While you're in the project root directory, install all package dependencies:
```
npm install
```

### Running locally 
To serve the application locally on http://localhost:3000, run the following command on the terminal:
```
npm run dev
```

### Coding style

We also use eslint to maintain consistent code style including spacing, bracket alignment, etc. Run eslint tests:

```
npm run lint
npm run lint-fix
```

### Use

Send a GET request to http://localhost:3000 with a single query parameter `domain`. Here is an example of a request:
```
GET http://localhost:3000/?domain=cph.dk
```
The application will return true if the word `search` is contained in some html class name from a div, input or button in the domain provided.


### Criteria implemented to detect an existant search provider
Presence of:

`<div class=" ... ">...</div>` ---> with class name containing the string "search"

or

`<input class=" ... ">...</input>` ---> with class name containing the string "search"

or

`<button class=" ... ">...</button>` ---> with class name containing the string "search"

or

`<form role="search">...</form>`

or

`<input type="search">...</input>`

or

`<input placeholder="search">...</input>` ---> placeholder contains the string "search" or "søg" or "buscar"