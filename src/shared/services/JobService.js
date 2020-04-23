import jsonToArray from "../functions/jsonToArray";

const API_URL = 'https://cs5200-spring2020-hartenstine.com/api/';
// const API_URL= 'http://localhost:8080/api/';

export default class JobService {

    createFavorite = (favorite) =>
        fetch(API_URL + "addfavorite", {
            method: 'POST',
            body: JSON.stringify(favorite),
            headers: {'Content-Type': 'application/json; charset=utf-8'}
        }).then(response => {
            console.log(favorite);
            console.log(response);
        });

    findJobs = () =>
        fetch(API_URL + "allJobs", {
            crossDomain: true,
            method: 'GET',
            headers: {'Content-Type': 'application/json; charset=utf-8'}
        })
            .then(response => response.json())
            .then(response => {
                return jsonToArray(
                    response,
                    ["id", "title", "company", "location", "description"]);
            });

    findFavorites = (id) =>
        fetch(API_URL + "student/" + id + "/favorites", {
            crossDomain: true,
            method: 'GET',
            headers: {'Content-Type': 'application/json; charset=utf-8'}
        })
            .then(response => response.json())
            .then(response => {
                return jsonToArray(
                    response.map(favorite => {
                        favorite.job.followup = favorite.followup
                        favorite.job.id = favorite.id
                        return favorite.job
                    }),
                    ["id", "title", "company", "location", "description", "followup"]);
            });

    deleteJob = jobId =>
        fetch(API_URL + "jobs/" + jobId, {
            crossDomain: true,
            method: 'DELETE',
            headers: {'Content-Type': 'application/json; charset=utf-8'}
        })
            .then(response => {
                console.log(response);
            });

    deleteFavorite = id =>
        fetch(API_URL + "favorites/" + id, {
            crossDomain: true,
            method: 'DELETE',
            headers: {'Content-Type': 'application/json; charset=utf-8'}
        })
            .then(response => {
                console.log(response);
            });

}


