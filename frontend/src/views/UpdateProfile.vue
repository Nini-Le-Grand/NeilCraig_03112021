<template>
<div>
  <Navbar class="navbar"/>
  <div class="container">
    <div class="forms">
      <div class="authForm">
        <AuthForm />
        <DeleteUserCard class="deleteAccount" />
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
};
</script>

<style scoped>
.container {
  background-color: rgba(122, 175, 255, 0.473);
  padding: 40px 90px;
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