/**
 * main.js - Main JavaScript file for the application
 */

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
  console.log('Application initialized');
  
  // Update the time every second
  const timeElement = document.getElementById('current-time');
  if (timeElement) {
    updateTime();
    setInterval(updateTime, 1000);
  }
  
  // Fetch server info
  const serverInfoElement = document.getElementById('server-info');
  if (serverInfoElement) {
    fetchServerInfo();
  }
  
  // Initialize button events
  const infoButton = document.getElementById('info-button');
  if (infoButton) {
    infoButton.addEventListener('click', () => {
      console.log('Info button clicked');
      alert('This is a demo application for npm scripts!');
    });
  }
});

/**
 * Updates the time display
 */
function updateTime() {
  const timeElement = document.getElementById('current-time');
  const now = new Date();
  timeElement.textContent = now.toLocaleTimeString();
}

/**
 * Fetches server information from the API
 */
async function fetchServerInfo() {
  const serverInfoElement = document.getElementById('server-info');
  
  try {
    console.log('Fetching server info...');
    const response = await fetch('/api/info');
    const data = await response.json();
    
    serverInfoElement.innerHTML = `
      <p><strong>Server Name:</strong> ${data.name}</p>
      <p><strong>Mode:</strong> ${data.mode}</p>
      <p><strong>Server Time:</strong> ${new Date(data.time).toLocaleString()}</p>
    `;
  } catch (error) {
    console.error('Error fetching server info:', error);
    serverInfoElement.innerHTML = `<p class="error">Error loading server info: ${error.message}</p>`;
  }
} 