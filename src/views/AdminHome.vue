<script setup>
import { ref, onMounted } from 'vue';
import RequestServices from '../services/requestServices.js';

const headers = ref([
  { title: 'Student ID', key: 'studentId' },
  { title: 'Email', key: 'email' },
  { title: 'Date Opened', key: 'dateMade' },
]);

const requests = ref([]);

onMounted(async () => {
  try {
    const response = await RequestServices.getAllForStatus('Open');
    console.log(response);
    requests.value = response.data;
    console.log("Requests value: " + requests.value);
    // flatten the data 
   
    const flattenedData = response.data.map(item => ({
      ...item,
      email: item.student.email,
      name: item.student.fName + " " + item.student.lName,
    })); 
    requests.value = flattenedData;
    console.log("Flattened requests");
    console.log(requests.value);
  } catch (error) {
    console.error(error);
  }
});
</script>

<template>
    
    <v-container>
        <h1>Open Requests</h1>
        <v-data-table 
          :headers="headers" 
          :items="requests.value" 
          hide-actions 
          show-select
        >
        <template v-slot:items="props">
            <td>{{ props.item.studentId }}</td>
            <td>{{ props.item.email }}</td>
            <td>{{ props.item.dateMade }}</td>
          </template>
        </v-data-table>
    </v-container>
</template>