<template>
    <button @click="deletePost()">Supprimer</button>
</template>

<script>
import http from "../../http"

export default {
    name: "PostDeleteBtn",
    props: {
        postToDelete: {
            type: Object
        }
    },
    data() {
        return {
            post: this.postToDelete
        }
    },
    methods: {
        deletePost() {
            let URLParam = `${this.post.id}`;
            let fileURL = this.post.imageUrl
            if(fileURL != "") {
                fileURL = fileURL.split("posts/")[1];
                URLParam += `&${fileURL}`
            }

            http
            .delete(`posts/delete/${URLParam}`)
            .then(() => {
                this.$router.go()
            })
        }
    }

}
</script>

<style scoped>
button {
    border: 0;
    background-color: white;
    color: rgb(60, 167, 255);
    cursor: pointer;
    font-size: 16px;
}

button:hover {
    text-decoration: underline;
}
</style>