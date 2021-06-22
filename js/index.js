const taskManager = new TaskManager(0);
const newTaskForm = document.querySelector('#newTaskForm');
var row = 1;
  
function validateForm() {

        let returnV = true;
        var a = document.getElementById("tId").value;
        var b = document.getElementById("tDesc").value;
        var c = document.getElementById("tStatus").value;
        var d = document.getElementById("tAssTo").value;
        var e = document.getElementById("tDate").value;

        var lenA = a.length;
        var lenB = b.length;
        var lenD= d.length;
       
        const now = new Date();
        now.setHours(0,0,0,0)
        const e1  = new Date(e);
       

        document.getElementById('tId').style.border =""; 
        document.getElementById('task-error').innerHTML = "";

        document.getElementById('tDesc').style.border ="";
        document.getElementById('desc-error').innerHTML = "",

        document.getElementById('tStatus').style.border ="";  
        document.getElementById('status-error').innerHTML = "";

        document.getElementById('tAssTo').style.border ="";  
        document.getElementById('assto-error').innerHTML = "";

        document.getElementById('tDate').style.border ="";  
        document.getElementById('date-error').innerHTML = "";

        if (a=="" && b=="" && c=="" && d=="" && e=="") {
                document.getElementById('tId').focus(); 
                document.getElementById('tId').style.border ="3px solid red";
                document.getElementById('task-error').innerHTML = "Task Name to be minimum of 5 characters";

                document.getElementById('tDesc').focus(); 
                document.getElementById('tDesc').style.border ="3px solid red"; 
                document.getElementById('desc-error').innerHTML = "Description to be minimum of 5 characters";

                document.getElementById('tStatus').style.border ="3px solid red";  
                document.getElementById('status-error').innerHTML = "Status is mandatory ";
                
                document.getElementById('tAssTo').style.border ="3px solid red";  
                document.getElementById('assto-error').innerHTML = "Assigned To is mandatory ";

                document.getElementById('tDate').focus(); 
                document.getElementById('tDate').style.border ="3px solid red";  
                document.getElementById('date-error').innerHTML = "Due Date is mandatory ";

                return false;

        }
        else if (b=="" && d=="" && e=="") {
                document.getElementById('tDesc').focus(); 
                document.getElementById('tDesc').style.border ="3px solid red"; 
                document.getElementById('desc-error').innerHTML = "Description to be minimum of 5 characters";

                document.getElementById('tAssTo').style.border ="3px solid red";  
                document.getElementById('assto-error').innerHTML = "Assigned To is mandatory ";
                document.getElementById('assto-error').innerHTML = "Assigned To is mandatory ";

                document.getElementById('tDate').focus(); 
                document.getElementById('tDate').style.border ="3px solid red";  
                document.getElementById('date-error').innerHTML = "Due Date is mandatory ";
                
                return false;

        }
        else if (d=="" && e=="") {
                document.getElementById('tAssTo').style.border ="3px solid red";  
                document.getElementById('assto-error').innerHTML = "Assigned To is mandatory ";
                document.getElementById('assto-error').innerHTML = "Assigned To is mandatory ";

                document.getElementById('tDate').focus(); 
                document.getElementById('tDate').style.border ="3px solid red";  
                document.getElementById('date-error').innerHTML = "Due Date is mandatory ";
                
                return false;

        }
        else if ((a=="") || lenA < 6) {
                document.getElementById('tId').focus(); 
                document.getElementById('tId').style.border ="3px solid red";
                document.getElementById('task-error').innerHTML = "Task Name to be minimum of 5 characters";
                return false
        } 
        else if ((b=="") || lenB < 6) {
                document.getElementById('tDesc').focus(); 
                document.getElementById('tDesc').style.border ="3px solid red"; 
                document.getElementById('desc-error').innerHTML = "Description to be minimum of 5 characters";
                return false;
        } 
        else if (c=="") {
                document.getElementById('tStatus').focus(); 
                document.getElementById('tStatus').style.border ="3px solid red";  
                document.getElementById('status-error').innerHTML = "Select a status via the dropdown menu";
                return false;
        } 
        else if ((d=="") || lenD < 6 ) {
                document.getElementById('tAssTo').focus(); 
                document.getElementById('tAssTo').style.border ="3px solid red";  
                document.getElementById('assto-error').innerHTML = "Assigned To is mandatory ";
                return false;
        } 
        else if (e=="") {
                document.getElementById('tDate').focus(); 
                document.getElementById('tDate').style.border ="3px solid red";  
                document.getElementById('date-error').innerHTML = "Due Date is mandatory ";
                return false;

        } else if (e1 < now) {  
                  document.getElementById('tDate').style.border ="3px solid red";  
                  document.getElementById('date-error').innerHTML = "Due Date cannot be in the past";

                  console.log("S"); 
                  return false;   
        } else 
        // "validation successful";
               { 
                // id = 'id' + performance.now()
                // dup = 'id' + performance.now()

                // console.log(id)
                // console.log(id.replace('.','')) // sexy id
                // console.log(id === dup) // false!
        
                // row++;
                event.preventDefault();
                taskManager.addTask(a, b, c, d, e);

                   // Render the tasks
                taskManager.save();
                taskManager.render();

                a.value = '';
                b.value = '';
                d.value = '';
                e.value = '';
                
                document.getElementById("tId").value = "";
                document.getElementById("tDesc").value = "";
                document.getElementById("tStatus").value = "1";
                document.getElementById("tAssTo").value = "";
                document.getElementById("tDate").value = "";
        
            }
    
          }
          const taskList = document.querySelector('#task-list');
          taskList.addEventListener("click", (event) => {
          if (event.target.classList.contains("done-button")) {
                // Get the correct parent Task, yours might be slightly different
                // Use console.log(event.target.parentElement) to see
                const parentTask =
                  event.target.parentElement.parentElement.parentElement.parentElement;
                // Get the taskId of the parent Task and turn it into a number.
                const taskId = Number(parentTask.dataset.taskId);
              
                const task = taskManager.getTaskById(taskId);
                // Update the task status to 'DONE'
                task.status = "Done";
                taskManager.save();
                // Render the tasks
                taskManager.render();

          }  if(event.target.classList.contains("delete-button")){
                const parentTask =
                event.target.parentElement.parentElement.parentElement.parentElement;
                const taskId = Number(parentTask.dataset.taskId);
                const task = taskManager.deleteTask(taskId);
                taskManager.save();
                taskManager.render();
          }
        });
     