import fetchApi from "../../utils/fetchApi";

export default async (restaurantId, menuId, categoryId, order) => {
  const menus = await fetchApi({
    url: `/restaurants/${restaurantId}/menus/${menuId}/categories/${categoryId}/`,
    method: "PUT",
    data: {
      action: "changeOrder",
      order,
    },
  });

  const body = await menus.json();
  if (menus.status === 200) {
    return body;
  } else {
    throw new Error(body.message);
  }
};
