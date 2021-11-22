<template>
  <div>
    <div class="btnContainer">
      <button class="commentsNbr" @click="showComments()">
        {{ numberOfComments }} commentaires
      </button>
      <button class="showCommentsArrow" @click="showComments()">
        <i v-if="showCommentBox" class="fas fa-chevron-up arrow"></i>
        <i v-else class="fas fa-chevron-down arrow"></i>
      </button>
    </div>

    <div v-if="showCommentBox" class="comments">
      <div>
        <CommentForm :postId_props="postId" @commentSent="updateComments"/>
      </div>
      <div v-for="comment of comments" :key="comment.id">
        <CommentCard :comment_props="comment" :userId_props="userId" @changeCount="reduceCount"/>
      </div>
    </div>
  </div>
</template>

<script>
import CommentForm from "../forms/CommentForm.vue";
import CommentCard from "../cards/CommentCard.vue";
import http from "../../http";
export default {
  name: "PostComment",
  components: {
    CommentForm,
    CommentCard,
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
      numberOfComments: 0,
      showCommentBox: false,
      postId: this.postId_props,
      userId: this.userId_props,
      comments: [],
      newComment: {}
    };
  },
  mounted() {
    http.get(`/comments/post/${this.postId}`).then((data) => {
      let comments = data.data;
      for(let comment of comments) {
        this.comments.push(comment)
      }
      this.numberOfComments = data.data.length;
    });
  },
  methods: {
    showComments() {
      this.showCommentBox = !this.showCommentBox;
    },
    updateComments(payload) {
      this.newComment = payload;
      this.comments.push(this.newComment);
      this.numberOfComments += 1
    },
    reduceCount(payload) {
      this.numberOfComments += payload;
    }
  },
};
</script>

<style scoped>
.btnContainer {
  display: flex;
  position: relative;
  height: 35px;
}

.showCommentsArrow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 0;
  width: 40px;
  height: 30px;
  background-color: white;
  cursor: pointer;
  border-radius: 10px;
}

.arrow {
  font-size: 30px;
}

.showCommentsArrow:hover {
  background-color: rgb(235, 235, 235);
  color: rgb(60, 151, 255);
}

.commentsNbr {
  background-color: white;
  border: 0;
  cursor: pointer;
}

.commentsNbr:hover {
  color: rgb(60, 151, 255);
  text-decoration: underline;
}
</style>