<template>
  <div>
    <v-card-text>
      <v-card v-if="list.length !== 0" outlined>
        <v-list class="overflow-y-auto" dense max-height="256px" nav>
          <v-list-item
              v-for="item in list"
              :key="item.id"
              link
              @click="viewFolder(item)">
            <v-list-item-content>
              <v-list-item-title><h3>{{ item.name }}</h3></v-list-item-title>
            </v-list-item-content>

          </v-list-item>
        </v-list>
      </v-card>
      <v-container v-else><h3>Tap ADD to create new folder</h3></v-container>
    </v-card-text>
    <v-card-actions>
      <v-container>
        <v-btn color="primary" @click="addNew">Add</v-btn>
      </v-container>
    </v-card-actions>
  </div>
</template>

<script>
export default {
  name: "FoldersList",

  data() {
    return {
      list: []
    }
  },

  methods: {
    viewFolder(folder) {
      this.$root.$emit("viewFolder", folder);
    },
    addNew() {
      this.$root.$emit("addFolder");
    }
  },

  created() {
    let folders = this.$store.getters.getUser.folderNames.slice(5)
    folders.forEach((item, index) => {
      this.list.push({name: item, id: index + 1})
    })
  }
}
</script>

<style scoped>

</style>
