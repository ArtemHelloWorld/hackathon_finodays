const loadingContainer = document.getElementById('loading-container');

request.onupgradeneeded = (event) => {
  // Show loading animation
  loadingContainer.style.display = 'block';

  // ... your existing code ...

  // Hide loading animation after the upgrade is complete
  loadingContainer.style.display = 'none';
};

request.onsuccess = (event) => {
  // Show loading animation
  loadingContainer.style.display = 'block';

  // ... your existing code ...

  // Hide loading animation after the operation is complete
  loadingContainer.style.display = 'none';
};

request.onerror = (event) => {
  // Show loading animation
  loadingContainer.style.display = 'block';

  // Handle error...

  // Hide loading animation after handling error
  loadingContainer.style.display = 'none';
};
