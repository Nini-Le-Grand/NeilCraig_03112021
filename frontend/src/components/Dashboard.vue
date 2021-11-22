<template>
<div>
  <div class="containers">
    <div class="profile">
      <Profile :userId_props="userId" />
    </div>
    <div class="activity">
      <Activity :userId_props="userId" />
    </div>
    <div class="relations">
      <Relations :userId_props="userId" />
    </div>
  </div>
</div>
  
</template>

<script>
import Profile from "../components/pages/Profile.vue";
import Relations from "../components/pages/Relations.vue";
import Activity from "../components/cards/Activity.vue";

export default {
  name: "Dashboard",
  components: { Profile, Relations, Activity },
  props: {
      userId_props: {
          type: Number
      }
  },

  data() {
    return {
      userId: this.userId_props,
    };
  },
  beforeUpdate() {
    this.userId = this.userId_props
  }
};
</script>

<style scoped>
.containers {
  background-color: rgb(173, 225, 255);
  display: flex;
  padding: 20px 60px;
  min-height: 100vh;
}

.activity {
  margin: 0 30px;
  flex: 5;
}
.relations {
  flex:3;
}
</style>