<template>
  <div class="fill-height">
    <v-form v-model="validForm" class="fill-height">
      <v-card-text>
        <v-row>
          <v-col>
            <v-text-field
                v-model="subject"
                label="Subject"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
                v-model="receiverValue"
                hint="hit enter or space to add"
                label="To"
                @keyup.enter.space="addReceiver"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col
              class="d-flex"
              cols="12"
              sm="6">
            <v-slider
                v-model="priority"
                :tick-labels="priorityLevels"
                label="Priority"
                max="4"
                min="1"
                thumb-color="red"
                tick-size="3"
            ></v-slider>
          </v-col>
          <v-col>
            <div class="receivers-container">
              <div v-for="(receiver, index) in receivers" :key="'receiver'+index" :style="cssVars" class="receiver">
                <span v-if="selectedReceiver !== index" @click="selectedReceiver = index">{{ receiver }}</span>
                <input v-else
                       v-model="receivers[index]"
                       v-focus
                       :style="{'width': receiver.length + 'ch'}"
                       @blur="selectedReceiver = null"
                       @keyup.space="selectedReceiver = null"/>
                <span @click="removeReceiver(index)"><i class="fas fa-times-circle"></i></span>
              </div>
              <div style="clear:both"/>
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-textarea
                v-model="content"
                counter
                label="Body"
                outlined
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col class="pt-0">
            <v-file-input
                :key="temp"
                ref="attachments"
                v-model="files"
                chips
                counter
                label="Attachments"
                multiple
                @change="filesChanged"
                @click:clear="clearFiles"
            />
          </v-col>

        </v-row>
      </v-card-text>
      <v-card-actions style="  position: absolute; bottom: 0; right:0;">
        <v-container>
          <v-row>
            <v-col>
              <v-btn color="accent" @click="saveDraft">
                <v-icon left>
                  mdi-note
                </v-icon>
                Save Draft
              </v-btn>
            </v-col>
            <v-col>
              <v-btn color="accent" @click="send">
                <v-icon left>
                  mdi-send
                </v-icon>
                Send
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card-actions>
    </v-form>
  </div>
</template>

<script>
import Email from "../models/Email";
import EmailService from "../service/EmailService";

export default {
  name: "Compose",
  props: ['mail'],
  data() {
    return {
      validForm: false,
      content: '',
      subject: '',
      priorityLevels: [
        'Minor',
        'Regular',
        'Important',
        'Crucial'
      ],
      requiredRules: value => !!value || 'Required',
      files: [],
      allFiles: [],
      temp: 1, //workaround to force file-input to update
      receiverValue: '',
      receivers: [],
      selectedReceiver: null,
      priority: 2
    }
  },
  methods: {
    filesChanged() {
      this.files.forEach(this.addToAllFiles);
      this.files = this.allFiles;
      this.temp += 1; //forcing file-input to update
    },
    addToAllFiles(item) {
      if (!this.allFiles.some(function (oldFile) {
        return oldFile.name === item.name;
      })) {
        this.allFiles.push(item);
      }
    },
    clearFiles() {
      this.allFiles = [];
    },
    addReceiver() {
      if (!this.receiverValue == '')
        this.receivers.push(this.receiverValue);

      this.receiverValue = '';
    },
    removeReceiver(index) {
      this.receivers.splice(index, 1);
    },
    send() {
      if (this.receivers.length == 0) {
        alert("Please type receiver address followed by space")
        return
      }
      let formData = new FormData();
      let email = new Email();
      email.title = this.subject;
      email.content = this.content;
      email.priority = this.priority;
      let receiverStr = '';
      let user=this.$store.getters.getUser
      this.receivers.forEach(element => receiverStr += element);
      formData.append("email", JSON.stringify(email));
      formData.append("receivers", receiverStr);
      formData.append("key",user.key);
      this.files.forEach(element => formData.append("attachments", element));
      EmailService.sendMail(formData)
          .then(() => {
            alert("Mail Sent")
            this.$root.$emit("navigate", 2)
          })
          .catch(error => {
            console.log(error);
          });
    },
    saveDraft() {
      alert("Draft Saved");
      let formData = new FormData();
      let email = new Email();
      email.title = this.subject;
      email.content = this.content;
      email.priority = this.priority;
      let user=this.$store.getters.getUser
      formData.append("email", JSON.stringify(email));
      formData.append("key",user.key);
      EmailService.sendDraft(formData)
      .then(() => {
        this.$root.$emit("navigate", 2)
      })
      .catch(error => {
        console.log(error);
      });
    }
  },
  directives: {
    focus: {
      inserted: (el) => {
        el.focus()
      }
    }
  },

  computed: {
    cssVars() {
      return {
        '--accent-color': this.accentColor,
      }
    },
    accentColor: {
      get: function () {
        return this.$vuetify.theme.dark ?
            this.$vuetify.theme.themes.dark.accent : this.$vuetify.theme.themes.light.accent;
      },
      set: function () {
        //
      }
    }
  },

  created () {
      if (this.mail !== null) {
        this.content = this.mail.content;
        this.subject = this.mail.title;
        this.priority = this.mail.priority;
      }
  }
}
</script>

<style lang="scss" scoped>
.receivers-container {
  width: 100%;
  max-width: 600px;
  padding: 10px;

  input {
    width: 100%;
    padding: 0;
    margin: 0;
    border: 0;
    outline: none;
    background-color: transparent;
    font-size: 1rem;
  }

  .receiver {
    float: left;
    padding: 3px 5px;
    display: flex;
    justify-content: center;
    cursor: pointer;

    &:hover {
      background-color: var(--accent-color);
      border-radius: 5px;
    }

    span:first-child {
      margin-right: 8px;
    }

    svg {
      color: #666;

      &:hover {
        color: #333;
      }
    }
  }
}
</style>
