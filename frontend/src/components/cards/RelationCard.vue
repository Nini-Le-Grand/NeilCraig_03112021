<template>
  <router-link
    :to="{ name: 'User', params: { id: partnerId }}"
    class="containerrr"
  >
    <div class="picture">
      <img :src="partner.imageUrl" alt="Photo de profil" class="picture-img" />
    </div>
    <div class="name">
      {{ partner.lastName }}
      {{ partner.firstName }}
    </div>
  </router-link>
</template>

<script>
import http from "../../http";

export default {
  name: "RelationCard",
  props: {
    partnerId_props: {
      type: String,
    },
  },
  data() {
    return {
      partnerId: parseInt(this.partnerId_props),
      partner: {},
    };
  },
  mounted() {
    http.get(`auth/${this.partnerId}`).then((data) => {
      this.partner = data.data[0];
    });
  },
};
</script>

<style scoped>
.containerrr {
  margin: 15px 0px;
  padding: 5px;
  display: flex;
  align-items: center;
  box-shadow: 0px 0px 5px 2px rgb(197, 197, 197);
  border-radius: 5px;
}
.containerrr:hover {
  box-shadow: 0px 0px 8px 3px rgb(197, 197, 197);
}

.name {
  font-weight: bold;
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