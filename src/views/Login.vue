<template>
  <div id="register-form">
    <form @submit.prevent="onSubmit">
      <t-input v-model="email" type="text" name="email" label="Email" />
      <t-input v-model="password" type="password" name="password" label="Password" />
      <t-button class="bg-gray-100" type="submit">Login</t-button>
    </form>
  </div>
</template>

<script>
import fetchApi from "@/utils/fetchApi.js";
import TInput from "@/components/TInput.vue";
import TButton from "@/components/TButton.vue";

export default {
  name: "LoginView",
  components: {
    TInput,
    TButton,
  },
  data: () => ({
    email: "",
    password: "",
  }),
  mounted: async () => {
    // if(document.cookie)
  },
  methods: {
    async onSubmit() {
      const res = await fetchApi({
        url: "/auth/login",
        method: "POST",
        data: {
          email: this.email,
          password: this.password,
        },
      });

      if (res.status === 200) {
        const body = res.json();
        this.$store.dispatch("setUser", {
          userdata: body.userData,
          isLoggedIn: true,
        });
        this.$router.push("/");
      }
    },
  },
};
</script>
