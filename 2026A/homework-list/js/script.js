let tasks = [];

document.getElementById("taskForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const date = document.getElementById("date").value;
    const statusSelect = document.getElementById("status");
    const statusText = statusSelect.options[statusSelect.selectedIndex].text;

    const newTask = {
        id: Date.now(),
        title: title,
        date: date,
        status: statusText
    };

    tasks.push(newTask);
    this.reset();
    showTasks();
});

function showTasks() {
    const taskListElement = document.getElementById("taskList");
    taskListElement.innerHTML = "";

    tasks.forEach((task) => {
        const item = document.createElement("div");
        item.classList.add("task-item");

        item.innerHTML = `
            <div class="task-details">
                <h3>${task.title}</h3>
                <p>Fecha de entrega: ${task.date}</p>
            </div>
            <div class="task-meta">
                <div class="status-tag">${task.status}</div>
                <br>
                <button class="btn-delete" onclick="deleteTask(${task.id})">Eliminar</button>
            </div>
        `;
        taskListElement.appendChild(item);
    });
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    showTasks();
}