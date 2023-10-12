<script>
    export default{
        
    }


    //TODO: refactor Semesters to use data from backend
    const Semesters = ['FA2023', 'SP2023', 'FA2022', 'SP2022'];
</script>

<template>
    <MenuBar />
    <SideBar />
    <v-container>
        <v-combobox
            label="Semester"
            :items="Semesters"
            variant="underlined"
            style="float:left; width:8%;"
        ></v-combobox>
    </v-container>
</template>