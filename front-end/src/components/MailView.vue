<template>
  <div class="fill-height">
    <v-card-title>
      {{ mail.title|showSubject }}
    </v-card-title>
    <v-card-subtitle style="text-align: left">
      From: {{ mail.senderName }} &lt; {{ mail.senderAddress }} &gt; <br/>
      Priority: {{ mail.priority|showPriority }}
    </v-card-subtitle>
    <v-spacer/>
    <v-divider/>
    <v-spacer/>
    <v-card-text class="px-2" style="text-align: left; height: 70%">
      <v-card class="pl-0 fill-height" outlined>
        <v-container>
          <pre>{{ mail.content }}</pre>
        </v-container>
      </v-card>
      <v-container class="pl-0" style="position: absolute; bottom: 0;">
        <div class="attachments-container">
          <div v-for="(attachment, index) in attachments" :key=index :style="cssVars" class="attachment">
            <span @click="openFolder(index)">{{ attachment.fileName }}</span>
          </div>
          <div style="clear:both"/>
        </div>
      </v-container>
    </v-card-text>
  </div>
</template>

<script>
import FileService from "../service/FileService";

export default {
  name: "MailView",

  props: ['mail'],

  data() {
    return {
      attachments: [],
    }
  },

  methods: {

    openFolder(index) {
      let file = this.attachments[index];
      FileService.saveByteArray(file.fileName, file.content);
    }

  },

  filters: {
    showPriority(p) {
      switch (p) {
        case 1:
          return "Minor"
        case 2:
          return "Regular"
        case 3:
          return "Important"
        case 4:
          return "Crucial"
      }
    },

    showSubject(subject) {
      if (subject !== '') return subject
      else return 'No Subject'
    },
  },

  computed: {
    cssVars() {
      return {
        '--primary-color': this.primaryColor,
      }
    },
    primaryColor: {
      get: function () {
        return this.$vuetify.theme.dark ?
            this.$vuetify.theme.themes.dark.primary : this.$vuetify.theme.themes.light.primary;
      },
      set: function () {
        //
      }
    }
  },

  created() {
    this.mail.attachments.forEach((currentValue) => {
      this.attachments.push({
        fileName: currentValue.fileName,
        content: currentValue.content,
      })
    })
  }
}
</script>

<style lang="scss" scoped>
.attachments-container {
  width: 100%;
  padding: 10px 10px 10px 0;

  .attachment {
    float: left;
    padding: 3px 5px;
    display: flex;
    justify-content: center;
    cursor: pointer;
    background-color: var(--primary-color);
    border-radius: 5px;
    margin-right: 10px;
    max-width: 20%;
  }
}
</style>
