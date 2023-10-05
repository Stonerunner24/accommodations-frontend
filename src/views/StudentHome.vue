<script>
import MenuBar from "./components/MenuBar.vue";

</script>

<template>
 <v-app>
    <MenuBar :key="$route.fullPath" />
  </v-app>
</template>