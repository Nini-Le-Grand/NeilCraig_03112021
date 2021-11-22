<template>
  <div>
    <PostCard v-for="post in posts" :key="post.id" :post_props="post" :userId_props="userId"/>
  </div>
</template>

<script>
import http from "../../http";
import PostCard from "../cards/PostCard.vue";

export default {
  name: "DashLikes",
  components: {
    PostCard,
  },
  props: {
    userId_props: {
      type: Number,
    },
  },
  data() {
    return {
      userId: this.userId_props,
      posts: [],
    };
  },
  mounted() {
    http.get(`/likePost/user/${this.userId}`).then((data) => {
      let postsId = [];
      let postLikes = data.data;
      for (let postLike of postLikes) {
        if (!postsId.includes(postLike.postId)) {
          postsId.push(postLike.postId);
        }
      }
      console.log('postsLikes', postsId);
      http.get(`/likeComment/user/${this.userId}`).then((data) => {
        let commentLikes = data.data;
        for (let commentLike of commentLikes) {
          if (!postsId.includes(commentLike.postId)) {
            postsId.push(commentLike.postId);
          }
        }
        for (let id of postsId) {
          http.get(`/posts/${id}`).then((data) => {
            this.posts.push(data.data[0]);
          });
        }
      });
    });
  },
  beforeUpdate() {
    this.userId = this.userId_props;
  },
};
</script>