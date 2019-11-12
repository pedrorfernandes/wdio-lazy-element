const Element = require("../../node_modules/webdriverio/build/commands/element");

const functionNames = [];

for (const functionName in Element) {
  if (Object.prototype.hasOwnProperty.call(Element, functionName)) {
    functionNames.push(functionName);
  }
}

module.exports = functionNames.filter(functionName => {
  return functionName !== "$" && functionName !== "$$";
});
