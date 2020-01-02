# Dynamic Search

Adds a dynamic search bar that will display content based on what the input is.

## Installation

Installed on NPM via:

```
npm install brg-dynamic-search
```

## Parameters

* items: an array of objects representing the data to be searched
* callback (optional): a function for displaying items when they meet the results
* noMoreMessage (optional): a string of the message to display when no items meet the search input

## Setup

After installing, require the library in your script:

```
import DynamicSearch from 'brg-dynamic-search';
```

You'll need to add two HTML elements to your page, the input where the search is inputed and the element for containing the results. Note that unless a custom callback is used, the results container should be a `<ul>`:

```
<input data-search-input type="text"/>
<ul data-search-items></ul>
```

In your script, you'll need to pass in your input to search upon instantiation:

```
fetch('www.my-site.com/api/my-data')
  .then((blob) => blob.json())
  .then((data) => {
    DynamicSearch.setup({
      items: data,
    });
  });
```

Data will need to be setup as an array of objects, each containing the following parameters:

* name
* category
* url

Here's an example:

```
const myItems = [
  { name: 'Hello World', url: '/pages/hello-world', category: 'page'},
  { name: 'About', url: '/pages/about', category: 'page'}, 
  { name: 'Shop All', url: '/collections/shop-all', category: 'collection'},
  { name: 'Toys', url: '/collections/toys', category: 'collection'},
  { name: 'Legos', url: '/products/legos', category: 'product'},
  { name: 'Nerf', url: '/products/nerf', category: 'product'} 
];
```

## Custom Results

You can add a custom callback for creating the list items by passing in the following parameter during setup:

```
DynamicSearch.setup({
  items: data,
  callback: myCustomCallback,
});
```

The callback should return an element that will reside inside an `<li>` element for the item. The objects within the data will still need the `name` parameter.

## No Items

In the case there are no items to display, a message will display - this message can be set through the parameter `noMoreMessage` in setup:

```
DynamicSearch.setup({
  items: data,
  noMoreMessage: 'There are no items to display',
});
```