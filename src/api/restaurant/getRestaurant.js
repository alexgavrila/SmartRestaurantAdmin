import fetchApi from "../../utils/fetchApi";

export default async (restaurantId) => {
  const restaurants = await fetchApi({
    url: `/restaurants/${restaurantId}`,
    methods: "GET",
  });

  const body = await restaurants.json();
  if (restaurants.status === 200) {
    return body;
  } else {
    throw new Error(body.message);
  }
};
