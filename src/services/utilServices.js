import apiClient from "./services";
var baseURL = "/utils/";

export default {
    emailFaculty(data) {
        return apiClient.post(baseURL + `sendFacultyEmails`, data);
    },
}