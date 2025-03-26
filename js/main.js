const form = document.querySelector(".form");
const tarefas = JSON.parse(localStorage.getItem("tarefa")) || [];

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

  const span = document.createElement("span");
  span.classList.add("material-symbols-outlined", "delete");
  span.innerHTML = "delete";

  li.appendChild(div);
  li.appendChild(p);
  li.appendChild(span);
  li.setAttribute("uid", id);

  listaDeTarefas.appendChild(li);
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

btnDelete.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const element = e.target;
    const parentElement = element.parentNode;
    const idParent = parentElement.getAttribute("uid");

    const filtraTarefas = tarefas.filter((tarefa) => {
      console.log(tarefa.id, idParent);
      return tarefa.id !== Number(idParent);
    });

    console.log(filtraTarefas);

    localStorage.setItem("tarefa", JSON.stringify(filtraTarefas));
  });
});
