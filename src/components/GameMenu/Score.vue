<template>
  <h2>
    <span class="badge bg-light text-dark">{{ icon }} Score {{ hits }}</span>
  </h2>
</template>

<script>
export default {
  name: "score",
  data() {
    return {
      icon: "😶",
      iconsPerHit: {
        0: "😶",
        10: "😀",
        20: "😃",
        30: "😄",
        40: "😆",
        50: "😉",
        60: "😊",
        70: "😛",
        80: "😜",
        90: "🙃",
        100: "😎",
      },
    };
  },
  computed: {
    hits() {
      let hits = this.$store.state.hits.length;
      if (this.$store.state.state == "gameover") {
        hits--;
      }
      this.iconPerHit(hits);
      return hits;
    },
  },
  methods: {
    iconPerHit(hits) {
      if (this.$store.state.state === "gameover") {
        this.icon = "💀";
      } else if (this.iconsPerHit[hits]) {
        this.icon = this.iconsPerHit[hits];
      }
    },
  },
};
</script>

<style scoped>
.score {
}
</style>
