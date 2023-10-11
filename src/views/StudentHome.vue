<script>
    export default {
        methods: {
            
            makeRequest() {
                console.log("making request");
                return 0;
            }
        }
    }
</script>

<template>
    <div class="pa-5">
        <div class="pa-7">
            <v-text  class="text-h6 text-left">My Requests</v-text>
            <v-btn @onClick="makeRequest" class="mr-15" rounded="lg" elevation="2" style="background-color:#118ACB; color:white; float:right">MAKE A REQUEST</v-btn>
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