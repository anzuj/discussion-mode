<template>
  <v-container class="fade-in">
    <v-row>
      <v-col align="center">
        <div class="display-1 font-weight-light py-6">Discussion intro</div>

        <v-img contain :src="require('../assets/images/discuss.png')" height="100px"></v-img>
        <div class="my-3 font-weight-light">
          Based on the results we would recommend to discuss Feedforwards in the following order. Drag
          <v-icon small class="px-0">mdi-drag-vertical</v-icon>and drop to change order
        </div>


        <draggable
          class="list-group"
          v-model="surveyData"
          v-bind="dragOptions"
          @start="drag = true"
          @end="drag = false"
        >
          <transition-group type="transition" :name="!drag ? 'flip-list' : null">
            <v-card max-width="800" class="mb-1" v-for="element in surveyData" :key="element.theme" color="lightpink lighten-1">
              <v-row class="list-group-item" no-gutters>
                <v-col class="d-none d-md-flex py-2 tinted" cols="3">
                  <v-icon>drag_indicator</v-icon>
                  {{element.theme}}
                </v-col>

                <v-col align="start" class="py-2 pl-3 align-self-center">
                  <span>{{element.question}}</span>
                </v-col>
              </v-row>
            </v-card>
          </transition-group>
        </draggable>
        <!-- /questions -->

        <v-btn router to="/discussion" large color="primary" class="mt-5 pa-7 title">Start discussion</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// import HelloWorld from '@/components/HelloWorld.vue'
import draggable from "vuedraggable";
export default {
  name: "",
  display: "Transitions",
  props: [""],
  components: {
    draggable
  },
  data: () => ({
    drag: false
  }),
  methods: {},
  computed: {
    dragOptions() {
      return {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost"
      };
    },

    surveyData: {
      get() {
        return this.$store.state.surveyData;
      },
      set(value) {
        this.$store.commit("changeSurveyOrder", value);
      }
    }
  }
};
</script>

<style>

.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}

.list-group-item {
  cursor: move;
  font-family: 'Raleway', sans-serif;
}

.tinted {
  text-transform: uppercase;
  font-weight: 600;
  color: rgb(148, 94, 116);
  letter-spacing: 0.3px;
  border-right: 1px rgb(223, 204, 204) solid;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  /* background: rgb(215,122,156);
background: linear-gradient(90deg, rgb(190, 179, 183) 0%, rgb(151, 141, 145) 100%); */
}
</style>