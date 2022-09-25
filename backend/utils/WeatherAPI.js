import axios from "axios";

class WeatherAPI {
    constructor(apiKey) {
        if (!apiKey) throw new Error("Required api key.");
        this.#apiKey = apiKey;
    }
    #apiKey;
    #baseUrl = "http://dataservice.accuweather.com/";

    searchLocation(value) {
        if (!value) return Promise.reject("value is required.")
        return axios.get(`${this.#baseUrl}locations/v1/cities/autocomplete`, {
            params: {
                apikey: this.#apiKey,
                q: value
            }
        });
    }

    /**
     * 
     * @param {String|Number} locationKey 
     * @param {1|5|10|15} days 
     */
    getDailyForecast(locationKey, days) {
        if (!locationKey) return Promise.reject("Location key is required.")
        let nearestDay = 1;
        if (days == 1)
            nearestDay = 1;
        else if (days <= 5)
            nearestDay = 5;
        else if (days <= 10)
            nearestDay = 10;
        else if (days <= 15)
            nearestDay = 15;
        return axios.get(`${this.#baseUrl}forecasts/v1/daily/${nearestDay}day/${locationKey}`, {
            params: {
                apikey: this.#apiKey,
                details: true,
                metric: true
            }
        });
    }
}

export default WeatherAPI;
