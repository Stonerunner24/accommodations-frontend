<script setup>
    import accommServices from "../services/accommodationServices.js"
    import requestServices from "../services/requestServices.js"
    import studentAccomServices from "../services/studentAccomServices"
    import {ref, onMounted} from "vue";
    import { useRoute } from 'vue-router'
    import { computed } from 'vue';
    import router from '../router';
    import Utils from "../config/utils";

    const accommodations = ref([]);
    const request = ref([]);
    const route = useRoute();
    const params = computed(() => route.params)
    const requestId = route.params.id
    const season = ref();
    const year = ref();
    const fName = ref();
    const lName = ref();
    let user = Utils.getStore("user");

    async function getAccomm() {
        await accommServices.getAll()
            .then((response) => {
                accommodations.value = response.data;
                console.log('accommodations: ', accommodations.value);
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

    const selectedAccommodations = ref([]);

    function cancel(){
        router.push({ name: 'adminHome'});
    }

    function save(){
        
        let studentAccomData = {
            accomId: null,
            data: null,
            createdAt: null,
            updatedAt: null,
            semesterId: null,
            studentId: null,
        }
        
        let checkedAccommodations = selectedAccommodations.value;
        console.log('selected accom', checkedAccommodations)
        console.log(request.value);

        for(let i = 0; i < selectedAccommodations.value.length; i++){
             if (selectedAccommodations.value[i]) {
                let accom = findAccomById(i);
                studentAccomData.accomId = accom.accomId;
                studentAccomData.data = null;
                studentAccomData.createdAt = new Date(),
                studentAccomServices.updatedAt = new Date(),
                studentAccomData.semesterId = request.value.semesterId;
                studentAccomData.studentId = request.value.studentId;

                studentAccomServices.create(studentAccomData);
            }
        }
        requestServices.update( requestId , {approvedBy: (user.fName, ' ', user.lName),status: 'Closed'});
        router.push({ name: 'adminHome'});
    }
    
    function findAccomById(id) {
        for (let a of accommodations.value){
            if (a.accomId == id) return a;
        }
        return null;
    }
</script>

<template>
    <div class="ma-6">
        <div>
            <p class="text-h5" style="font-weight: bold;">Add Accommodations</p>
            <v-btn class="ml-4" style="float:right" @click="cancel()">cancel</v-btn>
            <v-btn class="mr-4" color="#F9C634" style="float:right" @click="save()">save</v-btn>
        </div>
        <p style="font-weight: bold;"> {{ fName }} {{ lName }} </p>
        <br>
        <p> {{ season }} {{ year }} </p>
    </div>

    <div class="ml-10 mr-16">
        <div class="pb-5">
            <p class="text-h6">Academic</p>
            <div>
                <v-card class="rounded-0" style="background-color:#D5DFE7">
                    <div v-for="a in accommodations" :key="a.id">
                        <v-checkbox 
                            v-if="a.categoryName == 'Academic'"
                            v-model="selectedAccommodations[a.accomId]"
                            :value="a.id"
                            :label="a.title" 
                            color="primary" 
                            style="font-weight: bold; color:black">
                    </v-checkbox>
                    </div>                
                </v-card>
            </div>
        </div>

        <div class="pb-5">
            <p class="text-h6">Chapel</p>
            <div>
                <!-- v-for through student accommodations that are of the chapel specification -->
                <v-card class="rounded-0" style="background-color:#D5DFE7">
                    <div v-for="a in accommodations" :key="a.id">
                        <v-checkbox 
                            v-if="a.categoryName == 'Chapel'"
                            v-model="selectedAccommodations[a.accomId]"
                            :value="a.id"
                            :label="a.title" 
                            color="primary" 
                            style="font-weight: bold; color:black">
                    </v-checkbox>
                    </div>
                </v-card>
            </div>
        </div>        

        <div class="pb-5">
            <p class="text-h6">Housing</p>
            <div>
                <v-card class="rounded-0" style="background-color:#D5DFE7">
                    <div v-for="a in accommodations" :key="a.id">
                        <v-checkbox 
                            v-if="a.categoryName == 'Housing'"
                            v-model="selectedAccommodations[a.accomId]"
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