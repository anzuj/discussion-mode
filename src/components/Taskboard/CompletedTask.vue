<template>
  <v-row no-gutters class="mb-1" justify="center">
    <v-col class="px-4">
      <v-expansion-panels hover popout>
        <v-expansion-panel>
          <v-expansion-panel-header>
            <v-row align="center">
              <v-col style="max-width:40px">
                <v-icon color="green" class="pr-1 pl-2">mdi-check</v-icon>
              </v-col>
              <v-col>{{task.title}}</v-col>
            </v-row>
          </v-expansion-panel-header>

          <v-expansion-panel-content>
            <v-container>
              <v-card-text class="pa-0">
                <v-row>
                  Due date: {{task.deadline.toLocaleDateString()}}
                  <v-spacer></v-spacer>
                  Delegated to: {{task.delegatedTo}}
                </v-row>
              </v-card-text>

              <!-- task origin -->
              <span class="boxHeader">Originated from:</span>

              <v-card width="100%" outlined>
                <v-card-text>
                  <p class="mb-1 mt-0 black--text">{{task.originatedFrom[0].question}}</p>
                  <p
                    class="caption grey--text font-weight-light mb-0 mt-1"
                  >{{task.originatedFrom[0].questionCommentFrom}}:</p>
                  <p class="mb-1 mt-0">{{task.originatedFrom[0].questionComment}}</p>
                </v-card-text>
              </v-card>
              <!-- /task origin -->

              <!-- comments -->
              <div v-show="task.taskComments.length>0">
                <span class="boxHeader">Comments:</span>

                <v-card width="100%" outlined>
                  <v-container>
                    <div v-for="(comment, index) in task.taskComments" :key="index">
                      <p
                        class="caption grey--text font-weight-light mb-0 mt-1"
                      >{{comment.commentBy}} [{{comment.time.toLocaleString()}}]:</p>
                      <p class="body-2 mb-1 mt-0">{{comment.comment}}</p>
                      <v-divider v-if="index + 1 < task.taskComments.length"></v-divider>
                    </div>
                  </v-container>
                </v-card>
              </div>
              <!-- /comments -->
            </v-container>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "CompletedTask",
  props: ["task"]
};
</script>

<style scoped>
.boxHeader {
  position: relative;
  top: 12px;
  left: 12px;
  z-index: 30;
  background-color: white;
  padding: 0 4px;
}

.v-expansion-panel-header {
  background: #fbfff7;
  transition: background 0.2s ease-in;
}
.v-expansion-panel-header:hover {
  background: #f4ffe5;
  transition: background 0.2s ease-in;
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
  transition: border-radius 0.15s ease-in;
}
</style>