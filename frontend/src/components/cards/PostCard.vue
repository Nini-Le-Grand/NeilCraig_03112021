<template>
  <div class="postContainer">
    <div class="nav">
      <div class="user">
        <div>
          <PostUser :userId="post.userId" />
        </div>
        <div>
          <PostDate :postDate="post.updatedAt" />
          <div v-if="isAuthorized()" class="buttons">
            <PostUpdateBtn :postToUpdate="post"/>
            <PostDeleteBtn :postToDelete="post" />
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
        <PostLikes :postId_props="post.id" class="postlikes"/>
      </div>
      <div class="reactionsButtons">
        <PostComment :postId_props="post.id" />
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
    postObject: {
      style: Object,
    },
  },
  data() {
    return {
      post: this.postObject,
    };
  },
  methods: {
    isAuthorized() {
      if(this.post.userId == this.$store.state.userId) {
        return true;
      }
    }
  }
};
</script>

<style scoped>
.postlikes {
  width: 100%;
}

.buttons {
  display: flex;
  justify-content: space-around;
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
  font-size: 22px;
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