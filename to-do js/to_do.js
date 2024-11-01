document.addEventListener('DOMContentLoaded', function () {
  const template = document.querySelector('.task-template');
  const taskList = document.querySelector('.task-list-container');
  const nothingHere = document.querySelector('.nothing-here');
  const dropDown = document.querySelector('.dropdown');
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const filterIcon = document.querySelector('#filter-icon');
  const filterOptions = document.querySelectorAll('.dropdown-option');

  const currentDate = new Date();

  // Display tasks or "Nothing Here" message
  if (tasks.length === 0) {
    nothingHere.style.display = 'block';
  } else {
    nothingHere.style.display = 'none';
    tasks.forEach((task) => {
      const taskContent = document.importNode(template.content, true);
      taskContent.querySelector('.task-name-holder').textContent = task.name;
      taskContent.querySelector('.task-due-date-holder').textContent = task.dueDate;
      taskContent.querySelector('.task-status-holder').textContent = task.status;

      // Click event for each task to go to the detailed view
      taskContent.querySelector('.task-item').addEventListener('click', function () {
        window.location.href = `details.html?id=${task.taskId}`;
      });

      taskList.appendChild(taskContent);
    });
  }

  // Update task status based on due date
  tasks.forEach(task => {
    const userDateInput = new Date(task.dueDate);
    if (userDateInput <= currentDate) {
      task.status = 'Overdue';
    }
  });

  // Filter dropdown toggle
  filterIcon.addEventListener('click', function () {
    dropDown.style.display = dropDown.style.display === 'block' ? 'none' : 'block';
  });

  // Close dropdown if clicking outside
  window.addEventListener('click', (event) => {
    if (event.target !== filterIcon && !dropDown.contains(event.target)) {
      dropDown.style.display = 'none';
    }
  });

  // Filter tasks based on selected filter option
  filterOptions.forEach(option => {
    option.addEventListener('click', function () {
      filterOptions.forEach(opt => opt.classList.remove('selected')); // Remove previous selection
      option.classList.add('selected');

      const filterValue = option.dataset.value;
      tasks = JSON.parse(localStorage.getItem('tasks')) || [];

      // Apply filter if not 'All'
      if (filterValue !== 'All') {
        tasks = tasks.filter(task => task.status === filterValue);
      }

      // Clear and re-render tasks based on filter
      taskList.innerHTML = '';
      tasks.forEach((task) => {
        const taskContent = document.importNode(template.content, true);
        taskContent.querySelector('.task-name-holder').textContent = task.name;
        taskContent.querySelector('.task-due-date-holder').textContent = task.dueDate;
        taskContent.querySelector('.task-status-holder').textContent = task.status;
        taskContent.querySelector('.task-item').addEventListener('click', function () {
          window.location.href = `details.html?id=${task.taskId}`;
        });
        taskList.appendChild(taskContent);
      });
    });
  });
});
