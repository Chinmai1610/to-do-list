document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById("taskInput");
    const dateInput = document.getElementById("dateInput");
    const taskList = document.getElementById("taskList");
    const addBtn = document.getElementById("addBtn");

    // Elements for Stats
    const totalEl = document.getElementById("total");
    const completedEl = document.getElementById("completed");
    const pendingEl = document.getElementById("pending");
    const progressEl = document.getElementById("progress");

    // 1. Load tasks from localStorage
    let tasks = JSON.parse(localStorage.getItem("todo_data")) || [];

    // Set Current Date in Header
    document.getElementById("currentDate").textContent = new Date().toDateString();

    // Initial render
    render();

    // 2. Add Task Function
    function addTask() {
        const text = taskInput.value.trim();
        if (!text) return;

        const newTask = {
            text: text,
            date: dateInput.value || "No Date",
            done: false,
            id: Date.now()
        };

        tasks.push(newTask);
        taskInput.value = "";
        dateInput.value = "";

        saveAndRender();
    }

    // 3. Save and Update UI
    function saveAndRender() {
        localStorage.setItem("todo_data", JSON.stringify(tasks));
        render();
    }

    function render() {
        // Render Table
        taskList.innerHTML = "";
        tasks.forEach((task, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td style="${task.done ? 'text-decoration: line-through; opacity: 0.6;' : ''}">${task.text}</td>
                <td>${task.date}</td>
                <td>${task.done ? "✅ Done" : "⏳ Pending"}</td>
                <td>
                    <button onclick="toggleTask(${index})">✔</button>
                    <button onclick="deleteTask(${index})">🗑</button>
                </td>
            `;
            taskList.appendChild(row);
        });

        // Update Stats Cards
        const total = tasks.length;
        const completed = tasks.filter(t => t.done).length;
        const pending = total - completed;
        const progress = total === 0 ? 0 : Math.round((completed / total) * 100);

        totalEl.textContent = total;
        completedEl.textContent = completed;
        pendingEl.textContent = pending;
        progressEl.textContent = `${progress}%`;
    }

    // 4. Global Actions (Window scope for HTML buttons)
    window.toggleTask = (index) => {
        tasks[index].done = !tasks[index].done;
        saveAndRender();
    };

    window.deleteTask = (index) => {
        tasks.splice(index, 1);
        saveAndRender();
    };

    window.clearAllTasks = () => {
        if (confirm("Are you sure you want to clear all tasks?")) {
            tasks = [];
            saveAndRender();
        }
    };

    // Event Listeners
    addBtn.addEventListener("click", (e) => {
        e.preventDefault(); // STOPS REFRESH
        addTask();
    });

    taskInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") addTask();
    });
});