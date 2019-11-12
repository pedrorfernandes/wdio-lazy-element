const functionNames = require("./element-function-names");

/**
 * This class will replace the element returned by the wdio $.
 * This will be usefull to allow us to avoid async/awaits when creating new
 *  Page Objects and will allow us to use getters and chain promises.
 */
class LazyElement {
  /**
   *
   * @param {string} selector Element selector
   * @param {LazyElement} parent Element parent if it exists
   * @param {number} index Index of the pretended element. Used when retrieving an LazyElement
   *  from the LazyElementGroup class
   */
  constructor({ selector, parent, index }) {
    if (parent && Number.isInteger(index)) {
      this.getElement = () => parent.getElement().then(parentElement => parentElement[index]);
      return;
    }
    if (parent) {
      this.getElement = () => parent.getElement().then(parentElement => parentElement.$(selector));
      return;
    }
    // eslint-disable-next-line no-undef
    this.getElement = () => browser.$(selector);
  }
}

/**
 * This class will replace the Array of elements returned by the wdio $$.
 * This will be usefull to allow us to avoid async/awaits when creating new
 *  Page Objects and will allow us to use getters and chain promises.
 */
class LazyElementGroup {
  /**
   * LazyElementGroup constructor.
   *
   * @param {string} selector Elements selector
   * @param {LazyElement} parent parent element
   */
  constructor({ selector, parent }) {
    if (parent) {
      this.getElement = () => parent.getElement().then(parentElement => parentElement.$$(selector));
      return;
    }
    // eslint-disable-next-line no-undef
    this.getElement = () => browser.$$(selector);
  }

  /**
   * Get a LazyElement at a specific index of this LazyElementGroup
   * @param {number} index Index of the pretended element
   * @returns {LazyElement}
   */
  get(index) {
    return new LazyElement({ parent: this, index });
  }

  /**
   * Gives us the number of Elements on the LazyElementGroup
   */
  get length() {
    return this.getElement().then(element => element.length);
  }
}

/**
 * Function to find an element and return an LazyElement
 *  instead of the wdio Promise<WebdriverIOAsync.Element>.
 * @param {string} selector The element selector
 * @returns {LazyElement} A Lazy Element
 */
function findElement(selector) {
  return new LazyElement({ parent: this, selector });
}

/**
 * Function to find an elements and return an LazyElementGroup
 *  instead of the wdio Array.<Promise<WebdriverIOAsync.Element>>.
 * @param {string} selector The element selector
 * @returns {LazyElementGroup} A Lazy Element Group
 */
function findElements(selector) {
  return new LazyElementGroup({ parent: this, selector });
}

/**
 * Override the prototype selector functions with ours
 */
LazyElement.prototype.$ = findElement;
LazyElement.prototype.$$ = findElements;
LazyElementGroup.prototype.$ = findElement;
LazyElementGroup.prototype.$$ = findElements;

/**
 * Override all the Element functions so we are able to chain Promises
 */
functionNames.forEach(functionName => {
  LazyElement.prototype[functionName] = function getLazyElementAndCall(...args) {
    return this.getElement().then(element => element[functionName](...args));
  };
});

module.exports = { LazyElement, LazyElementGroup };
