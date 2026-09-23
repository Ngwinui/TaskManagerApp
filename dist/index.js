"use strict";
/* =========================================================
   TASKFLOW - TYPESCRIPT
   ========================================================= */
/* =========================
   GET HTML ELEMENTS
   ========================= */
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const clearCompletedBtn = document.getElementById("clearCompletedBtn");
const remainingCount = document.getElementById("remainingCount");
const progressFill = document.getElementById("progressFill");
const themeToggle = document.getElementById("themeToggle");
/* =========================
   APPLICATION STATE
   ========================= */
let tasks = [];
let currentFilter = "all";
/* =========================
   LOAD TASKS FROM LOCAL STORAGE
   ========================= */
function loadTasks() {
    const savedTasks = localStorage.getItem("taskflowTasks");
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
    }
    else {
        // Example tasks from the design
        tasks = [
            {
                id: 1,
                title: "Learn TypeScript",
                completed: false,
                date: "Today",
                category: "Study",
            },
            {
                id: 2,
                title: "Finish lab report",
                completed: true,
                date: "Yesterday",
                category: "Work",
            },
            {
                id: 3,
                title: "Go for a walk",
                completed: false,
                date: "Tomorrow",
                category: "Health",
            },
            {
                id: 4,
                title: "Read a book",
                completed: false,
                date: "Sat, 20 Sep",
                category: "Personal",
            },
        ];
        saveTasks();
    }
}
/* =========================
   SAVE TASKS
   ========================= */
function saveTasks() {
    localStorage.setItem("taskflowTasks", JSON.stringify(tasks));
}
/* =========================
   ADD TASK
   ========================= */
function addTask() {
    const title = taskInput.value.trim();
    // Don't add empty tasks
    if (title === "") {
        taskInput.focus();
        return;
    }
    const newTask = {
        id: Date.now(),
        title: title,
        completed: false,
        date: "Today",
        category: "Personal",
    };
    tasks.push(newTask);
    saveTasks();
    taskInput.value = "";
    renderTasks();
    taskInput.focus();
}
/* =========================
   RENDER TASKS
   ========================= */
function renderTasks() {
    taskList.innerHTML = "";
    // Filter tasks
    let filteredTasks = tasks;
    if (currentFilter === "active") {
        filteredTasks = tasks.filter((task) => !task.completed);
    }
    if (currentFilter === "completed") {
        filteredTasks = tasks.filter((task) => task.completed);
    }
    // Empty state
    if (filteredTasks.length === 0) {
        taskList.innerHTML = `
            <div class="empty-state">

                <div class="empty-icon">✓</div>

                <p>
                    ${currentFilter === "completed"
            ? "No completed tasks yet."
            : currentFilter === "active"
                ? "You have no active tasks."
                : "No tasks yet. Add one above!"}
                </p>

            </div>
        `;
        updateProgress();
        return;
    }
    // Create each task
    filteredTasks.forEach((task) => {
        const taskCard = createTaskElement(task);
        taskList.appendChild(taskCard);
    });
    updateProgress();
}
/* =========================
   CREATE TASK HTML
   ========================= */
function createTaskElement(task) {
    const card = document.createElement("div");
    card.className = "task-card";
    if (task.completed) {
        card.classList.add("completed");
    }
    /* =========================
         CHECKBOX
         ========================= */
    const checkbox = document.createElement("button");
    checkbox.className = "task-checkbox";
    if (task.completed) {
        checkbox.classList.add("checked");
        checkbox.innerHTML = "✓";
    }
    checkbox.addEventListener("click", () => toggleTask(task.id));
    /* =========================
         TASK INFORMATION
         ========================= */
    const taskInfo = document.createElement("div");
    taskInfo.className = "task-info";
    const title = document.createElement("div");
    title.className = "task-title";
    title.textContent = task.title;
    const meta = document.createElement("div");
    meta.className = "task-meta";
    const date = document.createElement("span");
    date.innerHTML = `▣ ${task.date}`;
    const tag = document.createElement("span");
    tag.className = "task-tag";
    tag.textContent = task.category;
    // Give categories their colors
    switch (task.category.toLowerCase()) {
        case "study":
            tag.classList.add("tag-study");
            break;
        case "work":
            tag.classList.add("tag-work");
            break;
        case "health":
            tag.classList.add("tag-health");
            break;
        default:
            tag.classList.add("tag-personal");
    }
    meta.appendChild(date);
    meta.appendChild(tag);
    taskInfo.appendChild(title);
    taskInfo.appendChild(meta);
    /* =========================
         ACTION BUTTONS
         ========================= */
    const actions = document.createElement("div");
    actions.className = "task-actions";
    // EDIT
    const editButton = document.createElement("button");
    editButton.className = "action-btn edit-btn";
    editButton.innerHTML = "✎";
    editButton.title = "Edit task";
    editButton.addEventListener("click", () => editTask(task.id));
    // DELETE
    const deleteButton = document.createElement("button");
    deleteButton.className = "action-btn delete-btn";
    deleteButton.innerHTML = "♜";
    deleteButton.title = "Delete task";
    deleteButton.addEventListener("click", () => deleteTask(task.id));
    actions.appendChild(editButton);
    actions.appendChild(deleteButton);
    /* =========================
         PUT EVERYTHING TOGETHER
         ========================= */
    card.appendChild(checkbox);
    card.appendChild(taskInfo);
    card.appendChild(actions);
    return card;
}
/* =========================
   TOGGLE TASK
   ========================= */
function toggleTask(id) {
    const task = tasks.find((task) => task.id === id);
    if (!task) {
        return;
    }
    task.completed = !task.completed;
    saveTasks();
    renderTasks();
}
/* =========================
   DELETE TASK
   ========================= */
function deleteTask(id) {
    tasks = tasks.filter((task) => task.id !== id);
    saveTasks();
    renderTasks();
}
/* =========================
   EDIT TASK
   ========================= */
function editTask(id) {
    const task = tasks.find((task) => task.id === id);
    if (!task) {
        return;
    }
    const newTitle = prompt("Edit your task:", task.title);
    if (newTitle !== null && newTitle.trim() !== "") {
        task.title = newTitle.trim();
        saveTasks();
        renderTasks();
    }
}
/* =========================
   CLEAR COMPLETED
   ========================= */
function clearCompleted() {
    tasks = tasks.filter((task) => !task.completed);
    saveTasks();
    renderTasks();
}
/* =========================
   UPDATE PROGRESS
   ========================= */
function updateProgress() {
    const activeTasks = tasks.filter((task) => !task.completed);
    const completedTasks = tasks.filter((task) => task.completed);
    remainingCount.textContent = `${activeTasks.length} ${activeTasks.length === 1 ? "task" : "tasks"} remaining`;
    // Calculate percentage completed
    const totalTasks = tasks.length;
    let percentage = 0;
    if (totalTasks > 0) {
        percentage = (completedTasks.length / totalTasks) * 100;
    }
    progressFill.style.width = `${percentage}%`;
}
/* =========================
   FILTER BUTTONS
   ========================= */
const filterButtons = document.querySelectorAll(".filter-btn");
filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const filter = button.dataset.filter;
        if (filter !== "all" && filter !== "active" && filter !== "completed") {
            return;
        }
        currentFilter = filter;
        // Update active filter button
        filterButtons.forEach((btn) => {
            btn.classList.remove("active");
        });
        button.classList.add("active");
        renderTasks();
    });
});
/* =========================
   SIDEBAR FILTER BUTTONS
   ========================= */
const navItems = document.querySelectorAll(".nav-item");
navItems.forEach((item) => {
    item.addEventListener("click", () => {
        const filter = item.dataset.filter;
        if (filter !== "all" && filter !== "active" && filter !== "completed") {
            return;
        }
        currentFilter = filter;
        // Sidebar active state
        navItems.forEach((nav) => {
            nav.classList.remove("active");
        });
        item.classList.add("active");
        // Update filter buttons
        filterButtons.forEach((button) => {
            button.classList.remove("active");
            if (button.dataset.filter === filter) {
                button.classList.add("active");
            }
        });
        renderTasks();
    });
});
/* =========================
   THEME
   ========================= */
function loadTheme() {
    const savedTheme = localStorage.getItem("taskflowTheme");
    if (savedTheme === "dark") {
        document.body.classList.add("dark");
        themeToggle.textContent = "☾";
    }
    else {
        document.body.classList.remove("dark");
        themeToggle.textContent = "☀";
    }
}
function toggleTheme() {
    document.body.classList.toggle("dark");
    const isDark = document.body.classList.contains("dark");
    if (isDark) {
        localStorage.setItem("taskflowTheme", "dark");
        themeToggle.textContent = "☾";
    }
    else {
        localStorage.setItem("taskflowTheme", "light");
        themeToggle.textContent = "☀";
    }
}
/* =========================
   EVENT LISTENERS
   ========================= */
// Add task button
addTaskBtn.addEventListener("click", addTask);
// Press Enter to add task
taskInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        addTask();
    }
});
// Clear completed
clearCompletedBtn.addEventListener("click", clearCompleted);
// Theme toggle
themeToggle.addEventListener("click", toggleTheme);
/* =========================
   START APPLICATION
   ========================= */
loadTasks();
loadTheme();
renderTasks();
//# sourceMappingURL=index.js.map