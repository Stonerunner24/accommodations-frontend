<script setup>
    import AccommodationServices from "../services/accommodationServices.js";
    import accomCatServices from "../services/accomCatServices";
    import { ref, onMounted } from 'vue';
    import router from '../router';

    const accoms = ref([]);
    const cats = ref([]);
    const select = ref([]);

    async function getAccommodations(){
        try {
            const response = await AccommodationServices.getAll();
            accoms.value = response.data;
            console.log(response)
        } catch (err) {
            console.log(err);
        }
    }
    async function getAccomCats(){
        try {
            const response = await accomCatServices.getAll();
            cats.value = response.data;
            setCategories();
            setDefaultCatValues();
            console.log('cats:', response.data[1].name)
        } catch (err) {
            console.log(err)
        }
    }
    function setCategories(){
        const uniqueCategories = new Set(cats.value.map(item => item.name));
        cats.value = Array.from(uniqueCategories).map(name => ({ name }));
    }
    function setDefaultCatValues() {
        select.value = accoms.value.map((accom) => accom.categoryName);
    }
    onMounted(async() =>{
        await getAccommodations();
        await getAccomCats();
        setDefaultCatValues();
    })

    function save(a, index){
        let accomData = {
            categoryName: select.value[index]
        };
        AccommodationServices.update(a.accomId, accomData)
        this.router.go()
    }
    function deleteUser(id){
        AccommodationServices.delete(id)
        this.router.go()
    }
    function newAccom(){
        router.push({ name: 'adminAccomManage'});
    }
</script>

<template>
    <div>
        <v-title class="text-h5" style="font-weight: bold;">View Accommodations</v-title>
    </div>

    <div class="pa-4">
        <v-table>
            <thead>
                <tr>
                    <th class="text-left">
                        Title
                    </th>
                    <th class="text-left">
                        Description
                    </th>
                    <th class="text-left">
                        Category
                    </th>
                </tr>
            </thead>
        
            <tr v-for="(a, index) in accoms" style="background-color: #D5DFE7;">
                <td class="pa-4">{{ a.title }}</td>
                <td>{{ a.description }}</td>
                <td>
                    <v-combobox
                        :items="cats.map(cat => cat.name)"
                        label="category"
                        v-model="select[index]"
                    ></v-combobox>
                </td>
                <td class="pa-4">
                    <v-btn class="mr-4" color="error" style="float:right" @click="deleteUser(a.accomId)">delete</v-btn>
                    <v-btn class="mr-4" color="#F9C634" style="float:right" @click="save(a, index)">save</v-btn>
                </td>
            </tr>
        </v-table>
    </div>
    <div>
        <v-btn class="mr-4" color="success" style="float:right" @click="newAccom()">New Accommodation</v-btn>
    </div>
</template>