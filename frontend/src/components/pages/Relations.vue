<template>
    <div class="container">
        <h2>Relations</h2>
        <RelationCard v-for="partner in partners" :key="partner.id" :partnerId_props="partner.partnerId"/>
    </div>
</template>

<script>
import http from "../../http";
import RelationCard from "../cards/RelationCard.vue";
export default {
    name: "Relations",
    props: {
        userId_props: {
            type: Number
        }
    },
    components: {
        RelationCard
    },
    data() {
        return {
            userId: this.userId_props,
            partners: {}
        }
    },
    mounted() {
        http
        .get(`userlink/user/${this.userId}`)
        .then(data => {
            this.partners = data.data;
            this.partners.partnerId = parseInt(data.data.partnerId);
        })
    },
    beforeUpdate() {
    this.userId = this.userId_props;
  }, updated() {
      http
        .get(`userlink/user/${this.userId}`)
        .then(data => {
            this.partners = data.data;
            this.partners.partnerId = parseInt(data.data.partnerId);
        })
  }
}
</script>

<style scoped>
h2 {
    text-align: center;
}
.container {
    padding: 20px;
    border-radius: 15px;
    background-color: white;
    box-shadow: 0px 5px 10px 2px rgb(206, 206, 206);
}

@media all and (max-width: 900px) {
    .container {
    padding: 20px;
    border-radius: 15px;
    background-color: white;
    box-shadow: 0px 5px 10px 2px rgb(206, 206, 206);
    max-height: 400px;
    overflow: scroll;
}
}


@media all and (max-width: 550px) {
    .container {
    padding: 20px;
    border-radius: 0px;
    background-color: white;
    box-shadow: 0px 5px 10px 2px rgb(206, 206, 206);
    max-height: 400px;
    overflow: scroll;
}
}
</style>