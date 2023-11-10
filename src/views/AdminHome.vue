<script setup>
import { ref, onMounted } from 'vue';
import RequestServices from '../services/requestServices.js';
import moment from 'moment';
import CloseModal from '../components/CloseModal.vue'
import router from '../router';

// Holds all open requests with their associated Student
const openRequests = ref([]);
const closedRequests = ref([]);
const openReqBool = ref(false);
const closedReqBool = ref(false);
const closeModal = ref(false);
const selectedRequest = ref(null);
let requestData = ref(null);

onMounted(async () => {
  loadRequests();
});

const loadRequests = async () => {
  try {
    // Get data from API call
    const response = await RequestServices.getAllForStatus('Open');
    console.log(response);
    // Save in openRequests variable
    openRequests.value = response.data;
    // Set boolean based on data length
    openReqBool.value = (response.data.length > 0);
    
    // Get data from API call
    const response2 = await RequestServices.getAllForStatus('Closed');
    console.log(response2);
    // Save in openRequests variable
    closedRequests.value = response2.data;
    // Set boolean based on data length
    closedReqBool.value = (response2.data.length > 0);

    requestData = response.data;
  } catch (error) {
    console.error(error);
  }
}

const formatDate = (date) => {
  return moment(String(date)).format('MM/DD/YYYY');
}

const addAccom = (request) => {
  // Add code here to change the route. 
  // Pass in the request object so you can get the student info??
  // Can change the parameters of this if necessary

  router.push({ name: 'adminAdd', params: { id: request.requestId }});

  console.log(request);
}

const closeRequest = (request) => {
  const updatedRequest = {
    requestId: request.requestId,
    dateMade: request.dateMade,
    approvedBy: null,
    status: 'Closed',
    semester: request.semester,
    studendId: request.studentId
  };
  console.log(updatedRequest);
  console.log(updatedRequest.requestId);

  RequestServices.update(updatedRequest.requestId, updatedRequest) 
  .then(() => {
    loadRequests();
  })
  .catch((e) => {
    console.log('Close failed');
    console.log(e.response.data.message);
  })
  selectedRequest.value=null;
  closeModal.value=false;
}

</script>

<template>
    
    <v-container @click.stop>
        <h1>Open Requests</h1>
        <v-table
          v-if="openReqBool"
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
              <td student-id={{request.studendId}}>{{ request.studentId }}</td>
              <td>{{ request.student.email }}</td>
              <td>{{ formatDate(request.dateMade) }}</td>
              <td>
                <!--TODO: Add function call stubs to both these-->
                <!--Add will router-link to AddAccom page--make sure I know what this page is called-->
                <v-btn
                  @click = "addAccom(request)"
                  >Approve Request
                </v-btn>
                  <!--Close should open a dialog box asking if the user is sure which allows closing of the request without adding accommodations-->
                <v-btn 
                  flat
                  @click = "(closeModal = true),(selectedRequest = request)"
                  >Close
                </v-btn>
              </td>
            </tr>
          </tbody>
        </v-table>
        <!--If no open requests, display this v-card-->
        <v-card
          v-else
          style="background-color: #D5DFE7;"
        >
          <p>No open requests.</p>
        </v-card>
        <br>
        <v-divider></v-divider>
        <br>
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
    
  <!--Dialog box-->
  <v-dialog
    v-model="closeModal"
    width="auto"
  >
    <CloseModal 
      :selectedRequest="selectedRequest" 
      @handleClose="closeRequest(selectedRequest)"
      @cancel="(closeModal=false),(selectedRequest=null)" />      
  </v-dialog>

  <AdminAdd :requestProp="requestData"></AdminAdd>
  </template>
<style>
</style>