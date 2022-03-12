import fetchApi from "../../utils/fetchApi";

export default async (restaurantId, tableId, editObject) => {
  const restaurants = await fetchApi({
    url: `/restaurants/${restaurantId}/menus/${tableId}`,
    method: "PUT",
    data: {
      action: "edit",
      ...editObject,
    },
  });

  const body = await restaurants.json();
  if (restaurants.status === 200) {
    return body;
  } else {
    throw new Error(body.message);
  }
};
