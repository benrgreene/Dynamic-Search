/** The DOM of the searchable plugin */
const dom = {
  searchInput: 'data-search-input',
  searchList: 'data-search-items',
};

/**
 * Simulate click on the first link in an list element
 *
 * @param {Event} event: the JS event of the keyup event 
 */
const clickLink = (event) => {
  if (event.keyCode !== 13) { return; }
  const link = event.target.querySelector('a');
  link && link.click();
};

/**
 * Build the element of searched item
 *
 * @param {Object} item: the item to display
 *
 * @return {Element}: the element of the item to be added 
 */
const buildSearchableItem = (item) => {
  const itemElement = document.createElement('li');
  itemElement.classList.add('isearchr__item')
  itemElement.innerHTML = `<a href="${item.url}">
  <div class="isearchr__item-info">
    <h3 class="isearchr__item-title">${item.name}</h3>
    <p class="isearchr__item-category">${item.category}</p>
  </div>
</a>`;
  itemElement.setAttribute('tabindex', '0');
  itemElement.addEventListener('keyup', clickLink);
  return itemElement;
};

/**
 * Build the element for displaying no more items available
 *
 * @param {String} message: the message to be displayed to the user
 *
 * @return {Element}: the element to be added
 */
const buildNoMoreItem = (noMoreMessage) => {
  return `<li class="isearchr__item">${noMoreMessage}</li>`;
};

/**
 * Build the elements of searched items to display and add them to the display
 *
 * @param {Array} items: the array of item objects to display
 * @param {Function} callback: the function for building the individual item elements to add to the searchable list
 */
const buildSearchableDisplayItems = (items, callback) => {
  const itemContainerElement = document.querySelector(`[${dom.searchList}]`);
  itemContainerElement.innerHTML = '';
  items.forEach((item) => {
    const itemElement = callback(item);
    itemContainerElement.appendChild(itemElement);
  });
};

/**
 * Empty the search results container
 */
const emptySearchResults = () => {
  const itemContainerElement = document.querySelector(`[${dom.searchList}]`);
  itemContainerElement.innerHTML = '';
}

/**
 * Builds a list of searchable items that meet the input requirements
 * and displays that list in the searchable item display
 *
 * @param {Event} event: the JS event of the input that holds the search query
 * @param {Array} items: the array of items that are searchable
 * @param {Function} callback: the function for building the individual item elements to add to the searchable list
 */
const getNewSearchItems = (event, allItems, callback, noMoreMessageCallback, noMoreMessage) => {
  const searchTerm = event.target.value.toLowerCase();
  if (searchTerm === '') {
    emptySearchResults();
    return;
  }
  // build list of all items to display
  const itemsToDisplay = allItems.reduce((displayItems, item) => {
    return item.name.toLowerCase().includes(searchTerm) 
      ? [...displayItems, item]
      : displayItems;
  }, []);
  // check if we need to display items or a no items message
  if (itemsToDisplay.length > 0) {
    buildSearchableDisplayItems(itemsToDisplay, callback);
  } else {
    const itemContainerElement = document.querySelector(`[${dom.searchList}]`);
    itemContainerElement.innerHTML = noMoreMessageCallback(noMoreMessage);
  }
};

/**
 * Sets up dynamic search
 *
 * @param {Array} items: the array of items that are searchable
 * @param {Function} callback: the function for building the individual item elements to add to the searchable list
 * @param {String} noMoreMessage: the string to display when no items are available that meet the search parameters
 */
const setup = ({items=[],  callback=buildSearchableItem, noMoreMessageCallback=buildNoMoreItem, noMoreMessage="No items found matching that search term"}) => {
  const searchInputElement = document.querySelector(`[${dom.searchInput}]`);
  searchInputElement.addEventListener('keyup', (event) => getNewSearchItems(event, items, callback, noMoreMessageCallback, noMoreMessage));
};

module.exports = {
  setup,
};