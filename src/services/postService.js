const API_BASE_URL = "https://jsonplaceholder.typicode.com/posts";

class PostService {
  getPosts() {
    return fetch(API_BASE_URL);
  }

  createPost(post) {
    return fetch(API_BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(post),
    });
  }

  getPostById(postId) {
    return fetch(`${API_BASE_URL}/${postId}`);
  }

  updatePost(post, postId) {
    return fetch(`${API_BASE_URL}/${postId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(post),
    });
  }

  deletePost(postId) {
    return fetch(`${API_BASE_URL}/${postId}`, { method: "DELETE" });
  }
}

export default PostService = new PostService();
