const form = document.querySelector(".form");
let tarefas = JSON.parse(localStorage.getItem("tarefa")) || [];

const tarefaCriada = document.querySelector(".tarefa-criada");

tarefas.forEach((tarefa) => {
  criaTarefa(tarefa.tarefa, tarefa.id);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const element = e.target;

  const inputValue = element.elements["tarefa"];
  const tarefas = document.querySelector(".lista-tarefas");
  const id = tarefas.children.length;

  criaTarefa(inputValue.value, id);
  inserirLocalStorage(inputValue.value, id);

  inputValue.value = "";
  inputValue.focus();
});

function criaTarefa(tarefa, id) {
  const listaDeTarefas = document.querySelector(".lista-tarefas");

  const li = document.createElement("li");
  li.classList.add("tarefa");

  const div = document.createElement("div");
  div.classList.add("checkbox");

  const p = document.createElement("p");
  p.innerHTML = tarefa;

  const divTarefa = document.createElement("div");
  divTarefa.classList.add("divTarefa")

  const span = document.createElement("span");
  span.classList.add("material-symbols-outlined", "delete");
  span.innerHTML = "delete";

  divTarefa.appendChild(div);
  divTarefa.appendChild(p)

  li.appendChild(divTarefa)
  li.appendChild(span);
  li.setAttribute("uid", id);

  listaDeTarefas.appendChild(li);
  tarefaCriada.innerHTML =  id + 1;
}

function inserirLocalStorage(tarefa, id) {
  const insertTarefa = {
    id,
    tarefa,
  };

  tarefas.push(insertTarefa);

  localStorage.setItem("tarefa", JSON.stringify(tarefas));
}

const btnDelete = document.querySelectorAll(".delete");

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    const element = e.target;
    const parentElement = element.parentNode;
    let idParent = parentElement.getAttribute("uid");
    idParent = Number(idParent);

    tarefas = tarefas.filter((tarefa) => tarefa.id !== idParent);
    tarefaCriada.innerHTML = tarefas.length;

    localStorage.setItem("tarefa", JSON.stringify(tarefas));
    parentElement.remove();
  }
});

const checkBox = document.querySelectorAll(".tarefa .checkbox");

checkBox.forEach((checkbox) => {
  checkbox.addEventListener("click", (e) => {
    const parent = e.target;
    const tarefa = parent.parentNode.querySelector("p");

    if (parent.classList.contains("checkbox")) {
      tarefa.classList.add("concluida");
      parent.classList.add("checkboxChecked");
      parent.classList.remove("checkbox");
    } else {
      tarefa.classList.remove("concluida");
      parent.classList.add("checkbox");
      parent.classList.remove("checkboxChecked");
    }
  });
});
