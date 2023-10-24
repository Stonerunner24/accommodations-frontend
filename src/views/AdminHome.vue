<script setup>
import { ref, onMounted } from 'vue';
import RequestServices from '../services/requestServices.js';
import moment from 'moment';

// Holds all open requests with their associated Student
const openRequests = ref([]);
const closedRequests = ref([]);
const cancelModal = ref(false);
const selectedRequest = ref(null);

onMounted(async () => {
  try {
    // Get data from API call
    const response = await RequestServices.getAllForStatus('Open');
    // Save in openRequests variable
    openRequests.value = response.data;
    // Get data from API call
    const response2 = await RequestServices.getAllForStatus('Closed');
    // Save in openRequests variable
    closedRequests.value = response2.data;
  } catch (error) {
    console.error(error);
  }
});

const formatDate = (date) => {
  return moment(String(date)).format('MM/DD/YYYY');
}

const addAccom = (request) => {
  // Add code here to change the route. 
  // Pass in the request object so you can get the student info??
  // Can change the parameters of this if necessary
}

const closeRequest = () => {

}
</script>

<template>
    
    <v-container @click.stop>
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
              <td>{{ formatDate(request.dateMade) }}</td>
              <td>
                <!--TODO: Add function call stubs to both these-->
                <!--Add will router-link to AddAccom page--make sure I know what this page is called-->
                <v-btn
                  @click = "addAccom(request)"
                  >Add</v-btn>
                  <!--Close should open a dialog box asking if the user is sure which allows closing of the request without adding accommodations-->
                <v-btn 
                  flat
                  @click = "(closeModal = true), (selectedRequest = request)"
                  >Close</v-btn>
              </td>
            </tr>
          </tbody>
        </v-table>
        <v-divider></v-divider>
        <h1>Closed Requests</h1>
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
              <th>Approved By</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="request in closedRequests"
              :key="request.studentId">
              <td>{{ `${request.student.fName} ${request.student.lName}` }}</td>
              <td>{{ request.studentId }}</td>
              <td>{{ request.student.email }}</td>
              <td>{{ formatDate(request.dateMade) }}</td>
              <td>{{ request.approvedBy }}</td>
            </tr>
          </tbody>
        </v-table>
    </v-container>
</template>
<style>
</style>