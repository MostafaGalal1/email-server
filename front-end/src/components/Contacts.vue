<template>
  <div>
    <div class="modal-body">
      <v-card>
        <component :is="currentComponent" v-bind="currentProps"/>
      </v-card>
    </div>

    <v-btn color="accent" text @click="closeContacts">
      Close
    </v-btn>

  </div>

</template>

<script>
import ContactsList from "./ContactsList";
import ContactView from "./ContactView";

export default {
  name: "Contacts",

  data() {
    return {
      currentComponent: ContactsList,
      selectedContact: null,
      isNew: false,
    }
  },

  computed: {
    currentProps: {
      get: function () {
        if (this.currentComponent === ContactView) return {contact: this.selectedContact, isNew: this.isNew}
        else return null;
      },

      set: function () {
        //
      }
    }
  },

  methods: {
    closeContacts() {
      this.$root.$emit("closeMask");
    },
  },

  mounted() {
    this.$root.$on("contactsList", () => {
      this.currentComponent = ContactsList;
    });

    this.$root.$on("viewContact", (contact) => {
      this.isNew = false;
      this.selectedContact = contact;
      this.currentComponent = ContactView;
    });

    this.$root.$on("addContact", () => {
      this.isNew = true;
      this.selectedContact = {name: '', emails: ''};
      this.currentComponent = ContactView;
    });
  }
}
</script>

<style scoped>

.modal-body {
  margin: 20px 0;
}

</style>
