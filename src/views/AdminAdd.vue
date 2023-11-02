<script setup>
    import accommServices from "../services/accommodationServices.js"
    import studentServices from "../services/studentServices.js"
    import requestServices from "../services/requestServices.js"
    import {ref, onMounted} from "vue";
    import { useRoute } from 'vue-router'
    import { computed } from 'vue';

    const accommodations = ref([]);
    const student = ref([]);
    const request = ref([]);
    const route = useRoute();
    const params = computed(() => route.params)
    const requestId = route.params.id;

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
                request.value = response.data;
                console.log(request.value);
            })
            .catch((err) => {
                console.log(err);
            })
    }
    async function getStudent() {
        await studentServices.getOne(request.studentId)
            .then((response) => {
                student.value = response.data;
                console.log(student.value);
            })
            .catch((err) => {
                console.log(err);
            })
    }
    onMounted(async() =>{
        await getAccomm();
        await getRequest();
        await getStudent();
    })
    
</script>

<template>
    <div class="ma-6">
        <div>
            <v-text class="text-h5" style="font-weight: bold;">Add Accommodations</v-text>
            <v-btn class="ml-4" style="float:right">cancel</v-btn>
            <v-btn class="mr-4" color="#F9C634" style="float:right">save</v-btn>
        </div>
        <v-text> {{ student.fName }}</v-text>
        <v-text>{{ semseter }} Fall 2023</v-text>
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
        <v-btn class="ml-4" style="float:right">cancel</v-btn>
        <v-btn class="mr-4" color="#F9C634" style="float:right">save</v-btn>
    </div>
</template>
