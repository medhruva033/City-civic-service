export function initializeTasks() {

    const taskForm = document.getElementById("taskForm");
    const taskInput = document.getElementById("taskInput");
    const taskList = document.getElementById("taskList");

    const totalTasks = document.getElementById("totalTasks");
    const completedTasks = document.getElementById("completedTasks");
    const productivity = document.getElementById("productivity");
    const taskCount = document.getElementById("taskCount");

    // Load saved tasks
    let tasks = JSON.parse(localStorage.getItem("nexus-tasks")) || [];

    // Save tasks
    function saveTasks() {
        localStorage.setItem("nexus-tasks", JSON.stringify(tasks));
    }

    // Update statistics
    function updateStats() {

        const total = tasks.length;

        const completed = tasks.filter(
            task => task.completed
        ).length;

        const percentage = total === 0
            ? 0
            : Math.round((completed / total) * 100);

        totalTasks.textContent = total;
        completedTasks.textContent = completed;
        productivity.textContent = `${percentage}%`;
        taskCount.textContent = `${total} tasks`;

    }

    // Render tasks
    function renderTasks() {

        taskList.innerHTML = "";

        if (tasks.length === 0) {

            taskList.innerHTML = `
                <div class="empty-state">
                    <i data-lucide="clipboard-list"></i>
                    <p>No tasks yet. Add your first task!</p>
                </div>
            `;

            updateStats();

            if (window.lucide) {
                window.lucide.createIcons();
            }

            return;
        }

        tasks.forEach(task => {

            const taskElement = document.createElement("div");

            taskElement.className = `task-item ${
                task.completed ? "completed" : ""
            }`;

            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = task.completed;
            checkbox.setAttribute("aria-label", "Complete task");

            const taskText = document.createElement("span");
            taskText.className = "task-text";
            taskText.textContent = task.text;

            const deleteButton = document.createElement("button");
            deleteButton.className = "delete-task";
            deleteButton.setAttribute("aria-label", "Delete task");
            deleteButton.innerHTML = `<i data-lucide="trash-2"></i>`;

            // Complete task
            checkbox.addEventListener("change", () => {

                task.completed = checkbox.checked;

                saveTasks();
                renderTasks();

            });

            // Delete task
            deleteButton.addEventListener("click", () => {

                tasks = tasks.filter(
                    item => item.id !== task.id
                );

                saveTasks();
                renderTasks();

            });

            taskElement.append(
                checkbox,
                taskText,
                deleteButton
            );

            taskList.appendChild(taskElement);

        });

        updateStats();

        if (window.lucide) {
            window.lucide.createIcons();
        }

    }

    // Add new task
    taskForm.addEventListener("submit", (event) => {

        event.preventDefault();

        const text = taskInput.value.trim();

        if (!text) return;

        const newTask = {
            id: crypto.randomUUID(),
            text: text,
            completed: false,
            createdAt: new Date().toISOString()
        };

        tasks.unshift(newTask);

        saveTasks();
        renderTasks();

        taskInput.value = "";
        taskInput.focus();

    });

    // Initial rendering
    renderTasks();

}