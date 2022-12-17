<template>
  <div id="signUpComponent" class="centered">
    <v-card outlined>
      <v-card-title><h3>Sign-up</h3></v-card-title>

      <v-card-text style="padding-bottom: 0">
        <v-form ref="form" v-model="validForm">
          <v-container>
            <v-row>
              <v-col style="padding-left: 0">
                <v-text-field
                    v-model="firstname"
                    :counter="10"
                    :rules="[nameRules,requiredRules]"
                    filled
                    label="First name"
                    required
                ></v-text-field>
              </v-col>
              <v-col style="padding-right: 0">
                <v-text-field
                    v-model="lastname"
                    :counter="10"
                    :rules="[nameRules,requiredRules]"
                    filled
                    label="Last name"
                    required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-menu
                  ref="menu"
                  v-model="menu"
                  :close-on-content-click="false"
                  min-width="290px"
                  offset-y
                  transition="scale-transition"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                      v-model="date"
                      v-bind="attrs"
                      v-on="on"
                      :rules="[requiredRules]"
                      filled
                      label="Birthday date"
                      prepend-inner-icon="mdi-calendar"
                      readonly
                  ></v-text-field>
                </template>
                <v-date-picker
                    ref="picker"
                    v-model="date"
                    :max="new Date().toISOString().substr(0, 10)"
                    min="1950-01-01"
                    @change="save"
                ></v-date-picker>
              </v-menu>
            </v-row>
            <v-row>
              <v-text-field
                  v-model="email"
                  :rules="[requiredRules, emailRules]"
                  filled
                  label="E-mail"
                  placeholder="example: a.waleedothman"
                  required
                  suffix="@quadcore.com"
              ></v-text-field>
            </v-row>
            <v-row>
              <v-text-field
                  v-model="password"
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="[requiredRules, minRules]"
                  :type="show1 ? 'text' : 'password'"
                  counter
                  filled
                  hint="At least 8 characters"
                  label="Password"
                  @click:append="show1 = !show1"
              ></v-text-field>
            </v-row>
            <v-row>
              <v-text-field
                  v-model="confirmPassword"
                  :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="[requiredRules, confirmRules]"
                  :type="show2 ? 'text' : 'password'"
                  filled
                  label="Confirm Password"
                  @click:append="show2 = !show2"
              ></v-text-field>
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>

      <v-card-actions style="padding: 0">
        <v-container class="btnContainer">
          <p v-show="!valid" style="color: indianred">Oops! It looks like this email address is already taken.</p>
          <v-btn color="primary" text @click="signUp">Sign-up</v-btn>
        </v-container>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import signInService from "@/service/signInService";
export default {
  name: "SignUp",
  data() {
    return {
      validForm: false,
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      confirmPassword: '',
      date: null,
      menu: false,
      show1: false,
      show2: false,
      nameRules: v => v.length <= 10 || 'Name must be less than 10 characters',
      requiredRules: value => !!value || 'Required',
      minRules: v => v.length >= 8 || 'Min 8 characters',
      confirmRules: v => v === this.password || 'Passwords not matching',
      emailRules: v => !/@/.test(v) || 'Invalid email address',
      valid: true,
      list: []
    }
  },
  watch: {
    menu(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
    },
  },
  methods: {
    signUp() {
      this.$refs.form.validate();
      if (this.validForm) {
        
        let modifiedDate=this.date.split("-").reverse().join("/")
        this.list =
            {name: this.firstname +" "+ this.lastname, email: this.email+'@quadcore.com', password: this.password,DOB:modifiedDate}

        signInService.signUp(this.list).then(response=>{
          const status=response.data
          if (status === "success") {
            alert("Signed up successfully")
            this.$root.$emit("goToSignIn");

          } else {
            this.valid = false;
          }


        })



      }
    },
    save(date) {
      this.$refs.menu.save(date)
    },
    deactivated() {
      this.password = "";
      this.confirmPassword = "";
    },
  },


}
</script>

<style scoped>
#signUpComponent {
  width: 50%;
  position: fixed;
  top: 50%;
  left: 50%;
  /* bring your own prefixes */
  transform: translate(-50%, -50%);
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

</style>
