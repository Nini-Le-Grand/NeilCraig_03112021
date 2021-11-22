<template>
  <div class="likeContainer">
    <div :class="{border: userLiked}">
      <strong>{{ likes }}</strong> ont aimé !
    </div>
    <div v-if="hasFetched" class="likeBtn">
      <LikePostBtn :postLike_props="postLike" @countLike="updateLikes" />
    </div>
  </div>
</template>

<script>
import LikePostBtn from "../buttons/LikePostBtn.vue";
import http from "../../http";

export default {
  name: "PostLikes",
  components: {
    LikePostBtn,
  },
  props: {
    postId_props: {
      type: Number,
    },
    userId_props: {
      type: Number,
    },
  },
  data() {
    return {
      userId: this.userId_props,
      likes: 0,
      postId: this.postId_props,
      liked: false,
      likeId: 0,
      postLike: {},
      hasFetched: false,
      userLiked: false
    };
  },
  mounted() {
    http.get(`/likePost/${this.postId}`).then((data) => {
      this.likes = data.data.length;
      for (let i of data.data) {
        if (i.userId == this.$store.state.userId) {
          this.liked = true;
          this.likeId = i.id;
        }
        if(i.userId == this.userId) {
          this.userLiked = true;
        }
        break;
      }
      this.postLike = {
          postId: this.postId,
          liked: this.liked,
          likeId: this.likeId
      }
      this.hasFetched = true;
    });
  },
  methods: {
    updateLikes(payload) {
      this.likes += payload.likeCount;
    },
  },
};
</script>

<style scoped>
.border {
  background-color: rgb(255, 184, 184);
  border-radius: 8px;
  padding: 5px;
}

.likeContainer {
  display: flex;
  justify-content: space-between;
}
</style>