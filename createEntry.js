function appendEntry(todoObj) {
  // *CREATE* to do item
  const li = document.createElement("li");
  li.classList.add("entry");

  const input = document.createElement("input");
  input.value = todoObj.content;
  input.onkeyup = (e) => {
    todoObj.content = input.value;
    saveData();
  };

  // mark to-do item as *DONE*

  const checkbox = createCheckBox(todoObj, input);
  li.appendChild(checkbox);

  li.appendChild(input);

  // mark to-do item as *ARCHIVE*
  const button_archive = createRemoveButton(todoObj, () =>
    li.parentNode.removeChild(li)
  );
  li.appendChild(button_archive);

  const ul_list = document.getElementById(todoObj.completed ? "done" : "open");
  ul_list.appendChild(li);
  // ul_list.reverse();
}

function createCheckBox(todoObj, input) {
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";

  // <input type="checkbox" checked="checked">

  //generic snippet to move item to do list
  checkbox.checked = todoObj.completed;
  checkbox.onclick = function (e) {
    input.setAttribute("readonly", checkbox.checked);
    todoObj.completed = checkbox.checked;
    // remove to do item from *open-list*
    const li = checkbox.parentNode;
    li.parentNode.removeChild(li);
    // add to do item from *done-list*
    const list = document.getElementById(checkbox.checked ? "done" : "open");
    list.appendChild(li);

    saveData();
  };
  return checkbox;
}

function doneGetInnerHTML(completed) {
  return completed ? "mark uncompleted" : "mark completed";
}

function createRemoveButton(todoObj, removeYourself) {
  const button_archive = document.createElement("button");
  button_archive.innerHTML = "remove";
  button_archive.onclick = function (e) {
    const result = confirm("Do you really want to delete permanently?");
    if (result) {
      toDoListItems = toDoListItems.filter(
        (element) => element.content !== todoObj.content
      );

      saveData();
      removeYourself();
    }
  };
  return button_archive;
}
