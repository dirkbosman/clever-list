// load data into to this.toDoListItems

class TodoList {
  // when page is loaded it gets instantiated, because in html to-do object is created.
  constructor(addID, input) {
    this.toDoListItems = Data.load();
    this.toDoListItems.forEach((item) => {
      // append only the "text" in the string
      this.appendEntry(new ToDoNode(this.toDoListItems, item));
    });
    document.getElementById(addID).onclick = () => todo.add(input);
  }

  // when create button is clicked, this method is called.
  add(input) {
    const text_input = document.getElementById(input);

    if (text_input.value) {
      // add data to this.toDoListItems
      const item = new ToDo(text_input.value, "open");
      this.toDoListItems.push(item);
      // save data to local storage / update local storage
      Data.save(this.toDoListItems);
      // append to DOM
      this.appendEntry(new ToDoNode(this.toDoListItems, item));
      text_input.value = "";
    } else {
      document.getElementById("alert-danger").style.display = "block";
      setTimeout(
        () => (document.getElementById("alert-danger").style.display = "none"),
        1000
      );
    }
  }

  appendEntry(todoItem) {
    const ul_list = document.getElementById(todoItem.todoItem.completed);
    ul_list.appendChild(todoItem.node);
  }
}

class ToDoNode {
  constructor(toDoListItems, todoItem) {
    this.toDoListItems = toDoListItems;
    this.todoItem = todoItem;
    this.node = this.createEntry();
  }

  createEntry() {
    const li = document.createElement("li");
    li.classList.add("entry");

    const input = this.createInput();

    // mark to-do item as *DONE*
    const checkbox = this.createCheckBox(input);
    li.appendChild(checkbox);

    li.appendChild(input);

    // mark to-do item as *ARCHIVE*
    const button_archive = this.createRemoveButton(() =>
      li.parentNode.removeChild(li)
    );
    li.appendChild(button_archive);
    return li;
  }

  createInput() {
    const input = document.createElement("input");
    input.classList.add("todoContent");
    input.value = this.todoItem.content;
    input.onkeyup = (e) => {
      this.todoItem.content = input.value;
      Data.save(this.toDoListItems);
    };
    return input;
  }

  createCheckBox(input) {
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox"; //generic snippet to move item to do list
    checkbox.checked = this.todoItem.completed === "done";
    if (checkbox.checked) {
      input.toggleAttribute("readonly");
    }
    checkbox.onclick = this.getCheckboxOnclick(checkbox, input);
    return checkbox;
  }

  getCheckboxOnclick(checkbox, input) {
    return this.getSaveOnClick(() => {
      input.toggleAttribute("readonly");
      this.todoItem.completed = checkbox.checked ? "done" : "open";
      // remove to do item from *open-list*
      const li = checkbox.parentNode;
      li.parentNode.removeChild(li);
      // add to do item from *done-list*
      const list = document.getElementById(checkbox.checked ? "done" : "open");
      list.appendChild(li);
    });
  }

  getSaveOnClick(doSth) {
    return (e) => {
      doSth();
      Data.save(this.toDoListItems);
    };
  }

  createRemoveButton(removeYourself) {
    const button_archive = document.createElement("button");
    button_archive.innerHTML = "remove";

    // myElement.id = "my-id";
    button_archive.setAttribute("id", "remove-btn");
    // button_archive.classList.add("remove-btn");
    button_archive.onclick = this.getButtonOnclick(removeYourself);
    return button_archive;
  }

  getButtonOnclick(removeYourself) {
    return this.getSaveOnClick(() => {
      const result = confirm("Do you really want to delete permanently?");
      if (result) {
        const index = this.toDoListItems.indexOf(this.todoItem);
        this.toDoListItems.splice(index, 1);
        removeYourself();
      }
    });
  }
}
