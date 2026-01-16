document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const dateInput = document.getElementById('dateInput');
    const addBtn = document.getElementById('addBtn');
    const displayList = document.getElementById('displayList');

    // Load initial data
    let tasks = JSON.parse(localStorage.getItem('myTasks')) || [];
    renderTasks();

    addBtn.addEventListener('click', (e) => {
        // Stop page refresh
        e.preventDefault();

        const taskValue = taskInput.value.trim();
        if (!taskValue) return;

        const newTask = {
            task: taskValue,
            date: dateInput.value,
            id: Date.now()
        };

        tasks.push(newTask);
        saveTasks();
        renderTasks();

        // Clear UI
        taskInput.value = '';
        dateInput.value = '';
    });

    function saveTasks() {
        localStorage.setItem('myTasks', JSON.stringify(tasks));
    }

    function renderTasks() {
        displayList.innerHTML = '';
        tasks.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.task} (Due: ${item.date || 'N/A'})`;
            displayList.appendChild(li);
        });
    }
});