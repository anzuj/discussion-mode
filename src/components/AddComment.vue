<template>
  <v-card outlined class="mt-1">
    <v-row no-gutters>
      <v-col>
        <v-textarea
          v-model="text"
          class="body-2"
          solo
          auto-grow
          hide-details
          flat
          rows="2"
          name="comment"
          label="Add comment"
        ></v-textarea>
      </v-col>

      <v-col cols="1" style="max-width:40px">
         <v-tooltip bottom color="grey lighten-3" open-delay="1000">
      <template v-slot:activator="{ on }">
        <v-btn
          aria-label="Add comment"
          @click="addComment"
             v-on="on"
          icon
          text
          color="primary"
          class="sendComment mt-1 mr-1"
        >
          <v-icon>mdi-send</v-icon>
        </v-btn>
                 </template>
      <span class="grey--text text--darken-3">Add comment</span>
    </v-tooltip>
      </v-col>
    </v-row>
  </v-card>
</template>
<script>
export default {
  props: ["taskId"],
  data: () => ({
    name: "Test user",
    text: ""
  }),
  methods: {
    addComment() {
      if (this.text) {
        let newComment = {};
        newComment.commentBy = this.name;
        newComment.comment = this.text;
        newComment.time = new Date().toLocaleString();
        this.$store.dispatch("addComment", [newComment, this.taskId]);
        this.text = "";
      }
    }
  },
  computed: {}
};
</script>

<style>
.sendComment {
  transform: rotate(-20deg);
}
</style>