<template>
  <div>
    <v-row no-gutters class="taskHeader mb-1 d-flex flex-nowrap" justify="center">
      <v-col cols="11">
        <v-expansion-panels hover popout>
          <v-expansion-panel>
            <v-expansion-panel-header @click="isExpanded=!isExpanded">
              <p class="text-truncate ma-0">
                <v-icon color="yellow darken-1" class="pr-1 pl-2">mdi-flag-variant</v-icon>
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
      <v-col style="max-width:40px" v-if="mode ==='taskboard'">
        <v-tooltip bottom color="grey lighten-3" open-delay="1000">
          <template v-slot:activator="{ on }">
            <v-btn
              color="transparent"
              small
              depressed
              fab
              aria-label="Mark task as completed"
              v-on="on"
              @click="closeTask"
              class="closeBtn mb-1 ml-1"
              v-ripple="{ class: 'success--text' }"
            >
              <v-icon color="green">mdi-check</v-icon>
            </v-btn>
          </template>
          <span class="grey--text text--darken-3">Mark task as completed</span>
        </v-tooltip>

        <v-tooltip bottom color="grey lighten-3" open-delay="1000">
          <template v-slot:activator="{ on }">
            <v-btn
              color="transparent"
              small
              depressed
              fab
              @click="dialog=true"
              v-show="isExpanded"
              v-on="on"
              aria-label="Move task up to admins"
              v-ripple="{ class: 'orange--text' }"
              class="moveUpBtn ml-1"
            >
              <v-icon color="orange">mdi-account-arrow-right</v-icon>
            </v-btn>
          </template>
          <span class="grey--text text--darken-3">Move task up to admins</span>
        </v-tooltip>
        <EscalateDialog :task="task" :dialog="dialog" @dialogStatus="dialog = $event" />
      </v-col>
      <!-- btns-->
    </v-row>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "OpenTask",
  props: ["task", "mode"],
  components: {
    AddComment: () => import("../AddComment"),
    EscalateDialog: () => import("../Taskboard/EscalateDialog")
  },
  data: () => ({
    isExpanded: false, //expansion panel state
    dialog: false, //move up dialog
    pickermenu: false //date picker visibility state
  }),
  methods: {
    closeTask() {
      this.$store.dispatch("changeTask", ["closed", this.task.id]);
      this.$store.dispatch("showSnack", [true, "taskClosed"]);
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
    }
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
  background: rgba(250, 249, 226, 0.5);
  transition: background 0.2s ease-in;
}

.v-expansion-panel-header:hover {
  background: #fffcd8a8;
  transition: background 0.2s ease-in;
}

.v-expansion-panel-content {
  background: rgb(250, 249, 226);
  background: linear-gradient(
    180deg,
    rgba(250, 249, 226, 0.1) 0%,
    rgba(255, 255, 255, 1) 100%
  );
  border-bottom-left-radius: 18px;
  border-bottom-right-radius: 18px;
}
.v-expansion-panel,
.v-expansion-panel-header,
.v-expansion-panel--active {
  border-radius: 18px !important;
}

.v-expansion-panel-header--active,
.v-expansion-panel-header--active:hover {
  border-bottom-left-radius: 0px !important;
  border-bottom-right-radius: 0px !important;
  transition: border-radius 0.2s ease-in-out;
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