- Usage details

In your wdio config, modify global $ and $\$:

```javascript
// wdio.conf.js

const {
  findElementLazy,
  findElementsLazy
} = require("../../packages/wdio-lazy-element");

exports.config = {
  before: () => {
    global.$ = findElementLazy;
    global.$$ = findElementsLazy;
  }
};
```

Optional: create a Page Object Class that extends BasePO

```javascript
// page object my.po.js

const BasePO = require("./base.po");

class MyPO extends BasePO {
  constructor(lazyElement) {
    super(lazyElement, $(".yourSelector"));
  }

  get title() {
    return this.element.$(".title");
  }

  get tabs() {
    return this.element.$$(".tabs");
  }
}
```

Use the Lazy Element in the test through the Page Object

```javascript
const MyPO = require("my.po.js");
const myPO = new MyPO();

describe("Should fail on the it", () => {
  before(async () => {
    await browser.url("/");
  });

  it("Should fail and save a screenshot", async () => {
    expect(await myPO.title.getText()).to.equal("Title");
  });
});
```
