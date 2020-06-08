<template>
      <v-snackbar
          v-model="snackVal"
          :timeout="1500"
          top
          absolute
          color="orange darken-1"
        >
        stuff
        <!-- <slot></slot> -->
        </v-snackbar>
</template>

<script>
// import { mapState } from "vuex";
export default {
    name: "",
    props: ["snackbar"],
    computed: {
            // ...mapState(["snackStatus"]),
        snackVal: {
            get(){
                return this.$store.state.snackBar.show
            },
            set(val){
                 this.$store.dispatch("showSnack", val);
                // this.$emit("snackchanged", val)
            }
        }
    }

}
</script>

<style>

</style>