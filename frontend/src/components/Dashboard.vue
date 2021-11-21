<template>
<div>
  <div class="containers">
    <div class="profile">
      <Profile :userId="userId" />
    </div>
    <div class="activity">
      {{ userId }}
    </div>
    <div class="relations">
      <Relations :userId="userId" />
    </div>
  </div>
</div>
  
</template>

<script>
import Profile from "../components/pages/Profile.vue";
import Relations from "../components/pages/Relations.vue";

export default {
  name: "Dashboard",
  components: { Profile, Relations },
  props: {
      userIdn: {
          type: Number
      }
  },

  data() {
    return {
      userId: this.userIdn,
    };
  },
};
</script>

<style scoped>
.containers {
  background-color: rgb(173, 225, 255);
  display: flex;
  padding: 20px 60px;
  min-height: 100vh;
}
.profile {
  width: 20%;
}
.activity {
  flex: 1;
  margin: 0px 20px;
}
.relations {
  width: 30%;
}
</style>