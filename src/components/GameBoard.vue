<template>
  <div class="container-lg">
    <div class="row" :class="`game-lights ${state} `">
      <Button
        keyposition="left"
        :shortkey="'C'"
        :color="'#1E2F4E'"
        :sound="'1.mp3'"
      />
      <Button
        keyposition="center"
        :shortkey="'E'"
        :color="'#E54D42'"
        :sound="'2.mp3'"
      />
      <Button
        keyposition="center"
        :shortkey="'A'"
        :color="'#B7E6F2'"
        :sound="'3.mp3'"
      />
      <Button
        keyposition="right"
        :shortkey="'B'"
        :color="'#3A99D9'"
        :sound="'4.mp3'"
      />
    </div>
  </div>
  <GameOver v-if="state == 'gameover'" />
</template>

<script>
import Button from "./GameBoard/Button";
import GameOver from "./GameBoard/GameOver.vue";

export default {
  name: "Game Board",
  components: { Button, GameOver },
  beforeCreate() {
    document
      .querySelector("body")
      .setAttribute("style", "background:rgb(56, 78, 87);");
  },
  computed: {
    level: {
      get() {
        return this.$store.state.level;
      },
      set(value) {
        this.$store.state.level = value;
      },
    },
    currentSequence: {
      get() {
        return this.$store.state.currentSequence;
      },
      set(value) {
        this.$store.state.currentSequence = value;
      },
    },
    state: {
      get() {
        return this.$store.state.state;
      },
      set(value) {
        this.$store.state.state = value;
      },
    },
  },
  methods: {
    play(sequence = []) {
      this.setState("waiting");
      sequence.forEach((n, i) => {
        setTimeout(() => {
          document.querySelectorAll(`[data-light-button]`)[n].click();
          if (i == sequence.length - 1) {
            this.setState("listening");
          }
        }, 800 * i);
      });
    },
    async levelUp() {
      document
        .querySelector("body")
        .setAttribute("style", "background:#233238;");

      this.level++;
      await this.wait(1000);
      this.currentSequence = [];
      for (let i = 0; i < this.level; i++) {
        this.currentSequence.push(this.randomNumber(0, 3));
      }
      this.play(this.currentSequence);
      // while sequence is playing, dim the background
      setTimeout(() => {
        document
          .querySelector("body")
          .setAttribute("style", "background:rgb(56, 78, 87);");
      }, 1000 * this.currentSequence.length);
    },
    restart() {
      this.setState("waiting");
      this.$store.state.started = true;
      this.$store.state.hits = [];
      this.$store.state.level = 0;
      this.$store.state.elapsedTime = 0;
      this.$store.state.currentSequence = [];
      this.$store.state.sequenceListener = undefined;
      window?.$gamelights_timer?.reset();
      setTimeout(() => {
        window.$gamelights.levelUp();
      }, 2000);
    },
    gameOver() {
      this.setState("gameover");
      this.$store.state.started = false;
    },
    wait(ms) {
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log("Done waiting");
          resolve(ms);
        }, ms);
      });
    },
    randomNumber(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    setState(state) {
      this.$store.state.state = state;
    },
    getState() {
      return this.$store.state.state;
    },
    sequence() {
      return this.currentSequence;
    },
    shiftSequence() {
      return this.currentSequence.shift();
    },
  },
  mounted() {
    window.$gamelights = this;
  },
};
</script>

<style scoped>
.game-lights-button {
  outline: none;
  -webkit-tap-highlight-color: transparent;
}
.game-lights-button button {
  position: relative;
  display: inline-block;
  cursor: pointer;
  margin: 0 auto;
  width: 56px;
  height: 56px;
  border-radius: 100%;
  outline: none;
  overflow: visible;
  transition: all 100ms ease-in;
  color: #fff;
  font-weight: 700;
  opacity: 0.5;
  cursor: pointer;
  border: dotted 1px transparent;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
}
.game-lights-button button span {
  font-size: 18px;
  opacity: 0.8;
}
.game-lights-button button:before {
  content: "";
  background-color: currentColor;
  border-radius: 50%;
  display: block;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  transform: scale(0.001, 0.001);
}
.game-lights-button button.click {
  opacity: 1;
  pointer-events: none;
  user-select: none;
}
.game-lights-button button.click:before {
  outline: none;
  pointer-events: none;
  animation: effect_dylan 800ms;
}
@keyframes effect_dylan {
  50% {
    will-change: scale;
    transform: scale(3, 3);
    opacity: 0;
  }
  99% {
    will-change: scale;
    transform: scale(0.001, 0.001);
    opacity: 0;
  }
  100% {
    will-change: scale;
    transform: scale(0.001, 0.001);
    opacity: 1;
  }
}
</style>
