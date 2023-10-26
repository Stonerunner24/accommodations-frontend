<script setup>
/*DANIEL
* Sorry I changed some stuff around in here. Had to make it work with modern vue conventions.
* - Eli
*/
    import RequestForm from "../components/RequestForm.vue";
    import MenuBar from "../components/MenuBar.vue";
    import SideBar from "../components/SideBar.vue";
    import router from "../router";
    import { ref } from "vue";
    import RequestServices from "../services/requestServices"
    import Utils from "../config/utils";

    const user = ref(null);
    const requestForm = ref(false);
    // Note: Semesters ought to be populated by calling the API and retrieving existing semester objects
    const Semesters = ['FA2023', 'SP2023', 'FA2022', 'SP2022']; 

    const handleCreate = (selectedSem) => {
        console.log(selectedSem);
        let season = selectedSem.charAt[0] = 'F' ? 'Fall' : 'Spring';
        let year = selectedSem.substring(2,6);
        console.log(season + ' ' + year);
        createRequest(season, year);
        requestForm.value = false;
    };

    const createRequest = (season, year) => {
        user.value = null;
        user.value = Utils.getStore("user");
        const data = {
            season: season,
            year: year,
            email: user.value.email
        };
        console.log(data);
        RequestServices.create(data)
            .then((response) => {
                
                console.log(response.data);
            }) 
            .catch((e) => {
                console.log(e.response.data.message);
            });
    };

</script>

<template>
    <MenuBar />
    <SideBar />
    
    <div class="pa-5">
        <div class="pa-7">
            <p  class="text-h6 text-left">
                My Requests
                <v-btn 
                    @click.stop="requestForm = true" 
                    class="mr-15" 
                    rounded="lg" 
                    elevation="2" 
                    style="background-color:#118ACB; 
                        color:white; 
                        float:right"
                    >
                    MAKE A REQUEST
                </v-btn>
            </p>
            
        </div>
        <v-card class="pa-7 mr-15" style="background-color: #D5DFE7;">
            <!--add a conditional v-if for when open request = 0 to say no open requests-->
            <!--
            <v-text v-if="openRequest == 0">No open requests.</v-text>
            -->
            <p>No open requests.</p>
            <!--add a conditional v-else for when open requests > 0 to give a number n of how many requests are open-->
            <!--
            <v-text v-else>{{ openRequest.count }} open requests.</v-text>
            -->
        </v-card>
        <v-dialog
            v-model="requestForm"
            activator="parent"
            width="auto"
            >
            <RequestForm 
                :semesters="Semesters"
                @createRequest="handleCreate"
                @cancel="(requestForm = false)"
            />
        </v-dialog>
    </div>
    
</template>