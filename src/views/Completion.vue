<template>
  <v-container class="fade-in">
    <div class="text-center display-1 font-weight-light py-6">Well done!</div>
    
    <!-- not sure if nr of survey questions gives value -->
    <!-- <div class="statCircle" style="background-color: #FF9E9E">
         {{surveyData.length}}
    <div class="font-weight-light pa-2">QUESTIONS DISCUSSED</div> </div>-->

    <v-row justify="center">
      <v-col cols="12" sm="10" md="5">
        <v-row justify="center">

             <!-- item -->
   <v-col align="center">
        <div class="align-center">
          <div class="statCircle" style="background-color: #B4DDD8">{{tasks.length}}</div>
          <div class="font-weight-light pa-2">TASKS CREATED</div>
        </div>
      </v-col>
          <!-- /item -->

        <!-- item -->
          <v-col align="center">
        <div class="align-center">
          <div class="statCircle" style="background-color: #B4CEDD">{{closedFF}}</div>
          <div class="font-weight-light pa-2">FEEDFORWARDS DISCUSSED</div>
        </div>
      </v-col>
   <!-- /item -->

        </v-row>
      </v-col>
    </v-row>
   
    <!-- sun-->
    <div align="center" class="bounceIn">
      <v-img contain :src="require('../assets/images/sun.png')" style="max-width:200px"></v-img>
    </div>
    <!-- /sun -->

    <v-row justify="center">
      <v-btn router to="/taskboard" large color="primary" class="mt-5">Go to taskboard</v-btn>
    </v-row>

  </v-container>
</template>


<script>
import { mapState } from 'vuex'
export default {
  components: {},
  data: () => ({}),
  computed: {
    ...mapState(['surveyData', 'tasks']),
    closedFF(){
      let arr= [];
      for (const question of this.surveyData){
        for (const comment of question.comments){
          if (comment.status ==="closedFF"){
            arr.push(comment)
          }
        }
      } return arr.length;
    }
  }
};
</script>

<style>
.statCircle {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80px;
  width: 80px;
  border-radius: 50%;
  font-size: 1.5rem;
  font-weight: 800;
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