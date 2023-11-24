import axios from "axios";

// =========add your api======================
const api = axios.create({
  baseURL: import.meta.env.VITE_API_HOST, //your api
});
// ============================================

// =====fetch api (GET Method)===============
export const fetchDataFromApi = async () => {
  try {
    const response = await api.get("/posts");
    return response.data;
  } catch (error) {
    throw error;
  }
};
// =========================================

// ====fetch single api with id (GET Method)=====
export const fetchSingleDataFromApi = async (id) => {
  try {
    const response = await api.get(`/posts/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
// ================================================

// ======delete single data with id from api (DELETE Method)===
export const deletePost = async (postId) => {
  try {
    const response = await api.delete(`/posts/${postId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting post:", error);
    throw error;
  }
};
// ===========================================================

// ======update single data with id (PUT Method)=============
export const updatePost = async (postId, updatedData) => {
  try {
    const response = await api.put(`/posts/${postId}`, updatedData);
    return response.data;
  } catch (error) {
    console.error("Error updating post:", error);
    throw error;
  }
};
// ===========================================================

// =========add/post data(POST)===============================
export const createPost = async (postData) => {
  try {
    const response = await api.post("/posts", postData);
    return response.data;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};
// ============================================================

// ===GET single data (deep searching from api with author name)=====
export const searchSingleDataFromApi = async (keyword) => {
  try {
    const response = await api.get(`/posts?q=${keyword}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
// ============================================================
