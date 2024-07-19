document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('taskForm');
    const taskList = document.getElementById('taskList');
    const filter = document.getElementById('filter');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function displayTasks() {
        taskList.innerHTML = '';
        const filteredTasks = tasks.filter(task => filter.value === 'all' || task.priority === filter.value);
        filteredTasks.forEach(task => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${task.title} - ${task.description} - ${task.dueDate} - ${task.priority}</span>
                <button onclick="editTask('${task.id}')">Edit</button>
                <button onclick="deleteTask('${task.id}')">Delete</button>
            `;
            taskList.appendChild(li);
        });
    }

    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newTask = {
            id: Date.now().toString(),
            title: taskForm.title.value,
            description: taskForm.description.value,
            dueDate: taskForm.dueDate.value,
            priority: taskForm.priority.value,
        };
        tasks.push(newTask);
        saveTasks();
        displayTasks();
        taskForm.reset();
    });

    filter.addEventListener('change', displayTasks);

    window.editTask = (id) => {
        const task = tasks.find(task => task.id === id);
        taskForm.title.value = task.title;
        taskForm.description.value = task.description;
        taskForm.dueDate.value = task.dueDate;
        taskForm.priority.value = task.priority;
        tasks = tasks.filter(task => task.id !== id);
        saveTasks();
        displayTasks();
    };

    window.deleteTask = (id) => {
        tasks = tasks.filter(task => task.id !== id);
        saveTasks();
        displayTasks();
    };

    displayTasks();
});
