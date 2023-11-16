<script setup>
    import accomCatServices from "../services/accomCatServices";
    import { ref, onMounted } from 'vue';
    import accommodationServices from "../services/accommodationServices";
    import router from '../router';

    const accomCategory = ref([]);
    const catNames = ref([]);

    let textTitle = ref('');
    let textDescription = ref('');
    const select = ref(null);

    async function getAccomCat(){
        try {
            const response = await accomCatServices.getAll();
            accomCategory.value = response.data;
            setCatNames();
            console.log(response)
        } catch (err) {
            console.log(err);
        }
    }
    function setCatNames(){
        catNames.value = accomCategory.value.map(item => item.name);
    }
    onMounted(async() =>{
        await getAccomCat();
    }) 
    function save(){
        console.log(select.value)

        let accomData = {
            categoryName: select.value,
            title: textTitle.value,
            description: textDescription.value,
            explanationFile: '',
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        console.log('accom: ', accomData)
        accommodationServices.create(accomData);
       router.push({ name: 'adminViewAccom'});
    }
    function cancel(){
        router.push({ name: 'adminViewAccom'});
    }
</script>

<template>
    <div>
        <v-title class="text-h5" style="font-weight: bold;">Add New Accommodation</v-title>
    </div>

    <div class="pa-4">
        
        <v-card style="background-color:#D5DFE7" class="pa-4">
            <div>
                <p class="pl-5" style="font-weight: bold;">Category</p>
                <v-combobox v-if="accomCategory.length > 0" 
                    class="pl-5 pr-5"
                    :items="catNames"
                    label="select a category"
                    v-model="select"
                ></v-combobox>
                <p v-else>No categories...</p>
            </div>
            <div>
                <p class="pl-5" style="font-weight: bold;">Title</p>
                <v-text-field class="pl-5 pr-5" label="title of accommodation" v-model="textTitle"></v-text-field>
            </div>
            <div>
                <p class="pl-5" style="font-weight: bold;">Description</p>
                <v-text-field class="pl-5 pr-5" label="description of accommodation" v-model="textDescription"></v-text-field>
            </div>
        </v-card>

        <div class="ma-6">
            <v-btn class="ml-4" style="float:right" @click="cancel()">cancel</v-btn>
            <v-btn class="mr-4" color="#F9C634" style="float:right" @click="save()">save</v-btn>
        </div>
    </div>
</template>