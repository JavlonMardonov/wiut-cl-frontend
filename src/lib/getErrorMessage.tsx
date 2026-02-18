export const getErrorMessage = (error: any) => {
  let msg = error?.response?.data?.message;
  if (!msg) {
    msg = "Something went wrong, Please try again.";
  }
  return msg;
};
