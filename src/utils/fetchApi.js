const fetchApi = ({ url, data = {}, method }) => {
  const opts = {
    method: method,
    credentials: "include",
  };

  if (Object.entries(data).length) {
    const formData = new FormData();
    for (const [key, value] of Object.entries(data)) {
      formData.append(key, value);
    }
    opts.body = formData;
  }

  return fetch(`${process.env.VUE_APP_API}${url}`, opts);
};

export default fetchApi;
