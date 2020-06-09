<template>
  <div>
    <v-row no-gutters class="mb-2 d-flex flex-nowrap" justify="center">
      <v-col cols="11">
        <v-card :class="{ createTask: showTask }">
          <v-container>
            <p class="body-2 grey--text font-weight-light mb-0 mt-1">{{feedforwardItem.userName}}:</p>
            <p class="mb-2 mt-0">{{feedforwardItem.commentText }}</p>
          </v-container>
        </v-card>

        <transition name="slide">
          <CreateTask
            v-if="showTask"
            @panelClosed="togglePanel"
            :feedforwardItem="feedforwardItem"
            :surveyQuestion="surveyQuestion"
          />
        </transition>
      </v-col>

      <v-col style="max-width:40px">

  
        <v-tooltip bottom color="grey lighten-3" open-delay="1000">
      <template v-slot:activator="{ on }">
          <v-btn
      v-on="on"
          aria-label="Mark Feedforward as discussed"
          @click="closeFF(surveyQuestion, feedforwardItem.userName, feedforwardItem.commentText)"
          class=" ml-1 mb-1 closeBtn"
          width="36px"
          v-ripple="{ class: 'success--text' }"
        >
          <v-icon color="green">mdi-check</v-icon>
        </v-btn>
      </template>
      <span class="grey--text text--darken-3">Mark Feedforward as discussed</span>
    </v-tooltip>
     
 <v-tooltip bottom color="grey lighten-3" open-delay="1000">
      <template v-slot:activator="{ on }">
        <v-btn
        :disabled="showTask"
        v-on="on"
          @click="showTask=!showTask"
          aria-label="Create a task from Feedforward"
          class="ml-1 taskBtn"
          width="36px"
          v-ripple="{ class: 'yellow--text' }"
        >
          <v-icon color="yellow darken-1" class="mr-1">mdi-flag-variant</v-icon>
        </v-btn>
         </template>
      <span class="grey--text text--darken-3">Create a task from Feedforward</span>
    </v-tooltip>
    
       </v-col>
    </v-row>
  </div>
</template>

<script>
import CreateTask from "@/components/CreateTask.vue";
export default {
  name: "OpenFeedforward",
  components: { CreateTask },
  props: ["feedforwardItem", "surveyQuestion"],
  data: () => ({
    showTask: false
  }),
  methods: {
    togglePanel() {
      this.showTask = false;
    },
    closeFF(question, user, text) {
      this.$store.dispatch("changeFF", [question, user, text, "closedFF"]);
      this.$store.dispatch("showSnack", [true, "ffClosed"]);
    }
  }
};
</script>

<style>

.createTask {
  border-bottom-left-radius: 0px !important;
  border-bottom-right-radius: 0px !important;
}

.slide-enter-active,
.slide-leave-active {
  transition: height 0.3s ease-in;
  overflow: hidden;
}

.slide-leave-to,
.slide-enter {
  height: 0;
}

.slide-leave,
.slide-enter-to {
  height: 460px;
}
</style>


