<template>
  <div>
    <button @click="toggle()">Modifier</button>

    <div v-if="isOpen" class="updateform">
      <button @click="toggle()" class="close">Fermer</button>
      <PostUpdateForm :Post="post" />
    </div>
    <div v-if="isOpen" @click="toggle()" class="outside"></div>
  </div>
</template>

<script>
import PostUpdateForm from "../forms/PostUpdateForm.vue";

export default {
  name: "PostUpdateBtn",
  components: {
    PostUpdateForm,
  },
  props: {
    postToUpdate: {
      type: Object,
    },
  },
  data() {
    return {
      post: this.postToUpdate,
      isOpen: false,
    };
  },
  methods: {
    toggle() {
      this.isOpen = !this.isOpen;
    },
  },
};
</script>

<style scoped>
button {
  border: 0;
  background-color: white;
  color: rgb(60, 167, 255);
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 16px;
}
button:hover {
  text-decoration: underline;
}
.togglebox {
  z-index: 1;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0px;
  left: 0px;
  background-color: rgba(150, 150, 150, 0.212);
}
.outside {
  z-index: 2;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(114, 114, 114, 0.644);
}
.updateform {
  z-index: 3;
  position: fixed;
  top: 10%;
  left: 50%;
  transform: translate(-50%, 0);
}
.close {
  position: absolute;
  right: 15px;
  top: 15px;
}
</style>