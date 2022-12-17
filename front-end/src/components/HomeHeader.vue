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
        <div id="logout">
          <v-btn color="accent" small @click="logout">Logout</v-btn>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "HomeHeader",

  data() {
    return {
      dark: this.$store.getters.getDark,
    }
  },

  methods: {
    toggleDarkMode() {
      this.$root.$emit("toggleDarkMode", this.dark);
    },
    logout() {
      this.$store.commit("resetUser");
      this.$root.$emit("logOut");
    }
  },

  activated() {
    this.dark = this.$store.getters.getDark;
  }
}
</script>

<style lang="scss">
#logout {
  text-align: right;
}
</style>
