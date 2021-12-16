<template>
  <nav class="px-5 py-3 navbar fixed-top navbar-expand-lg navbar-light header">
    <div class="container-fluid">
      <h4 class="navbar-brand text-light" href="#">
        Remember the Tune: Piano Memory Game
      </h4>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarText"
        aria-controls="navbarText"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarText">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0"></ul>
        <button @click="activateInstructs" class="btn text-light">
          Instructions
        </button>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  name: "Header",

  methods: {
    activateInstructs() {
      this.$emit("instructions");
    },
  },
};
</script>

<style scoped>
.header {
  background-color: #233238;
}
</style>
