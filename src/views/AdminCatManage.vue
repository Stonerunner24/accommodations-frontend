<script setup>
    import accomCatServices from "../services/accomCatServices";
    import { ref } from 'vue';
    import router from '../router';

    let textName = ref('');
    
    function save(){
        let categoryData = {
            name: textName.value,
        };
        accomCatServices.create(categoryData);
        //router.push({ name: 'adminHome'});
    }
    function cancel(){
        router.push({ name: 'adminHome'});
    }
</script>

<template>
    <p>{{ textName }}</p>
    <div>
        <v-title class="text-h5" style="font-weight: bold;">Manage Category</v-title>
    </div>

    <div class="pa-4">
        
        <v-card style="background-color:#D5DFE7" class="pa-4">
            <div>
                <p class="pl-5" style="font-weight: bold;">Category Name</p>
                <v-text-field class="pl-5 pr-5" label="name of category" v-model="textName"></v-text-field>
            </div>
        </v-card>

        <div class="ma-6">
            <v-btn class="ml-4" style="float:right" @click="cancel()">cancel</v-btn>
            <v-btn class="mr-4" color="#F9C634" style="float:right" @click="save()">save</v-btn>
        </div>
    </div>
</template>