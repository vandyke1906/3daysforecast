import axios from "axios";

const API_ROUTE = process.env.REACT_APP_API_HOST;

const searchLocation = (location) => {
    return new Promise((resolve, reject) => {
        axios.get(`${API_ROUTE}/api/get-location`, {
            params: { location }
        })
            .then(result => resolve(result.data))
            .catch(error => reject(error.message || error))
    })
}

const getDailyForecast = (locationKey, days = 3) => {
    return new Promise((resolve, reject) => {
        axios.get(`${API_ROUTE}/api/get-daily-forecast`, {
            params: { locationKey, days }
        })
            .then(result => resolve(result.data))
            .catch(error => reject(error.message || error))
    })
}




export {
    searchLocation,
    getDailyForecast
};