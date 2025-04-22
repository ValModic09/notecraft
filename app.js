// Initialize or load existing data from localStorage
function loadPages() {
    const pages = JSON.parse(localStorage.getItem('pages')) || [];
    const content = document.getElementById('content');
    content.innerHTML = '';
    
    pages.forEach((page, index) => {
        const pageElement = document.createElement('div');
        pageElement.classList.add('page');
        pageElement.innerHTML = `
            <h2>${page.title}</h2>
            <ul>
                ${page.tasks.map(task => `<li>${task}</li>`).join('')}
            </ul>
            <div class="todo">
                <input type="text" class="new-task" placeholder="New task">
                <button onclick="addTask(${index})">Add Task</button>
            </div>
        `;
        content.appendChild(pageElement);
    });
}

// Save pages to localStorage
function savePages(pages) {
    localStorage.setItem('pages', JSON.stringify(pages));
}

// Create a new page
function createNewPage() {
    const pages = JSON.parse(localStorage.getItem('pages')) || [];
    const newPage = {
        title: `Page ${pages.length + 1}`,
        tasks: []
    };
    pages.push(newPage);
    savePages(pages);
    loadPages();
}

// Add a new task to a page
function addTask(pageIndex) {
    const taskInput = document.querySelectorAll('.new-task')[pageIndex];
    const taskValue = taskInput.value.trim();

    if (taskValue) {
        const pages = JSON.parse(localStorage.getItem('pages')) || [];
        pages[pageIndex].tasks.push(taskValue);
        savePages(pages);
        loadPages();
    }
}

// Event listeners
document.getElementById('newPageBtn').addEventListener('click', createNewPage);

// Initial page load
loadPages();
