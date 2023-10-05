<script setup>
    import MenuBar from "./components/MenuBar.vue";

</script>

<template>
    <v-app>
        <MenuBar :key="$route.fullPath" />
    </v-app>

    <v-btn rounded="lg" elevation="4">MAKE A REQUEST</v-btn>

</template>