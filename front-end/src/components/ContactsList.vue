<template>
  <div>
    <v-container>
      <v-text-field v-model="searchCriteria" clearable label="Search"
                    append-outer-icon="mdi-menu-swap-outline" @click:append-outer="ascending = !ascending"/>
    </v-container>
    <v-card-text>
      <v-card v-if="reducedList.length !== 0" outlined>
        <v-list :key="listKey" class="overflow-y-auto" dense max-height="256px" nav>
          <v-list-item
              v-for="item in reducedList"
              :key="item.contactID"
              link
              @click="viewContact(item)">
            <v-list-item-content>
              <v-list-item-title><h3>{{ item.contactName }}</h3></v-list-item-title>
            </v-list-item-content>

          </v-list-item>
        </v-list>
      </v-card>
      <v-container v-else-if="list.length === 0"><h3>Tap ADD to create new contact</h3></v-container>
      <v-container v-else><h4>No results match your criteria</h4></v-container>
    </v-card-text>
    <v-card-actions>
      <v-container>
        <v-btn color="primary" @click="addNew">Add</v-btn>
      </v-container>
    </v-card-actions>
  </div>
</template>

<script>

import ContactService from "../service/ContactService";

export default {
  name: "ContactsList",

  data() {
    return {
      list: [],
      searchCriteria: '',
      listKey: 1,
      ascending: true,
    }
  },

  methods: {
    viewContact(contact) {
      this.$root.$emit("viewContact", contact);
    },
    addNew() {

      this.$root.$emit("addContact");
    },

    mySort(list) {
      if (!this.ascending) {
        let dummy = [...list];
        return dummy.reverse();
      } else return list;
    }
  },

  computed: {
    reducedList: {
      get: function () {
        if (this.searchCriteria) {
          let sc = this.searchCriteria;
          let myList = [];
          this.list.forEach((contact) => {
            if (contact.contactName.includes(sc) || contact.addresses.includes(sc)) myList.push(contact);
          })
          return this.mySort(myList);
        } else return this.mySort(this.list);
      },
      set: function () {
        //
      }
    }
  },

  created() {
    let user = this.$store.getters.getUser
    ContactService.loadContacts(user.key)
        .then(response => {
          this.list = response.data.sort((a, b) => (a.contactName <= b.contactName) ? -1 : 1);
        })
  }
}
</script>

<style scoped>

</style>
