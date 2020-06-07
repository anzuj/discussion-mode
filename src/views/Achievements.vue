<template>
  <v-container class="fade-in">
    <div align="center" class="display-1 font-weight-light py-6">Achievements</div>

    <v-container class="trophycontainer pa-0">
      <v-row justify="center">
        <v-col cols="12" md="7">
          <v-row justify="center" no-gutters>
            <v-col cols="1" align="right">
              <v-icon class="smallstar" color="yellow">mdi-star</v-icon>
            </v-col>

            <v-col cols="1" class="mt-8" align="right">
              <v-icon class="star" color="yellow">mdi-star</v-icon>
            </v-col>

            <v-col cols="5" sm="3" align="center">
              <v-img contain :src="require('../assets/images/trophy.png')" style="max-height:150px"></v-img>
            </v-col>

            <v-col cols="1" class="mt-8" align="left">
              <v-icon class="star" color="yellow">mdi-star</v-icon>
            </v-col>

            <v-col cols="1" align="left">
              <v-icon class="smallstar" color="yellow">mdi-star</v-icon>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>

    <div align="center" class="font-weight-light">Here's what's been accomplished already:</div>

    <!-- last survey done tasks -->
    <v-row justify="center">
      <v-col cols="12" md="7">
        <CompletedTask v-for="(task, index) in achievements" :task="task" :key="index" />
      </v-col>
    </v-row>

    <!-- /last survey done tasks -->

    <v-row justify="center">
      <v-btn router to="/intro" x-large color="primary" class="mt-5">
        Next
        <v-icon right>mdi-arrow-right-bold</v-icon>
      </v-btn>
    </v-row>
  </v-container>
</template>

<script>
import CompletedTask from "@/components/Taskboard/CompletedTask.vue";
export default {
  name: "",
  props: [""],
  components: {
    CompletedTask
  },
  data: () => ({}),
  methods: {},
  computed: {
    achievements() {
      return this.$store.state.achievementTasks;
    }
  }
};
</script>

<style>
@media only screen and (max-width: 600px) {
  .star {
    font-size: 40px !important;
  }
}

.star {
  font-size: 50px !important;
}

.smallstar {
  font-size: 30px !important;
}
</style>