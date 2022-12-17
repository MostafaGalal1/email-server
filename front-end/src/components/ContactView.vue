<template>
  <div>
    <v-card-text>
      <v-row>
        <v-btn color="primary" icon @click="back">
          <v-icon>mdi-keyboard-backspace</v-icon>
        </v-btn>
      </v-row>

      <v-container>
        <v-form ref="form" v-model="validForm">
          <v-row>
            <v-text-field
                v-model="name"
                label="Name"
                :rules="[requiredRules]"
                clearable
            />
          </v-row>
          <v-row>
            <v-textarea v-model="emails" hint="Enter emails separated by semicolon or newline"
                        :rules="[requiredRules]" class="overflow-y-auto" label="Emails" persistent-hint rows="5"/>
          </v-row>
        </v-form>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-container>
        <v-row>
          <v-col>
            <v-btn color="primary" @click="save">Save</v-btn>
          </v-col>
          <v-col v-if="!isNew">
            <v-btn color="error" @click="del">Delete</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card-actions>
  </div>
</template>

<script>
import ContactService from "../service/ContactService";

export default {
  name: "ContactView",
  props: ['contact', 'isNew'],

  data() {
    return {
      name: this.contact.contactName,
      emails: this.contact.addresses,
      id: this.contact.contactID,
      validForm: false,
      requiredRules: value => !!value || 'Required',
    }
  },

  methods: {
    back() {
      this.$root.$emit("contactsList");
    },

    save() {
      this.$refs.form.validate();
      let user=this.$store.getters.getUser
      if (this.validForm) {

        let map= []

        if(this.isNew) {
          map = {name: this.name, addresses: this.emails,key:user.key}
          ContactService.addContact(map).then(() => {
            this.back();
          })
        }
        else {
          map = {name: this.name, id: this.id, addresses: this.emails,key:user.key}
          ContactService.editContact(map).then(() => {
            this.back();
          })
        }
      }
    },

    del() {
      let user=this.$store.getters.getUser
      ContactService.deleteContact(this.id,user.key).then(() => {
        this.back();
      })
    }
  },

}
</script>

<style scoped>

</style>
