<template>
  <div class="postContainer">
    <div class="nav">
      <div class="user">
        <div>
          <PostUser :userId="post.userId" />
        </div>
        <div class="top-right">
          <PostDate :postDate="post.updatedAt" />
          <div  class="buttons">
            <PostUpdateBtn  v-if="isAuthor()" :postToUpdate="post"/>
            <PostDeleteBtn v-if="isAdmin()" :postToDelete="post" />
          </div>
          
        </div>
      </div>
      <h2>
        {{ post.title }}
      </h2>
    </div>
    <div class="message">
      {{ post.message }}
    </div>
    <div v-if="post.imageUrl !== ''" class="picture">
      <img :src="post.imageUrl" />
    </div>

    <div class="reactions">
      <div class="reactionsView">
        <PostLikes :postId_props="post.id" :userId_props="userId" class="postlikes"/>
      </div>
      <div class="reactionsButtons">
        <PostComment :postId_props="post.id" :userId_props="userId"/>
      </div>
    </div>
  </div>
</template>

<script>
import PostUser from "../cardObjects/PostUser.vue";
import PostDate from "../cardObjects/PostDate.vue";
import PostUpdateBtn from "../buttons/PostUpdateBtn.vue";
import PostDeleteBtn from "../buttons/PostDeleteBtn.vue";
import PostLikes from "../cardObjects/PostLikes.vue";
import PostComment from "../cardObjects/PostComment.vue";

export default {
  name: "PostCard",
  components: {
    PostUser,
    PostDate,
    PostUpdateBtn,
    PostDeleteBtn,
    PostLikes,
    PostComment
  },
  props: {
    post_props: {
      style: Object,
    },
    userId_props: {
      style: Object,
    },
  },
  data() {
    return {
      post: this.post_props,
      userId: this.userId_props,
    };
  },
  methods: {
    isAuthor() {
      if(this.post.userId == this.$store.state.userId) {
        return true;
      }
    },
    isAdmin() {
      if(this.$store.state.isAdmin || this.post.userId == this.$store.state.userId) {
        return true;
      }
    }
  }
};
</script>

<style scoped>
.top-right {
  display: flex;
  flex-direction: column;
}

.postlikes {
  width: 100%;
}

.buttons {
  display: flex;
  justify-content: space-between;
}
.reactionsView {
  padding: 10px 0px;
  border-bottom: 2px solid rgb(218, 218, 218);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.reactions {
  border-top: 2px solid rgb(218, 218, 218);
}
.nav {
  border-bottom: 2px solid rgb(218, 218, 218);
  margin-bottom: 10px;
}

.user {
  display: flex;
  justify-content: space-between;
}
h2 {
  margin: 0;
}

.picture {
  margin-bottom: 10px;
  background-color: rgba(0, 0, 0, 0.89);
  display: flex;
  justify-content: center;
}

.message {
  font-size: 17px;
  margin-bottom: 10px;
}

img {
  max-height: 300px;
}

.postContainer {
  padding: 10px 5%;
  display: flex;
  flex-direction: column;
  background-color: white;
  box-shadow: 0px 0px 10px 2px rgb(219, 219, 219);
  border-radius: 15px;
  margin-bottom: 15px;
}
</style>