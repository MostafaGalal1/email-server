<template>
  <div>
    <MyMask v-if="showMask" v-bind="maskComponent"/>
    <v-row>
      <v-container fluid class="myContainer">
        <HomeHeader/>
      </v-container>
    </v-row>
    <v-row>
      <v-container fluid class="mainContainer">
        <v-card outlined>
          <v-row>
            <v-col cols="3" class="navBar">
              <v-card height="560"
                      width="350"
                      style="margin-left: 3%">
                <v-navigation-drawer permanent width="350">
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title class="title">
                        {{ user.name }}
                      </v-list-item-title>
                      <v-list-item-subtitle>
                        {{ user.email }}
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>

                  <v-divider></v-divider>

                  <v-list
                      dense
                      nav
                  >
                    <v-list-item
                        v-for="item in items"
                        :key="item.key"
                        link
                        @click="navigate(item.key)"
                    >
                      <v-list-item-icon>
                        <v-icon>{{ item.icon }}</v-icon>
                      </v-list-item-icon>

                      <v-list-item-content>
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                  <template v-slot:append>
                    <div class="py-2 px-4">
                      <v-row>
                        <v-col>
                          <v-btn block color="accent" @click="openFolders">
                            <v-icon left>
                              mdi-folder
                            </v-icon>
                            Folders
                          </v-btn>
                        </v-col>
                        <v-col>
                          <v-btn block color="accent" @click="openContacts">
                            <v-icon left>
                              mdi-account-multiple
                            </v-icon>
                            Contacts
                          </v-btn>
                        </v-col>
                      </v-row>
                    </div>
                  </template>
                </v-navigation-drawer>
              </v-card>
            </v-col>
            <v-col cols="9">
              <v-container class="compCont">
                <v-card height="560">
                    <component :is="currentComponent" v-bind="currentProps"/>
                </v-card>
              </v-container>
            </v-col>
          </v-row>
        </v-card>
        <v-row>
          <v-col cols="3" style="padding: 0">
          </v-col>
          <v-col cols="9" style="padding: 0">
                    <pre class="bottomP">
        Quadcore.inc  All rights reserved
      </pre>
          </v-col>
        </v-row>
      </v-container>
    </v-row>
  </div>
</template>

<script>
import HomeHeader from "./HomeHeader";
import MailList from "./MailList";
import Compose from "./Compose";
import MailView from "./MailView";
import MyMask from "./MyMask";
import Contacts from "./Contacts";
import Folders from "./Folders";
import EmailService from "../service/EmailService";

export default {
  name: "Home",
  components: {MyMask, Folders, Contacts, HomeHeader, MailList},

  data() {
    return {
      currentComponent: MailList,
      items: [
        {title: 'Compose', icon: 'mdi-pencil', key: 0},
        {title: 'Inbox', icon: 'mdi-inbox', key: 1},
        {title: 'Sent', icon: 'mdi-telegram', key: 2},
        {title: 'Draft', icon: 'mdi-note', key: 3},
        {title: 'Trash', icon: 'mdi-delete', key: 4},
        {title: 'Archive', icon: 'mdi-archive', key: 5},
      ],
      mail: null,
      user: this.$store.getters.getUser,
      showMask: false,
      maskComponentName: 'contacts',
      openedMail: null,
    }
  },

  computed: {
    currentProps: {
      get: function () {
        if (this.currentComponent === MailView) return {mail: this.openedMail}
        else if (this.currentComponent === Compose)  {
            return {mail: this.openedMail}
        }
        else return null;
      },

      set: function () {
        //
      }
    },
    maskComponent: {
      get: function () {
        if (this.showMask === true) {
          if (this.maskComponentName === 'contacts')
            return {component: Contacts};
          else if (this.maskComponentName === 'folders')
            return {component: Folders};
          else return null;
        } else return null;
      },

      set: function () {
        //
      }
    },

  },

  methods: {
    navigate(key) {
      if (key === 0) {
        this.openedMail = null;
        this.currentComponent = Compose;
      } else {
        this.currentComponent = MailList;
        this.$store.commit("resetFolder");
        this.$store.commit("setFolder", key);
      }

    },

    openContacts() {
      this.maskComponentName = 'contacts';
      this.showMask = true;
    },

    openFolders() {
      this.maskComponentName = 'folders';
      this.showMask = true;
    }

  },

  mounted() {
    this.$root.$on("closeMask", () => {
      this.showMask = false;
      this.maskComponentName = null;
    });

    this.$root.$on("openMail", (mailID) => {
      let user = this.$store.getters.getUser
      EmailService.getMail(mailID, user.key).then(Response => {
        this.openedMail = Response.data;
        this.currentComponent = MailView;
      });
    });

    this.$root.$on("openDraft", (mailID) => {
      let user=this.$store.getters.getUser
      EmailService.getMail(mailID, user.key).then(Response => {
        this.openedMail = Response.data;
        this.currentComponent = Compose;
        this.$root.$emit("setDraft", this.openedMail);
      }).catch(error => {
        console.log(error);
      });
    });

    this.$root.$on("navigate", (key) => {
      this.navigate(key);
    });

    this.$root.$on("refreshFolders", () => {
      this.items = this.items.slice(0, 6)
      let folders = this.$store.getters.getUser.folderNames.slice(5)
      folders.forEach((item, index) => {
        this.items.push({title: item, icon: 'mdi-folder', key: index + 6})
      })
    })
  },

  created() {
    if (this.user === null) {
      this.$root.$emit("logOut");
      this.$destroy();
    } else {
      let folders = this.$store.getters.getUser.folderNames.slice(5)
      folders.forEach((item, index) => {
        this.items.push({title: item, icon: 'mdi-folder', key: index + 6})
      })
    }
  },

}
</script>

<style scoped>

.myContainer {
  padding-right: 4%;
  padding-left: 4%;
}

.navBar {
  text-align: left;
}

.mainContainer {
  padding-right: 4%;
  padding-left: 4%;
}

.compCont {
  padding-top: 0;
  padding-bottom: 0;
  padding-left: 0;
}

.bottomP {
  font-size: small;
  color: gray;
  padding: 2px 0 0;
  margin: 0;
}
</style>
