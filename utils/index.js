import { reactive } from "vue";

export const errorMessage = reactive({
  error: false,
  message: "",
  color: "",
});

export const commonErrorHandler = (error) => {
  const status = error.response.status;
  if (status === 400) {
    errorMessage.error = true;
    errorMessage.message = "Bad Request";
    errorMessage.color = "red";
  } else if (status === 401) {
    errorMessage.error = true;
    errorMessage.message = "Unauthorized";
    errorMessage.color = "red";
  } else if (status === 403) {
    errorMessage.error = true;
    errorMessage.message = "Forbidden";
    errorMessage.color = "red";
  } else if (status === 404) {
    errorMessage.error = true;
    errorMessage.message = "Not Found";
    errorMessage.color = "red";
  } else if (status === 422) {
    errorMessage.error = true;
    errorMessage.message = "Unprocessable Entity";
    errorMessage.color = "red";
  } else if (status === 500) {
    errorMessage.error = true;
    errorMessage.message = "Internal Server Error";
    errorMessage.color = "red";
  } else {
    errorMessage.error = true;
    errorMessage.message = "Something Went Wrong";
    errorMessage.color = "red";
  }
};
