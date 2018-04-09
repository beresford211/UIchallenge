/**
 * Sets the inner text of a dom node
 * @param {dom node} node 
 * @param {string} text 
 */
function setInnerText(node, text) {
  node.innerText = text;
}

/**
 * Set consistency for proper id and keys for voteTally
 * @param {number} id 
 */
function createProductId(id = "") {
  return `product-${id}`;
}

/**
 * Creates an html dom node and returns it after calling the sets properties function.
 * @param {string} type 
 * @param {object} properties 
 */
function createADomNode(type, properties) {
  const node = document.createElement(type);
  if (properties) {
    for (let key in properties) {
      node.setAttribute(key, properties[key]);
    }
  }
  return node;
}

export { createADomNode, setInnerText, createProductId }