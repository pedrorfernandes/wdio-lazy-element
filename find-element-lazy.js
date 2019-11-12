/**
 * Functions to be used on the wdio configuration to override the selector
 * functions
 * @example
 *  before: () => {
 *    ...
 *    global.$ = findElementLazy;
 *    global.$$ = findElementsLazy;
 *  },
 */
const { LazyElement, LazyElementGroup } = require("./lazy-element");

/**
 * Function to override the $ selector
 * @param {string} selector
 */
function findElementLazy(selector) {
  return new LazyElement({ selector });
}

/**
 * Function to override the $$ selector
 * @param {string} selector
 */
function findElementsLazy(selector) {
  return new LazyElementGroup({ selector });
}

module.exports = { findElementLazy, findElementsLazy };
