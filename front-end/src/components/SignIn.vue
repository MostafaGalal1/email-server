<template>
  <div id="signInComponent" class="centered">
    <v-card outlined>
      <v-card-title>
        <h3>Sign-in</h3>
      </v-card-title>

      <v-card-text style="padding-bottom: 0">
        <v-form ref="form" v-model="validForm">
          <v-container>
            <v-row>
              <v-text-field
                  v-model="email"
                  :rules="[rules.required]"
                  append-icon="mdi-close"
                  filled
                  label="Email"
                  required
                  @click:append="email = ''"
              ></v-text-field>
            </v-row>
            <v-row>
              <v-text-field
                  v-model="password"
                  :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="[rules.required]"
                  :type="show ? 'text' : 'password'"
                  filled
                  label="Password"
                  required
                  @click:append="show = !show"
              ></v-text-field>
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>

      <v-card-actions style="padding: 0">
        <v-container class="btnContainer">
          <p v-show="!valid" style="color: indianred">Oops! The email or password seems to be incorrect.<br>
            Try again or <a class="link" @click="signUp">Sign-up instead</a>.</p>
          <v-btn color="primary" text @click="signIn">Sign-in</v-btn>
        </v-container>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>



import signInService from "@/service/signInService";

export default {
  name: "SignIn",
  data() {
    return {
      email: "",
      password: "",
      show: false,
      valid: true,
      rules: {
        required: value => !!value || 'Required',
      },
      validForm: false,
    }
  },

  methods: {
    async signIn() {
      this.$refs.form.validate();
      if (this.validForm) {
        const basicLoginInfo = await signInService.fetchLogin(this.email, this.password)
        let isAuthenticatedUser = basicLoginInfo['authenticated']
        if (isAuthenticatedUser == "true") {
          this.$store.commit("setUser", {
            name: basicLoginInfo['name'],
            email: this.email,
            key: basicLoginInfo['key'],
            folderNames: basicLoginInfo['folder names']

          });
          await this.$router.push("/home");
        }
        else this.valid = false;

      }
    },

    signUp() {
      this.$router.push("/signup");
    }
  },


  deactivated() {
    this.password = "";
  },



}
</script>

<style scoped>

#signInComponent {
  width: 30%;
}

.centered {
  position: fixed;
  top: 50%;
  left: 50%;
  /* bring your own prefixes */
  transform: translate(-50%, -50%);
}

.btnContainer {
  padding-top: 0;
}

.link {
  color: indianred;
  text-decoration: underline;
  text-underline: indianred;
}

</style>
