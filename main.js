// const tasks = [
//   // {
//   //   title: "Design web",
//   //   completed: true,
//   // },
//   // {
//   //   title: "Code web",
//   //   completed: false,
//   // },
//   // {
//   //   title: "Tester web",
//   //   completed: true,
//   // },
// ];

const tasks = JSON.parse(localStorage.getItem("tasks")) ?? [];
const taskList = document.querySelector("#task-list");
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function isDuplicateTask(newTitle, excludeIndex = -1) {
  const isDuplicate = tasks.some(
    (task, index) =>
      task.title.toLowerCase() === newTitle.toLowerCase() &&
      excludeIndex !== index
  );

  return isDuplicate;
}
function handleTaskAction(e) {
  const taskItem = e.target.closest(".task-item");
  if (!taskItem) return;
  // const taskIndex = +taskItem.getAttribute("data-index");
  const taskIndex = +taskItem.dataset.index;
  const task = tasks[taskIndex];

  if (e.target.closest(".edit")) {
    let newTitle = prompt("Enter new title", task.title);
    if (newTitle === null) return;

    newTitle = newTitle.trim();
    if (!newTitle) {
      alert("Task title can not be empty");
      return;
    }

    // const isDuplicate = tasks.some(
    //   (task) =>
    //     task.title.toLowerCase() === newTitle.toLowerCase() &&
    //     taskIndex !== index
    // );
    if (isDuplicateTask(newTitle, taskIndex)) {
      return alert("Title already exists");
    }

    task.title = newTitle;
    renderTask();
    saveTasks();
    return;
  } else if (e.target.closest(".done")) {
    task.completed = !task.completed;
    renderTask();
    saveTasks();
    return;
  } else if (e.target.closest(".delete")) {
    if (confirm(`Are you sure delete ${task.title}?`)) {
      tasks.splice(taskIndex, 1);
      renderTask();
      saveTasks();
    }
  }
}

function addTask(e) {
  e.preventDefault();

  const value = todoInput.value.trim();
  if (!value) return alert("Please input something");

  // const isDuplicate = tasks.some(
  //   (task) => task.title.toLowerCase() === value.toLowerCase()
  // );
  if (isDuplicateTask(value)) {
    return alert("Title already exists");
  }

  tasks.push({
    title: value,
    completed: false,
  });

  renderTask();
  saveTasks();
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
     }"data-index="${index}">
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
