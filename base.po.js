const { LazyElement, LazyElementGroup } = require("./lazy-element");

class BasePO {
  constructor(lazyElement, defaultLazyElement) {
    if (lazyElement) {
      if (
        !(
          lazyElement instanceof LazyElement ||
          lazyElement instanceof LazyElementGroup
        )
      ) {
        throw new Error(
          "You must pass a lazy element to create a page object!"
        );
      }
    }

    this.element = lazyElement || defaultLazyElement;
  }
}

module.exports = BasePO;
