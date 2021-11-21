<template>
  <button @click="send()">Supprimer</button>
</template>

<script>
import http from "../../http";

export default {
  name: "DeleteComment",
  props: {
    commentId_props: {
      type: Number,
    },
  },
  data() {
    return {
      commentId: this.commentId_props,
    };
  },
  methods: {
    send() {
      http.delete(`/comments/delete/${this.commentId}`).then(() => {
        this.$emit("deletePost", {
          delete: true,
        });
      });
    },
  },
};
</script>

<style scoped>
button {
  margin-left: 5px;
  border: 0;
  background-color: transparent;
  color: grey;
  font-size: 12px;
  cursor: pointer;
}

button:hover {
  text-decoration: underline;
  color: blue;
}
</style>