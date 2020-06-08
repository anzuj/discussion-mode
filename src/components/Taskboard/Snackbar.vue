<template>
      <v-snackbar
          v-model="snackVal"
          :timeout="1500"
          top
          absolute
          :color="snackbar[mode].color" 
        >
        {{ snackbar[mode].text }}
        <!-- <slot></slot> -->
        </v-snackbar>
</template>

<script>
export default {
      data: () => ({
snackbar: 
    {
        ffClosed: {
        text: "Feedforward closed",
        color: "green"
    },
        ffOpened: {
        text: "Feedforward reopened",
        color: "grey"
    },
        ffEscalated: {
        text: "Feedforward sent to review by management",
        color: "orange"
    },
    taskClosed: {
        text: "Task closed",
        color: "green"
    },
        taskCreated: {
        text: "Task created",
        color: "yellow"
    },
       taskDelegated: {
        text: "Task delegated to management",
        color: "orange"
    }
    }

  }),
    computed: {
            // ...mapState(["snackStatus"]),
        snackVal: {
            get(){
                return this.$store.state.snackBar.show
            },
            set(val){
                 this.$store.dispatch("showSnack", [val, this.mode]);
                // this.$emit("snackchanged", val)
            }
        },
        mode(){
             return this.$store.state.snackBar.mode
        },
    },
  

}
</script>

<style>

</style>