// Data Storage in localStorage
let pagesData = JSON.parse(localStorage.getItem("pagesData")) || {};

// Elements
const pagesList = document.getElementById("pagesList");
const pageTitle = document.getElementById("pageTitle");
const pageContent = document.getElementById("pageContent");
const newPageBtn = document.getElementById("newPageBtn");
const addBlockBtn = document.getElementById("addBlockBtn");

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
    blockElement.appendChild(checkbox);
    const label = document.createElement("label");
    label.textContent = block.content;
    blockElement.appendChild(label);
  } else if (block.type === "heading") {
    const heading = document.createElement("h3");
    heading.textContent = block.content;
    blockElement.appendChild(heading);
  }

  pageContent.appendChild(blockElement);
}

function addNewPage() {
  const pageName = prompt("Enter the page name:");
  if (pageName && !pagesData[pageName]) {
    pagesData[pageName] = [];
    localStorage.setItem("pagesData", JSON.stringify(pagesData));
    renderPages();
    loadPage(pageName);
  }
}

function addNewBlock() {
  const blockType = prompt("Enter block type (text, checkbox, heading):");
  const content = prompt("Enter block content:");

  const newBlock = {
    type: blockType,
    content: content,
    checked: blockType === "checkbox" ? false : undefined,
  };

  pagesData[pageTitle.textContent].push(newBlock);
  localStorage.setItem("pagesData", JSON.stringify(pagesData));
  addBlockToPage(newBlock);
}

newPageBtn.onclick = addNewPage;
addBlockBtn.onclick = addNewBlock;

// Initial Rendering
renderPages();
