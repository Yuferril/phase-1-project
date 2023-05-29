export const getData = async () => {
  let response;

  try {
    response = fetch("https://go-apod.herokuapp.com/apod");
  } catch (e) {
    console.log("error:", e);
  }

  console.log("RESPONSE == ", response);

  return response;
};


