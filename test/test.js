let assert = chai.assert;

const voting = window.votingFuncs;
const scriptFuncs = window.scriptFuncs;
const utils = window.utils;

describe('Utils Functions', function () {

  describe('Create Product', function () {

    it('should return product-4 when the argument is 4', function () {
      assert.equal("product-4", utils.createProductId("4"));
    });
    it('should return "product-" when no argument is not present', function () {
      assert.equal("product-", utils.createProductId());
    });

  });

  describe('Create a Dom Node with class productClass', function () {
    const divNode = utils.createADomNode("div", { "class": "productClass" });

    it('should return a div with the class productClass', function () {
      assert.equal(Node.ELEMENT_NODE, divNode.nodeType);
    });
    it('should have the class productClass', function () {
      assert.equal(true, divNode.classList.contains("productClass"));
    });
  });


  describe('Set inner text', function () {
    const testDiv = document.createElement("div");

    it('InnerText should be equal to "test123" ', function () {
      utils.setInnerText(testDiv, "test123");
      assert.equal("test123", testDiv.innerText);
    });

  });
});

mocha.run();