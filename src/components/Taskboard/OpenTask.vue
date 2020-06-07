<template>
  <div>
    <v-row no-gutters class="taskHeader mb-1 d-flex flex-nowrap" justify="center">
      <v-col cols="11">
        <v-expansion-panels hover>
          <v-expansion-panel>
            <v-expansion-panel-header @click="isExpanded=!isExpanded">
              <p class="text-truncate ma-0">
                <v-icon color="yellow darken-1" class="px-1">mdi-flag-variant</v-icon>
                {{task.title}}
              </p>
            </v-expansion-panel-header>

            <v-expansion-panel-content>
              <v-container>
                <v-row justify="space-between" class="pt-2" no-gutters>
                  <!-- date picker -->
                  <v-col cols="12" sm="4">
                    <v-menu
                      v-model="pickermenu"
                      :close-on-content-click="true"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          dense
                          title="Choose a new due date"
                          :value="task.deadline.toLocaleDateString()"
                          label="Due by:"
                          prepend-icon="event"
                          readonly
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker no-title v-model="pickerDeadline" @input="pickermenu= false"></v-date-picker>
                    </v-menu>
                  </v-col>
                  <!-- /date picker -->

                  <!-- person picker -->
                  <v-col cols="12" sm="5">
                    <v-select
                      dense
                      prepend-icon="account_circle"
                      :items="teamMembers"
                      label="Assigned to:"
                      v-model="person"
                    ></v-select>
                  </v-col>
                  <!-- /person picker -->
                </v-row>

                <!-- task origin -->
                <span class="boxHeader">Originated from:</span>

                <v-card width="100%" outlined>
                  <v-card-text>
                    <p class="mb-1 mt-0 black--text">{{task.originatedFrom[0].question}}</p>
                    <p
                      class="caption grey--text font-weight-light mb-0 mt-1"
                    >{{task.originatedFrom[0].questionCommentFrom}}:</p>
                    <p class="commentformat mb-1 mt-0">{{task.originatedFrom[0].questionComment}}</p>
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
                        <p class="commentformat body-2 mb-1 mt-0">{{comment.comment}}</p>
                        <v-divider v-if="k + 1 < task.taskComments.length"></v-divider>
                      </div>
                    </v-container>
                  </v-card>
                </div>

                <!-- /comments -->
                <AddComment :taskId="task.id" />
              </v-container>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>

      <!-- btns -->
      <v-col style="max-width:40px"  v-if="mode ==='taskboard'">
        <v-btn
          title="Mark task as completed"
          @click="closeTask(task.id)"
          class="closeBtn mb-1 ml-1"
          width="36px"
          v-ripple="{ class: 'success--text' }"
        >
          <v-icon color="green">mdi-check</v-icon>
        </v-btn>

        <v-dialog :fullscreen="$vuetify.breakpoint.xs" v-model="dialog" width="500">
          <template v-slot:activator="{ on }">
            <v-btn
              v-show="isExpanded"
              v-on="on"
              title="Move task up to admins"
              v-ripple="{ class: 'orange--text' }"
              class="moveUpBtn ml-1"
              width="36px"
            >
              <v-icon color="orange">mdi-account-arrow-right</v-icon>
            </v-btn>
          </template>

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
              <v-btn tile dark color="grey" @click="dialog=false">CANCEL</v-btn>
              <v-spacer></v-spacer>

              <v-btn tile color="primary" @click="escalateTask(task.id)">SAVE</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
      <!-- btns-->
    </v-row>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "OpenTask",
  props: {
  mode: String,
  task: Object
},
  components: { 
    AddComment:() => import('../AddComment') },
  data: () => ({
    isExpanded: false, //expansion panel state
    dialog: false, //move up dialog
    pickermenu: false, //date picker visibility state
    selectedAdmin: null,
    escalateComment: null
  }),
  methods: {
    escalateTask(taskId) {
      let adminTask = {};
      adminTask.id = taskId;
      adminTask.title = this.task.title;
      adminTask.delegatedTo = this.selectedAdmin;
      adminTask.taskComments = this.task.taskComments;
      adminTask.escalateComment = {
           comment: this.escalateComment,
        //hardcoded for now, should be logged-in user name
        commentBy: "Test User",
        time: new Date()
      }
      //original FF +surveyQuestion info
      adminTask.originatedFrom = this.task.originatedFrom;

      //add new task in Vuex escalatedTasks array
      this.$store.dispatch("addEscalatedTask", adminTask);

      //change originating task status to admin to remove it from Taskboard display (still remains in tasks[] store)
      this.$store.dispatch("changeTask", ["admin", taskId]);

      this.$emit("snackbar", true);
      this.dialog = false;
    },
    closeTask(taskId) {
      this.$store.dispatch("changeTask", ["closed", taskId]);
    }
  },
  computed: {
    ...mapState(["admins", "tasks", "teamMembers"]),
    pickerDeadline: {
      get() {
        // for v-date-picker to work, we need to turn the deadline into a cropped ISOString
        return this.task.deadline.toISOString().substr(0, 10);
      },
      // v-date-picker returns a cropped ISOString, so we need to turn that back into a new Date object when updating the task deadline
      set(value) {
        this.$store.dispatch("changeDueDate", [new Date(value), this.task.id]);
      }
    },
    person: {
      // getting task.delegatedTo from Vuex, and sending new value to Vuex upon change
      get() {
        return this.task.delegatedTo;
      },
      set(value) {
        this.$store.dispatch("changePerson", [value, this.task.id]);
      }
    },
  }
};
</script>

<style>
.commentformat {
  white-space: pre-wrap;
  white-space: -moz-pre-wrap; /* Mozilla*/
  word-wrap: break-word;
}
.v-expansion-panel-header {
  background: #fcfaf2;
}

.v-expansion-panel-header:hover {
  background: #fffcd8;
}

.boxHeader {
  position: relative;
  top: 12px;
  left: 12px;
  z-index: 30;
  background-color: white;
  padding: 0 4px;
}

.v-label {
  font-size: 0.9rem;
}

</style>