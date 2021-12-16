<template>
  <GameHeader @instructions="toggleInstructions" />
  <GameInstructions v-if="showInstructions" />
  <div v-else>
    <GameBoard />
    <GameMenu />
  </div>
</template>

<script>
import GameBoard from "./components/GameBoard.vue";
import GameMenu from "./components/GameMenu.vue";
import GameHeader from "./components/GameHeader.vue";
import GameInstructions from "./components/GameInstructions.vue";
export default {
  name: "App",
  data() {
    return {
      showInstructions: false,
    };
  },
  components: {
    GameBoard,
    GameMenu,
    GameHeader,
    GameInstructions,
  },
  methods: {
    toggleInstructions() {
      this.showInstructions = !this.showInstructions;
    },
  },
};
</script>

<style>
#app {
  font-family: "Roboto", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  margin-top: 60px;
}
body {
  background-color: rgb(56, 78, 87);
}
</style>
