<template>
  <div>
    <v-dialog :fullscreen="$vuetify.breakpoint.xs" v-model="dialogVal" width="500">
      <v-card>
        <v-card-title class="headline white--text orange darken-1" primary-title>
          <v-icon color="white" class="mr-2">mdi-account-arrow-right</v-icon>Move task up
        </v-card-title>

        <v-card-text>
          <!-- task origin -->
          <span class="boxHeader">Originated from:</span>

          <v-card width="100%" outlined>
            <v-card-text>
              <p class="mb-1 mt-0 black--text">{{task.originatedFrom[0].question}}</p>
              <p
                class="caption grey--text font-weight-light mb-0 mt-1"
              >{{task.originatedFrom[0].questionCommentFrom}}:</p>
              <p class="mb-1 mt-0">{{task.originatedFrom[0].questionComment}}</p>
            </v-card-text>
          </v-card>
          <!-- /task origin -->
          <!-- comments -->
          <div v-show="task.taskComments.length>0">
            <span class="boxHeader">Comments:</span>

            <v-card width="100%" outlined>
              <v-container>
                <div v-for="(comment, k) in task.taskComments" :key="k">
                  <div
                    class="caption grey--text font-weight-light mt-1"
                  >{{comment.commentBy}} [{{comment.time.toLocaleString()}}]:</div>
                  <p class="body-2 mb-1 mt-0">{{comment.comment}}</p>
                  <v-divider v-if="k + 1 < task.taskComments.length"></v-divider>
                </div>
              </v-container>
            </v-card>
          </div>
          <!-- /comments -->
          <!-- addcomment -->
          <v-card outlined class="mt-1">
            <v-textarea
              class="body-2"
              solo
              hide-details
              flat
              rows="3"
              name="comment"
              label="Add comment"
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
                label="Move task up to:"
              ></v-select>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions class="px-6 pb-6">
          <v-btn dark color="grey" @click="closeDialog">CANCEL</v-btn>
          <v-spacer></v-spacer>

          <v-btn color="primary" @click="escalateTask">SAVE</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
// import HelloWorld from '@/components/HelloWorld.vue'
export default {
  name: "",
  props: ["task", "dialog"],
  components: {},
  data: () => ({
    selectedAdmin: null,
    escalateComment: null
  }),
  methods: {
    escalateTask() {
      let adminTask = {};
      adminTask.id = this.task.id;
      adminTask.title = this.task.title;
      adminTask.delegatedTo = this.selectedAdmin;
      adminTask.taskComments = this.task.taskComments;
      adminTask.escalateComment = {
        comment: this.escalateComment,
        //hardcoded for now, should be logged-in user name
        commentBy: "Test User",
        time: new Date()
      };
      //original FF +surveyQuestion info
      adminTask.originatedFrom = this.task.originatedFrom;

      //add new task in Vuex escalatedTasks array
      this.$store.dispatch("addEscalatedTask", adminTask);

      //change originating task status to admin to remove it from Taskboard display (still remains in tasks[] store)
      this.$store.dispatch("changeTask", ["admin", this.task.id]);

      this.$emit("snackbar", true);
      this.closeDialog();
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
</style>