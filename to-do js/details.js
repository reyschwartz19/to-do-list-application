const params = new URLSearchParams(window.location.search);
const taskId = params.get('id');
const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
const selectedTask = tasks.find(task => task.taskId === taskId );
if(selectedTask){
  document.querySelector('.task-due-date-holder').textContent = selectedTask.dueDate;
  document.querySelector('.task-name-holder').textContent = selectedTask.name;
  document.querySelector('.task-description-holder').textContent = selectedTask.description;
  document.querySelector('.task-due-date-holder').textContent = selectedTask.dueDate;
  document.querySelector('.task-status-holder').textContent = selectedTask.status;
  document.querySelector('.task-id').textContent = selectedTask.taskId;
  document.querySelector('.task-location-holder').textContent = selectedTask.location;
} else{
  alert('Task not found');
}
