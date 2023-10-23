<script setup>
import { ref, onMounted } from 'vue';
import RequestServices from '../services/requestServices.js';
import { computed } from 'vue';

const headers = ref([
  { text: 'Student ID', value: 'studentId' },
  { text: 'Name', value: 'name' },
  { text: 'Email', value: 'email' },
  { text: 'Date Opened', value: 'dateMade' },
]);

const requests = ref([]);

onMounted(async () => {
  try {
    const response = await RequestServices.getAllForStatus('Open');
    console.log("Response data: " + response);
    requests.value = response.data;
    console.log("Requests value: " + requests.value);
    requests.value = requests.value.map(request => {
      const { fName, lName } = request.student;
      console.log("inside computed");
      return {
        ...request,
        name: `${fName} ${lName}`
      };
    });
  } catch (error) {
    console.error(error);
  }
});

const fullName = computed(() => {
  return requests.value.map(request => {
    const { fName, lName } = request.student;
    console.log("inside computed");
    return {
      ...request,
      name: `${fName} ${lName}`
    };
  });
});
</script>

<template>
    
    <v-container>
        <h1>Open Requests</h1>
        <v-data-table :headers="headers" :items="requests.value">
          <template v-slot:items="props">
            <td>{{ props.item.studentId }}</td>
            <td>{{ props.item.name }}</td>
            <td>{{ props.item.student.email }}</td>
            <td>{{ props.item.dateMade }}</td>
          </template>
        </v-data-table>
    </v-container>
</template>