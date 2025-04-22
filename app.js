const pageTitle = document.getElementById("pageTitle");
const pageContent = document.getElementById("pageContent");
const addBlockBtn = document.getElementById("addBlockBtn");
const addBlockModal = document.getElementById("addBlockModal");
const closeBlockModalBtn = document.getElementById("closeBlockModalBtn");
const addBlockToPageBtn = document.getElementById("addBlockToPageBtn");
const blockTypeSelect = document.getElementById("blockType");
const blockContentInput = document.getElementById("blockContent");
const importanceContainer = document.getElementById("importanceContainer");
const importanceSelect = document.getElementById("importanceSelect");

let pagesData = JSON.parse(localStorage.getItem("pagesData")) || {};

if (!pagesData[pageTitle.textContent]) {
  pagesData[pageTitle.textContent] = [];
  localStorage.setItem("pagesData", JSON.stringify(pagesData));
}

// Load existing blocks
function loadBlocks() {
  const pageBlocks = pagesData[pageTitle.textContent];
  pageContent.innerHTML = "";
  pageBlocks.forEach((block) => {
    addBlockToPage(block);
  });
}

// Add a block to the page
function addBlockToPage(block) {
  const blockElement = document.createElement("div");
  blockElement.classList.add("block");

  if (block.type === "text") {
    const textBlock = document.createElement("p");
    textBlock.textContent = block.content;
    blockElement.appendChild(textBlock);
  } else if (block.type === "checkbox") {
    const checkboxContainer = document.createElement("div");
    checkboxContainer.classList.add("checkbox-container");

    // Create checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = block.checked;

    // Create label for checkbox
    const label = document.createElement("label");
    label.textContent = block.content;

    // Create importance dropdown
    const importanceSelect = document.createElement("select");
    const highOption = document.createElement("option");
    highOption.value = "high";
    highOption.textContent = "High";
    const mediumOption = document.createElement("option");
    mediumOption.value = "medium";
    mediumOption.textContent = "Medium";
    const lowOption = document.createElement("option");
    lowOption.value = "low";
    lowOption.textContent = "Low";

    importanceSelect.appendChild(highOption);
    importanceSelect.appendChild(mediumOption);
    importanceSelect.appendChild(lowOption);
    importanceSelect.value = block.importance || "medium";

    // Append all elements to the checkbox container
    checkboxContainer.appendChild(checkbox);
    checkboxContainer.appendChild(label);
    checkboxContainer.appendChild(importanceSelect);

    blockElement.appendChild(checkboxContainer);
  } else if (block.type === "heading") {
    const heading = document.createElement("h3");
    heading.textContent = block.content;
    blockElement.appendChild(heading);
  }

  pageContent.appendChild(blockElement);
}

// Show the modal
addBlockBtn.addEventListener("click", () => {
  addBlockModal.style.display = "flex";
});

// Close the modal
closeBlockModalBtn.addEventListener("click", () => {
  addBlockModal.style.display = "none";
});

// Show or hide importance select based on block type
blockTypeSelect.addEventListener("change", () => {
  if (blockTypeSelect.value === "checkbox") {
    importanceContainer.style.display = "block";
  } else {
    importanceContainer.style.display = "none";
  }
});

// Add block to page
addBlockToPageBtn.addEventListener("click", () => {
  const blockType = blockTypeSelect.value;
  const content = blockContentInput.value.trim();
  const importance = blockType === "checkbox" ? importanceSelect.value : "medium";  // Default to 'medium' for non-checkbox blocks

  if (content) {
    const newBlock = {
      type: blockType,
      content: content,
      checked: blockType === "checkbox" ? false : undefined,
      importance: importance,  // Store importance level
    };

    pagesData[pageTitle.textContent].push(newBlock);
    localStorage.setItem("pagesData", JSON.stringify(pagesData));
    addBlockToPage(newBlock);
  }
  blockContentInput.value = "";
  addBlockModal.style.display = "none";
});

loadBlocks();
