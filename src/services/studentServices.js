import apiClient from "./services";
var baseURL = "/students/";

export default{
    getAll(){
        return apiClient.get(baseURL);
    },
    getOne(studentId){
        return apiClient.get(baseURL+`id/${studentId}`);
    },
    getEmail(email){
        return apiClient.get(baseURL+`email/${email}`);
    },
    create(data){
        return apiClient.post(baseURL, data);
    },
    update(studentId, data){
        return apiClient.put(baseURL+`id/${studentId}`, data);
    },
    delete(studentId){
        return apiClient.delete(baseURL + `id/${studentId}`);
    }
};