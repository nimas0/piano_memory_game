import { createStore } from "vuex";

export default createStore({
  state: {
    hits: [],
    level: 0,
    started: false,
    state: "waiting", // waiting, ready, listening, gameover
    elapsedTime: 0,
    currentSequence: [],
    sequenceListener: undefined,
  },
});
