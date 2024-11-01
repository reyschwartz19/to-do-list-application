const params = new URLSearchParams(window.location.search);
const taskId = params.get('id');
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
const selectedTask = tasks.find(task => task.taskId === taskId );
document.querySelector('.modal').style.display = 'none';
if(selectedTask){
  document.querySelector('.task-due-date-holder').textContent = selectedTask.dueDate;
  document.querySelector('.task-name-holder').textContent = selectedTask.name;
  document.querySelector('.task-description-holder').textContent = selectedTask.description;
  document.querySelector('.task-status-holder').textContent = selectedTask.status;
  document.querySelector('.task-id').textContent = selectedTask.taskId;
  document.querySelector('.task-location-holder').textContent = selectedTask.location;
} else{
  alert('Task not found');
  window.location.href = 'to_do.html';
}
document.querySelector('.home-button').addEventListener('click',function(){
  window.location.href = 'to_do.html';
});
document.querySelector('.delete-task-button').addEventListener('click', function(){
  tasks = tasks.filter(task => task.taskId !== taskId);//filters out any tasks with taskId equal to specified tasks
  localStorage.setItem('tasks', JSON.stringify(tasks));
  window.location.href = 'to_do.html';
})
document.querySelector('.edit-task-button').addEventListener('click', function(){
  document.querySelector('.modal').style.display = 'block';
  document.querySelector('main').style.display = 'none';
  

})
document.querySelector('.save-task-edit-button').addEventListener('click', function(){
  selectedTask.dueDate = document.querySelector('#edit-task-due-date').value;
  selectedTask.name = document.querySelector('#edit-task-name').value;
  selectedTask.description = document.querySelector('#edit-task-description').value;
  selectedTask.location = document.querySelector('#edit-task-location').value;
  if(selectedTask.name && selectedTask.dueDate){
    localStorage.setItem('tasks', JSON.stringify(tasks));
    window.location.href = 'to_do.html';
  }else{
    alert("Please fill all required fields");
  }
})
document.querySelector('.cancel-task-edit-button').addEventListener('click', function(){
  window.location.href = 'to_do.html';
})