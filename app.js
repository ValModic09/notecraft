// Helper functions to load and save pages from localStorage
function loadPages() {
    const pages = JSON.parse(localStorage.getItem('pages')) || [];
    const pagesList = document.getElementById('pagesList');
    pagesList.innerHTML = '';
    
    pages.forEach((page, index) => {
        const pageElement = document.createElement('li');
        pageElement.innerHTML = `<a href="#" onclick="loadPage(${index})">${page.title}</a>`;
        pagesList.appendChild(pageElement);
    });
}

function savePages(pages) {
    localStorage.setItem('pages', JSON.stringify(pages));
}

// Load a specific page
function loadPage(pageIndex) {
    const pages = JSON.parse(localStorage.getItem('pages')) || [];
    const page = pages[pageIndex];

    // Set the page title and content
    document.getElementById('pageTitle').textContent = page.title;
    const pageContent = document.getElementById('pageContent');
    pageContent.innerHTML = '';

    page.blocks.forEach((block, index) => {
        const blockElement = document.createElement('div');
        blockElement.classList.add('block');
        
        if (block.type === 'text') {
            blockElement.innerHTML = `<input type="text" value="${block.content}" onblur="saveBlock(${pageIndex}, ${index}, 'text', this.value)" />`;
        } else if (block.type === 'checkbox') {
            blockElement.innerHTML = `
                <input type="checkbox" ${block.checked ? 'checked' : ''} 
                onchange="saveBlock(${pageIndex}, ${index}, 'checkbox', this.checked)" /> 
                ${block.content}
            `;
        }
        
        pageContent.appendChild(blockElement);
    });

    // Add a button to add a new block
    const addBlockBtn = document.createElement('button');
    addBlockBtn.textContent = 'Add Block';
    addBlockBtn.onclick = () => addNewBlock(pageIndex);
    pageContent.appendChild(addBlockBtn);
}

// Save a block (either text or checkbox)
function saveBlock(pageIndex, blockIndex, type, value) {
    const pages = JSON.parse(localStorage.getItem('pages')) || [];
    pages[pageIndex].blocks[blockIndex] = { type, content: value, checked: type === 'checkbox' ? value : undefined };
    savePages(pages);
}

// Add a new block (text or checkbox)
function addNewBlock(pageIndex) {
    const pages = JSON.parse(localStorage.getItem('pages')) || [];
    const page = pages[pageIndex];

    const newBlock = { type: 'text', content: '' };
    page.blocks.push(newBlock);
    savePages(pages);

    loadPage(pageIndex);
}

// Create a new page
function createNewPage() {
    const pages = JSON.parse(localStorage.getItem('pages')) || [];
    const newPage = { title: `Page ${pages.length + 1}`, blocks: [] };
    pages.push(newPage);
    savePages(pages);
    loadPages();
}

// Event listeners
document.getElementById('newPageBtn').addEventListener('click', createNewPage);

// Initial page load
loadPages();
