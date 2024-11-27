// todo.js - Todo Item Class
class Todo {
    constructor(title, description, dueDate, priority, notes = '', checklist = []) {
        this.id = Date.now().toString(); // Unique ID
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
        this.checklist = checklist;
        this.completed = false;
    }

    toggleComplete() {
        this.completed = !this.completed;
    }

    updateDetails(updates) {
        Object.keys(updates).forEach(key => {
            if (this.hasOwnProperty(key)) {
                this[key] = updates[key];
            }
        });
    }
}

// project.js - Project Management
class Project {
    constructor(name = 'Default Project') {
        this.id = Date.now().toString();
        this.name = name;
        this.todos = [];
    }

    addTodo(todo) {
        this.todos.push(todo);
    }

    removeTodo(todoId) {
        this.todos = this.todos.filter(todo => todo.id !== todoId);
    }

    getTodoById(todoId) {
        return this.todos.find(todo => todo.id === todoId);
    }
}

// storage.js - Local Storage Management
class StorageManager {
    static saveProjects(projects) {
        localStorage.setItem('todoProjects', JSON.stringify(projects));
    }

    static getProjects() {
        const projectsData = localStorage.getItem('todoProjects');
        if (!projectsData) return null;

        const parsedProjects = JSON.parse(projectsData);
        return parsedProjects.map(projectData => {
            const project = new Project(projectData.name);
            project.id = projectData.id;
            project.todos = projectData.todos.map(todoData => {
                const todo = new Todo(
                    todoData.title,
                    todoData.description,
                    todoData.dueDate,
                    todoData.priority,
                    todoData.notes,
                    todoData.checklist
                );
                todo.id = todoData.id;
                todo.completed = todoData.completed;
                return todo;
            });
            return project;
        });
    }
}

// todoManager.js - Central Todo Application Logic
class TodoManager {
    constructor() {
        this.projects = StorageManager.getProjects() || [new Project()];
        this.currentProject = this.projects[0];
    }

    createProject(name) {
        const newProject = new Project(name);
        this.projects.push(newProject);
        this.currentProject = newProject;
        this.saveProjects();
        return newProject;
    }

    createTodo(title, description, dueDate, priority, notes = '', checklist = []) {
        const newTodo = new Todo(title, description, dueDate, priority, notes, checklist);
        this.currentProject.addTodo(newTodo);
        this.saveProjects();
        return newTodo;
    }

    saveProjects() {
        StorageManager.saveProjects(this.projects);
    }

    switchProject(projectId) {
        this.currentProject = this.projects.find(p => p.id === projectId);
    }
}

// ui.js - User Interface Management
class TodoUI {
    constructor(todoManager) {
        this.todoManager = todoManager;
        this.initEventListeners();
        this.renderProjects();
        this.renderTodos();
    }

    initEventListeners() {
        // Add event listeners for project creation, todo creation, etc.
        document.getElementById('create-project-btn').addEventListener('click', () => {
            this.openProjectCreationForm();
        });

        document.getElementById('create-todo-btn').addEventListener('click', () => {
            // Open modal or form to create new todo
            this.openTodoCreationForm();
        });
    }

    renderProjects() {
        const projectList = document.getElementById('project-list');
        projectList.innerHTML = '';
        this.todoManager.projects.forEach(project => {
            const projectElement = document.createElement('div');
            projectElement.textContent = project.name;
            projectElement.addEventListener('click', () => {
                this.todoManager.switchProject(project.id);
                this.renderTodos();
            });
            projectList.appendChild(projectElement);
        });
    }

    openProjectCreationForm() {
        // Create a full-screen modal container for project creation
        const modal = document.createElement('div');
        modal.classList.add('todo-modal-container');
        modal.innerHTML = `
          <div class="todo-modal">
            <div class="modal-header">
              <h2>Create New Project</h2>
              <button class="close-modal">&times;</button>
            </div>
            <form id="project-creation-form">
              <div class="form-group">
                <label for="project-name">Project Name*</label>
                <input type="text" id="project-name" required placeholder="Enter project name">
              </div>
              
              <div class="form-actions">
                <button type="submit" class="btn-create">Create Project</button>
                <button type="button" class="btn-cancel">Cancel</button>
              </div>
            </form>
          </div>
        `;

        // Add the modal to the body
        document.body.appendChild(modal);

        // Close modal functionality
        const closeModal = () => {
            document.body.removeChild(modal);
        };

        // Close button event
        modal.querySelector('.close-modal').addEventListener('click', closeModal);
        modal.querySelector('.btn-cancel').addEventListener('click', closeModal);

        // Form submission
        const form = modal.querySelector('#project-creation-form');
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // Gather form data
            const projectName = modal.querySelector('#project-name').value.trim();

            if (projectName) {
                // Create project using TodoManager
                this.todoManager.createProject(projectName);

                // Refresh projects display
                this.renderProjects();

                // Close modal
                closeModal();
            }
        });

        // Focus on the input field when the modal opens
        const projectNameInput = modal.querySelector('#project-name');
        projectNameInput.focus();
    }

    renderTodos() {
        const todoList = document.getElementById('todo-list');
        todoList.innerHTML = '';
        this.todoManager.currentProject.todos.forEach(todo => {
            const todoElement = document.createElement('div');
            todoElement.classList.add('todo-item');
            todoElement.classList.add(`priority-${todo.priority}`);

            todoElement.innerHTML = `
            <div class="todo-item-content">
              <h3>${todo.title}</h3>
              <p>Due: ${todo.dueDate}</p>
              <p>Priority: ${todo.priority}</p>
            </div>
            <div class="todo-item-actions">
              <button class="view-todo" data-id="${todo.id}">View Details</button>
              <button class="delete-todo" data-id="${todo.id}">Delete</button>
            </div>
          `;

            // Add event listeners for view and delete
            const viewButton = todoElement.querySelector('.view-todo');
            const deleteButton = todoElement.querySelector('.delete-todo');

            viewButton.addEventListener('click', () => this.showTodoDetails(todo.id));
            deleteButton.addEventListener('click', () => this.deleteTodo(todo.id));

            todoList.appendChild(todoElement);
        });
    }

    openTodoCreationForm() {
        // Create a full-screen modal container
        const modal = document.createElement('div');
        modal.classList.add('todo-modal-container');
        modal.innerHTML = `
          <div class="todo-modal">
            <div class="modal-header">
              <h2>Create New Todo</h2>
              <button class="close-modal">&times;</button>
            </div>
            <form id="todo-creation-form">
              <div class="form-group">
                <label for="todo-title">Title*</label>
                <input type="text" id="todo-title" required>
              </div>
              
              <div class="form-group">
                <label for="todo-description">Description</label>
                <textarea id="todo-description"></textarea>
              </div>
              
              <div class="form-group">
                <label for="todo-due-date">Due Date</label>
                <input type="date" id="todo-due-date">
              </div>
              
              <div class="form-group">
                <label for="todo-priority">Priority</label>
                <select id="todo-priority">
                  <option value="low">Low</option>
                  <option value="medium" selected>Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              
              <div class="form-group">
                <label for="todo-notes">Notes</label>
                <textarea id="todo-notes"></textarea>
              </div>
              
              <div class="form-actions">
                <button type="submit" class="btn-create">Create Todo</button>
                <button type="button" class="btn-cancel">Cancel</button>
              </div>
            </form>
          </div>
        `;

        // Add the modal to the body
        document.body.appendChild(modal);

        // Close modal functionality
        const closeModal = () => {
            document.body.removeChild(modal);
        };

        // Close button event
        modal.querySelector('.close-modal').addEventListener('click', closeModal);
        modal.querySelector('.btn-cancel').addEventListener('click', closeModal);

        // Form submission
        const form = modal.querySelector('#todo-creation-form');
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // Gather form data
            const title = modal.querySelector('#todo-title').value;
            const description = modal.querySelector('#todo-description').value;
            const dueDate = modal.querySelector('#todo-due-date').value;
            const priority = modal.querySelector('#todo-priority').value;
            const notes = modal.querySelector('#todo-notes').value;

            // Create todo using TodoManager
            this.todoManager.createTodo(
                title,
                description,
                dueDate,
                priority,
                notes
            );

            // Refresh todos display
            this.renderTodos();

            // Close modal
            closeModal();
        });
    }

    showTodoDetails(todoId) {
        const todo = this.todoManager.currentProject.getTodoById(todoId);

        // Create a modal to show todo details
        const modal = document.createElement('div');
        modal.classList.add('todo-modal-container');
        modal.innerHTML = `
          <div class="todo-modal">
            <div class="modal-header">
              <h2>Todo Details</h2>
              <button class="close-modal">&times;</button>
            </div>
            <div class="todo-details">
              <h3>${todo.title}</h3>
              <p><strong>Description:</strong> ${todo.description || 'No description'}</p>
              <p><strong>Due Date:</strong> ${todo.dueDate}</p>
              <p><strong>Priority:</strong> ${todo.priority}</p>
              <p><strong>Notes:</strong> ${todo.notes || 'No notes'}</p>
            </div>
            <div class="form-actions">
              <button class="btn-cancel close-modal">Close</button>
            </div>
          </div>
        `;

        document.body.appendChild(modal);

        // Close modal functionality
        const closeButtons = modal.querySelectorAll('.close-modal');
        closeButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                document.body.removeChild(modal);
            });
        });
    }

    deleteTodo(todoId) {
        // Confirm deletion
        const confirmDelete = confirm('Are you sure you want to delete this todo?');

        if (confirmDelete) {
            this.todoManager.currentProject.removeTodo(todoId);
            this.todoManager.saveProjects();
            this.renderTodos();
        }
    }
}

// Initialize the app
window.onload = () => {document.querySelector("#app").scrollIntoView()}
document.addEventListener('DOMContentLoaded', () => {
    const todoManager = new TodoManager();
    const todoUI = new TodoUI(todoManager);
});