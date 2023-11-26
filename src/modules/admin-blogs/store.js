import { defineStore } from "pinia";
import { ref } from "vue";
import { fetchDataFromApi } from "./service";
import { fetchSingleDataFromApi } from "./service";
import { deletePost } from "./service";
import { updatePost } from "./service";
import { createPost } from "./service";

import { searchSingleDataFromApi } from "./service";

import { commonErrorHandler } from "@/utils/index";
import { successMessage } from "../../utils";

export const useDataStore = defineStore("data", () => {
  // =========Reactive state========================
  const data = ref([]);
  const isLoading = ref(false);
  const error = ref(null);
  const postError = ref(false);
  // =====================================================

  // ========Actions to fetch all the data from api========
  const fetchData = async () => {
    try {
      isLoading.value = true;
      const apiData = await fetchDataFromApi();
      data.value = apiData.map((item, index) => ({
        ...item,
        sno: index + 1,
      }));
    } catch (error) {
      commonErrorHandler(error);
      error.value = error;
      console.log("The error is", error);
    } finally {
      isLoading.value = false;
    }
  };
  // ========================================================

  // ==========Actions to fetch single data from api========
  const fetchSingleData = async (id) => {
    try {
      isLoading.value = true;
      data.value = await fetchSingleDataFromApi(id);
    } catch (error) {
      commonErrorHandler(error); //if error then call method to display snackbar in ui
      error.value = error;
      console.log("The error is", error);
    } finally {
      isLoading.value = false;
    }
  };
  // =======================================================

  //=============Action to delete single item from api======
  const deleteSingleData = async (id) => {
    try {
      await deletePost(id);
    } catch (error) {
      commonErrorHandler(error); //if error then call method to display snackbar in ui
      error.value = error;
    }
  };
  // ==========================================================

  // ============Action to update single item=================
  const updateSinglePost = async (id, updatedData) => {
    try {
      await updatePost(id, updatedData);
      successMessage("Blog updated successfully");
    } catch (error) {
      commonErrorHandler(error); //if error then call method to display snackbar in ui
      error.value = error;
    }
  };
  // =========================================================

  // ========Action to Post/add item=====================
  const addBlog = async (blogData) => {
    try {
      await createPost(blogData);
      successMessage("Blog added successfully");
    } catch (error) {
      commonErrorHandler(error); //if error then call method to display snackbar in ui
      error.value = error;
      postError.value = true;
    }
  };
  // =========================================================

  // ======Search Single Item from API=======================
  const searchFromBlog = async (keyword) => {
    try {
      isLoading.value = true;
      const apiData = await searchSingleDataFromApi(keyword);
      data.value = apiData.map((item, index) => ({
        ...item,
        sno: index + 1,
      }));
    } catch (error) {
      commonErrorHandler(error);
      error.value = error;
      console.log("The error is", error);
    } finally {
      isLoading.value = false;
    }
  };
  // ========================================================

  // ==Return the properties and methods you want to expose===
  return {
    fetchData,
    fetchSingleData,
    deleteSingleData,
    updateSinglePost,
    addBlog,
    searchFromBlog,
    data,
    postError,
    isLoading,
    error,
  };
  // ==========================================================
});
