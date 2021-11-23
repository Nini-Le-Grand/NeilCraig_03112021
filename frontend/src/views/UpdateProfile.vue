<template>
  <div>
    <Navbar class="navbar" />
    <div class="container">
      <div class="forms">
        <div class="authForm">
          <AuthForm />
          <DeleteUserCard class="deleteAccount" v-if="!isAdmin"/>
        </div>
        <div class="profileForm">
          <ProfileForm />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import ProfileForm from "../components/forms/ProfileForm.vue";
import AuthForm from "../components/forms/AuthForm.vue";
import DeleteUserCard from "../components/cards/DeleteUserCard.vue";

export default {
  name: "updateProfile",
  components: { Navbar, ProfileForm, AuthForm, DeleteUserCard },
  data() {
    return {
      isAdmin: this.$store.state.isAdmin
    }
  }
};
</script>

<style scoped>
@media all and (max-width: 953px) {
  .authForm {
  flex: 4;
  margin-top: 20px;
}
.forms {
  display: flex;
  flex-direction: column-reverse;
}
}
.container {
  background-color: rgba(122, 175, 255, 0.473);
  padding: 20px 90px;
}
.forms {
  display: flex;
}
.authForm {
  flex: 2;
}
.deleteAccount {
  margin-top: 30px;
}
.profileForm {
  flex: 4;
}
</style>