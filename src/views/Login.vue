<script setup>
import SocialLogin from "../components/SocialLogin.vue";
import ocLogo from "/oc-logo-docked.svg";

</script>

<template>
    <v-app-bar app color="primary" height="120">
      <v-img
        class="right-aligned"
        :src=ocLogo
        width="140"
        ></v-img>
    </v-app-bar>
    <v-sheet color="sidebar" height="10"></v-sheet>
  <v-container>
    <br /><br />
    <v-header class="text-h1">Welcome!</v-header><br />
    <v-subheader class="text-h4">Student ADA Accommodations Requests Portal</v-subheader>
    <br><br><br><br><br>
    <v-sheet class="mx-auto" color=#f9c634 height="60" width="420">
      <v-row align="center" justify="center" style="height: 100%;">
        <v-col cols="12" sm="8" md="6">
          <SocialLogin />
        </v-col>
      </v-row>
    </v-sheet>
    <br /><br />
  </v-container>
</template>

<style scoped>
.right-aligned {
  position: absolute;
  right: 0;
}

</style>
