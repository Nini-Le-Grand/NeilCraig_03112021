<template>
  <div>
    <button v-if="!liked" @click="likeReq()"><i class="far fa-thumbs-up"></i></button>
    <button v-else @click="dislikeReq()"><i class="fas fa-thumbs-up"></i></button>
  </div>
</template>

<script>
import http from "../../http";
export default {
  name: "LikePostBtn",
  props: {
    postLike_props: {
      type: Object,
    },
  },

  data() {
    return {
      postInfo: this.postLike_props,
      liked: this.postLike_props.liked,
    };
  },
  methods: {
    likeReq() {
      let request = {
        postId: this.postInfo.postId,
      };
      http
        .post("/likePost/create", request)
        .then((data) => {
        this.postInfo.likeId = data.data
          this.liked = !this.liked;
          this.$emit("countLike", {
            likeCount: 1,
          });
        })
    },
    dislikeReq() {
      http
        .delete(`/likePost/delete/${this.postInfo.likeId}`)
        .then(() => {
          this.liked = !this.liked;
          this.$emit("countLike", {
            likeCount: -1,
          });
        })
    },
  },
};
</script>

<style scoped>
button {
  border: 0;
  background-color: white;
  cursor: pointer;
}

button:hover {
  color: blue;
}
</style>