<template>
  <div>
    <button v-if="!liked" @click="likeComment()"><i class="far fa-thumbs-up"></i></button>
    <button v-else @click="dislikeComment()"><i class="fas fa-thumbs-up"></i></button>
    
  </div>
</template>

<script>
import http from "../../http";

export default {
  name: "LikeCommentBtn",
  props: {
    comment_props: {
      type: Object,
    },
    liked_props: {
        type: Boolean
    },
    likedId_props: {
        type: Number
    }
  },
  data() {
    return {
      comment: this.comment_props,
      liked: this.liked_props,
      likedId: this.likedId_props,
      newLikeId: 0
    };
  },
  methods: {
    likeComment() {
      const request = {
        commentId: this.comment.id,
        postId: this.comment.postId,
      };
      http.post("/likeComment/create", request).then((data) => {
          this.newLikeId = data.data;
          this.liked = true;
        this.$emit("likeCount", 1)
      });
    },
    dislikeComment() {
        let likedId = this.likedId;
        if(this.newLikeId != 0) {
            likedId = this.newLikeId
        }
        console.log(likedId);
        http
        .delete(`/likeComment/delete/${likedId}`)
        .then(() => {
            this.liked = false;
            this.$emit("likeCount", -1)
        })
    }
  },
};
</script>

<style scoped>
button {
  font-size: 14px;
  border: 0;
  background-color: white;
  cursor: pointer;
}

button:hover {
  color: blue;
  text-decoration: underline;
}
</style>