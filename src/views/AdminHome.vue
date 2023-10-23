<script setup>
import { ref, onMounted } from 'vue';
import RequestServices from '../services/requestServices.js';

// Holds all open requests with their associated Student
const openRequests = ref([]);

onMounted(async () => {
  try {
    // Get data from API call
    const response = await RequestServices.getAllForStatus('Open');
    // Save in openRequests variable
    openRequests.value = response.data;
  } catch (error) {
    console.error(error);
  }
});
</script>

<template>
    
    <v-container>
        <h1>Open Requests</h1>
        <v-table
          fixed-header
          height = "20%"
          >
          <thead>
            <tr>
              <th>Name</th>
              <th>Student ID</th>
              <th>Email</th>
              <th>Date Opened</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="request in openRequests"
              :key="request.studentId">
              <td>{{ `${request.student.fName} ${request.student.lName}` }}</td>
              <td>{{ request.studentId }}</td>
              <td>{{ request.student.email }}</td>
              <td>{{ request.dateMade }}</td>
              <td>
                <v-button>Add Accommodations</v-button>
              </td>
            </tr>
          </tbody>
        </v-table>
    </v-container>
</template>
<style>
</style>