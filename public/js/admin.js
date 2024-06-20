const userList = document.getElementById('userList');
const userForm = document.getElementById('userForm');

let users = [];

// Display users
function displayUsers() {
  userList.innerHTML = '';
  users.forEach(user => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `<span>${user.username}</span><span>${user.email}</span><button onclick="editUser(${user.id})">Edit</button><button onclick="deleteUser(${user.id})">Delete</button>`;
    userList.appendChild(listItem);
  });
}

// Add user
add.addEventListener('submit', function(event) {
  event.preventDefault();
  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const newUser = {
  
    username,
    email
  };
  users.push(newUser);
  displayUsers();
  userForm.reset();
});

// Edit user
function editUser(id) {
  const index = users.findIndex(user => user.id === id);
  if (index !== -1) {
    const username = prompt('Enter new username:', users[index].username);
    const email = prompt('Enter new email:', users[index].email);
    if (username !== null && email !== null) {
      users[index].username = username;
      users[index].email = email;
      displayUsers();
    }
  }
}

// Delete user
function deleteUser(id) {
  const confirmDelete = confirm('Are you sure you want to delete this user?');
  if (confirmDelete) {
    users = users.filter(user => user.id !== id);
    displayUsers();
  }
}

// Initial display
displayUsers();