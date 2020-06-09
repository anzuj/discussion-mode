<template >
  <v-card class="mt-0">
    <v-divider></v-divider>
    <v-card-title class="title">
      <v-icon color="yellow darken-1" class="mr-1">mdi-flag-variant</v-icon>Create task

      <v-spacer></v-spacer>
      <span class="caption"> <a @click="dialog=true">Unable to solve within team?</a></span>
    </v-card-title>

     <DiscussionEscalate :feedforwardItem="feedforwardItem"
            :surveyQuestion="surveyQuestion" :dialog="dialog" @dialogStatus="dialog = $event" @escalated="closePanel"/>

    <v-container class="pt-0">
      <v-form v-model="isFormValid">
        <v-text-field v-model="newTask.chosenTitle" label="Task title" :rules="[rules.required]"></v-text-field>

        <!-- addComments -->
        <v-card id="commentbox" outlined>
          <v-textarea
            v-model="newTask.chosenCommentText"
            class="body-2"
            solo
            no-resize
            flat
            rows="2"
            name="comment"
            label="Add comment"
          ></v-textarea>
        </v-card>
        <!-- /addComment -->

        <v-row justify="space-between" no-gutters class="mt-3">
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
                clearable
                @click:clear="isDateChosen = false"
                  dense
                  title="Choose a due date"
                  :value="displayDate"
                  label="Due by:"
                  placeholder="Choose due date"
                  prepend-icon="event"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker no-title v-model="pickerdate" @input="pickermenu= false"></v-date-picker>
            </v-menu>
          </v-col>
          <!-- /date picker -->

          <!-- person picker -->
          <v-col cols="12" sm="5">
            <v-select
              dense
              prepend-icon="account_circle"
              :items="teamMembers"
              label="Assign task to:"
              v-model="newTask.chosenDelegatedTo"
            ></v-select>
          </v-col>
          <!-- /person picker -->
        </v-row>
      </v-form>
      <v-container>
        <v-row class="mt-3">
          <v-btn dark @click="closePanel" class="grey lighten-1">Cancel</v-btn>
          <!-- <v-spacer></v-spacer>
          <div v-show="!isFormValid" class="grey--text font-weight-light">Please fill out all fields</div>-->
          <v-spacer></v-spacer> 

          <v-btn @click="saveTask" :disabled="!isFormValid" class="yellow darken-1 white--text">Save</v-btn>
        </v-row>
      </v-container>
    </v-container>
  </v-card>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: ["feedforwardItem", "surveyQuestion"],
  components: {
     DiscussionEscalate: () => import("@/components/Taskboard/DiscussionEscalate"),
  },
  data: () => ({
    pickerdate: new Date().toISOString().substr(0, 10),
    dialog: false,
    pickermenu: false,
    isFormValid: false,
    isDateChosen: false,
    newTask: {
      chosenTitle: "",
      chosenDelegatedTo: "",
      chosenCommentText: ""
    },
    // basic validation for task fields (disabled during development)
    rules: {
      required: value => !!value || "Required"
    }
  }),
  computed: {
    ...mapState(["teamMembers", "tasks"]),
    displayDate() {
      return this.isDateChosen ? this.formatDate(this.pickerdate) : "";
    }
  },
  watch: {
    pickerdate() {
      this.isDateChosen = true;
    }
  },

  methods: {
    closePanel() {
      this.$emit("panelClosed", false);
    },
    saveTask() {
      //create new object by gathering data from relevant FF and user-entered details
      let task = {};
      task.id = this.tasks.length;
      task.title = this.newTask.chosenTitle;
      task.delegatedTo = this.newTask.chosenDelegatedTo;
      task.taskComments = [];

      if(this.newTask.chosenCommentText){
   task.taskComments.push({
        comment: this.newTask.chosenCommentText,
        //hardcoded for now, should be logged-in userName
        commentBy: "Test User",
        time: new Date()
      });
      }

     this.isDateChosen ? task.deadline = new Date(this.pickerdate):task.deadline = ""
      
   
    
      task.status = "open";
      //original FF +surveyQuestion info
      task.originatedFrom = [];
      task.originatedFrom.push({
        question: this.surveyQuestion,
        questionComment: this.feedforwardItem.commentText,
        questionCommentFrom: this.feedforwardItem.userName
      });
      //close panel in parent OpenFeedForward.vue
      this.$emit("panelClosed", false);
      //add new task in Vuex tasks array
      this.$store.dispatch("addTask", task);
      //change originating FF status to taskedFF to remove it from the FF list
      this.$store.dispatch("changeFF", [
        this.surveyQuestion,
        this.feedforwardItem.userName,
        this.feedforwardItem.commentText,
        "taskedFF"
      ]);
       this.$store.dispatch("showSnack", [true, "taskCreated"]);
      this.resetFields();
    },
    resetFields() {
      this.newTask.chosenCommentText = "";
      this.newTask.chosenTitle = "";
      this.newTask.chosenDelegatedTo = "";
    },
    //change date format for the GUI
    formatDate(value) {
      return new Date(value).toLocaleDateString();
    }
  }
};
</script>

<style scoped>
.v-card {
  border-top-left-radius: 0px !important;
  border-top-right-radius: 0px !important;
}

#commentbox.v-card {
  border-radius: 4px !important;
}
</style>

questions: 