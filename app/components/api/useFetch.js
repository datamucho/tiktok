import axios from "axios";

const useFetch = async (method, endpoint, data, headers = {}) => {
  const res = await fetch(
    `https://us-central1-js04-b4877.cloudfunctions.net/api/next21/${endpoint}`,
    {
      method: method,
    }
  );
  return res.json();
};

const usePost = async (method, endpoint, data = {}, headers = {}) => {
  axios
    .post(
      `https://us-central1-js04-b4877.cloudfunctions.net/api/next21/${endpoint}`,
      data
    )
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      console.log(error);
    });
};

export { useFetch, usePost };
