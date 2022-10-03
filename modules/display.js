import Store from './storeClass.js';

const form = document.querySelector('.form');
const toDoItem = document.createElement('div');
const btn = document.createElement('p');
btn.classList.add('btn');
btn.innerHTML = 'Clear All Completed';

export default class DisplayScreen {
  static displayTasks() {
    const tasks = Store.getTasks();

    tasks.forEach((task) => DisplayScreen.addTaskToList(task));
  }

  static addTaskToList(task) {
    toDoItem.innerHTML += `<li><input class = "checkbox" type="checkbox" name="item${task.id}" value="">
    <label for="item${task.id}" id="${task.id}" style="" class = "item" contenteditable="true"> ${task.description}</label><span class = "remove-btn" id="dots">&#10006;</span><br> <hr> </li>`;
    form.appendChild(toDoItem);
    form.appendChild(btn);
  }

  static deleteTask(element) {
    if (element.classList.contains('remove-btn')) {
      element.parentElement.remove();
    }
  }

  static deleteAll() {
    const deleted = document.querySelectorAll('.checkbox');
    for (let i = 0; i < deleted.length; i += 1) {
      if (deleted[i].checked === true) {
        deleted[i].parentNode.remove();
      }
    }
  }
}