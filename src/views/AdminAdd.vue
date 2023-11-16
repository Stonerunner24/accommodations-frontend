<script setup>
import accommServices from "../services/accommodationServices.js"
import requestServices from "../services/requestServices.js"
import studentAccomServices from "../services/studentAccomServices"
import { ref, onMounted } from "vue";
import { useRoute } from 'vue-router'
import { computed } from 'vue';
import router from '../router';
import Utils from "../config/utils";
import accomCatServices from "../services/accomCatServices";
import utilServices from "../services/utilServices";

const accommodations = ref([]);
const request = ref([]);
const route = useRoute();
const accomCategory = ref([]);
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
            //console.log('accommodations: ', accommodations.value);
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
            //console.log(request);
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
async function getAccomCat() {
    await accomCatServices.getAll()
        .then((response) => {
            //console.log(response);
            accomCategory.value = response.data;
        })
        .catch((err) => {
            console.log(err);
        })
}
onMounted(async () => {
    await getAccomm();
    await getRequest();
    await getAccomCat();
})

const selectedAccommodations = ref([]);

function cancel() {
    router.push({ name: 'adminHome' });
}

async function save() {

    let studentAccomData = {
        accomId: null,
        data: null,
        createdAt: null,
        updatedAt: null,
        semesterId: null,
        studentId: null,
    }

    let checkedAccommodations = selectedAccommodations.value;
    //console.log('selected accom', checkedAccommodations)
    //console.log(request.value);

    let promises = [];
    for (let i = 0; i < selectedAccommodations.value.length; i++) {
        if (selectedAccommodations.value[i]) {
            let accom = findAccomById(i);
            studentAccomData.accomId = accom.accomId;
            studentAccomData.data = null;
            studentAccomData.createdAt = new Date(),
                studentAccomServices.updatedAt = new Date(),
                studentAccomData.semesterId = request.value.semesterId;
            studentAccomData.studentId = request.value.studentId;

            studentAccomServices.create(studentAccomData);

            promises.push(studentAccomServices.create(studentAccomData));
        }
    }
    await Promise.all(promises);

    requestServices.update(requestId, { approvedBy: (user.fName + ' ' + user.lName), status: 'Closed' });
    // Send the emails
    const data = {
        studentId: request.value.studentId,
        semesterId: request.value.semesterId,
    }
    utilServices.emailFaculty(data)
        .then((response) => {
            // console.log(response.data);
        })
        .catch((e) => {
            console.log(e.response);
        });
    // Back to homepage
    router.push({ name: 'adminHome' });
}

function findAccomById(id) {
    for (let a of accommodations.value) {
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

        <p> {{ season }} {{ year }} </p>
    </div>

    <div v-for="ac in accomCategory">
        <div class="ml-10 mr-16">
            <div class="pb-5">
                <p class="text-h6">{{ ac.name }}</p>
                <div>
                    <v-card class="rounded-0" style="background-color:#D5DFE7">
                        <div v-for="a in accommodations" :key="a.id">
                            <v-checkbox v-if="a.categoryName == ac.name" v-model="selectedAccommodations[a.accomId]"
                                :value="a.id" :label="a.title" color="primary" style="font-weight: bold; color:black">
                            </v-checkbox>
                        </div>
                    </v-card>
                </div>
            </div>
        </div>
    </div>

    <div class="ma-6">
        <v-btn class="ml-4" style="float:right" @click="cancel()">cancel</v-btn>
        <v-btn class="mr-4" color="#F9C634" style="float:right" @click="save()">save</v-btn>
    </div>
</template>