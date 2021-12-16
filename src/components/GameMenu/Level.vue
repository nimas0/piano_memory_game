<template>
  <div class="game-level">
    <h1 v-if="this.$store.state.level !== 0">Level{{ level }}</h1>
    <h1 v-else></h1>
  </div>
</template>

<script>
export default {
  name: "game-level",
  computed: {
    level() {
      return this.$store.state.level;
    },
  },
};
</script>

<style scoped>
.game-level h1 {
  color: rgb(224, 224, 224);
  letter-spacing: 7px;
  font-weight: 500;
}
</style>
