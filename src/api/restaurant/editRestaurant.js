import fetchApi from "../../utils/fetchApi";

export default async (restaurantId, editObject) => {
  const restaurants = await fetchApi({
    url: `/restaurants/${restaurantId}`,
    method: "PUT",
    data: editObject,
  });

  const body = await restaurants.json();
  if (restaurants.status === 200) {
    return body;
  } else {
    throw new Error(body.message);
  }
};
