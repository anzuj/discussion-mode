<template >
  <v-card class="mt-0">
    <v-divider></v-divider>
    <v-card-title class="title">
      <v-icon color="yellow darken-1" class="mr-1">mdi-flag-variant</v-icon>Create task
    </v-card-title>

    <v-container class="pt-0">
      <!-- <v-form v-model="isFormValid"> -->
      <v-text-field v-model="newTask.chosenTitle" label="Task title" :rules="[rules.required]"></v-text-field>

      <v-row justify="space-between" no-gutters>
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
                title="Choose a due date"
                :value="pickerdate | formatDate"
                label="Due by:"
                prepend-icon="event"
                :rules="[rules.required]"
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
            :rules="[rules.required]"
            dense
            prepend-icon="account_circle"
            :items="teamMembers"
            label="Assign task to:"
            v-model="newTask.chosenDelegatedTo"
          ></v-select>
        </v-col>
        <!-- /person picker -->
      </v-row>

      <!-- addComments -->
      <v-card id="commentbox" outlined>
        <v-textarea
          v-model="newTask.chosenCommentText"
          class="body-2"
          solo
          :rules="[rules.required, rules.counter]"
          no-resize
          flat
          rows="2"
          name="comment"
          label="Add comment"
        ></v-textarea>
      </v-card>
      <!-- /addComment -->
      <!-- </v-form> -->
      <v-container>
        <v-row class="mt-3">
          <v-btn tile dark @click="closePanel" class="grey">Cancel</v-btn>
          <v-spacer></v-spacer>
          <!-- <div v-show="!isFormValid" class="grey--text">Please fill out all fields</div> -->
          <v-spacer></v-spacer>

          <!-- :disabled="!isFormValid" -->
          <v-btn tile @click="saveTask" class="yellow darken-1 white--text">Save</v-btn>
        </v-row>
      </v-container>
    </v-container>
  </v-card>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: ["feedforwardItem", "surveyQuestion"],
  components: {},
  data: () => ({
    pickerdate: new Date().toISOString().substr(0, 10),
    pickermenu: false,
    // isFormValid: false, (form validation disabled during development)
    newTask: {
      chosenTitle: "",
      chosenDelegatedTo: "",
      chosenCommentText: ""
    },
    // basic validation for task fields (disabled during development)
    rules: {
      required: value => !!value || "Required",
      counter: value => value.length <= 4000 || "Max 4000 characters"
    }
  }),
  computed: {
    ...mapState(["teamMembers", "tasks"])
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
      task.taskComments.push({
        comment: this.newTask.chosenCommentText,
        //hardcoded for now, should be logged-in userName
        commentBy: "Test User",
        time: new Date()
      });
      task.deadline = new Date(this.pickerdate);
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
      this.resetFields();
    },
    resetFields() {
      this.newTask.chosenCommentText = "";
      this.newTask.chosenTitle = "";
      this.newTask.chosenDelegatedTo = "";
    }
  },
  filters: {
    //turn cropped ISO str 2020-05-23 from date picker -> to LocaleDateStr, to display task deadline DD/MM before YYYY
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