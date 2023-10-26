<script setup>
    //import MenuBar from "../components/MenuBar.vue"
    import accommServices from "../services/accommodationServices.js"
    import {ref, onMounted} from "vue";

    const accommodations = ref([])

    async function getAccomm() {
        await accommServices.getAll()
            .then((response) => {
                accommodations.value = response.data;
                console.log(accommodations.value);
            })
            .catch((err) => {
                console.log(err);
            })
    }
    onMounted(async() =>{
        await getAccomm();
    })
</script>

<template>
    <!-- <MenuBar/> -->
    <div class="ma-6">
        <div>
            <v-text class="text-h5" style="font-weight: bold;">Add Accommodations</v-text>
            <v-btn class="ml-4" style="float:right">cancel</v-btn>
            <v-btn class="mr-4" color="#F9C634" style="float:right">save</v-btn>
        </div>
        <v-text>{{ studentName }} John Doe</v-text>
        <v-text>{{ semseter }} Fall 2023</v-text>
    </div>

    <div class="ml-10 mr-16">
        <div class="pb-5">
            <v-text class="text-h6">Academic</v-text>
            <div>
                <v-card class="rounded-0" style="background-color:#D5DFE7">
                    <v-checkbox label="Accommodation Name" color="primary" style="font-weight: bold; color:black"></v-checkbox>
                </v-card>
            </div>
        </div>

        <div class="pb-5">
            <v-text class="text-h6">Chapel</v-text>
            <div>
                <!-- v-for through student accommodations that are of the chapel specification -->
                <v-card>
                    <v-checkbox v-for="a in accommodations" color="primary" style="font-weight: bold; color:black">{{ a.categoryName }}</v-checkbox>
                </v-card>
                <!--temporary v-card-->
                <!-- <v-card  class="rounded-0" style="background-color:#D5DFE7">
                    v-for="a in accommodations">{{ a.categoryName }}
                </v-card> -->
            </div>
        </div>        

        <div class="pb-5">
            <v-text class="text-h6">Housing</v-text>
            <div>
                <v-card class="rounded-0" style="background-color:#D5DFE7">
                    <v-checkbox label="Accommodation Name" color="primary" style="font-weight: bold; color:black"></v-checkbox>
                </v-card>
            </div>
        </div>
    </div>

    <div class="ma-6">
        <v-btn class="ml-4" style="float:right">cancel</v-btn>
        <v-btn class="mr-4" color="#F9C634" style="float:right">save</v-btn>
    </div>
</template>