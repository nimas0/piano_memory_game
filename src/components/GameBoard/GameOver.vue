<template>
  <div class="game-over">
    <div class="game-over__content">
      <h3 class="text-danger">Game Over :(</h3>
      <br />
      <button class="btn btn-success" @click="restart">Try Again</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "game-over",
  methods: {
    restart() {
      window.$gamelights.restart();
    },
  },
};
</script>

<style scoped>
.game-over {
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0.95);
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
