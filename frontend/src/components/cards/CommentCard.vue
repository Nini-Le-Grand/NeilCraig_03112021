<template>
  <div>
    <div v-if="deleted" class="deletedComment">Message supprimé</div>
    <div v-else>
      <div class="commentBox">
        <div>
          <div class="comment" :class="{ border: userLiked}">
            <div class="user">
              <CommentUser :userId_props="comment.userId" />
              <DeleteComment
                v-if="isAuthor()"
                :commentId_props="comment.id"
                @deletePost="deleteMsg"
              />
            </div>
            <div class="message">
              {{ comment.message }}
            </div>
          </div>
        </div>
        <div class="likes">
          <div class="like">
            <LikeCommentBtn
              v-if="hasFetched"
              :comment_props="comment"
              :liked_props="liked"
              :likedId_props="likedId"
              @likeCount="updateCount"
            />
          </div>
          <div class="likeCount">
            {{ likesNumber }}
          </div>
        </div>
      </div>
      <div class="infoBox">
        <div class="info">
          <PostDate :postDate="comment.updatedAt" class="date" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import http from "../../http";
import CommentUser from "../cardObjects/CommentUser.vue";
import PostDate from "../cardObjects/PostDate.vue";
import DeleteComment from "../buttons/DeleteComment.vue";
import LikeCommentBtn from "../buttons/LikeCommentBtn.vue";

export default {
  name: "CommentcCard",
  components: {
    CommentUser,
    PostDate,
    DeleteComment,
    LikeCommentBtn,
  },
  props: {
    comment_props: {
      type: Object,
    },
    userId_props: {
      type: Number,
    },
  },
  data() {
    return {
      userId: this.userId_props,
      comment: this.comment_props,
      deleted: false,
      likes: [],
      liked: false,
      likedId: 0,
      likesNumber: 0,
      hasFetched: false,
      userLiked: false,
      isAdmin: this.$store.state.isAdmin,
    };
  },
  beforeMount() {
    this.comment.userId = parseInt(this.comment.userId);
  },
  mounted() {
    if (this.comment.userId == this.$store.state.userId) {
      this.isAuthor = true;
    }
    this.getCommentLikes();
  },
  methods: {
    isAuthor() {
      if(this.comment.userId == this.$store.state.userId || this.isAdmin) {
        return true
      } else {
        return false
      }
    },
    deleteMsg(payload) {
      this.deleted = payload.delete;
      const commentCountChange = -1;
      this.$emit("changeCount", commentCountChange);
    },

    getCommentLikes() {
      http.get(`likeComment/${this.comment.id}`).then((data) => {
        const likes = data.data;
        this.likes = likes;
        this.likesNumber = likes.length;
        for (let like of this.likes) {
          if (like.userId == this.$store.state.userId) {
            this.liked = true;
            this.likedId = like.id;
          }
          if(like.userId == this.userId) {
          this.userLiked = true;
        }
        }
        this.hasFetched = true;
      });
    },
    updateCount(payload) {
      this.likesNumber += payload;
    },
  },
};
</script>

<style scoped>
.like {
  margin: 0 10px;
}

.likes {
  display: flex;
  align-items: center;
}

.commentBox {
  display: flex;
}

.user {
  display: flex;
  justify-content: space-between;
}

.deletedComment {
  font-size: 15px;
  font-style: italic;
  padding: 5px;
  background-color: rgb(219, 242, 255);
  display: inline-flex;
  flex-direction: column;
  border-radius: 10px;
}

.message {
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  word-break: break-word;
}

.date {
  font-size: 10px;
}

.comment {
  padding: 8px;
  background-color: rgb(219, 242, 255);
  display: inline-flex;
  flex-direction: column;
  border-radius: 10px;
}

.info {
  font-size: 12px;
  margin: 0 1px;
}

.infoBox {
  display: flex;
  margin-bottom: 10px;
}

.border {
 background-color: rgb(255, 184, 184);
}
</style>