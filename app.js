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
  // Odprtje modala za dodajanje nove strani
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
function renderPages() {
  pagesList.innerHTML = ''; // Clear the list before rendering pages
  Object.keys(pagesData).forEach((pageName) => {
    const pageItem = document.createElement("li");
    pageItem.textContent = pageName;

    // Create the delete button for each page
    const deletePageBtn = document.createElement("button");
    deletePageBtn.textContent = "Delete";
    deletePageBtn.classList.add("delete-btn");
    deletePageBtn.onclick = () => deletePage(pageName);

    pageItem.appendChild(deletePageBtn);  // Add the delete button to the page item
    pageItem.onclick = () => loadPage(pageName);
    pagesList.appendChild(pageItem);
  });
}

// Function to delete a page
function deletePage(pageName) {
  if (confirm(`Are you sure you want to delete the page: ${pageName}?`)) {
    delete pagesData[pageName];  // Remove the page from pagesData
    localStorage.setItem("pagesData", JSON.stringify(pagesData));
    renderPages();  // Re-render the pages list
    pageContent.innerHTML = '';  // Clear the page content
  }
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

    blockElement.appendChild(checkbox); // Checkbox first
    blockElement.appendChild(label);    // Label after checkbox
  } else if (block.type === "heading") {
    const heading = document.createElement("h3");
    heading.textContent = block.content;
    blockElement.appendChild(heading);
  }

  // Create delete button for each block
  const deleteBlockBtn = document.createElement("button");
  deleteBlockBtn.textContent = "Delete";
  deleteBlockBtn.classList.add("delete-btn");
  deleteBlockBtn.onclick = () => deleteBlock(block);

  blockElement.appendChild(deleteBlockBtn);  // Add the delete button to the block
  pageContent.appendChild(blockElement);
}

// Function to delete a block
function deleteBlock(block) {
  const blockIndex = pagesData[pageTitle.textContent].indexOf(block);
  if (blockIndex !== -1) {
    pagesData[pageTitle.textContent].splice(blockIndex, 1);  // Remove block from the page
    localStorage.setItem("pagesData", JSON.stringify(pagesData));
    loadPage(pageTitle.textContent);  // Reload the page to reflect changes
  }
}
// Modal Elements
const deleteConfirmationModal = document.getElementById("deleteConfirmationModal");
const confirmDeleteBtn = document.getElementById("confirmDeleteBtn");
const cancelDeleteBtn = document.getElementById("cancelDeleteBtn");

// Store the item to delete temporarily
let itemToDelete = null;

// Function to show the confirmation modal
function showDeleteConfirmation(item, type) {
  itemToDelete = { item, type };  // Store the item and type (page/block)
  deleteConfirmationModal.style.display = "flex";  // Show the modal
}

// Close the confirmation modal
function closeDeleteConfirmation() {
  deleteConfirmationModal.style.display = "none";  // Hide the modal
  itemToDelete = null;  // Clear the item to delete
}

// Confirm deletion (yes button)
confirmDeleteBtn.onclick = function() {
  if (itemToDelete) {
    if (itemToDelete.type === "page") {
      deletePage(itemToDelete.item);  // Call delete page function
    } else if (itemToDelete.type === "block") {
      deleteBlock(itemToDelete.item);  // Call delete block function
    }
    closeDeleteConfirmation();  // Close the modal
  }
};

// Cancel deletion (no button)
cancelDeleteBtn.onclick = closeDeleteConfirmation;

// Function to delete a page
function deletePage(pageName) {
  delete pagesData[pageName];  // Remove the page from pagesData
  localStorage.setItem("pagesData", JSON.stringify(pagesData));
  renderPages();  // Re-render the pages list
  pageContent.innerHTML = '';  // Clear the page content
}

// Function to delete a block
function deleteBlock(block) {
  const blockIndex = pagesData[pageTitle.textContent].indexOf(block);
  if (blockIndex !== -1) {
    pagesData[pageTitle.textContent].splice(blockIndex, 1);  // Remove block from the page
    localStorage.setItem("pagesData", JSON.stringify(pagesData));
    loadPage(pageTitle.textContent);  // Reload the page to reflect changes
  }
}

// Render pages with delete buttons
function renderPages() {
  pagesList.innerHTML = '';  // Clear the list before rendering pages
  Object.keys(pagesData).forEach((pageName) => {
    const pageItem = document.createElement("li");
    pageItem.textContent = pageName;

    // Create the delete button for each page
    const deletePageBtn = document.createElement("button");
    deletePageBtn.textContent = "Delete";
    deletePageBtn.classList.add("delete-btn");
    deletePageBtn.onclick = () => showDeleteConfirmation(pageName, "page");

    pageItem.appendChild(deletePageBtn);  // Add the delete button to the page item
    pageItem.onclick = () => loadPage(pageName);
    pagesList.appendChild(pageItem);
  });
}

// Render blocks with delete buttons
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

    blockElement.appendChild(checkbox); // Checkbox first
    blockElement.appendChild(label);    // Label after checkbox
  } else if (block.type === "heading") {
    const heading = document.createElement("h3");
    heading.textContent = block.content;
    blockElement.appendChild(heading);
  }

  // Create delete button for each block
  const deleteBlockBtn = document.createElement("button");
  deleteBlockBtn.textContent = "Delete";
  deleteBlockBtn.classList.add("delete-btn");
  deleteBlockBtn.onclick = () => showDeleteConfirmation(block, "block");

  blockElement.appendChild(deleteBlockBtn);  // Add the delete button to the block
  pageContent.appendChild(blockElement);
}
