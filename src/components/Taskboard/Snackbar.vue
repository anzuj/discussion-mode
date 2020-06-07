<template>
      <v-snackbar
          v-model="snackVal"
          :timeout="1500"
          top
          absolute
          color="orange darken-1"
        >Task moved up to administration</v-snackbar>
</template>

<script>
export default {
    name: "",
    props: ["snackbar"],
    components: {
        
    },
    data: () => ({
    }),
    methods: {

    },
    computed: {
        snackVal: {
            get(){
                return this.snackbar
            },
            set(val){
                this.$emit("snackchanged", val)
            }
        }
    }

}
</script>

<style>

</style>