<template>
  <div class="col px-0 game-lights-button">
    <button
      :class="`w-75 keynote button-${keyposition}`"
      ref="btn"
      :style="`background-color:${color}`"
      @click="click($event)"
      :data-light-button="shortkey"
    >
      {{ shortkey }}
    </button>
  </div>
</template>

<script>
export default {
  name: "PianoKeys",
  props: {
    shortkey: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    sound: {
      type: String,
      required: true,
    },
    keyposition: {
      type: String,
    },
  },
  methods: {
    click($event) {
      const turn = this.$store.state.state;
      if (turn != "listening" && (!$event || $event.isTrusted)) {
        // if user triggered an action when is not its turn
        // the action will be ignored.
        return;
      }
      const $btn = this.$refs.btn;
      const key = $btn?.dataset?.lightButton.toLowerCase();
      $btn.classList.add("click");
      setTimeout(() => {
        $btn.classList.remove("click");
      }, 200);
      this.playSound(require(`@/assets/sounds/${this.sound}`));
      this.checkSequence(key);
    },
    checkSequence(key) {
      if (window.$gamelights.getState() === "listening") {
        this.$store.state.hits.push(key);
        const keymap = { c: 0, e: 1, a: 2, b: 3 };
        const keyindex = keymap[key.toLowerCase()];
        const expected = window.$gamelights.shiftSequence();
        if (expected == keyindex) {
          if (!window.$gamelights.sequence().length) {
            document
              .querySelector("body")
              .setAttribute("style", "background:green;");
            setTimeout(() => {
              if (this.$store.state.state == "gameover") return;
              window.$gamelights.setState("waiting");

              window.$gamelights.levelUp();
            }, 2000);
          }
        } else {
          window.$gamelights.gameOver();
        }
      }
    },
    playSound(sound) {
      const audio = new Audio(sound);
      audio.play();
    },
  },
  mounted() {
    document.addEventListener("keypress", (e) => {
      const shortkey = this.shortkey.toLowerCase();
      if (
        e.key.toLowerCase() == shortkey ||
        e.code.toLowerCase() == `key${shortkey}`
      ) {
        this.click();
      }
    });
  },
};
</script>
<style>
.game-lights-button {
  outline: none;
  -webkit-transform: perspective(1px) translateZ(0);
  transform: perspective(1px) translateZ(0);
  box-shadow: 0 0 1px rgba(0, 0, 0, 0);
  -webkit-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -webkit-transition-property: transform;
  transition-property: transform;
  -webkit-transition-timing-function: ease-out;
  transition-timing-function: ease-out;
}
.game-lights-button:hover {
  -webkit-transform: translateY(-7px);
  transform: translateY(-7px);
}
.game-lights-button button {
  cursor: pointer;
  height: 50vh;
  overflow: visible;
  transition: all 100ms ease-in;
  color: #fff;
  font-weight: 700;
  opacity: 1;
  cursor: pointer;
  border: dotted 1px transparent;
  /* box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23); */
}
.game-lights-button button span {
  font-size: 28px;
  opacity: 1;
}
.keynote {
  font-size: 50px;
}
.game-lights-button button:before {
  content: "";
  background-color: currentColor;
  border-radius: 50%;
  display: inline;

  transform: scale(0.001, 0.001);
}
.game-lights-button button.click {
  filter: brightness(65%);
  pointer-events: none;
  user-select: none;
}
.game-lights-button button.click {
  filter: brightness(65%);
  pointer-events: none;
  user-select: none;
}
.game-lights-button button.click:before {
  outline: none;

  pointer-events: none;
}

.button-left {
  border-bottom-right-radius: 2rem;
  border-bottom-left-radius: 0rem;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
}
.button-center {
  border-bottom-right-radius: 2rem;
  border-bottom-left-radius: 2rem;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
}
.button-right {
  border-bottom-right-radius: 0rem;
  border-bottom-left-radius: 2rem;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
}
</style>
