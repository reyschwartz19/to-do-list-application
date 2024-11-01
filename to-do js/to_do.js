document.addEventListener('DOMContentLoaded', function () {
  const template = document.querySelector('.task-template');
  const taskList = document.querySelector('.task-list-container');
  const nothingHere = document.querySelector('.nothing-here');
  const dropDown = document.querySelector('.dropdown');
  const filterIcon = document.querySelector('#filter-icon');
  const filterOptions = document.querySelectorAll('.dropdown-option');
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const currentDate = new Date();

  // Request permission for notifications
  function requestNotificationPermission() {
    if ("Notification" in window) {
      Notification.requestPermission().then(permission => {
        if (permission !== "granted") {
          console.log("Notification permission denied.");
        }
      });
    } else {
      console.log("Browser does not support notifications.");
    }
  }

  // Display tasks or show "Nothing Here" message
  function displayTasks(taskArray) {
    taskList.innerHTML = ''; // Clear current list
    if (taskArray.length === 0) {
      nothingHere.style.display = 'block';
    } else {
      nothingHere.style.display = 'none';
      taskArray.forEach((task) => {
        const taskContent = document.importNode(template.content, true);
        taskContent.querySelector('.task-name-holder').textContent = task.name;
        taskContent.querySelector('.task-due-date-holder').textContent = task.dueDate;
        taskContent.querySelector('.task-status-holder').textContent = task.status;

        // Click event to go to the detailed view of the task
        taskContent.querySelector('.task-item').addEventListener('click', function () {
          window.location.href = `details.html?id=${task.taskId}`;
        });

        taskList.appendChild(taskContent);
      });
    }
  }

  // Update task status based on due date
  function updateTaskStatuses() {
    tasks.forEach(task => {
      const userDateInput = new Date(task.dueDate);
      if (userDateInput <= currentDate) {
        task.status = 'Overdue';
      }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  // Check tasks for notifications
  function checkTasksForNotifications() {
    const currentTime = new Date().getTime();

    tasks.forEach(task => {
      const taskTime = new Date(task.dueDate).getTime();
      const oneHourBeforeTask = taskTime - 3600000; // 1 hour in milliseconds

      // Overdue notification
      if (currentTime > taskTime && task.status === "Pending") {
        sendNotification(`Task Overdue!`, `The task "${task.name}" is overdue.`);
        task.status = "Overdue"; // Avoid repeated notifications
      }
      // 1-hour prior notification
      else if (currentTime >= oneHourBeforeTask && currentTime < taskTime && task.status === "Pending") {
        sendNotification(`Upcoming Task`, `The task "${task.name}" is due in less than an hour.`);
        task.status = "Due Soon"; // Avoid repeated notifications
      }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks)); // Save updated statuses
  }

  // Send notification
  function sendNotification(title, message) {
    if (Notification.permission === "granted") {
      new Notification(title, {
        body: message,
        icon: "path/to/icon.png" // Optional: Add an icon
      });
    }
  }

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
      filterOptions.forEach(opt => opt.classList.remove('selected'));
      option.classList.add('selected');

      const filterValue = option.dataset.value;
      tasks = JSON.parse(localStorage.getItem('tasks')) || [];

      if (filterValue !== 'All') {
        tasks = tasks.filter(task => task.status === filterValue);
      }

      displayTasks(tasks); // Re-render tasks based on filter
    });
  });

  // Initial setup
  requestNotificationPermission(); // Ask for notification permission
  updateTaskStatuses(); // Update task statuses on load
  displayTasks(tasks); // Initial task display
  setInterval(checkTasksForNotifications, 60000); // Check tasks every 60 seconds
});
