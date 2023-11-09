<script setup>
import {ref, onMounted} from "vue";
    // export default{
    //    props: {
    //     semesters: Object
    //    }, 
    //    emits: ['createRequest', 'cancel']
    // }
    const selectedSem = ref(null);
    const props = defineProps({
        semesters: Array,
    });
    
    //TODO: refactor Semesters to use data from backend
</script>

<template>
    <v-container>
        <v-card elevation="5" rounded="lg" width="20rem" style="padding-bottom: 16px; padding-left: 16px">
            <v-card-title>Create New Request</v-card-title>
            <v-combobox
                v-model="selectedSem"
                label="Semester"
                :items="semesters"
                variant="underlined"
                style="float:left; width:60%; padding-left: 16px"
            ></v-combobox>
            <v-btn
                @click="$emit('createRequest', selectedSem)" 
                rounded="lg" 
                elevation="2" 
                style="background-color:#118ACB; 
                    color:white; 
                    float:right;
                    margin-right: 24px"
                >
                Submit Request
            </v-btn>
            <v-btn
                flat
                @click="$emit('cancel')" 
                rounded="lg" 
                elevation="2" 
                style="background-color: silver;
                    color:black; 
                    float:right;
                    margin-right: 16px"
                >
                Cancel
            </v-btn>
        </v-card>
        
    </v-container>
</template>