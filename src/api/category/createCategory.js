import fetchApi from "../../utils/fetchApi";

export default async (restaurantId, menuId, name) => {
  const menus = await fetchApi({
    url: `/restaurants/${restaurantId}/menus/${menuId}/categories`,
    method: "POST",
    data: { name },
  });

  const body = await menus.json();
  if (menus.status === 200) {
    return body;
  } else {
    throw new Error(body.message);
  }
};
