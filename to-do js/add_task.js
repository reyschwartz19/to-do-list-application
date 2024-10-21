// add_task.js (for add task page)
document.addEventListener('DOMContentLoaded', function() {
  const cancelButton = document.querySelector('.cancel-task-button');
  const saveButton = document.querySelector('.save-task-button');

  saveButton.addEventListener('click', function() {
      const taskName = document.querySelector('#task-name').value;
      const dueDate = document.querySelector('#task-due-date').value;
      const description = document.querySelector('#task-description').value;
      const taskId = Date.now().toString();
      const location = document.querySelector('#task-location').value;
      // Optionally, you can redirect to the task list page after saving.
      if (taskName && dueDate) {
          // You can save the task to localStorage or a database here
          const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
          tasks.push({ name: taskName, dueDate, description, status: 'Pending', taskId, location });
          localStorage.setItem('tasks', JSON.stringify(tasks));
          window.location.href = 'to_do.html'; // Assuming your task list is on index.html
      } else {
          alert("Please fill all required fields");
      }
  });

  cancelButton.addEventListener('click', function() {
      window.location.href = 'to_do.html'; // Redirect to the task list page
  });
});
