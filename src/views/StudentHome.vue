<script setup>
/*DANIEL
* Sorry I changed some stuff around in here. Had to make it work with modern vue conventions.
* - Eli
*/
    import RequestForm from "../components/RequestForm.vue";
    import MenuBar from "../components/MenuBar.vue";
    import SideBar from "../components/SideBar.vue";
    import router from "../router";

    const makeRequest = () => {
        router.push({name: 'makeRequest'})
    }
</script>

<template>
    <MenuBar />
    <SideBar />
    
    <div class="pa-5">
        <div class="pa-7">
            <v-text  class="text-h6 text-left">My Requests</v-text>
            <v-btn @click="makeRequest()" class="mr-15" rounded="lg" elevation="2" style="background-color:#118ACB; color:white; float:right">MAKE A REQUEST</v-btn>
        </div>
        <v-card class="pa-7 mr-15" style="background-color: #D5DFE7;">
            <!--add a conditional v-if for when open request = 0 to say no open requests-->
            <!--
            <v-text v-if="openRequest == 0">No open requests.</v-text>
            -->
            <v-text>No open requests.</v-text>
            <!--add a conditional v-else for when open requests > 0 to give a number n of how many requests are open-->
            <!--
            <v-text v-else>{{ openRequest.count }} open requests.</v-text>
            -->
        </v-card>
    </div>
</template>