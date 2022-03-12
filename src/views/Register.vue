<template>
  <div id="register-form">
    <form @submit.prevent="onSubmit">
      <input v-model.trim="email" name="email" placeholder="Email" />
      <input v-model.trim="password" name="password" placeholder="Password" />
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script>
import fetchApi from "@/utils/fetchApi.js";

export default {
  name: "RegisterView",
  data: () => ({
    email: "",
    password: "",
  }),
  methods: {
    async onSubmit() {
      const res = await fetchApi({
        url: "/user",
        method: "POST",
        data: {
          email: this.email,
          password: this.password,
        },
      });

      if (res.status === 200) {
        this.$router.push("/login");
      }
    },
  },
};
</script>
