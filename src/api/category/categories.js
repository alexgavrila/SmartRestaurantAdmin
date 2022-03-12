import fetchApi from "../../utils/fetchApi";

export default async (restaurantId, menuId) => {
  const menus = await fetchApi({
    url: `/restaurants/${restaurantId}/menus/${menuId}/categories`,
    methods: "GET",
  });

  const body = await menus.json();
  if (menus.status === 200) {
    return body;
  } else {
    throw new Error(body.message);
  }
};
