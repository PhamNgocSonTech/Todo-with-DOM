const tasks = [
  // {
  //   title: "Design web",
  //   completed: true,
  // },
  // {
  //   title: "Code web",
  //   completed: false,
  // },
  // {
  //   title: "Tester web",
  //   completed: true,
  // },
];

const taskList = document.querySelector("#task-list");
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");

function handleTaskAction(e) {
  const taskItem = e.target.closest(".task-item");
  const taskIndex = +taskItem.getAttribute("task-index");
  const task = tasks[taskIndex];

  if (e.target.closest(".edit")) {
    let newTitle = prompt("Enter new title", task.title);
    if (newTitle === null) return;

    newTitle = newTitle.trim();
    if (!newTitle) {
      alert("Task title can not be empty");
      return;
    }

    task.title = newTitle;
    renderTask();
    return;
  } else if (e.target.closest(".done")) {
    task.completed = !task.completed;
    renderTask();
    return;
  } else if (e.target.closest(".delete")) {
    if (confirm(`Are you sure delete ${task.title}?`)) {
      tasks.splice(taskIndex, 1);
      renderTask();
    }
  }
}

function addTask(e) {
  e.preventDefault();

  const value = todoInput.value.trim();
  if (!value) return alert("Please input something");

  tasks.push({
    title: value,
    completed: false,
  });

  renderTask();

  todoInput.value = "";
}

function renderTask() {
  if (!tasks.length) {
    taskList.innerHTML = '<li class="empty-message">No tasks available</li>';
    return;
  }
  const html = tasks
    .map(
      (task, index) => `
     <li class="task-item ${
       task.completed ? "completed" : ""
     }" task-index="${index}">
                <span class="task-title">${task.title}</span>
                <div class="task-action">
                    <button class="task-btn edit">Edit</button>
                    <button class="task-btn done">${
                      task.completed ? "Mark as undone" : "Mark as done"
                    }</button>
                    <button class="task-btn delete">Delete</button>
                </div>
            </li>
    `
    )
    .join("");

  taskList.innerHTML = html;
}

todoForm.addEventListener("submit", addTask);
taskList.addEventListener("click", handleTaskAction);

renderTask();
