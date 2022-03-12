import fetchApi from "../../utils/fetchApi";

export default async (restaurantId) => {
  const menus = await fetchApi({
    url: `/restaurants/${restaurantId}/tables`,
    methods: "GET",
  });

  const body = await menus.json();
  if (menus.status === 200) {
    return body;
  } else {
    throw new Error(body.message);
  }
};
