const taskList = document.getElementById("taskList");

// Load tasks from localStorage
window.onload = function () {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => createTaskElement(task.text, task.completed));
};

function addTask() {
  const input = document.getElementById("taskInput");
  const taskText = input.value.trim();

  if (taskText === "") return;

  createTaskElement(taskText, false);
  saveTasks();

  input.value = "";
}

function createTaskElement(text, completed) {
  const li = document.createElement("li");

  li.textContent = text;
  if (completed) li.classList.add("completed");

  // Toggle complete
  li.onclick = function () {
    li.classList.toggle("completed");
    saveTasks();
  };

  // Delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "X";
  deleteBtn.className = "delete-btn";

  deleteBtn.onclick = function (e) {
    e.stopPropagation();
    li.remove();
    saveTasks();
  };

  li.appendChild(deleteBtn);
  taskList.appendChild(li);
}

function saveTasks() {
  const tasks = [];
  document.querySelectorAll("li").forEach(li => {
    tasks.push({
      text: li.firstChild.textContent,
      completed: li.classList.contains("completed")
    });
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}