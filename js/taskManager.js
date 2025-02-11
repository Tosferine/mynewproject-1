const createTaskHtml = (id,name ,description, status, assignedTo, dueDate ) => {
  const html = ` <section data-task-id="${id}"class="border border-secondary m-3 p-2" >

  <div class="card-body">
    <h5 class="card-title">Task Name : ${name}</h5>
    <p class="card-text"> Task Description : 
      ${description}
    </p>
    <p class="card-text"> Assigned To :${assignedTo}</p>
    <p class="card-text"> Due Date : ${dueDate}</p>
    <div class="card-footer row">
      <div class="col-6">
        <p class="card-text"><b>Current Status : ${status}</b></p>
      </div>
      <div class="col-3">
        <button class="btn btn-outline-success done-button">
          Done
        </button>
      </div>
      <div class="col-3">
        <button class="btn btn-outline-danger delete-button">
          Delete
        </button>
      </div>
    </div>
  </div>
</section>`;
  return html;
};

// Create the TaskManager class
class TaskManager {
  constructor(currentId = 0) {
    this.tasks = [];
    this.currentId = currentId;
  }

  addTask(name, description, status,assignedTo,  dueDate) {
    // Create a task object that we will push to the list of tasks

    const task = {
      // Increment the current Id for each new task
      id: this.currentId++,
      name: name,
      description: description,
      status: status,
      assignedTo: assignedTo,
      dueDate: dueDate,
      
    };

    this.tasks.push(task);
  }

  getTaskById(taskId) {
    // Create a variable to store the found task
    let foundTask;
    // Loop over the tasks and find the task with the id passed as a parameter
    for (let i = 0; i < this.tasks.length; i++) {
      // Get the current task in the loop
      const task = this.tasks[i];
      // Check if its the right task by comparing the task's id to the id passed as a parameter
      if (task.id === taskId) {
        // Store the task in the foundTask variable
        foundTask = task;
      }
    }
    // Return the found task
    return foundTask;
  }
  

  render() {
    let tasksHtmlList = [];
    // Loop over our tasks and create the html, storing it in the array
    for (let i = 0; i < this.tasks.length; i++) {
      // Get the current task in the loop
      const task = this.tasks[i];
      // Format the date
      const date = new Date(task.dueDate);
      const formattedDate =
        date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
      // Create the task html
      const taskHtml = createTaskHtml(
        task.id,
        task.name,
        task.description,
        task.status,
        task.assignedTo,
        formattedDate
        

      );
      // Push it to the tasksHtmlList array
      tasksHtmlList.push(taskHtml);
    }

    // Create the tasksHtml by joining each item in the tasksHtmlList
    // with a new line in between each item.
    const tasksHtml = tasksHtmlList.join("\n");

    // Set the inner html of the tasksList on the page
    const tasksList = document.querySelector("#task-list");
    tasksList.innerHTML = tasksHtml;
  }

  save() {
    // Create a JSON string of the tasks
    const tasksJson = JSON.stringify(this.tasks);

    // Store the JSON string in localStorage
    localStorage.setItem("tasks", tasksJson);

    // Convert the currentId to a string;
    const currentId = String(this.currentId);

    // Store the currentId in localStorage
    localStorage.setItem("currentId", currentId);
  }

  load() {
    // Check if any tasks are saved in localStorage
    if (localStorage.getItem("tasks")) {
      // Get the JSON string of tasks in localStorage
      const tasksJson = localStorage.getItem("tasks");

      // Convert it to an array and store it in our TaskManager
      this.tasks = JSON.parse(tasksJson);
    }

    // Check if the currentId is saved in localStorage
    if (localStorage.getItem("currentId")) {
      // Get the currentId string in localStorage
      const currentId = localStorage.getItem("currentId");

      // Convert the currentId to a number and store it in our TaskManager
      this.currentId = Number(currentId);
    }
  }
  deleteTask(taskId){
   let newTasks = [];
    for (let i = 0; i < this.tasks.length; i++) {
      // Get the current task in the loop
      const task = this.tasks[i];
      if (task.id !== taskId) {
        // Push the task to the newTasks array
        newTasks.push(task);
        
      }

  }
  this.tasks = newTasks;
}


}
miStorage = window.localStorage;
console.log(miStorage);
