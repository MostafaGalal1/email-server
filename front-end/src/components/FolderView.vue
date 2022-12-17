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
                :rules="[requiredRules]"
                clearable
                label="Name"
            />
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
import FolderService from "../service/FolderService";

export default {
  name: "FolderView",
  props: ['folder', 'isNew'],

  data() {
    return {
      name: this.folder.name,
      id: this.folder.id,
      validForm: false,
      requiredRules: value => !!value || 'Required',

    }
  },

  methods: {
    back() {
      this.$root.$emit("foldersList");
    },

    save() {
      this.$refs.form.validate();
      if (this.validForm) {
        let user=this.$store.getters.getUser
        let map= []

        if (this.isNew) {
          map = {name: this.name,key:user.key}
          FolderService.addFolder(map)
          this.$store.commit("addFolder", this.name);
        } else {
          map = {name: this.name, id: this.id+4,key:user.key}
          FolderService.editFolder(map)
          this.$store.commit("editFolder", {id: this.id + 4, name: this.name});
        }
        this.$root.$emit("refreshFolders")
        this.back();
      }
    },

    del() {
      let user=this.$store.getters.getUser
      this.$root.$emit("navigate",1)
      FolderService.deleteFolder(this.id+4,user.key)
      this.$store.commit("delFolder", this.id + 4);
      this.$root.$emit("refreshFolders");
      this.back();
    }
  }
}
</script>

<style scoped>

</style>
