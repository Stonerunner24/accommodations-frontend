<template>
    <div>
      <MenuBar />
      <SideBarAdmin />
      <v-container>
        <router-view />
      </v-container>
    </div>
</template>
  
<script setup>
  import MenuBar from "../components/MenuBar.vue";
  import SideBarAdmin from "../components/SideBarAdmin.vue";
</script>
  