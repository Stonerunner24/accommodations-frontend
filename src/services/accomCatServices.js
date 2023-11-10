import apiClient from "./services";
var baseURL = "/accomCats/";

export default{
    getAll(){
        return apiClient.get(baseURL);
    },
    getOne(accomCatId){
        return apiClient.get(baseURL + `category/${accomCatId}`);
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