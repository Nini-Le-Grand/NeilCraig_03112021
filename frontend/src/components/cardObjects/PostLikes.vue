<template>
  <div class="likeContainer">
    <div class="likecount">
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
  name: "PostLike",
  components: {
    LikePostBtn,
  },
  props: {
    postId_props: {
      type: Number,
    },
  },
  data() {
    return {
      likes: 0,
      postId: this.postId_props,
      liked: false,
      likeId: 0,
      postLike: {},
      hasFetched: false
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
.likeContainer {
  display: flex;
  justify-content: space-between;
}
</style>