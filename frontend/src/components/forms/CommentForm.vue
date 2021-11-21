<template>
  <form @submit.prevent="send()" class="container">
    <label for="comment">Commenter</label>

    <input type="text" class="input" v-model="message" />
    <button>Envoyer</button>
  </form>
</template>

<script>
import http from "../../http";

export default {
  name: "CommentForm",
  props: {
    postId_props: {
      type: Number,
    },
  },
  data() {
    return {
      message: "",
      postId: this.postId_props,
    };
  },

  methods: {
    send() {
      const request = {
        postId: this.postId,
        message: this.message,
      };
      http.post("/comments/create", request).then((data) => {
        let newComment = data.data
        this.$emit("commentSent", newComment);
        this.message = "";
      });
    },
  },
};
</script>

<style scoped>
.container {
  border: 2px solid rgb(19, 113, 255);
  background-color: rgb(19, 113, 255);
  display: flex;
  overflow: hidden;
  margin-bottom: 10px;
  border-radius: 10px;
}

.input {
  flex: 1;
  border: 0;
  padding-left: 5px;
}

.input:focus {
  outline: none;
}

label {
  padding: 5px 15px;
  color: white;
}

button {
  padding: 5px 15px;
  border: 0;
  font-weight: bold;
  cursor: pointer;
  background-color: rgb(19, 113, 255);
  font-weight: bold;
  color: white;
}
</style>