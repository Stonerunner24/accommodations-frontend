import apiClient from "./services.js";

export default{
    createCourse(data){
        return apiClient.post(`/accommodations/courses/`, data);
    },
    getAllCourses(){
        return apiClient.get(`/accommodations/courses/`);
    },
    getCourse(courseNumber){
        return apiClient.get(`/accommodations/courses/${courseNumber}`);
    }
};