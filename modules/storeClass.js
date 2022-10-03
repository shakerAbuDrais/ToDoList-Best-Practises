export default class Store {
  static getTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    return tasks;
  }

  static addTask(task) {
    const tasks = Store.getTasks();
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  static removetask(id) {
    const tasks = Store.getTasks();
    tasks.forEach((task, index) => {
      if (task.id === id) {
        return task.id !== index;
      }
      return tasks;
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  static editTask(idx, description) {
    const tasks = Store.getTasks();
    tasks.forEach((task) => {
      if (task.id === parseInt(idx, 10)) {
        task.description = description;
      }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  static completed(id) {
    const tasks = Store.getTasks();
    tasks.forEach((task) => {
      if (task.id === id) {
        task.completed = !task.completed;
      }
      localStorage.setItem('tasks', JSON.stringify(tasks));
    });
  }

  static removeTask(id) {
    const tasks = Store.getTasks();
    tasks.forEach((task, index) => {
      if (task.id === id) {
        tasks.splice(index, 1);
      }
    });
    tasks.forEach((task, i) => {
      task.id = i + 1;
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  static removeAll() {
    let tasks = Store.getTasks();
    tasks = tasks.filter((task) => {
      if (task.completed === true) {
        return false;
      }
      return true;
    });
    tasks.forEach((e, i) => {
      e.id = i + 1;
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    return tasks;
  }
}