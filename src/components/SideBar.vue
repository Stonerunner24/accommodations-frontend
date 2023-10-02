<script>
import { ref, onMounted } from "vue";
import Utils from "../config/utils";
import AuthServices from "../services/authServices";
/***************
 * TODO: Add navigation to each link on this page
 **************/



</script>
<template>
    <div>
        <v-navigation-drawer :width="240" color="sidebar">
            <v-expansion-panels color="sidebar" variant="accordion">
                <v-expansion-panel
                    color="sidebar"
                    title="Requests" 
                >
                    <v-expansion-panel-text>
                        <v-row>
                            <v-btn variant="text">
                                Make a Request
                            </v-btn>
                        </v-row>
                        <v-row>
                            <v-btn variant="text">
                                View Requests
                            </v-btn>
                        </v-row>
                    </v-expansion-panel-text>
                </v-expansion-panel>
                <v-expansion-panel
                    title="Accommodations"
                    text="View Accommodations"    
                >
                </v-expansion-panel>
                <v-expansion-panel
                    title="FAQ"
                    text="FAQs"    
                >
                </v-expansion-panel>
            </v-expansion-panels>
        </v-navigation-drawer>
        <!-- <v-container color="sidebar">
            <v-expansion-panels>
                <v-expansion-panel
                    title="Requests"    
                    text="Make A Request \nView Requests"   
                >
                </v-expansion-panel>
            </v-expansion-panels>
        </v-container> -->
    </div>
</template>