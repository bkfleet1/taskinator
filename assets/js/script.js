var taskIdCounter = 0;

var formEl = document.querySelector("#task-form"); 
var tasksToDoEl = document.querySelector("#tasks-to-do"); 
var pageContentEl = document.querySelector("#page-content");


var taskFormHandler = function(event) {
    event.preventDefault();
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    // package up data as an object
    var taskDataObj = {
      name: taskNameInput,
      type: taskTypeInput
    };

    // check if input values are empty strings
    if (!taskNameInput || !taskTypeInput) {
      alert("You need to fill out the task form!");
      return false;
    }

    //reset() method is designed specifically for the <form> element and won't work on any other element. It resets the form fields.
    formEl.reset();

    // send it as an argument to createTaskEl
    createTaskEl(taskDataObj);
  };

  var createTaskEl = function(taskDataObj) {
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
    listItemEl.setAttribute("data-task-id", taskIdCounter);
  
    var taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
    listItemEl.appendChild(taskInfoEl);
  
    // create task actions (buttons and select) for task
    var taskActionsEl = createTaskActions(taskIdCounter);
    listItemEl.appendChild(taskActionsEl);
    tasksToDoEl.appendChild(listItemEl);
  
    // increase task counter for next unique id
    taskIdCounter++;
  };
    
  var createTaskActions = function(taskId) {
    var actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";
  
    // create edit button
    var editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId);
  
    actionContainerEl.appendChild(editButtonEl);
  
    // create delete button
    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);
  
    actionContainerEl.appendChild(deleteButtonEl);
  
    var statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);
  
    actionContainerEl.appendChild(statusSelectEl);
  
    var statusChoices = ["To Do", "In Progress", "Completed"];
    for (var i = 0; i < statusChoices.length; i++) {
    // create option element
    var statusOptionEl = document.createElement("option");
    statusOptionEl.textContent = statusChoices[i];
    statusOptionEl.setAttribute("value", statusChoices[i]);
  
    // append to select
    statusSelectEl.appendChild(statusOptionEl);
    }
  return actionContainerEl;
  };
  
  var taskButtonHandler = function(event) {
    // get target element from event
    var targetEl = event.target;
  
    if (targetEl.matches(".delete-btn")) {
      console.log("delete", targetEl);
      var taskId = targetEl.getAttribute("data-task-id");
      deleteTask(taskId);
    }
  };
         
  var deleteTask = function(taskId) {
    console.log(taskId);
    // find task list element with taskId value and remove it
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.remove();
  };

 
formEl.addEventListener("submit", taskFormHandler);
pageContentEl.addEventListener("click", taskButtonHandler);