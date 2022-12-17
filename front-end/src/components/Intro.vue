<template>
  <div>
    <v-row>
      <v-container class="myContainer" fluid>
        <SignInHeader/>
      </v-container>
    </v-row>
    <v-row>
      <keep-alive>
        <component :is="currentComponent"/>
      </keep-alive>
    </v-row>
  </div>
</template>

<script>
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import SignInHeader from "./SignInHeader";

export default {
  name: "Intro",
  components: {SignInHeader},
  data() {
    return {
      currentComponent: SignIn,
    }
  },

  mounted() {
    this.$root.$on("goToSignIn", () => {
      this.currentComponent = SignIn;
    })

    this.$root.$on("goToSignUp", () => {
      this.currentComponent = SignUp;
    })
  }
}
</script>

<style scoped>

.myContainer {
  padding-right: 4%;
  padding-left: 4%;
}

</style>
