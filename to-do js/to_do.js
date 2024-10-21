document.addEventListener('DOMContentLoaded', function () {
  const template = document.querySelector('.task-template');
  const taskList = document.querySelector('.task-list-container');
  const nothingHere = document.querySelector('.nothing-here');

  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  if (tasks.length === 0) {
    nothingHere.style.display = 'block';
  } else {
    nothingHere.style.display = 'none';
    tasks.forEach((task) => {
      const taskContent = document.importNode(template.content, true);
      taskContent.querySelector('.task-name-holder').textContent = task.name;
      taskContent.querySelector('.task-due-date-holder').textContent = task.dueDate;
      taskContent.querySelector('.task-status-holder').textContent = task.status;
      taskList.addEventListener('click',function(){
        window.location.href = `details.html?id=${task.taskId}`
      });
   
      taskList.appendChild(taskContent);
     
    });
  }
  
});
