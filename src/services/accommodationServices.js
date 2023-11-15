import apiClient from "./services";
var baseURL = "/accommodation/";

export default{
    getAll(){
        return apiClient.get(baseURL);
    },
    getAllForCategory(categoryName){
        return apiClient.get(baseURL + `accommCategory/${categoryName}`);
    },
    create(data){
        return apiClient.post(baseURL, data);
    },
    update(accommId, data){
        return apiClient.put(baseURL + `${accommId}`, data);
    },
    delete(accommId){
        console.log('deleting');
        return apiClient.delete(baseURL+`${accommId}`);
    },
    deleteAll(){
        console.log('deleting all');
        return apiClient.delete(baseURL);
    }
};