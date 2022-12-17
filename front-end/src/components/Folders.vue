<template>
  <div>
    <div class="modal-body">
      <v-card>
        <Component :is="currentComponent" v-bind="currentProps"/>
      </v-card>
    </div>
    <v-btn color="accent" text @click="closeFolders">
      Close
    </v-btn>
  </div>
</template>

<script>
import FoldersList from "./FoldersList";
import FolderView from "./FolderView";

export default {
  name: "Folders",
  components: {FoldersList},

  data() {
    return {
      currentComponent: FoldersList,
      selectedFolder: null,
      isNew: false,
    }
  },

  computed: {
    currentProps: {
      get: function () {
        if (this.currentComponent === FolderView) return {folder: this.selectedFolder, isNew: this.isNew}
        else return null;
      },

      set: function () {
        //
      }
    }
  },

  methods: {
    closeFolders() {
      this.$root.$emit("closeMask");
    }
  },

  mounted() {
    this.$root.$on("foldersList", () => {
      this.currentComponent = FoldersList;
    });

    this.$root.$on("viewFolder", (folder) => {
      this.isNew = false;
      this.selectedFolder = folder;
      this.currentComponent = FolderView;
    });

    this.$root.$on("addFolder", () => {
      this.isNew = true;
      this.selectedFolder = {name: ''};
      this.currentComponent = FolderView;
    });
  }
}
</script>

<style scoped>

.modal-body {
  margin: 20px 0;
}

</style>
