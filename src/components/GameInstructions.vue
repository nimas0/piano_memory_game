<template>
  <div class="container-fluid">
    <div class="mt-5">
      <br />
      <h1 class="mt-5 text-light">Instructions</h1>
      <ul class="list-group">
        <li class="list-group-item">1.) You get a 4 key Piano!</li>
        <li class="list-group-item">2.) Press Play</li>
        <li class="list-group-item">3.) The piano will play you a song.</li>
        <li class="list-group-item">4.) Now its your turn.</li>
        <li class="list-group-item">
          5.) Match the exact keys played by the piano by clicking each note
        </li>
        <li class="list-group-item">
          6.) If you get the song right, the piano will play you a harder song.
        </li>
      </ul>
      <br />
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    toggleInstructions($event) {
      $event.preventDefault();
      this.instructions = !this.instructions;
    },
  },
};
</script>

<style scoped></style>
