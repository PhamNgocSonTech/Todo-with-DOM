const tasks = [
  {
    title: "Design web",
    completed: true,
  },

  {
    title: "Code web",
    completed: false,
  },

  {
    title: "Tester web",
    completed: true,
  },
];

const taskList = document.querySelector("#task-list");
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");

taskList.onclick = function (e) {
  const taskItem = e.target.closest(".task-item");
  const taskIndex = +taskItem.getAttribute("task-index");
  const task = tasks[taskIndex];

  if (e.target.closest(".edit")) {
    const newTitle = prompt("Enter new title", task.title);
    task.title = newTitle;
    render();
  }
};

todoForm.onsubmit = function (e) {
  e.preventDefault();

  const value = todoInput.value.trim();
  if (!value) {
    return alert("Please input something");
  }

  const newTask = {
    title: value,
    completed: false,
  };

  tasks.push(newTask);

  render();

  todoInput.value = "";
};

function render() {
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

render();
