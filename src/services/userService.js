const API_BASE_URL = "https://jsonplaceholder.typicode.com/users";

class UserService {
  getUsers() {
    return fetch(API_BASE_URL);
  }

  createUser(user) {
    return fetch(API_BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
  }

  getUserById(userId) {
    return fetch(`${API_BASE_URL}/${userId}`);
  }

  updateUser(user, userId) {
    return fetch(`${API_BASE_URL}/${userId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
  }

  deleteUser(userId) {
    return fetch(`${API_BASE_URL}/${userId}`, { method: "DELETE" });
  }
}

export default new UserService();
