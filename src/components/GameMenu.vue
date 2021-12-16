<template>
  <div class="playing-menu" v-if="started">
    <Navbar class="w-100 m-0 p-0 btn-transparent btn navbar fixed-bottom">
      <div
        id="playing-container"
        class="playing-container container-fluid justify-content-between px-5"
      >
        <Score />
        <Level />
        <Timer />
      </div>
    </Navbar>
  </div>
  <div class="start-menu" v-else>
    <Navbar
      @click="start"
      class="hvr-bounce-to-bottom w-100 m-0 p-0 btn-light btn navbar fixed-bottom"
    >
      <div
        id="menu-container"
        class="menu-container container-fluid justify-content-center"
      >
        <span class="play">START GAME</span>
      </div>
    </Navbar>
  </div>
</template>

<script>
// import GameHits from "@/components/GameMenu/GameHits.vue";
import Score from "./GameMenu/Score.vue";
import Timer from "./GameMenu/Timer.vue";
import Level from "./GameMenu/Level.vue";
export default {
  name: "game-menu",
  components: {
    Score,
    Timer,
    Level,
  },
  data() {
    return {
      started: false,
    };
  },
  methods: {
    start() {
      setTimeout(() => {
        this.restartGame();
      }, 500);
    },
    restartGame() {
      if (!this.$store.state.started) {
        this.started = true;
        window.$gamelights.restart();
      }
    },
  },
};
</script>

<style scoped>
.menu-container {
  min-height: 150px;
  border: 0ch;
  border-style: none;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
}
.playing-container {
  min-height: 100px;
  border: 0ch;
  border-style: none;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
}
.hvr-bounce-to-bottom {
  -webkit-transform: perspective(1px) translateZ(0);
  transform: perspective(1px) translateZ(0);
  box-shadow: 0 0 1px rgba(0, 0, 0, 0);

  -webkit-transition-property: color;
  transition-property: color;
  -webkit-transition-duration: 0.5s;
  transition-duration: 0.5s;
}
.hvr-bounce-to-bottom:before {
  content: "";
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #35a53a;
  -webkit-transform: scaleY(0);
  transform: scaleY(0);
  -webkit-transform-origin: 50% 0;
  transform-origin: 50% 0;
  -webkit-transition-property: transform;
  transition-property: transform;
  -webkit-transition-duration: 0.2s;
  transition-duration: 0.2s;
  -webkit-transition-timing-function: ease-out;
  transition-timing-function: ease-out;
}
.hvr-bounce-to-bottom:hover,
.hvr-bounce-to-bottom:focus,
.hvr-bounce-to-bottom:active {
  color: white;
}
.hvr-bounce-to-bottom:hover:before,
.hvr-bounce-to-bottom:focus:before,
.hvr-bounce-to-bottom:active:before {
  -webkit-transform: scaleY(1);
  transform: scaleY(1);
  -webkit-transition-timing-function: cubic-bezier(0.52, 1.64, 0.37, 0.66);
  transition-timing-function: cubic-bezier(0.52, 1.64, 0.37, 0.66);
}
.play {
  font-size: 5ch;
  font-weight: 400;
}
</style>
