import apiClient from "./services";
var baseURL = "/requests/"

export default{
    getAll(){
        return apiClient.get(baseURL);
    },
    getAllForStudent(studentId){
        return apiClient.get(baseURL + `studentReq/${studentId}`);
    },
    getAllForStatus(status){
        return apiClient.get(baseURL + `statusReq/${status}`);
    },
    create(data){
        return apiClient.post(baseURL, data);
    },
    update(requestId, data){
        return apiClient.put(baseURL + `${requestId}`, data);
    },
    delete(requestId){
        console.log('deleting');
        return apiClient.delete(baseURL+`${requestId}`);
    },
    deleteAll(){
        console.log('deleting all');
        return apiClient.delete(baseURL);
    }
};