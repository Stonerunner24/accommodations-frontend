import apiClient from "./services";
var baseURL = "/students/";

export default{
    getAll(){
        return apiClient.get(baseURL);
    },
    getOne(studentId){
        return apiClient.get(baseURL+`${studentId}`);
    },
    create(data){
        return apiClient.post(baseURL, data);
    },
    update(studentId, data){
        return apiClient.put(baseURL+`${studentId}`, data);
    },
    delete(studentId){
        return apiClient.delete(baseURL + `${studentId}`);
    }
};