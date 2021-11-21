<template>
    <div class="container">
        <div class="picture">
            <img :src="linkedUser.imageUrl" class="picture-img">
        </div>
        <div class="name">
            {{ linkedUser.lastName}} 
            {{ linkedUser.firstName}}
        </div>
    </div>
</template>

<script>
import http from "../../http"

export default {
    name:"RelationCard",
    props: {
        partner: {
            type: Object
        }
    },
    data() {
        return {
            linkedUser: ""
        }
    },
    mounted() {
        http
        .get(`auth/${this.partner.partnerId}`)
        .then((data) => {
           this.linkedUser = data.data[0];
        })
    }
}
</script>

<style scoped>
.container {
    margin: 10px 0px;
    display: flex;
    align-items: center;
}
.name {
    font-weight: bold
}
.picture {
    min-width: 60px;
    max-width: 60px;
    height: 60px;
    border-radius: 9999px;
    border: 1px solid grey;
    overflow: hidden;
    margin-right: 20px;
}
.picture-img {
  object-fit: cover;
  height: 100%;
  width: 100%;
}
</style>