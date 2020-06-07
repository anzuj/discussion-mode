<template>
  <div class="fade-in">
    <ProgressTracker/>
  </div>
</template>


<script>

export default {
  components: {
    ProgressTracker:()=>import('@/components/ProgressTracker')
  },

};
</script>
