<template>
  <v-row no-gutters class="mb-1" justify="center">
    <v-col class="px-4">
      <v-expansion-panels hover popout>
        <v-expansion-panel>
          <v-expansion-panel-header class="py-5">
            <p class="text-truncate ma-0">
              <v-icon color="green" class="px-1">mdi-check</v-icon>
              {{task.title}}
            </p>
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
  props:["task"]
};
</script>

<style scoped>
.v-expansion-panel-header {
  background: #fbfff7;
}

.v-expansion-panel-header:hover {
  background: #f4ffe5;
}
</style>