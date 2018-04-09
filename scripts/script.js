import { createADomNode, createProductId, setInnerText } from './utils.js'
import { voteTracker, createVotingWidget, checkVotingOrder, handleNewVote } from './voting.js'

const availableProducts = window.Seed.products;
const voteTally = {};
/**
 * Creates html for user avatar  
 * @param {string} submittedURL 
 */
function createSubmittedBy(submittedURL) {
  const container = createADomNode("div", { "class": "container submitted-container" });
  const submittedBy = createADomNode("div", { "class": "user-submission" });
  const imgEl = createADomNode("img", { "alt": "userImage", "src": submittedURL, "class": "user-avatar" });

  setInnerText(submittedBy, "Submitted by: ");

  container.appendChild(submittedBy);
  container.appendChild(imgEl);
  return container;
}

/**
 * Creates the html for the description of the product and returns it in a container div
 * @param {string} url 
 * @param {string} urlTitle 
 * @param {string} productDetails 
 * @param {dom node} container 
 */
function descriptionBlock(url, urlTitle, productDetails, container) {
  const productLink = createADomNode("a", { "src": url, "class": "item-link" });
  const productDescription = createADomNode("div");

  setInnerText(productLink, urlTitle);
  setInnerText(productDescription, productDetails);

  container.appendChild(productLink);
  container.appendChild(productDescription);
  return container;
}

/**
 * Appends the product nodes to a documentFragment and adds it to the dom
 * @param {array} productNodes 
 */
function addNodesToBody(productNodes) {
  const documentFragment = document.createDocumentFragment();
  const root = document.getElementById("root");

  productNodes.forEach(product => documentFragment.appendChild(product));
  root.appendChild(documentFragment);
};

/**
 * This function takes the products data and turns them into dom elements with that data integrated
 * @param {array} productsByVotes 
 */
function displayNewProduct(product) {

  let { title, url, description, submitterAvatarUrl, productImageUrl, id, votes } = product;

  let container = createADomNode("div", { "class": "product-description" });
  let productContainer = createADomNode("div", { "id": createProductId(id), "class": "product-container" });
  let productImage = createADomNode("img", { "class": "product-image", "src": productImageUrl, "alt": `product-${title}` });

  let votingWidget = createVotingWidget(votes, id);
  container.appendChild(votingWidget);

  let productDetails = descriptionBlock(url, title, description, container);
  let submittedBy = createSubmittedBy(submitterAvatarUrl);

  productDetails.appendChild(submittedBy);
  productContainer.appendChild(productImage);
  productContainer.appendChild(productDetails);

  return productContainer;
}

/**
 * Takes an array of product objects, sorts the data based on vote count and pass it off to create dom nodes
 * @param {array} products 
 */
function displayNewProducts(products) {
  if (products.length < 1) {
    console.log("No products available nothing will render, only received: ", products);
    return;
  }

  const productsByVotes = products.sort((a, b) => { return b.votes - a.votes; }).map(displayNewProduct);
  addNodesToBody(productsByVotes);
}

displayNewProducts(availableProducts);
voteTracker("root");

export { voteTally }

