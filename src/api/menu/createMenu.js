import fetchApi from "../../utils/fetchApi";

export default async (restaurantId, name) => {
  const menus = await fetchApi({
    url: `/restaurants/${restaurantId}/menus`,
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
