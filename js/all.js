// dom
const todoList = document.getElementById("todoList");
const taskCount = document.getElementById("taskCount");
const newTodo = document.getElementById("newTodo");
const addTodo = document.getElementById("addTodo");
const clearAllTask = document.getElementById("clearAllTask");
const clearAllDoneTask = document.getElementById("clearAllDoneTask");

// listen start
addTodo.addEventListener("click", addNewTodo);
newTodo.addEventListener("keypress", addNewTodo);
clearAllTask.addEventListener("click", clearAll);
clearAllDoneTask.addEventListener("click", clearDone);
todoList.addEventListener("click", removeTodo);
todoList.addEventListener("click", completeTodo);
// listen end

let todoData = JSON.parse(localStorage.getItem("data")) || [];

// 任務初始化
window.onload = render();

// addTodo start
function addNewTodo(e) {
  if (e.target.id === "addTodo" || e.keyCode == "13") {
    if (document.getElementById("newTodo").value.trim() !== "") {
      todoData.push({
        id: Math.floor(Date.now()),
        title: document.getElementById("newTodo").value,
        completed: false,
      });
      localStorage.setItem("data", JSON.stringify(todoData));
      render();
      newTodo.value = "";
    }
  }
}
// addTodo end

// (刪除所有任務) clearTask start
function clearAll(e) {
  e.preventDefault();
  todoData = [];
  localStorage.clear();
  render();
}
// (清除所有任務) clearTask end

// (刪除已完成任務) start
function clearDone() {
  todoData = todoData.filter((item) => {
    return item.completed === false;
  });
  localStorage.setItem("data", JSON.stringify(todoData));
  render();
}
// (刪除已完成任務) end

// 任務內容移除 start(單筆)
function removeTodo(e) {
  let newIndex = 0;
  if (e.target.dataset.action == "remove") {
    todoData.forEach(function (item, key) {
      if (e.target.dataset.id == item.id) {
        newIndex = key;
      }
    });
    todoData.splice(newIndex, 1);
    localStorage.setItem("data", JSON.stringify(todoData));
    render();
  }
}
// 任務內容移除 end

// 任務內容完成 start
function completeTodo(e) {
  if (e.target.dataset.action == "complete") {
    todoData.forEach(function (item) {
      if (e.target.dataset.id == item.id) {
        if (item.completed) {
          item.completed = false;
        } else {
          item.completed = true;
        }
      }
    });
    localStorage.setItem("data", JSON.stringify(todoData));
    render();
  }
}
// 任務內容完成 end

// 顯示 Todo 內容 start
function render() {
  let str = "";
  todoData.forEach(function (item) {
    str += `
      <li class="list-group-item">
        <div class="d-flex">
          <div class="form-check">
            <input type="checkbox" class="form-check-input"
              ${item.completed ? "checked" : ""}
              data-action="complete" data-id="${item.id}">
            <label class="form-check-label
              ${item.completed ? "completed" : ""}"
              data-action="complete" data-id="${item.id}">
              ${item.title}
            </label>
          </div>
        <button type="button" class="close ml-auto" aria-label="Close">
          <span aria-hidden="true" data-action="remove"
						data-id="${item.id}">&times;</span>
        </button>
        </div>
      </li>`;
  });
  todoList.innerHTML = str;
  taskCount.textContent = todoData.length;
}
// 顯示 Todo 內容 end
