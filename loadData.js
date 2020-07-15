// class
function ToDo(content, completed) {
  this.content = content;
  this.completed = completed;
}

// loading data from localstorage to JS
function loadData() {
  let strToDoList = localStorage.getItem("todoList");
  const toDoListItems = [];

  if (strToDoList && strToDoList !== "") {
    let items = strToDoList.split(";");

    for (let i = 0; i < items.length - 1; i += 2) {
      const text = items[i];
      const done = items[i + 1] === "done" ? true : false;
      toDoListItems.push(new ToDo(text, done));
    }
  }
  return toDoListItems;
}

function saveData() {
  let data = "";
  for (let i = 0; i < toDoListItems.length; i++) {
    const done = toDoListItems[i].completed ? "done" : "open";
    data += toDoListItems[i].content + ";" + done + ";";
  }
  localStorage.setItem("todoList", data);
}
