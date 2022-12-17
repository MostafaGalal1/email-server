<template>
  <div>
    <v-row>
      <v-col style="text-align: left">
        <v-switch v-model="dark" @click="toggleDarkMode" label="dark mode"
                  style="display: inline-block" class="ma-0 pa-0" hide-details/>
      </v-col>
      <v-col>
        <h3>
          <v-icon>
            mdi-quadcopter
          </v-icon>
          QuadCore
        </h3>
      </v-col>
      <v-col>
        <div id="nav">
          <v-btn color="primary" small style="font-weight: bold" text @click="goToSignIn">Sign-in</v-btn>
          |
          <v-btn color="primary" small style="font-weight: bold" text @click="goToSignUp">Sign-up</v-btn>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "SignInHeader",

  data() {
    return {
      dark: this.$store.getters.getDark
    }
  },
  methods: {
    toggleDarkMode() {
      this.$root.$emit("toggleDarkMode", this.dark);
    },
    goToSignIn() {
      this.$root.$emit("goToSignIn");
    },
    goToSignUp() {
      this.$root.$emit("goToSignUp");
    }
  },

  activated() {
    this.dark = this.$store.getters.getDark;
  }
}
</script>

<style lang="scss">
#nav {
  text-align: right;

  a {
    font-weight: bold;
    color: #039BE5;
    text-decoration: none;

    &.router-link-exact-active {
      text-decoration: underline;
    }
}
}
</style>
