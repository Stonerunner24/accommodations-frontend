<script setup>
    import { ref } from 'vue';
    const permissionBox = ref(null);
    const studentId = ref(null);
</script>

<template>
    <v-container>
        <v-card 
            elevation="5" rounded="lg" width="30rem" 
            style="padding-bottom: 16px; padding-left: 16px; padding-right: 16px;"
        >
            <v-card-title>Sign Permission Form</v-card-title>
            <v-checkbox
                v-model="permissionBox"
                :label="'I consent to have data about my accommodations shared '+
                        'with Oklahoma Christian University faculty and staff.'"
                color="#118ACB"
            >
            </v-checkbox>
            <v-text-field 
                label="Student ID"
                v-model="studentId"
                >
            </v-text-field>
            <v-btn
                :disabled="!permissionBox || !studentId"
                @click="$emit('signedForm', studentId)"
                rounded="lg"
                elevation="2"
                style="background-color: #118ACB;
                       color: white;
                       float: right;
                       margin-right: 24px"
            >
                Submit
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