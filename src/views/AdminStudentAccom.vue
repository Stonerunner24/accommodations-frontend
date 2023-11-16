<script setup>
    import StudentAccomServices from "../services/studentAccomServices";
    import { ref, onMounted } from 'vue';
    import router from '../router';

    const filterType = ref(null);
    const searchValue = ref(null);
    const studentAccom = ref([]);
    const tableData = ref([]);
    const noDataMsg = ref(null);
    const showTable = ref(false);

    const findAccommodations = async () => {
        tableData.value = [];
        showTable.value = false;
        if(filterType.value == "Student ID"){ //find by student
            await StudentAccomServices.getAllForStudent(searchValue.value)
                .then((response) => {
                    studentAccom.value = response.data;
                })
                .catch((err) => {
                    if(err.response && err.response.status === 404)
                        noDataMsg = `No data found for student with ID ${searchValue.value}`;
                });
        }
        else if(filterType.value == "Semester") { //find by semester
            await StudentAccomServices.getAllForSemester(searchValue.value)
                .then((response) => {
                    studentAccom.value = response.data;
                })
                .catch((err) => {
                    if(err.response && err.response.status === 404)
                        noDataMsg = `No data found for Semester ${searchValue.value}`;
                });
        } else return;
        //loop through studentAccom to parse data and put in array
        studentAccom.value.forEach((currentValue) => {
            const student = currentValue.student;
            const semester = currentValue.semester;
            const accommodation = currentValue.accommodation;
            let bridge = {
                uName: student.fName + ' ' + student.lName,
                id: student.studentId,
                semester: semester.season + ' ' + semester.year,
                type: accommodation.title,
                category: accommodation.categoryName
            };
            tableData.value.push(bridge);
        });
        showTable.value = true;
    }

</script>
<template>
    <div>
        <v-title class="text-h5" style="font-weight: bold;">View Student Accommodations</v-title>
    </div>
    <div class pa-4>
        <v-card style="background-color:#D5DFE7" class="pa-4">
            <div>
               <v-combobox
                    v-model="filterType"
                    label="Select Filter"
                    :items="['Student ID', 'Semester']"
                    style="width:15rem"
               ></v-combobox>
               <p v-if="filterType">{{ filterType }}</p>
                <v-text-field v-if="filterType=='Student ID'"
                    v-model="searchValue"
                    style="width: 20rem"
                ></v-text-field>
                <v-combobox
                    v-if="filterType=='Semester'"
                    v-model="searchValue"
                    :items="['FA2023', 'SP2023']"
                    style="width:15rem"
                ></v-combobox>
                <v-btn 
                    variant="elevated"
                    @click="findAccommodations()"
                    rounded="lg"
                    style="background-color: #118ACB;
                           color: white"
                >
                    Find Accommodations
                </v-btn>
            </div>
            <div class="ma-4">
                <p v-if="noDataMsg">{{ noDataMsg }}</p>
                <v-table
                v-if="tableData.length > 0"
                fixed-header
                height = "20%"
                >
                <thead>
                    <tr>
                    <th>Name</th>
                    <th>Student ID</th>
                    <th>Semester</th>
                    <th>Accommodation</th> 
                    <th>Category</th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                    v-for="data in tableData"
                    :key="data.studentId">
                    <td>{{ data.uName }}</td>
                    <td>{{ data.id }}</td>
                    <td>{{ data.semester }}</td>
                    <td>{{ data.type }}</td>
                    <td>{{ data.category }}</td>
                    </tr>
                </tbody>
                </v-table>

            </div>
        </v-card>

    </div>

</template>