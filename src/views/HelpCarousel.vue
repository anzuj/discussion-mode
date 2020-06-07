<template>
  <div>
    <div class="display-1 font-weight-light py-6 text-center">How does Discussion Mode work?</div>

<div class="">


    <p
    >Discussion mode presents Teambarometer survey results in a meaningful way. Each survey question has a dedicated page where you can review Feedforwards from your team.</p>

    <div class="headline font-weight-light py-6 primary--text">Feedforwards</div>
    <p>Close a Feedforward after it's been discussed with the team:</p>

    <v-img  :src="require('../assets/images/tutorial/close.png')" width="70%"></v-img>

    <p class="mt-3">Closed a Feedforward accidentally? No problem, just reopen it:</p>
    <v-img  :src="require('../assets/images/tutorial/reopen.png')" width="70%"></v-img>

    <div class="headline font-weight-light py-6 primary--text">Tasks</div>
    <p>Feedforwards that have actionable feedback can be turned into tasks:</p>
     <v-img  :src="require('../assets/images/tutorial/maketask.png')" width="70%"></v-img>

    <p>Choose a title, delegate the task to a team member best for it, set a deadline and make a 1st comment to outline the task:</p>
    <v-img  :src="require('../assets/images/tutorial/task.png')" width="70%"></v-img>

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      images: ["how1", "how2", "how3"]
    };
  }
};
</script>

<style scoped>
.v-carousel-item {
  overflow: scroll;
}
</style>


