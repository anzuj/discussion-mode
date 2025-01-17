<template>
  <v-stepper-content class="px-0 px-sm-2 px-md-5 px-lg-12" :step="step">
    <!-- <v-img class="questionpic" contain :src="require('../assets/images/discuss.png')" height="75px"></v-img> -->

    <!-- BACK btn + question + NEXT btn -->
    <v-container class="d-flex justify-space-between px-0 px-sm-2 px-md-5 px-lg-12">
      <v-btn
        outlined
        color="secondary"
        depressed
        @click="$emit('back', 'true')"
        class="align-self-end ml-1 ml-sm-0"
      >Back</v-btn>

      <!-- <div class="questionicon"><v-icon color="lightpink darken-1">mdi-comment-question-outline</v-icon></div> -->
      <div align="center" class="px-2" :class="{'questionbig': $vuetify.breakpoint.smAndUp, 'question':$vuetify.breakpoint.xs }">{{ question.question }}</div>

      <v-btn
        depressed
        @click="$emit('next', 'true')"
        color="primary"
        class="align-self-end mr-1 mr-sm-0"
      >{{nextLabel}}</v-btn>
    </v-container>
    <!-- /BACK btn + question + NEXT btn -->

    <v-container class="px-0 px-sm-2 px-md-5 px-lg-12">
      <!-- OPEN -->
      <v-card>
        <v-toolbar dense color="grey lighten-5" class="elevation-1">
          <v-icon color="grey">mdi-comment-quote-outline</v-icon>
          <v-toolbar-title class="pl-3">Feedforwards</v-toolbar-title>
        </v-toolbar>
        <v-container class="pt-5">
          <OpenFeedforward
            v-for="(feedforwardItem, i) in openFeedforwards(`${question.theme}`)"
            :key="`openFF-${i}`"
            :feedforwardItem="feedforwardItem"
            :surveyQuestion="question.question"
          />

          <div
            v-if="openFeedforwards(`${question.theme}`).length===0"
            align="center"
            class="ma-6 grey--text font-weight-light"
          >
            All Feedforwards discussed, click "Next" to proceed
            <br />
            <v-icon class="bounceIn display-3" color="grey lighten-1">mdi-thumb-up-outline</v-icon>
          </div>
        </v-container>
      </v-card>
      <!-- /OPEN -->

      <!-- CLOSED -->
      <v-card class="mt-5 closedFeedforwards">
        <v-toolbar dense color="grey lighten-5" class="elevation-1">
          <v-icon color="green">mdi-comment-check-outline</v-icon>
          <v-toolbar-title class="pl-3">Discussed</v-toolbar-title>
        </v-toolbar>
        <v-container class="pt-5">
          <v-row
            v-for="(feedforwardItem, i) in closedFeedforwards(`${question.theme}`)"
            :key="`closedFF-${i}`"
            no-gutters
            class="taskHeader mb-1 d-flex flex-nowrap"
            justify="center"
          >
            <v-col cols="11">
              <v-card class="ff">
                <v-container class="font-italic">
                  <p
                    class="body-2 grey--text font-weight-light mb-0 mt-1"
                  >{{feedforwardItem.userName}}:</p>
                  <p
                    class="mb-1 body-2 mt-0 grey--text text--darken-2"
                  >{{feedforwardItem.commentText }}</p>
                </v-container>
              </v-card>
            </v-col>

            <v-col style="max-width:40px">
              <v-tooltip color="grey" bottom open-delay="1000">
                <template v-slot:activator="{ on }">
                  <v-btn
                    color="transparent"
                    small
                    depressed
                    fab
                    v-on="on"
                    @click="reopenFF(question.question, feedforwardItem.userName, feedforwardItem.commentText)"
                    class="ml-1 reopenBtn"
                    :ripple="false"
                  >
                    <v-icon color="grey lighten-1">mdi-upload</v-icon>
                  </v-btn>
                </template>
                <span>Reopen Feedforward</span>
              </v-tooltip>
            </v-col>
          </v-row>

          <div
            v-if="closedFeedforwards(`${question.theme}`).length===0"
            class="ma-3 grey--text font-weight-light"
          >
            No Feedforwards
            <v-icon class="pb-1" color="green">mdi-check</v-icon>discussed yet
          </div>
        </v-container>
      </v-card>
      <!-- /CLOSED-->

      <!-- TASKS -->
      <v-card class="mt-5">
        <v-toolbar dense color="grey lighten-5" class="elevation-1">
          <v-icon color="yellow darken-1">mdi-flag-variant</v-icon>
          <v-toolbar-title class="pl-3">Tasks</v-toolbar-title>
        </v-toolbar>
        <v-container class="pt-5">
          <OpenTask
            v-for="(task, index) in openTasks(`${question.question}`)"
            :task="task"
            :mode="mode"
            :key="`task-${index}`"
          />

          <div
            v-if="openTasks(`${question.question}`).length===0"
            class="ma-3 grey--text font-weight-light"
          >
            No tasks
            <v-icon color="yellow darken-1">mdi-flag-variant</v-icon>created yet
          </div>
        </v-container>
      </v-card>
      <!-- /TASKS -->
    </v-container>
  </v-stepper-content>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  components: {
    OpenFeedforward: () => import("@/components/OpenFeedforward.vue"),
    OpenTask: () => import("@/components/Taskboard/OpenTask.vue")
  },
  name: "StepperContent",
  props: ["question", "step", "nextLabel"],
  data: () => ({
    mode: "discussion"
  }),
  computed: {
    ...mapGetters(["getOpenFF", "getClosedFF", "getOpenTasks"])
  },
  methods: {
    openFeedforwards(currentTheme) {
      return this.getOpenFF(currentTheme);
    },
    closedFeedforwards(currentTheme) {
      return this.getClosedFF(currentTheme);
    },
    openTasks(currentTheme) {
      return this.getOpenTasks(currentTheme);
    },
    reopenFF(question, user, text) {
      this.$store.dispatch("changeFF", [question, user, text, "openFF"]);
      this.$store.dispatch("showSnack", [true, "ffOpened"]);
    }
  }
};
</script>

<style>
.ff {
  border-radius: 18px !important;
  transition: border-radius 0.15s ease-in;
}

.v-tooltip {
  color: black !important;
}

.questionbig {
  font-size: 28px;
}
.question {
  font-size: 18px;
}

@keyframes bounceIn {
  from,
  20%,
  40%,
  60%,
  80%,
  to {
    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  0% {
    opacity: 0;
    -webkit-transform: scale3d(0.3, 0.3, 0.3);
    transform: scale3d(0.3, 0.3, 0.3);
  }

  20% {
    -webkit-transform: scale3d(1.1, 1.1, 1.1);
    transform: scale3d(1.1, 1.1, 1.1);
  }

  40% {
    -webkit-transform: scale3d(0.9, 0.9, 0.9);
    transform: scale3d(0.9, 0.9, 0.9);
  }

  60% {
    opacity: 1;
    -webkit-transform: scale3d(1.03, 1.03, 1.03);
    transform: scale3d(1.03, 1.03, 1.03);
  }

  80% {
    -webkit-transform: scale3d(0.97, 0.97, 0.97);
    transform: scale3d(0.97, 0.97, 0.97);
  }

  to {
    opacity: 1;
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }
}

.bounceIn {
  -webkit-animation-duration: 0.75s;
  animation-duration: 0.75s;
  -webkit-animation-name: bounceIn;
  animation-name: bounceIn;
}
</style>