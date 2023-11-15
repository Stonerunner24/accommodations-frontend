<script setup>
import { ref, onMounted } from "vue";
import Utils from "../config/utils";
import AuthServices from "../services/authServices";
import router from "../router";
/***************
 * TODO: Add navigation functions
 *       Add Onclicks to each button
 **************/
const goHome = () => {
    console.log("button pressed"); 
    router.push({name: 'adminHome'});
};

const manageAccom = () => {
    router.push({name: 'adminAccomManage'});
};

const manageCategory = () => {
    console.log('navigate to manage Category');
};

const manageStudent = () => {
    console.log('navigate to manage student');
};

const manageFaculty = () => {
    console.log('navigate to manage faculty');
};

const manageSemester = () => {
    console.log('navigate to manage semesters');
};

</script>
<template>
    <div>
        <v-navigation-drawer :width="240" color="sidebar" permanent>
            <v-expansion-panels color="sidebar" variant="accordion">
                <v-expansion-panel
                    bg-color="sidebar"
                    title="Requests" 
                >
                    <v-expansion-panel-text class="mx-n4 my-n2">
                        <v-list style="padding-top: 1px; padding-bottom: 1px;">
                            <v-list-item title="Home" @click="goHome()" density="compact" width="100%">
                            </v-list-item>
                            <v-list-item title="View Requests" @click="" density="compact">
                            </v-list-item>
                        </v-list>
                    </v-expansion-panel-text>
                </v-expansion-panel>
                <v-expansion-panel
                    bg-color="sidebar"
                    title="Accommodations"   
                >
                    <v-expansion-panel-text class="mx-n4 my-n2">
                        <v-list style="padding-top: 1px; padding-bottom: 1px;">
                            <v-list-item title="View Accommodations" @click="" density="compact" width="100%">
                            </v-list-item>
                        </v-list>
                    </v-expansion-panel-text>
                </v-expansion-panel>
                <v-expansion-panel
                    bg-color="sidebar"
                    title="Maintenance" 
                >
                    <v-expansion-panel-text class="mx-n4 my-n2">
                        <v-list style="padding-top: 1px; padding-bottom: 1px;">
                            <v-list-item title="Accommodations" @click="manageAccom()" density="compact" width="100%">
                            </v-list-item>
                            <v-list-item title="Categories" @click="manageCategory()" density="compact" width="100%">
                            </v-list-item>
                            <v-list-item title="Students" @click="manageStudent()" density="compact" width="100%">
                            </v-list-item>
                            <v-list-item title="Faculty" @click="manageFaculty()" density="compact" width="100%">
                            </v-list-item>
                            <v-list-item title="Semesters" @click="manageSemester()" density="compact" width="100%">
                            </v-list-item>

                        </v-list>
                    </v-expansion-panel-text>
                </v-expansion-panel>
            </v-expansion-panels>
        </v-navigation-drawer>
    </div>
</template>