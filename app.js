// Data Storage in localStorage
let pagesData = JSON.parse(localStorage.getItem("pagesData")) || {};

// Elements
const pagesList = document.getElementById("pagesList");
const pageTitle = document.getElementById("pageTitle");
const pageContent = document.getElementById("pageContent");
const newPageBtn = document.getElementById("newPageBtn");
const addBlockBtn = document.getElementById("addBlockBtn");

// Modal Elements
const newPageModal = document.getElementById("newPageModal");
const addBlockModal = document.getElementById("addBlockModal");
const closePageModalBtn = document.getElementById("closePageModalBtn");
const closeBlockModalBtn = document.getElementById("closeBlockModalBtn");
const createPageBtn = document.getElementById("createPageBtn");
const addBlockToPageBtn = document.getElementById("addBlockToPageBtn");

const newPageNameInput = document.getElementById("newPageName");
const blockTypeSelect = document.getElementById("blockType");
const blockContentInput = document.getElementById("blockContent");

function renderPages() {
  pagesList.innerHTML = '';
  Object.keys(pagesData).forEach((pageName) => {
    const pageItem = document.createElement("li");
    pageItem.textContent = pageName;
    pageItem.onclick = () => loadPage(pageName);
    pagesList.appendChild(pageItem);
  });
}

function loadPage(pageName) {
  pageTitle.textContent = pageName;
  pageContent.innerHTML = '';
  pagesData[pageName].forEach((block) => {
    addBlockToPage(block);
  });
}

function addBlockToPage(block) {
  const blockElement = document.createElement("div");
  blockElement.classList.add("block");

  if (block.type === "text") {
    const textBlock = document.createElement("p");
    textBlock.textContent = block.content;
    blockElement.appendChild(textBlock);
  } else if (block.type === "checkbox") {
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = block.checked;

    const label = document.createElement("label");
    label.textContent = block.content;

    blockElement.appendChild(checkbox); // Checkbox will be added first
    blockElement.appendChild(label);    // Label follows the checkbox
  } else if (block.type === "heading") {
    const heading = document.createElement("h3");
    heading.textContent = block.content;
    blockElement.appendChild(heading);
  }

  pageContent.appendChild(blockElement);
}

// Function for adding new page (No changes here)
function addNewPage() {
  const pageName = prompt("Enter the page name:");
  newPageModal.style.display = "block";
}

function closePageModal() {
  newPageModal.style.display = "none";
  newPageNameInput.value = ''; // Clear input
}

function createNewPage() {
  const pageName = newPageNameInput.value.trim();
  if (pageName && !pagesData[pageName]) {
    pagesData[pageName] = [];
    localStorage.setItem("pagesData", JSON.stringify(pagesData));
    renderPages();
    loadPage(pageName);
  }
  closePageModal();
}

// Delete the prompt() here from addNewBlock()
function addNewBlock() {
  // Green: Open the block modal for the user to input block type and content
  addBlockModal.style.display = "block";
}


function closeBlockModal() {
  addBlockModal.style.display = "none";
  blockContentInput.value = ''; // Clear input
}

function addBlock() {
  const blockType = blockTypeSelect.value;
  const content = blockContentInput.value.trim();

  if (content) {
    const newBlock = {
      type: blockType,
      content: content,
      checked: blockType === "checkbox" ? false : undefined,
    };

    pagesData[pageTitle.textContent].push(newBlock);
    localStorage.setItem("pagesData", JSON.stringify(pagesData));
    addBlockToPage(newBlock);
  }

  closeBlockModal();
}

// Event Listeners for modals
newPageBtn.onclick = addNewPage;
closePageModalBtn.onclick = closePageModal;
createPageBtn.onclick = createNewPage;

addBlockBtn.onclick = addNewBlock; // <-- This now opens the modal instead of prompt()
closeBlockModalBtn.onclick = closeBlockModal;
addBlockToPageBtn.onclick = addBlock;

// Initial Rendering
renderPages();
