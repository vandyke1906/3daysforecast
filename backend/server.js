import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import WeatherAPI from "./utils/WeatherAPI.js";

dotenv.config();
const app = express();
const host = process.env.HOST || "http://localhost";
const port = process.env.PORT || 9000;
const weatherApiKey = process.env.WEATHER_API;

const weatherApi = new WeatherAPI(weatherApiKey);

app.use(cors())
app.use(express.static("../frontend/build"));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/api/get-location", (req, res) => {
    const location = req.query?.location || "";
    weatherApi.searchLocation(location).then(result => {
        return res.status(200).send(result.data);
    }).catch(error => {
        return res.status(402).send({ error: error.message || error });
    })
})

app.get("/api/get-daily-forecast", (req, res) => {
    const locationKey = req.query?.locationKey || "";
    const days = req.query?.days || 1;
    weatherApi.getDailyForecast(locationKey, days).then(result => {
        if (result?.data?.DailyForecasts) {
            const forecastResult = result.data.DailyForecasts;
            return res.status(200).send(forecastResult.slice(0, days));
        }
        else
            return res.status(200).send([]);
    }).catch(error => {
        return res.status(402).send({ error: error.message || error });
    })
})

app.listen(port, () => console.info(`Server is listening to ${host}:${port}`))