import apiClient from "./services";
var baseURL = "/studentAccom/";

export default{
    getAll(){
        return apiClient.get(baseURL);
    },
    getOne(studentAccomId){
        return apiClient.get(baseURL + `studentAccomId/${studentAccomId}`);
    },
    getAllForStudent(studentId){
        return apiClient.get(baseURL + `studentId/${studentId}`);
    },
    getAllForSemester(semesterId){
        console.log("made it to the get all for semester function in student accom service");
        return apiClient.get(baseURL + `semesterId/${semesterId}`);
    },
    getAllForAccommodation(accomId){
        return apiClient.get(baseURL + `accomId/${accomId}`);
    },
    create(data){
        return apiClient.post(baseURL, data);
    },
    update(studentAccomId, data){
        return apiClient.put(baseURL + `${studentAccomId}`, data);
    },
    delete(studentAccomId){
        console.log('deleting ' + studentAccomId);
        return apiClient.delete(baseURL+`${studentAccomId}`);
    },
    deleteAll(){
        console.log('deleting all');
        return apiClient.delete(baseURL);
    }
};