import React, { useState, useEffect } from 'react'
import moment from "moment"

import { debounce, WEATHER_OBJECT } from "../utils/Helpers"
import * as WeatherApi from "../utils/WeatherApi"

import Row from "antd/lib/row";
import Col from "antd/lib/col";
import Select from 'antd/lib/select';
import Typography from "antd/lib/typography";
import Descriptions from "antd/lib/descriptions";
import Image from "antd/lib/image";
import Card from "antd/lib/card";
import Segmented from "antd/lib/segmented";
import Skeleton from "antd/lib/skeleton";

const FORECAST_KEY = Object.freeze({
    Day: "Day",
    Night: "Night"
})

const CurrentForecast = () => {
    const NO_OF_DAYS = 3;

    const [location, setLocation] = useState("");
    const [locationOptions, setLocationOptions] = useState([]);
    const [forecastList, setForecastList] = useState([]);
    const [currentForecast, setCurrentForecast] = useState(null);

    const [isFetching, setIsFetching] = useState(false);
    const [selectedForecastIndex, setSelectedForecastIndex] = useState(0);


    useEffect(() => {
        if (!location) {
            clearData();
        }
    }, [location])

    const clearData = () => {
        setCurrentForecast(null);
        setLocationOptions([]);
        setForecastList([]);
    }

    const onLocationChange = (value) => {
        setLocation(value);
        if (!value) {
            setLocationOptions([]);
            return;
        }
        WeatherApi.searchLocation(value).then(result => {
            if (Array.isArray(result))
                setLocationOptions(result.map(r => ({ value: r.Key, label: `${r.LocalizedName}, ${r.Country.LocalizedName}` })));
        }).catch(console.error)
    }

    const onSelectLocation = (value) => {
        setIsFetching(true);
        WeatherApi.getDailyForecast(value, NO_OF_DAYS).then(result => {
            console.info({ result });
            if (Array.isArray(result) && result.length) {
                setForecastList(result)
                setCurrentForecast(result[0])
            }
        }).catch(console.error).finally(() => setIsFetching(false))
    }

    const renderSearchLocation = () => {
        return locationOptions.map((location) => (
            <Select.Option key={location.value} value={location.value}>{location.label}</Select.Option>
        ))
    }

    const renderDetails = (key, data) => {
        const _temperature = (_key) => {
            let [temp, unit] = ["", ""];
            if (_key === FORECAST_KEY.Day) {
                temp = data.Temperature?.Maximum?.Value || "--";
                unit = data.Temperature?.Maximum?.Unit || "";
            }
            else if (_key === FORECAST_KEY.Night) {
                temp = data.Temperature?.Minimum?.Value || "--";
                unit = data.Temperature?.Minimum?.Unit || "";
            }

            let classColorTemperature = "";
            if (temp < 20) classColorTemperature = "blue";
            else if (temp < 33) classColorTemperature = "green";
            else classColorTemperature = "red";

            return {
                isActive: !!temp,
                render: (
                    <div className="temperature_container">
                        <Typography.Title level={1} className={classColorTemperature}>
                            {temp}
                        </Typography.Title>
                        <div className="temperature_unit_container">
                            <Typography.Title level={3}>
                                &#176;{unit}
                            </Typography.Title>
                        </div>
                    </div>
                )
            }
        }

        const _realFeel = (_key, isShade = false) => {
            let [value, unit, label] = ["", "", ""];
            const rfKey = isShade ? "RealFeelTemperatureShade" : "RealFeelTemperature";
            if (_key === FORECAST_KEY.Day) {
                value = data[rfKey]?.Maximum?.Value || "--";
                unit = data[rfKey]?.Maximum?.Unit || "";
                label = data[rfKey]?.Maximum?.Phrase || "";
            }
            else if (_key === FORECAST_KEY.Night) {
                value = data[rfKey]?.Minimum?.Value || "--";
                unit = data[rfKey]?.Minimum?.Unit || "";
                label = data[rfKey]?.Minimum?.Phrase || "";
            }

            return {
                isActive: !!value,
                render: (
                    <>
                        <Typography.Text strong>{value} &#176;{unit} </Typography.Text>
                        <Typography.Text italic>({label})</Typography.Text>
                    </>
                )
            }
        }

        const _wind = (_key, isGust = false) => {
            let [speed, direction] = [null, null];

            const windKey = isGust ? "WindGust" : "Wind";

            speed = {
                value: data[key][windKey]?.Speed?.Value || 0,
                unit: data[key][windKey]?.Speed?.Unit || "",
            };
            direction = {
                degrees: data[key][windKey]?.Direction?.Degrees || 0,
                localized: data[key][windKey]?.Direction?.Localized || "",
            };

            return {
                isActive: !!speed.value,
                render: (
                    <>
                        <Typography.Text strong>{speed.value} {speed.unit} </Typography.Text>
                        <Typography.Text italic>({direction.degrees}&#176; {direction.localized})</Typography.Text>
                    </>
                )
            }

        }

        const _showValue = (_key, field) => {
            const value = data?.[key]?.[field] || 0;
            return {
                isActive: !!value,
                render: (
                    <Typography.Text strong>{value}</Typography.Text>
                )
            }
        }

        const _precipitation = (_key) => {
            let [value, unit] = ["", ""];
            const pTypeKey = data[_key].PrecipitationType;

            value = data[_key]?.[pTypeKey]?.Value || 0;
            unit = data[_key]?.[pTypeKey]?.Unit || "";

            return {
                isActive: !!value,
                render: (
                    <Typography.Text strong>{value} {unit}</Typography.Text>
                )
            }
        }

        const _weatherPrecipitation = (_key) => {
            let [value, unit, hours] = ["", "", 0];
            const pTypeKey = data[_key].PrecipitationType;

            value = data[_key]?.[pTypeKey]?.Value || 0;
            unit = data[_key]?.[pTypeKey]?.Unit || "";
            hours = data[_key]?.[`HoursOf${pTypeKey}`] || 0;

            return {
                isActive: !!value,
                title: pTypeKey,
                render: (
                    <Typography.Text strong>{value} {unit}</Typography.Text>
                ),
                renderHours: (
                    <Typography.Text strong>{hours}</Typography.Text>
                )
            }
        }

        return (
            <Card>
                <div className="title">
                    <Typography.Title level={5}>{key}</Typography.Title>
                </div>
                <div>
                    <div className="temperature_container">
                        <div>
                            <Image src={WEATHER_OBJECT[data[key].Icon].icon} width={110} preview={false} />
                        </div>
                        <div>
                            {_temperature(key).isActive && _temperature(key).render}
                        </div>
                    </div>

                    <div className="weather_detail">
                        <Typography.Title level={5}>{data[key]?.LongPhrase || ""}</Typography.Title>
                    </div>
                </div>

                <div className="other_details">
                    <Descriptions
                        bordered
                        size="small"
                        column={{ xxl: 2, xl: 2, lg: 1, md: 1, sm: 1, xs: 1 }}
                    >
                        {_realFeel(key).isActive && <Descriptions.Item label="RealFeel">{_realFeel(key).render}</Descriptions.Item>}
                        {_realFeel(key, true).isActive && <Descriptions.Item label="RealFeel Shade">{_realFeel(key, true).render}</Descriptions.Item>}
                        {_wind(key).isActive && <Descriptions.Item label="Wind">{_wind(key).render}</Descriptions.Item>}
                        {_wind(key, true).isActive && <Descriptions.Item label="Wind Gusts">{_wind(key, true).render}</Descriptions.Item>}
                        {_weatherPrecipitation(key).isActive && <Descriptions.Item label={`Hours of ${_weatherPrecipitation(key).title}`}>{_weatherPrecipitation(key).renderHours}</Descriptions.Item>}
                        {_weatherPrecipitation(key).isActive && <Descriptions.Item label={_weatherPrecipitation(key).title}>{_weatherPrecipitation(key).render}</Descriptions.Item>}
                        {_showValue(key, "ThunderstormProbability").isActive && <Descriptions.Item label="Thunderstorms Probability">{_showValue(key, "ThunderstormProbability").render} %</Descriptions.Item>}
                        {_showValue(key, "PrecipitationProbability").isActive && <Descriptions.Item label="Precipitation Probability">{_showValue(key, "PrecipitationProbability").render}  %</Descriptions.Item>}
                        {_showValue(key, "HoursOfPrecipitation").isActive && <Descriptions.Item label="Precipitation Hours">{_showValue(key, "HoursOfPrecipitation").render}</Descriptions.Item>}
                        {_precipitation(key).isActive && <Descriptions.Item label="Precipitation">{_precipitation(key).render}</Descriptions.Item>}
                        {_showValue(key, "CloudCover").isActive && <Descriptions.Item label="Cloud Cover">{_showValue(key, "CloudCover").render} %</Descriptions.Item>}
                    </Descriptions>
                </div>
            </Card>
        )
    }

    const renderForecastMiniView = (data) => {
        const key = "Day";

        const _temperature = (_key) => {
            let [temp, unit] = ["", ""];
            if (_key === FORECAST_KEY.Day) {
                temp = data.Temperature?.Maximum?.Value || "--";
                unit = data.Temperature?.Maximum?.Unit || "";
            }
            else if (_key === FORECAST_KEY.Night) {
                temp = data.Temperature?.Minimum?.Value || "--";
                unit = data.Temperature?.Minimum?.Unit || "";
            }

            let classColorTemperature = "";
            if (temp < 20) classColorTemperature = "blue";
            else if (temp < 33) classColorTemperature = "green";
            else classColorTemperature = "red";


            return {
                isActive: !!temp,
                render: (
                    <div className="temperature_container">
                        <Typography.Title level={1} className={classColorTemperature}>
                            {temp}
                        </Typography.Title>
                        <div className="temperature_unit_container">
                            <Typography.Title level={3}>
                                &#176;{unit}
                            </Typography.Title>
                        </div>
                    </div >
                )
            }
        }


        const _realFeel = (_key, isShade = false) => {
            let [value, unit, label] = ["", "", ""];
            const rfKey = isShade ? "RealFeelTemperatureShade" : "RealFeelTemperature";
            if (_key === FORECAST_KEY.Day) {
                value = data[rfKey]?.Maximum?.Value || "--";
                unit = data[rfKey]?.Maximum?.Unit || "";
                label = data[rfKey]?.Maximum?.Phrase || "";
            }
            else if (_key === FORECAST_KEY.Night) {
                value = data[rfKey]?.Minimum?.Value || "--";
                unit = data[rfKey]?.Minimum?.Unit || "";
                label = data[rfKey]?.Minimum?.Phrase || "";
            }


            let classColorTemperature = "";
            if (value < 20) classColorTemperature = "blue";
            else if (value < 33) classColorTemperature = "green";
            else classColorTemperature = "red";

            return {
                isActive: !!value,
                render: (
                    <>
                        <Typography.Text strong><span className={classColorTemperature}>{value}</span> &#176;{unit} </Typography.Text>
                        <Typography.Text italic>({label})</Typography.Text>
                    </>
                )
            }
        }

        return (
            <div className="forecast-miniview-container">
                <h3>
                    {moment(data.Date).format("LL")}
                </h3>
                <div className="temperature_container">
                    <div>
                        <Image src={WEATHER_OBJECT[data[key].Icon].icon} width={110} preview={false} />
                    </div>
                    <div>
                        {_temperature(key).isActive && _temperature(key).render}
                    </div>
                </div>

                <div className="weather_detail white-space">
                    <Typography.Text strong>{data[key]?.LongPhrase || ""}</Typography.Text>
                </div>

                <div style={{ textAlign: "center" }}>
                    <span>RealFeel {_realFeel(key, true).isActive && _realFeel(key, true).render}</span>
                </div>
            </div>
        )
    }

    return (
        <div className='current_forecast_container'>

            <Row justify="center" gutter={[16, 16]}>
                <Col span={12}>
                    <Select
                        style={{
                            width: "100%",
                        }}
                        showSearch
                        placeholder="Search city"
                        optionFilterProp="children"
                        showArrow={false}
                        allowClear
                        onSearch={debounce(onLocationChange)}
                        onChange={onSelectLocation}
                        onClear={clearData}
                    >
                        {!!location && renderSearchLocation()}
                    </Select>
                </Col>

                <Col span={24}>
                    <div className="date_container">
                        <Typography.Title className="date_detail" level={5}>
                            {isFetching ? <Skeleton active={true} /> : !!currentForecast && moment(currentForecast.Date).format('LL')}
                        </Typography.Title>
                    </div>
                </Col>

                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    {isFetching ? <Skeleton active={true} /> : !!currentForecast && renderDetails(FORECAST_KEY.Day, currentForecast)}
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    {isFetching ? <Skeleton active={true} /> : !!currentForecast && renderDetails(FORECAST_KEY.Night, currentForecast)}
                </Col>
            </Row>

            <div className="forecast_list_container">
                <Row justify="center">
                    <Col span={24}>
                        {isFetching ?
                            <Skeleton active={true} /> :
                            <Segmented block
                                value={selectedForecastIndex}
                                onChange={index => {
                                    setCurrentForecast(forecastList[index])
                                    setSelectedForecastIndex(index);
                                }}
                                options={
                                    forecastList.map((forecast, index) => {
                                        return {
                                            label: (
                                                <Col key={index} flex={NO_OF_DAYS}>
                                                    {renderForecastMiniView(forecast)}
                                                </Col>
                                            ),
                                            value: index
                                        }
                                    })
                                }
                            />
                        }
                    </Col>
                </Row>
            </div>

        </div>
    )
}

export default CurrentForecast