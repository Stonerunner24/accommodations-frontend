<script setup>
/*DANIEL
* Sorry I changed some stuff around in here. Had to make it work with modern vue conventions.
* - Eli
* - this better work
*/
    import RequestForm from "../components/RequestForm.vue";
    import Permissions from "../components/Permissions.vue";
    import router from "../router";
    import { onMounted, ref } from "vue";
    import RequestServices from "../services/requestServices";
    import StudentServices from "../services/studentServices";
    import StudentAccomServices from "../services/studentAccomServices";
    import Utils from "../config/utils";
import studentAccomServices from "../services/studentAccomServices";

    const user = ref(null);
    const requestForm = ref(false);
    const permissions = ref(false);
    const student = ref({});
    const allRequests = ref([]);
    const studentAccoms = ref([]);
    const semesterAccoms = ref([]);
    const openRequestCount = ref(0);
    // Note: Semesters ought to be populated by calling the API and retrieving existing semester objects
    const Semesters = ['FA2023', 'SP2023', 'FA2022', 'SP2022']; 
    const semesterType = ref();

    onMounted(async () => {
        await findStudent();
        await updateOpenRequestCount();
        await getStudentAccoms();

    })

    //STUDENT PERMISSION METHODS
    //retrieve student via user email
    const findStudent = async() => {
        user.value = null;
        user.value = Utils.getStore("user");
        await StudentServices.getEmail(user.value.email)
            .then((response) => {
                student.value[0] = response.data[0];
                console.log("inside find student");
                console.log(student.value);
                if(!student.value[0].permission){
                    permissions.value = true;
                }
            })
            .catch(async (err) => {
                if(err.response && err.response.status === 404){
                    console.log(err);
                    permissions.value = true;
                }
            });
        // console.log(student.value[0].permission);
        // permissions.value = student.value[0].permission ? false : true;
    }

    const createStudent = async (studentId) => {
        //console.log('entering student creation');
        user.value = null;
        user.value = Utils.getStore("user");
        const data = {
            studentId: studentId,
            fName: user.value.fName,
            lName: user.value.lName,
            email: user.value.email,
            permission: 1,
            version: 1.1,
        };
        await StudentServices.create(data)
            .catch((err) => {
                console.error(err);
            });
        student.value = null;
        await StudentServices.getOne(studentId)
            .then((response) => {
                student.value = response.data;
                console.log(student.value);
            });
        console.log(student);
        return student;
    }

    const addConsent = async (studentId) => {
        console.log('adding consent');
        student.value = null;
        await StudentServices.getOne(studentId)
            .then(async (response) => {
                student.value = response.data;
                const data = {
                    permission: 1,
                    dateSigned: new Date()
                };
                console.log(data);
                user.value = null;
                user.value = Utils.getStore("user");
                //console.log(user.value);
                await StudentServices.update(studentId, data);
            })
            .catch(async (err) => {
                console.log(err);
                if(err.response && err.response.status === 404){
                    await createStudent(studentId)
                        .then((response) => {
                            student.value = response.data;
                        });
                }
            });
        permissions.value = false;
    }
    //END STUDENT PERMISSION METHODS

    //CREATE REQUEST METHODS
    const handleCreate = (selectedSem) => {
        console.log(selectedSem);
        let season = selectedSem.charAt[0] = 'F' ? 'Fall' : 'Spring';
        let year = selectedSem.substring(2,6);
        console.log(season + ' ' + year);
        createRequest(season, year);
        requestForm.value = false;
    };

    const handleSelectedSemester = () => {
        console.log(semesterType);
        
    }
    

    const createRequest = async(season, year) => {
        //console.log("made it into the createRequest function");
        //console.log(student.value[0]);
        
        user.value = null;
        user.value = Utils.getStore("user");
        const data = {
            season: season,
            year: year,
            email: user.value.email,
            //semester: 
        };
        console.log(data);
        await RequestServices.create(data)
            .then((response) => {
                
                console.log(response.data);
            }) 
            .catch((e) => {
                console.log(e.response.data.message);
            });
        /*RequestServices.getAllForStudent(student.value.studentId)
            .then((response) => {
                console.log(response.data);
            })
            .catch((e) => {
                console.log(e.response.data.message);
            });
            */
           updateOpenRequestCount();
           getStudentAccoms();
        };
        
       
        const getStudentAccoms = async()=>{
            await StudentAccomServices.getAllForStudent(student.value.studentId)
            .then((response)=>{
                console.log("this is the student accom list");
                console.log(response.data);
                studentAccoms.value = response.data;
                console.log(studentAccoms);
                console.log("these are the semesters for each request");
                studentAccoms.value.forEach((item)=>{
                    console.log(item.semester);
                })
            })
            .catch((e) =>{
                console.log(e.response)
            })

        };


        const updateOpenRequestCount = async()=> {
            openRequestCount.value = 0;
            await RequestServices.getAllForStudent(student.value.studentId)
            .then((response) => {
                allRequests.value = response.data;
                console.log("this is the openRequests");
                console.log(allRequests.value);
                
            });
            allRequests.value.forEach((item)=> {
                if(item.status == "Open"){
                    openRequestCount.value++;
                };
            });
            
            
        };
        
        const updateSemesterRequest = async(selectedSem)=>{
            //semesterAccoms.value = []; 
            semesterAccoms.value.forEach((item)=>{
                semesterAccoms.value.pop();
            })
            studentAccoms.value.forEach((item)=>{
                //console.log(item.semester.season.substring(0,1));
                //console.log(item.semester.year.substring(2));
                console.log(item.semester.season.substring(0,2).toUpperCase() + item.semester.year);
                if(item.semester.season.substring(0,2).toUpperCase() + item.semester.year == selectedSem){
                    semesterAccoms.value.push(item)
                }
            })
            
        }
    
    //END CREATE REQUEST METHODS

</script>

<template>    
    <div class="pa-5">
        <div class="pa-7">
            <p  class="text-h6 text-left">
                My Requests
                <v-btn 
                    @click="requestForm = true" 
                    class="mr-15" 
                    rounded="lg" 
                    elevation="2" 
                    style="background-color:#118ACB; 
                        color:white; 
                        float:right"
                    >
                    MAKE A REQUEST
                </v-btn>
            </p>
            
        </div>
        <v-card class="pa-7 mr-15" style="background-color: #D5DFE7;">
            <!--add a conditional v-if for when open request = 0 to say no open requests-->
            <!--
            <v-text v-if="openRequest == 0">No open requests.</v-text>
            -->
            <p v-if="openRequestCount == 0"> No open requests.</p>
            <p v-else>You have {{ openRequestCount }} open requests.</p>
            <!--add a conditional v-else for when open requests > 0 to give a number n of how many requests are open-->
            <!--
            <v-text v-else>{{ openRequest.count }} open requests.</v-text>
        -->
        </v-card>
        <div class="pa-7">
        <v-btn
            @click = "updateSemesterRequest(semesterType)"
           class="mr-15" 
           rounded="lg" 
           elevation="2" 
           style="background-color:#118ACB; 
               color:white; 
               float:right">Choose Semester</v-btn>

            <p  class="text-h6 text-left">
                My Accomodations.
                <!--
                <v-btn 
                    @click="requestForm = true" 
                    class="mr-15" 
                    rounded="lg" 
                    elevation="2" 
                    style="background-color:#118ACB; 
                        color:white; 
                        float:right"
                    >
                    MAKE A REQUEST
                </v-btn>-->
                <v-combobox label="Semester"
                 v-model="semesterType"
                 :items = "Semesters" 
                 style = "width:15rem" 
                 class = "semesterBox"
                 ></v-combobox>

            </p>
        </div>
        <v-card class="pa-7 mr-15" style="background-color: #D5DFE7;">
        <p v-if="semesterAccoms.length == 0">You have no accommodations for this semester.</p>
        <li v-for="item in semesterAccoms">{{ item.data }}</li>
        </v-card>
        <v-dialog
            v-model="requestForm"
            width="auto"
            >
            <RequestForm 
                :semesters="Semesters"
                @createRequest="handleCreate"
                @cancel="(requestForm = false)"
            />
        </v-dialog>
        <v-dialog
            persistent
            v-model="permissions"
            width="auto"    
        >
            <Permissions
                @signedForm="addConsent" 
                @cancel="router.push({name: 'login'})"
            />
        </v-dialog>
    </div>
    
</template>