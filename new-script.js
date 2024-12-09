// Adicionar a função addTask no botão
document.getElementById("addTaskButton").addEventListener("click", addTask);

// Array para armazenar tarefas
const tasks = [];

// Função para adicionar tarefa
function addTask() {
    // Pegar o valor dos inputs
    let taskInput = document.getElementById('taskInput');
    let taskDate = document.getElementById('taskDate');
    let taskTime = document.getElementById('taskTime');
    let taskPriority = document.getElementById('taskPriority');
    let taskValue = taskInput.value.trim();

    // Checar se todos os campos estão preenchidos
    if (taskValue && taskDate.value && taskTime.value && taskPriority.value) {
        const task = {
            value: taskValue,
            date: taskDate.value,
            time: taskTime.value,
            priority: taskPriority.value,
            completed: false
        };

        // Adicionar a tarefa ao array e limpar os campos
        tasks.push(task);
        taskInput.value = '';
        taskDate.value = '';
        taskTime.value = '';
        taskPriority.selectedIndex = 0;

        // Renderizar as tarefas
        renderTasks();
    }
}

// Função para renderizar as tarefas
function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    const groupedTasks = tasks.reduce((acc, task) => {
        const dateKey = formatDate(task.date);

        if (!acc[dateKey]) {
            acc[dateKey] = [];
        }

        acc[dateKey].push(task);
        return acc;
    }, {});

    for (const date in groupedTasks) {
        const dateHeader = document.createElement('h3');
        dateHeader.innerText = `Data de Entrega: ${date}`;
        taskList.appendChild(dateHeader);

        const ul = document.createElement('ul');
        groupedTasks[date].forEach(task => {
            const li = document.createElement('li');
            li.className = 'task-item';
            li.innerHTML = `
                <span class="${task.completed ? 'completed' : ''}"> 
                    ${task.value} - ${task.time} (Prioridade: ${task.priority})
                </span>
                <div>
                    <button class="edit-button" onclick="editTask('${task.value}')">Editar</button>
                    <button class="delete-button" onclick="deleteTask('${task.value}')">Remover</button>
                    <button class="completed-button" onclick="completeTask('${task.value}')">Concluir</button>
                </div>
            `;

            ul.appendChild(li);
        });

        taskList.appendChild(ul);
    }
}

// Função para formatar a data
function formatDate(dateString) {
    let date = new Date(dateString);
    let day = String(date.getDate()).padStart(2, '0');
    let month = String(date.getMonth() + 1).padStart(2, '0');
    let year = date.getFullYear();

    return `${day}/${month}/${year}`;
}

// Função para editar tarefa
function editTask(taskValue) {
    const task = tasks.find(t => t.value === taskValue);

    const newTask = prompt("Editar tarefa:", task.value);
    const newDate = prompt("Editar data da tarefa:", task.date);
    const newTime = prompt("Editar horário da tarefa:", task.time);
    const newPriority = prompt("Editar prioridade da tarefa (Alta, Média, Baixa)", task.priority);

    if (newTask) {
        task.value = newTask;
    }
    if (newDate) {
        task.date = newDate;
    }
    if (newTime) {
        task.time = newTime;
    }
    if (newPriority) {
        task.priority = newPriority;
    }

    renderTasks();
}

// Função para deletar tarefa
function deleteTask(taskValue) {
    const taskIndex = tasks.findIndex(t => t.value === taskValue);
    if (taskIndex > -1) {
        tasks.splice(taskIndex, 1);
        renderTasks();
    }
}

// Função para completar tarefa
function completeTask(taskValue) {
    const task = tasks.find(t => t.value === taskValue);
    task.completed = !task.completed;
    renderTasks();
}
