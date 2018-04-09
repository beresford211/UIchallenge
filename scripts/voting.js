import { createADomNode, createProductId, setInnerText } from './utils.js';
import { voteTally } from "./script.js";

/**
 * Updates the vote count of a product
 * @param {string} id 
 * @param {number} newVoteCount 
 */
function handleNewVote(id, newVoteCount) {
  const voteNode = document.getElementById(createProductId(id));
  const updateVote = voteNode.getElementsByClassName("vote-count")[0];
  updateVote.innerText = newVoteCount;
}

/**
 * Update the dom if the vote count calls for it
 * @param {*} id 
 */
function checkVotingOrder(id) {
  let votingIds = Object.keys(voteTally);
  let orderKeys = votingIds.sort((a, b) => { return voteTally[b] - voteTally[a] });
  let updatedEl = document.getElementById(createProductId(id));
  let updatedElCount = voteTally[id];
  let finalId;

  for (let k = orderKeys.length - 1; k > 0; k--) {
    let currentCount = orderKeys[k];
    if (voteTally[currentCount] < updatedElCount) {
      finalId = orderKeys[k];
    }
  }

  if (finalId) {
    updatedEl.parentNode.insertBefore(updatedEl, document.getElementById(createProductId(finalId)));
  }
}

/**
 * Creates the html for the up-vote widget
 * @param {number} votes 
 * @param {number} productId 
 */
function createVotingWidget(votes, productId) {
  const container = createADomNode("div", { "class": "container vote-container" });
  const voteCount = createADomNode("div", { "class": "vote-count" });
  const voteButton = createADomNode("button", { "class": "vote-button button-img", "data-product": productId });
  const voteImg = createADomNode("img");


  if (voteTally[productId]) {
    votes = voteTally[productId];
  } else {
    voteTally[productId] = votes;
  }

  voteButton.appendChild(voteImg);
  setInnerText(voteCount, votes);

  container.appendChild(voteButton);
  container.appendChild(voteCount);

  return container;
}

/**
 * Listens on the root element for clicks, only updates the dom if the element clicked is a vote button
 */
function voteTracker(rootID) {
  const getEl = document.getElementById(rootID);

  getEl.addEventListener("click", (event) => {
    const targetEl = event.target.dataset.product;
    if (targetEl && voteTally[targetEl]) {
      handleNewVote(targetEl, ++voteTally[targetEl]);
      checkVotingOrder(targetEl);
    }
  });
}

export { voteTracker, createVotingWidget, checkVotingOrder, handleNewVote }