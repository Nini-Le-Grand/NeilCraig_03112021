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

.profile {
  flex: 3;
}
.activity {
  margin: 0 30px;
  flex: 6;
}
.relations {
  flex:3;
}

@media all and (max-width: 900px) {
  .containers {
  background-color: rgb(173, 225, 255);
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.profile {
  width: 90%;
  margin: auto;
  margin-bottom: 20px;
  order: 1;
}

.activity {
  width: 90%;
  margin: auto;
  margin-bottom: 20px;
  order: 3;
}
.relations {
  width: 90%;
  margin: auto;
  margin-bottom: 20px;
  order: 1;
  max-height: 300px;
  overflow: hidden;
  border-radius: 15px;
  box-shadow: 0px 0px 5px 3px rgb(194, 194, 194);
}
}
@media all and (max-width: 550px) {
  .containers {
  background-color: rgb(173, 225, 255);
  display: flex;
  padding: 20px 0px;
  min-height: 100vh;
}
  .profile {
  width: 100%;
  margin: auto;
  margin-bottom: 20px;
  border-radius: 0;
  order: 1;
}

.activity {
  width: 100%;
  margin: auto;
  margin-bottom: 20px;
  order: 3;
}
.relations {
  width: 100%;
  margin: auto;
  margin-bottom: 20px;
  order: 1;
  max-height: 300px;
  overflow: hidden;
  border-radius: 0px;
}
}


</style>