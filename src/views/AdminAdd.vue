<script setup>
    import accommServices from "../services/accommodationServices.js"
    import requestServices from "../services/requestServices.js"
    import {ref, onMounted} from "vue";
    import { useRoute } from 'vue-router'
    import { computed } from 'vue';

    const accommodations = ref([]);
    const request = ref([]);
    const route = useRoute();
    const params = computed(() => route.params)
    const requestId = route.params.id
    const season = ref();
    const year = ref();
    const fName = ref();
    const lName = ref();

    async function getAccomm() {
        await accommServices.getAll()
            .then((response) => {
                accommodations.value = response.data;
                console.log(accommodations.value);
                accommodations.value.forEach((accomm) => {
                    accomm.chapelChkBox = false;
                })
            })
            .catch((err) => {
                console.log(err);
            })
    }
    async function getRequest() {
        await requestServices.getOne(requestId)
            .then((response) => {
                console.log(request);
                request.value = response.data;
                season.value = request.value.semester.season;
                year.value = request.value.semester.year;
                fName.value = request.value.student.fName;
                lName.value = request.value.student.lName;

            })
            .catch((err) => {
                console.log(err);
            })
    }
    onMounted(async() =>{
        await getAccomm();
        await getRequest();
    })    
</script>

<template>
    <div class="ma-6">
        <div>
            <v-text class="text-h5" style="font-weight: bold;">Add Accommodations</v-text>
            <v-btn class="ml-4" style="float:right" @click="cancel()">cancel</v-btn>
            <v-btn class="mr-4" color="#F9C634" style="float:right" @click="save()">save</v-btn>
        </div>
        <v-text> {{ fName }} {{ lName }} {{ season }} {{ year }} </v-text>
    </div>

    <div class="ml-10 mr-16">
        <div class="pb-5">
            <v-text class="text-h6">Academic</v-text>
            <div>
                <v-card class="rounded-0" style="background-color:#D5DFE7">
                    <div v-for="a in accommodations">
                        <v-checkbox 
                            v-if="a.categoryName == 'Academic'"
                            v-model="a.chapelChkBox"
                            :label="a.title" 
                            color="primary" 
                            style="font-weight: bold; color:black">
                    </v-checkbox>
                    </div>                
                </v-card>
            </div>
        </div>

        <div class="pb-5">
            <v-text class="text-h6">Chapel</v-text>
            <div>
                <!-- v-for through student accommodations that are of the chapel specification -->
                <v-card class="rounded-0" style="background-color:#D5DFE7">
                    <div v-for="a in accommodations">
                        <v-checkbox 
                            v-if="a.categoryName == 'Chapel'"
                            v-model="a.chapelChkBox"
                            :label="a.title" 
                            color="primary" 
                            style="font-weight: bold; color:black">
                    </v-checkbox>
                    </div>
                </v-card>
            </div>
        </div>        

        <div class="pb-5">
            <v-text class="text-h6">Housing</v-text>
            <div>
                <v-card class="rounded-0" style="background-color:#D5DFE7">
                    <div v-for="a in accommodations">
                        <v-checkbox 
                            v-if="a.categoryName == 'Housing'"
                            v-model="a.chapelChkBox"
                            :label="a.title" 
                            color="primary" 
                            style="font-weight: bold; color:black">
                    </v-checkbox>
                    </div>
                </v-card>
            </div>
        </div>
    </div>

    <div class="ma-6">
        <v-btn class="ml-4" style="float:right" @click="cancel()">cancel</v-btn>
        <v-btn class="mr-4" color="#F9C634" style="float:right" @click="save()">save</v-btn>
    </div>
</template>

<script>
    function cancel(){
        console.log('canceled')
    }
    function save(){
        console.log('saved')
    }
</script>