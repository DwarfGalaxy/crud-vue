import { reactive } from "vue";

export const errorMessage = reactive({
  error: false,
  message: "",
  color: "red",
});

export const commonErrorHandler = (error) => {
  const status = error.response.status;
  console.log(status);
  switch (status) {
    case 400:
      errorMessage.message = "Bad Request";
      errorMessage.error = true;
      break;
    case 401:
      errorMessage.message = "Unauthorized";
      errorMessage.error = true;
      break;
    case 403:
      errorMessage.message = "Forbidden";
      errorMessage.error = true;
      break;
    case 404:
      errorMessage.message = "Not Found";
      errorMessage.error = true;
      break;
    case 422:
      errorMessage.message = "Unprocessable Entity";
      errorMessage.error = true;
      break;
    case 500:
      errorMessage.message = "Internal Server Error";
      errorMessage.error = true;
      break;
    default:
      errorMessage.message = "Something Went Wrong";
      errorMessage.error = true;
  }
  setTimeout(() => {
    errorMessage.error = false;
  }, 2000);
};

export const successMessage = (message) => {
  errorMessage.error = true;
  errorMessage.message = message;
  errorMessage.color = "green";
  setTimeout(() => {
    errorMessage.error = false;
  }, 2000);
};
