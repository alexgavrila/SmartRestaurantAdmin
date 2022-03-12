import fetchApi from "../../utils/fetchApi";

export default async (name) => {
  const restaurants = await fetchApi({
    url: "/restaurants",
    method: "POST",
    data: { name },
  });

  const body = await restaurants.json();
  if (restaurants.status === 200) {
    return body;
  } else {
    throw new Error(body.message);
  }
};
