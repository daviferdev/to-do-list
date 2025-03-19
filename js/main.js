const form = document.querySelector(".form");
const taskDescription = document.querySelector(".tarefa-description");
const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let id;

tasks.forEach((item) => {
  createTask(item.task);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const task = e.target.elements["tarefa"];
  createTask(task.value, id);

  insertTaskLocalStorage(task.value, id);

  task.value = "";
  task.focus();
});

function createElements() {
  const divTask = document.createElement("div");
  const checkBox = document.createElement("div");
  const taskDesc = document.createElement("p");
  const iconTrash = document.createElement("span");

  return {
    divTask,
    checkBox,
    taskDesc,
    iconTrash,
  };
}

function createTask(task, id) {
  const { divTask, checkBox, taskDesc, iconTrash } = createElements();
  id = document.querySelectorAll(".tarefa").length;

  divTask.classList.add("tarefa");
  divTask.setAttribute("uid", id);
  checkBox.classList.add("checkbox");
  iconTrash.classList.add("material-symbols-outlined", "delete");
  iconTrash.innerHTML = "delete";
  taskDesc.innerHTML = task;

  const container = document.querySelector(".tarefas .container");

  divTask.appendChild(checkBox);
  divTask.appendChild(taskDesc);
  divTask.appendChild(iconTrash);
  container.appendChild(divTask);
}

function insertTaskLocalStorage(task, id) {
  const taskObj = {
    task,
    id,
  };

  tasks.push(taskObj);

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

const btnDel = document.querySelectorAll(".delete");

btnDel.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const uid = e.target.parentNode.getAttribute("uid");
    console.log(uid);
    console.log(tasks);
  });
});

