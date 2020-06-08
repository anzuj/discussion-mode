<template>
  <div>
    <v-dialog :fullscreen="$vuetify.breakpoint.xs" v-model="dialogVal" width="500">
      <v-card>
        <v-card-title class="headline white--text primary lighten-1" primary-title>
          <v-icon color="white" class="mr-2">mdi-account-arrow-right</v-icon>Notify management of Feedforward
        </v-card-title>

        <v-card-text class="mt-4">

<div class="mb-4">
           Highlight the following Feedforward with the management:
</div>
 
          <!-- origin -->
          <v-card width="100%" outlined>
            <v-card-text class="py-2">
              <p class="mb-1 mt-0 black--text">{{surveyQuestion}}</p>
              <p
                class="caption grey--text font-weight-light mb-0 mt-1"
              >{{feedforwardItem.userName}}:</p>
              <p class="mb-1 mt-0">{{feedforwardItem.commentText}}</p>
            </v-card-text>
          </v-card>
          <!--  origin -->

          <!-- addcomment -->
          <v-card outlined class="mt-1">
            <v-textarea
              class="body-2"
              solo
              hide-details
              flat
              rows="3"
              name="comment"
              placeholder="Describe why this Feedforward is important to be passed on"
              v-model="escalateComment"
            ></v-textarea>
          </v-card>
          <v-row class="mt-4" no-gutters>
            <v-col cols="6">
              <v-select
                dense
                prepend-icon="account_circle"
                :items="admins"
                v-model="selectedAdmin"
                label="Coose who to notify"
              ></v-select>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions class="px-6 pb-6">
          <v-btn min-width="100" dark color="grey" @click="closeDialog">CANCEL</v-btn>
          <v-spacer></v-spacer>

          <v-btn min-width="150" color="primary" @click="escalateFF">SEND</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "DiscussionEscalate",
  props: ["feedforwardItem", "dialog", "surveyQuestion"],
  components: {},
  data: () => ({
    selectedAdmin: null,
    escalateComment: null
  }),
  methods: {
    escalateFF() {
      let escalatedFF = {
        delegatedTo: this.selectedAdmin,
        escalateComment: {
          comment: this.escalateComment,
          //hardcoded for now, should be logged-in user name
          commentBy: "Test User",
          time: new Date()
        },
        originestion: this.surveyQuestion
      };
      console.log(escalatedFF);
      this.$store.dispatch("changeFF", [this.surveyQuestion, this.feedforwardItem.userName, this.feedforwardItem.commentText, "escalatedFF"]);
      this.$store.dispatch("showSnack", [true, "ffEscalated"]);
      this.closeDialog();
      this.$emit("escalated");
   
    },
    closeDialog() {
      this.$emit("dialogStatus", false);
    }
  },
  computed: {
    admins() {
      return this.$store.state.admins;
    },
    dialogVal: {
      get() {
        return this.dialog;
      },
      set() {
        this.closeDialog();
      }
    }
  }
};
</script>

<style>
.boxHeader {
  position: relative;
  top: 12px;
  left: 12px;
  z-index: 30;
  background-color: white;
  padding: 0 4px;
}

</style>