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
  li.appendChild(input);

  // mark to-do item as *DONE*
  const button_done = createButtonDone(todoObj, input);
  li.appendChild(button_done);

  // mark to-do item as *ARCHIVE*
  const button_archive = createRemoveButton(todoObj, () =>
    li.parentNode.removeChild(li)
  );
  li.appendChild(button_archive);

  const ul_list = document.getElementsByClassName("entries")[0];
  ul_list.appendChild(li);
  // ul_list.reverse();
}

function createButtonDone(todoObj, input) {
  const button_done = document.createElement("button");
  button_done.innerHTML = "mark completed";
  button_done.onclick = function (e) {
    input.toggleAttribute("readonly");
    todoObj.completed = !todoObj.completed;
    if (todoObj.completed) {
      button_done.innerHTML = "mark uncompleted";
      const mainDiv = document.getElementById("done");
      const done_li = document.createElement("li");
      done_li.classList.add("entry");
    } else {
      button_done.innerHTML = "mark completed";
    }
    saveData();
    // also: move item to done list?
  };
  if (todoObj.completed) {
    // if supposed to be done
    button_done.onclick();
  }

  return button_done;
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
