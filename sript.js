let todoInput = document.getElementById("todo-input");
let addTaskButton = document.getElementById("add-task-btn");
let todoList = document.getElementById("todo-list");

let Tasks = JSON.parse(localStorage.getItem("Tasks")) || [];

Tasks.forEach((task) => renderTasks(task));

addTaskButton.addEventListener("click", () => {
  let taskTest = todoInput.value.trim();
  if (taskTest === "") return;
  let Newtask = {
    id: Date.now(),
    text: taskTest,
    completed: false,
  };
  Tasks.push(Newtask);
  savetasks();
  renderTasks(Newtask);
  todoInput.value = ""; //clear the input
  console.log(Tasks);
});
function savetasks() {
  localStorage.setItem("Tasks", JSON.stringify(Tasks));
}
function renderTasks(task) {
  // console.log(task.text);

  const li = document.createElement("li");
  li.setAttribute("data-id", task.id);
  if (task.completed) li.classList.add("completed");
  li.innerHTML = `
  <span>${task.text}</span>
  <button>Delete 🗑️</button>
  `;

  // li.addEventListener("click", (e) => {
  //   if (e.target.tagName === "button") return;
  //   task.completed = !task.completed;
  //   li.classList.toggle("completed");
  //   savetasks();
  // });
  li.querySelector("button").addEventListener("click", (e) => {
    e.stopPropagation(); //prevent toggle from firing
    Tasks = Tasks.filter((t) => t.id != task.id);
    li.remove();
    savetasks();
  });

  todoList.appendChild(li);
}
