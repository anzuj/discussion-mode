<template>
  <div>
    <v-stepper v-model="e1" alt-labels class="elevation-0 px-0 px-sm-2">
      <template>
        <v-stepper-header>
          <template v-for="(item, i) in surveyData">
            <v-stepper-step
              :complete="isDiscussed(i)"
              :ripple="false"
              :key="`${i}-step`"
              :step="i+1"
              editable
              edit-icon="check"
            >{{item.theme}}</v-stepper-step>

            <v-divider v-if="i !== surveyData.length -1" :key="`${i}-divider`"></v-divider>
          </template>
        </v-stepper-header>

        <v-stepper-items>
          <stepper-content
            @back="prevStep"
            @next="nextStep"
            :question="item"
            v-for="(item, j) in surveyData"
            :key="`${j}-content`"
            :step="j+1"
            :nextLabel="nextLabel()"
          />
        </v-stepper-items>
      </template>
    </v-stepper>
  </div>
</template>

<script>
import { mapState } from "vuex";
import StepperContent from '@/components/StepperContent.vue'
export default {
  components: { 
    StepperContent
    },
  name: "ProgressTracker",
  props: [],
  data() {
    return {
      e1: 1
    };
  },
  computed: {
    ...mapState(["surveyData", "tasks", "escalatedTasks"])
  },
  watch: {
    //changes current step for v-stepper component
    steps(val) {
      if (this.e1 > val) {
        this.e1 = val;
      }
    }
  },
  methods: {
    nextStep() {
      if (this.e1 < this.surveyData.length) {
        this.e1 += 1;
      } else if (this.e1 === this.surveyData.length) {
        location.href = "/#/completion";
      }
    },
    prevStep() {
      if (this.e1 > 1) {
        this.e1 -= 1;
      } else if (this.e1 === 1) {
        location.href = "/#/intro";
      }
    },
    nextLabel() {
      if (this.e1 === this.surveyData.length) {
        return "Finish";
      } else {
        return "Next";
      }
    },
    isDiscussed(index) {
      //filter through current topic feedforwards and return true if none have status "openFF"
      let arr = this.surveyData[index].comments.filter(
        comment => comment.status === "openFF"
      );
      return arr.length === 0 ? true : false;
    }
  }
};
</script>

<style>

.v-stepper{
  background: none !important;
}
 .v-stepper__step  .v-ripple__container {
  display: none !important;
}
.v-stepper--alt-labels .v-stepper__step {
  font-size: 0.8rem;
}

.v-stepper__header {
  box-shadow: none;
}

.v-stepper__step--editable:hover {
  background: none !important;
}

.v-stepper__step--active .v-stepper__step__step {
  transform: scale(1.5);
}


.v-stepper__step__step .v-icon {
  color: #9fd67d !important;
}

.closedFeedforwards .v-card {
  background: #fbfff7;
}

.closeBtn::before,
.taskBtn::before,
.reopenBtn::before,
.moveUpBtn::before {
  background-color: transparent;
}

.closeBtn i:hover,
.taskBtn i:hover,
.reopenBtn i:hover,
.moveUpBtn i:hover {
  transform: scale(1.25);
}
</style>
