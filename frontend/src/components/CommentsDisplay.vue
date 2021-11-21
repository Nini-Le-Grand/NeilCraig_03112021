<template>
    <div >
        <CommentCard v-for="comment in comments" :key="comment.id" :comment_props="comment" class="card"/>
    </div>
</template>

<script>
import http from "../http";
import CommentCard from "../components/cards/CommentCard.vue"

export default {
    name: "CommentsDisplay",
    components: {
        CommentCard
    },
    props: {
        postId_props: {
            type: Number
        }
    },
    data() {
        return {
            postId: this.postId_props,
            comments: []
        }
    },
    mounted() {
        http
        .get(`/comments/post/${this.postId}`)
        .then(data => {
            this.comments = data.data;
            this.$emit("countComments", this.comments.length)
        })
    }
}
</script>

<style scoped>
.card {
    margin-bottom: 10px;
}
</style>