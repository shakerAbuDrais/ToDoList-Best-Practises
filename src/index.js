import Store from '../modules/storeClass.js';

import DisplayScreen from '../modules/display.js';

import './style.css';

class Task {
  constructor(description, completed, id) {
    this.description = description;
    this.completed = completed;
    this.id = id;
  }
}

// display books event
window.addEventListener('load', DisplayScreen.displayTasks);

// Add book event
document.querySelector('#text').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    const description = document.querySelector('#text').value;
    const completed = false;
    const id = Store.getTasks().length + 1;
    // instatiate books
    const task = new Task(description, completed, id);
    // Display Book to screen
    DisplayScreen.addTaskToList(task);
    // Add to local Storage
    Store.addTask(task);
    // eslint-disable-next-line no-restricted-globals
    location.reload();
  }
});
window.onkeypress = () => {
  document.querySelectorAll('.item').forEach((item) => {
    item.addEventListener('keyup', (e) => {
      e.preventDefault();
      const description = item.textContent;
      const completed = false;
      const { id } = item;

      const task = new Task(description, completed, id);
      DisplayScreen.editTask(task);
      Store.editTask(id, description);
    });
  });
};
window.onload = () => {
  const item = document.querySelectorAll('.checkbox');
  item.forEach((el) => el.addEventListener('change', (e) => {
    const id = parseInt(e.target.name.replace(/[^\d.]/g, ''), 10);
    const label = e.target.parentNode.childNodes[2];
    if (el.checked) {
      label.style.textDecoration = 'line-through';
      localStorage.setItem('label', el.checked);
    } else {
      label.style.textDecoration = 'none';
    }
    Store.completed(id);
  }));
  const remove = document.querySelectorAll('.remove-btn');
  remove.forEach((el) => el.addEventListener('click', (e) => {
    const { id } = e.target.parentNode.childNodes[2];
    DisplayScreen.deleteTask(e.target);
    // Remove task from Local Storage
    Store.removeTask(parseInt(id, 10));
  }));

  const tasks = Store.getTasks();
  if (tasks.length !== 0) {
    const clearAll = document.querySelector('.btn');
    clearAll.addEventListener('click', (e) => {
      e.preventDefault();
      Store.removeAll();
      DisplayScreen.deleteAll();
    });
  }

  function load() {
    const tasks = Store.getTasks();
    for (let i = 0; i < tasks.length; i += 1) {
      if (tasks[i].completed === true) {
        const checked = JSON.parse(localStorage.getItem('label'));
        document.querySelectorAll('.checkbox')[i].checked = checked;
      }
    }
  }
  load();
};
