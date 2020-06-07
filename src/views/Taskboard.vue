<template>
  <div class="fade-in">
    <Snackbar :snackbar="snackbar" @snackchanged="snackbar = $event"/>
     <div class="text-center display-1 font-weight-light py-6">Taskboard</div>
    <v-row>

     
      <!-- container row -->
      <v-col class="pa-0 pa-sm-2">
        <!-- OPEN TASKS -->
        <v-card class="openTasks">
          <v-toolbar dense color="grey lighten-5" class="elevation-1">
            <v-icon color="yellow darken-1">mdi-flag-variant</v-icon>
            <v-toolbar-title class="pl-3">Open tasks</v-toolbar-title>
          </v-toolbar>

          <v-container>

            <!-- open MY tasks -->
            <div v-if="userTasks.length>0">
              <v-card-text class="overline">My tasks</v-card-text>
              <OpenTask @snackbar="showSnackbar" v-for="(task, index) in userTasks" :task="task" :mode="mode" :key="`my-${index}`"/>
            </div>
            <!-- /open MY tasks -->

            <!-- open TEAM tasks -->
            <div v-if="openTasks.length">
              <v-card-text class="overline">Team tasks</v-card-text>
            </div>
            <OpenTask @snackbar="showSnackbar" v-for="(task, index) in openTasks" :task="task" :mode="mode" :key="`open-${index}`"></OpenTask>
            <!-- /open TEAM tasks -->

            <div
              v-if="openTasks.length===0 && userTasks.length===0"
              align="center"
              class="ma-6 grey--text font-weight-light"
            >
              No open tasks
              <br />
              <v-icon big color="grey">mdi-thumb-up-outline</v-icon>
            </div>
          </v-container>
        </v-card>
        <!-- /OPEN CARD -->

        <!-- COMPLETED CARD -->
        <v-card class="my-4 completedTasks">
          <v-toolbar dense color="grey lighten-5" class="elevation-1">
            <v-icon color="green">mdi-checkbox-marked-outline</v-icon>
            <v-toolbar-title class="pl-3">Completed</v-toolbar-title>
          </v-toolbar>
          <v-container class="py-7 px-0">
            <CompletedTask
              v-for="(task, index) in completedTasks"
              :task="task"
              :key="`completed-${index}`"
            ></CompletedTask>

                  <div
              v-if="completedTasks.length===0"
              align="center"
              class="ma-5 grey--text font-weight-light"
            >
              No completed tasks
            </div>
          </v-container>
        </v-card>
        <!-- /COMPLETED CARD -->
      </v-col>

    </v-row>
    <!-- container row -->
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: "Taskboard",
  components: { 
    OpenTask: () =>import('@/components/Taskboard/OpenTask'), 
    CompletedTask: () =>import('@/components/Taskboard/CompletedTask') , 
    Snackbar: () =>import('@/components/Taskboard/Snackbar')
    },
  methods: {
showSnackbar(){
  this.snackbar=true;
}
  },
  data: () => ({
snackbar:false,
mode:"taskboard"
  }),
  computed: {
      ...mapState(['tasks']),
    openTasks: function() {
      return this.tasks.filter(
         //should check that logged in user tasks are excluded here
        task => task.status === "open" && task.delegatedTo != "Test User"
      );
    },
    completedTasks: function() {
      return this.tasks.filter(task => task.status === "closed");
    },
    //should check that task.delegatedTo === logged in user
    userTasks: function() {
      return this.tasks.filter(
        task => task.delegatedTo === "Test User" && task.status === "open"
      );
    },
  }
};
</script>

<style>
.v-expansion-panel-header {
  padding: 0;
  padding-right: 24px;
  font-weight: 500;
  min-height: 36px !important;
  height: 36px;
}

.v-btn {
  min-width: 0 !important;
}
</style>

