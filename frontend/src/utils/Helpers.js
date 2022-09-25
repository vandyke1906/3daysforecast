function debounce(func, timeout = 500) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
}

const WEATHER_OBJECT = Object.freeze({
    1: { icon: "/img/weather-icons/1.png", day: true, night: false, text: "Sunny" },
    2: { icon: "/img/weather-icons/2.png", day: true, night: false, text: "Mostly Sunny" },
    3: { icon: "/img/weather-icons/3.png", day: true, night: false, text: "Partly Sunny" },
    4: { icon: "/img/weather-icons/4.png", day: true, night: false, text: "Intermittent Clouds" },
    5: { icon: "/img/weather-icons/5.png", day: true, night: false, text: "Hazy Sunshine" },
    6: { icon: "/img/weather-icons/6.png", day: true, night: false, text: "Mostly Cloudy" },
    7: { icon: "/img/weather-icons/7.png", day: true, night: true, text: "Cloudy" },
    8: { icon: "/img/weather-icons/8.png", day: true, night: true, text: "Dreary (Overcast)" },
    11: { icon: "/img/weather-icons/11.png", day: true, night: true, text: "Fog" },
    12: { icon: "/img/weather-icons/12.png", day: true, night: true, text: "Showers" },
    13: { icon: "/img/weather-icons/13.png", day: true, night: false, text: "Mostly Cloudy w/ Showers" },
    14: { icon: "/img/weather-icons/14.png", day: true, night: false, text: "Partly Sunny w/ Showers" },
    15: { icon: "/img/weather-icons/15.png", day: true, night: true, text: "T-Storms" },
    16: { icon: "/img/weather-icons/16.png", day: true, night: false, text: "Mostly Cloudy w/ T-Storms" },
    17: { icon: "/img/weather-icons/17.png", day: true, night: false, text: "Partly Sunny w/ T-Storms" },
    18: { icon: "/img/weather-icons/18.png", day: true, night: true, text: "Rain" },
    19: { icon: "/img/weather-icons/19.png", day: true, night: true, text: "Flurries" },
    20: { icon: "/img/weather-icons/20.png", day: true, night: false, text: "Mostly Cloudy w/ Flurries" },
    21: { icon: "/img/weather-icons/21.png", day: true, night: false, text: "Partly Sunny w/ Flurries" },
    22: { icon: "/img/weather-icons/22.png", day: true, night: true, text: "Snow" },
    23: { icon: "/img/weather-icons/23.png", day: true, night: false, text: "Mostly Cloudy w/ Snow" },
    24: { icon: "/img/weather-icons/24.png", day: true, night: true, text: "Ice" },
    25: { icon: "/img/weather-icons/25.png", day: true, night: true, text: "Sleet" },
    26: { icon: "/img/weather-icons/26.png", day: true, night: true, text: "Freezing Rain" },
    29: { icon: "/img/weather-icons/29.png", day: true, night: true, text: "Rain and Snow" },
    30: { icon: "/img/weather-icons/30.png", day: true, night: true, text: "Hot" },
    31: { icon: "/img/weather-icons/31.png", day: true, night: true, text: "Cold" },
    32: { icon: "/img/weather-icons/32.png", day: true, night: true, text: "Windy" },
    33: { icon: "/img/weather-icons/33.png", day: false, night: true, text: "Clear" },
    34: { icon: "/img/weather-icons/34.png", day: false, night: true, text: "Mostly Clear" },
    35: { icon: "/img/weather-icons/35.png", day: false, night: true, text: "Partly Cloudy" },
    36: { icon: "/img/weather-icons/36.png", day: false, night: true, text: "Intermittent Clouds" },
    37: { icon: "/img/weather-icons/37.png", day: false, night: true, text: "Hazy Moonlight" },
    38: { icon: "/img/weather-icons/38.png", day: false, night: true, text: "Mostly Cloudy" },
    39: { icon: "/img/weather-icons/39.png", day: false, night: true, text: "Partly Cloudy w/ Showers" },
    40: { icon: "/img/weather-icons/40.png", day: false, night: true, text: "Mostly Cloudy w/ Showers" },
    41: { icon: "/img/weather-icons/41.png", day: false, night: true, text: "Partly Cloudy w/ T-Storms" },
    42: { icon: "/img/weather-icons/42.png", day: false, night: true, text: "Mostly Cloudy w/ T-Storms" },
    43: { icon: "/img/weather-icons/43.png", day: false, night: true, text: "Mostly Cloudy w/ Flurries" },
    44: { icon: "/img/weather-icons/44.png", day: false, night: true, text: "Mostly Cloudy w/ Snow" }
})

const UNIT_TYPES = Object.freeze({
    0: { type: "Feet", symbol: "ft" },
    1: { type: "Inches", symbol: "in" },
    2: { type: "Miles", symbol: ",i" },
    3: { type: "Millimeter", symbol: "mm" },
    4: { type: "Centimeter", symbol: "cm" },
    5: { type: "Meters", symbol: "m" },
    6: { type: "Kilometer", symbol: "km" },
    7: { type: "Kilometers per hour", symbol: "km/h" },
    8: { type: "Knots", symbol: "kts" },
    9: { type: "Miles per hour", symbol: "mi/h" },
    10: { type: "Meters per second", symbol: "m/s" },
    11: { type: "HectoPascals", symbol: "hPa" },
    12: { type: "Inches of mercury", symbol: "inHg" },
    13: { type: "KiloPascals", symbol: "kPa" },
    14: { type: "Millibars", symbol: "mb" },
    15: { type: "Millimeters of mercury", symbol: "mmHg" },
    16: { type: "Pounds per square inch", symbol: "lbs/in2" },
    17: { type: "Celsius", symbol: "C" },
    18: { type: "Fahrenheit", symbol: "F" },
    19: { type: "Kelvin", symbol: "K" },
    20: { type: "Percent", symbol: "%" },
    21: { type: "Float", symbol: "" },
    22: { type: "Integer", symbol: "" },
    23: { type: "Body/duration magnitude", symbol: "Mb" },
    24: { type: "Energy magnitude", symbol: "Me" },
    25: { type: "Local magnitude", symbol: "Ml" },
    26: { type: "Moment magnitude", symbol: "Mi" },
    27: { type: "Nuttli surface wave magnitude", symbol: "MbLg" },
    28: { type: "Moment magnitude", symbol: "Mw" },
    29: { type: "Surface wave magnitude", symbol: "Ms" },
    30: { type: "Teleseismic moment magnitude", symbol: "Mt" },
    31: { type: "Micrograms per cubic meter of air", symbol: "µg/m³" },
    32: { type: "Watt hours per square meter", symbol: "Wh/m2" },
    33: { type: "Watts per square meter", symbol: "W/m2" },
    34: { type: "BTU per hour per square foot", symbol: "BTU/hr/ft2" },
    35: { type: "Cubic meter per cubic meter", symbol: "m3/m3" },
    36: { type: "Cubic foot per cubic foot", symbol: "ft3/ft3" }
});


const testObect = [
    {
        "Date": "2022-09-24T07:00:00+08:00",
        "EpochDate": 1663974000,
        "Sun": {
            "Rise": "2022-09-24T05:27:00+08:00",
            "EpochRise": 1663968420,
            "Set": "2022-09-24T17:33:00+08:00",
            "EpochSet": 1664011980
        },
        "Moon": {
            "Rise": "2022-09-24T04:00:00+08:00",
            "EpochRise": 1663963200,
            "Set": "2022-09-24T16:33:00+08:00",
            "EpochSet": 1664008380,
            "Phase": "WaningCrescent",
            "Age": 29
        },
        "Temperature": {
            "Minimum": {
                "Value": 25.4,
                "Unit": "C",
                "UnitType": 17
            },
            "Maximum": {
                "Value": 32.2,
                "Unit": "C",
                "UnitType": 17
            }
        },
        "RealFeelTemperature": {
            "Minimum": {
                "Value": 26.5,
                "Unit": "C",
                "UnitType": 17,
                "Phrase": "Very Warm"
            },
            "Maximum": {
                "Value": 38.6,
                "Unit": "C",
                "UnitType": 17,
                "Phrase": "Very Hot"
            }
        },
        "RealFeelTemperatureShade": {
            "Minimum": {
                "Value": 26.5,
                "Unit": "C",
                "UnitType": 17,
                "Phrase": "Very Warm"
            },
            "Maximum": {
                "Value": 36,
                "Unit": "C",
                "UnitType": 17,
                "Phrase": "Hot"
            }
        },
        "HoursOfSun": 2,
        "DegreeDaySummary": {
            "Heating": {
                "Value": 0,
                "Unit": "C",
                "UnitType": 17
            },
            "Cooling": {
                "Value": 11,
                "Unit": "C",
                "UnitType": 17
            }
        },
        "AirAndPollen": [
            {
                "Name": "AirQuality",
                "Value": 0,
                "Category": "Good",
                "CategoryValue": 1,
                "Type": "Ozone"
            },
            {
                "Name": "Grass",
                "Value": 0,
                "Category": "Low",
                "CategoryValue": 1
            },
            {
                "Name": "Mold",
                "Value": 0,
                "Category": "Low",
                "CategoryValue": 1
            },
            {
                "Name": "Ragweed",
                "Value": 0,
                "Category": "Low",
                "CategoryValue": 1
            },
            {
                "Name": "Tree",
                "Value": 0,
                "Category": "Low",
                "CategoryValue": 1
            },
            {
                "Name": "UVIndex",
                "Value": 5,
                "Category": "Moderate",
                "CategoryValue": 2
            }
        ],
        "Day": {
            "Icon": 6,
            "IconPhrase": "Mostly cloudy",
            "HasPrecipitation": false,
            "ShortPhrase": "Mostly cloudy",
            "LongPhrase": "Mostly cloudy",
            "PrecipitationProbability": 25,
            "ThunderstormProbability": 7,
            "RainProbability": 25,
            "SnowProbability": 0,
            "IceProbability": 0,
            "Wind": {
                "Speed": {
                    "Value": 9.3,
                    "Unit": "km/h",
                    "UnitType": 7
                },
                "Direction": {
                    "Degrees": 148,
                    "Localized": "SSE",
                    "English": "SSE"
                }
            },
            "WindGust": {
                "Speed": {
                    "Value": 22.2,
                    "Unit": "km/h",
                    "UnitType": 7
                },
                "Direction": {
                    "Degrees": 123,
                    "Localized": "ESE",
                    "English": "ESE"
                }
            },
            "TotalLiquid": {
                "Value": 0,
                "Unit": "mm",
                "UnitType": 3
            },
            "Rain": {
                "Value": 0,
                "Unit": "mm",
                "UnitType": 3
            },
            "Snow": {
                "Value": 0,
                "Unit": "cm",
                "UnitType": 4
            },
            "Ice": {
                "Value": 0,
                "Unit": "mm",
                "UnitType": 3
            },
            "HoursOfPrecipitation": 0,
            "HoursOfRain": 0,
            "HoursOfSnow": 0,
            "HoursOfIce": 0,
            "CloudCover": 88,
            "Evapotranspiration": {
                "Value": 2.8,
                "Unit": "mm",
                "UnitType": 3
            },
            "SolarIrradiance": {
                "Value": 2838.4,
                "Unit": "W/m²",
                "UnitType": 33
            }
        },
        "Night": {
            "Icon": 42,
            "IconPhrase": "Mostly cloudy w/ t-storms",
            "HasPrecipitation": true,
            "PrecipitationType": "Rain",
            "PrecipitationIntensity": "Light",
            "ShortPhrase": "A t-storm around this evening",
            "LongPhrase": "A thunderstorm around this evening; clouds breaking, warm",
            "PrecipitationProbability": 40,
            "ThunderstormProbability": 24,
            "RainProbability": 40,
            "SnowProbability": 0,
            "IceProbability": 0,
            "Wind": {
                "Speed": {
                    "Value": 5.6,
                    "Unit": "km/h",
                    "UnitType": 7
                },
                "Direction": {
                    "Degrees": 314,
                    "Localized": "NW",
                    "English": "NW"
                }
            },
            "WindGust": {
                "Speed": {
                    "Value": 11.1,
                    "Unit": "km/h",
                    "UnitType": 7
                },
                "Direction": {
                    "Degrees": 30,
                    "Localized": "NNE",
                    "English": "NNE"
                }
            },
            "TotalLiquid": {
                "Value": 1,
                "Unit": "mm",
                "UnitType": 3
            },
            "Rain": {
                "Value": 1,
                "Unit": "mm",
                "UnitType": 3
            },
            "Snow": {
                "Value": 0,
                "Unit": "cm",
                "UnitType": 4
            },
            "Ice": {
                "Value": 0,
                "Unit": "mm",
                "UnitType": 3
            },
            "HoursOfPrecipitation": 0.5,
            "HoursOfRain": 0.5,
            "HoursOfSnow": 0,
            "HoursOfIce": 0,
            "CloudCover": 97,
            "Evapotranspiration": {
                "Value": 0.3,
                "Unit": "mm",
                "UnitType": 3
            },
            "SolarIrradiance": {
                "Value": 17.4,
                "Unit": "W/m²",
                "UnitType": 33
            }
        },
        "Sources": [
            "AccuWeather"
        ],
        "MobileLink": "http://www.accuweather.com/en/ph/davao-city/262966/daily-weather-forecast/262966?day=1&unit=c&lang=en-us",
        "Link": "http://www.accuweather.com/en/ph/davao-city/262966/daily-weather-forecast/262966?day=1&unit=c&lang=en-us"
    },
    {
        "Date": "2022-09-25T07:00:00+08:00",
        "EpochDate": 1664060400,
        "Sun": {
            "Rise": "2022-09-25T05:26:00+08:00",
            "EpochRise": 1664054760,
            "Set": "2022-09-25T17:32:00+08:00",
            "EpochSet": 1664098320
        },
        "Moon": {
            "Rise": "2022-09-25T04:47:00+08:00",
            "EpochRise": 1664052420,
            "Set": "2022-09-25T17:14:00+08:00",
            "EpochSet": 1664097240,
            "Phase": "WaningCrescent",
            "Age": 29
        },
        "Temperature": {
            "Minimum": {
                "Value": 25.4,
                "Unit": "C",
                "UnitType": 17
            },
            "Maximum": {
                "Value": 32.3,
                "Unit": "C",
                "UnitType": 17
            }
        },
        "RealFeelTemperature": {
            "Minimum": {
                "Value": 26.3,
                "Unit": "C",
                "UnitType": 17,
                "Phrase": "Pleasant"
            },
            "Maximum": {
                "Value": 37.5,
                "Unit": "C",
                "UnitType": 17,
                "Phrase": "Very Hot"
            }
        },
        "RealFeelTemperatureShade": {
            "Minimum": {
                "Value": 26.3,
                "Unit": "C",
                "UnitType": 17,
                "Phrase": "Pleasant"
            },
            "Maximum": {
                "Value": 35.2,
                "Unit": "C",
                "UnitType": 17,
                "Phrase": "Hot"
            }
        },
        "HoursOfSun": 1.1,
        "DegreeDaySummary": {
            "Heating": {
                "Value": 0,
                "Unit": "C",
                "UnitType": 17
            },
            "Cooling": {
                "Value": 11,
                "Unit": "C",
                "UnitType": 17
            }
        },
        "AirAndPollen": [
            {
                "Name": "AirQuality",
                "Value": 0,
                "Category": "Good",
                "CategoryValue": 1,
                "Type": "Ozone"
            },
            {
                "Name": "Grass",
                "Value": 0,
                "Category": "Low",
                "CategoryValue": 1
            },
            {
                "Name": "Mold",
                "Value": 0,
                "Category": "Low",
                "CategoryValue": 1
            },
            {
                "Name": "Ragweed",
                "Value": 0,
                "Category": "Low",
                "CategoryValue": 1
            },
            {
                "Name": "Tree",
                "Value": 0,
                "Category": "Low",
                "CategoryValue": 1
            },
            {
                "Name": "UVIndex",
                "Value": 5,
                "Category": "Moderate",
                "CategoryValue": 2
            }
        ],
        "Day": {
            "Icon": 15,
            "IconPhrase": "Thunderstorms",
            "HasPrecipitation": true,
            "PrecipitationType": "Rain",
            "PrecipitationIntensity": "Moderate",
            "ShortPhrase": "A stray afternoon t-storm",
            "LongPhrase": "Cloudy with a thunderstorm in spots in the afternoon",
            "PrecipitationProbability": 42,
            "ThunderstormProbability": 25,
            "RainProbability": 42,
            "SnowProbability": 0,
            "IceProbability": 0,
            "Wind": {
                "Speed": {
                    "Value": 7.4,
                    "Unit": "km/h",
                    "UnitType": 7
                },
                "Direction": {
                    "Degrees": 127,
                    "Localized": "SE",
                    "English": "SE"
                }
            },
            "WindGust": {
                "Speed": {
                    "Value": 22.2,
                    "Unit": "km/h",
                    "UnitType": 7
                },
                "Direction": {
                    "Degrees": 149,
                    "Localized": "SSE",
                    "English": "SSE"
                }
            },
            "TotalLiquid": {
                "Value": 1.8,
                "Unit": "mm",
                "UnitType": 3
            },
            "Rain": {
                "Value": 1.8,
                "Unit": "mm",
                "UnitType": 3
            },
            "Snow": {
                "Value": 0,
                "Unit": "cm",
                "UnitType": 4
            },
            "Ice": {
                "Value": 0,
                "Unit": "mm",
                "UnitType": 3
            },
            "HoursOfPrecipitation": 1,
            "HoursOfRain": 1,
            "HoursOfSnow": 0,
            "HoursOfIce": 0,
            "CloudCover": 100,
            "Evapotranspiration": {
                "Value": 2.5,
                "Unit": "mm",
                "UnitType": 3
            },
            "SolarIrradiance": {
                "Value": 2412.7,
                "Unit": "W/m²",
                "UnitType": 33
            }
        },
        "Night": {
            "Icon": 42,
            "IconPhrase": "Mostly cloudy w/ t-storms",
            "HasPrecipitation": true,
            "PrecipitationType": "Rain",
            "PrecipitationIntensity": "Light",
            "ShortPhrase": "A thunderstorm around early",
            "LongPhrase": "A thunderstorm around in the evening; clouds breaking, warm",
            "PrecipitationProbability": 40,
            "ThunderstormProbability": 24,
            "RainProbability": 40,
            "SnowProbability": 0,
            "IceProbability": 0,
            "Wind": {
                "Speed": {
                    "Value": 5.6,
                    "Unit": "km/h",
                    "UnitType": 7
                },
                "Direction": {
                    "Degrees": 320,
                    "Localized": "NW",
                    "English": "NW"
                }
            },
            "WindGust": {
                "Speed": {
                    "Value": 18.5,
                    "Unit": "km/h",
                    "UnitType": 7
                },
                "Direction": {
                    "Degrees": 328,
                    "Localized": "NNW",
                    "English": "NNW"
                }
            },
            "TotalLiquid": {
                "Value": 1,
                "Unit": "mm",
                "UnitType": 3
            },
            "Rain": {
                "Value": 1,
                "Unit": "mm",
                "UnitType": 3
            },
            "Snow": {
                "Value": 0,
                "Unit": "cm",
                "UnitType": 4
            },
            "Ice": {
                "Value": 0,
                "Unit": "mm",
                "UnitType": 3
            },
            "HoursOfPrecipitation": 0.5,
            "HoursOfRain": 0.5,
            "HoursOfSnow": 0,
            "HoursOfIce": 0,
            "CloudCover": 100,
            "Evapotranspiration": {
                "Value": 0,
                "Unit": "mm",
                "UnitType": 3
            },
            "SolarIrradiance": {
                "Value": 17.4,
                "Unit": "W/m²",
                "UnitType": 33
            }
        },
        "Sources": [
            "AccuWeather"
        ],
        "MobileLink": "http://www.accuweather.com/en/ph/davao-city/262966/daily-weather-forecast/262966?day=2&unit=c&lang=en-us",
        "Link": "http://www.accuweather.com/en/ph/davao-city/262966/daily-weather-forecast/262966?day=2&unit=c&lang=en-us"
    },
    {
        "Date": "2022-09-26T07:00:00+08:00",
        "EpochDate": 1664146800,
        "Sun": {
            "Rise": "2022-09-26T05:26:00+08:00",
            "EpochRise": 1664141160,
            "Set": "2022-09-26T17:32:00+08:00",
            "EpochSet": 1664184720
        },
        "Moon": {
            "Rise": "2022-09-26T05:34:00+08:00",
            "EpochRise": 1664141640,
            "Set": "2022-09-26T17:55:00+08:00",
            "EpochSet": 1664186100,
            "Phase": "New",
            "Age": 0
        },
        "Temperature": {
            "Minimum": {
                "Value": 25.3,
                "Unit": "C",
                "UnitType": 17
            },
            "Maximum": {
                "Value": 32.2,
                "Unit": "C",
                "UnitType": 17
            }
        },
        "RealFeelTemperature": {
            "Minimum": {
                "Value": 26.2,
                "Unit": "C",
                "UnitType": 17,
                "Phrase": "Pleasant"
            },
            "Maximum": {
                "Value": 38.6,
                "Unit": "C",
                "UnitType": 17,
                "Phrase": "Very Hot"
            }
        },
        "RealFeelTemperatureShade": {
            "Minimum": {
                "Value": 26.2,
                "Unit": "C",
                "UnitType": 17,
                "Phrase": "Pleasant"
            },
            "Maximum": {
                "Value": 36.1,
                "Unit": "C",
                "UnitType": 17,
                "Phrase": "Hot"
            }
        },
        "HoursOfSun": 1.2,
        "DegreeDaySummary": {
            "Heating": {
                "Value": 0,
                "Unit": "C",
                "UnitType": 17
            },
            "Cooling": {
                "Value": 11,
                "Unit": "C",
                "UnitType": 17
            }
        },
        "AirAndPollen": [
            {
                "Name": "AirQuality",
                "Value": 0,
                "Category": "Good",
                "CategoryValue": 1,
                "Type": "Ozone"
            },
            {
                "Name": "Grass",
                "Value": 0,
                "Category": "Low",
                "CategoryValue": 1
            },
            {
                "Name": "Mold",
                "Value": 0,
                "Category": "Low",
                "CategoryValue": 1
            },
            {
                "Name": "Ragweed",
                "Value": 0,
                "Category": "Low",
                "CategoryValue": 1
            },
            {
                "Name": "Tree",
                "Value": 0,
                "Category": "Low",
                "CategoryValue": 1
            },
            {
                "Name": "UVIndex",
                "Value": 5,
                "Category": "Moderate",
                "CategoryValue": 2
            }
        ],
        "Day": {
            "Icon": 7,
            "IconPhrase": "Cloudy",
            "HasPrecipitation": true,
            "PrecipitationType": "Rain",
            "PrecipitationIntensity": "Moderate",
            "ShortPhrase": "Cloudy with a stray t-storm",
            "LongPhrase": "A thick cloud cover with a thunderstorm in spots",
            "PrecipitationProbability": 44,
            "ThunderstormProbability": 26,
            "RainProbability": 44,
            "SnowProbability": 0,
            "IceProbability": 0,
            "Wind": {
                "Speed": {
                    "Value": 9.3,
                    "Unit": "km/h",
                    "UnitType": 7
                },
                "Direction": {
                    "Degrees": 128,
                    "Localized": "SE",
                    "English": "SE"
                }
            },
            "WindGust": {
                "Speed": {
                    "Value": 22.2,
                    "Unit": "km/h",
                    "UnitType": 7
                },
                "Direction": {
                    "Degrees": 178,
                    "Localized": "S",
                    "English": "S"
                }
            },
            "TotalLiquid": {
                "Value": 4.7,
                "Unit": "mm",
                "UnitType": 3
            },
            "Rain": {
                "Value": 4.7,
                "Unit": "mm",
                "UnitType": 3
            },
            "Snow": {
                "Value": 0,
                "Unit": "cm",
                "UnitType": 4
            },
            "Ice": {
                "Value": 0,
                "Unit": "mm",
                "UnitType": 3
            },
            "HoursOfPrecipitation": 2,
            "HoursOfRain": 2,
            "HoursOfSnow": 0,
            "HoursOfIce": 0,
            "CloudCover": 100,
            "Evapotranspiration": {
                "Value": 2.5,
                "Unit": "mm",
                "UnitType": 3
            },
            "SolarIrradiance": {
                "Value": 2406.1,
                "Unit": "W/m²",
                "UnitType": 33
            }
        },
        "Night": {
            "Icon": 35,
            "IconPhrase": "Partly cloudy",
            "HasPrecipitation": false,
            "ShortPhrase": "Patchy clouds and warm",
            "LongPhrase": "Patchy clouds and warm",
            "PrecipitationProbability": 25,
            "ThunderstormProbability": 6,
            "RainProbability": 25,
            "SnowProbability": 0,
            "IceProbability": 0,
            "Wind": {
                "Speed": {
                    "Value": 5.6,
                    "Unit": "km/h",
                    "UnitType": 7
                },
                "Direction": {
                    "Degrees": 332,
                    "Localized": "NNW",
                    "English": "NNW"
                }
            },
            "WindGust": {
                "Speed": {
                    "Value": 18.5,
                    "Unit": "km/h",
                    "UnitType": 7
                },
                "Direction": {
                    "Degrees": 346,
                    "Localized": "NNW",
                    "English": "NNW"
                }
            },
            "TotalLiquid": {
                "Value": 0,
                "Unit": "mm",
                "UnitType": 3
            },
            "Rain": {
                "Value": 0,
                "Unit": "mm",
                "UnitType": 3
            },
            "Snow": {
                "Value": 0,
                "Unit": "cm",
                "UnitType": 4
            },
            "Ice": {
                "Value": 0,
                "Unit": "mm",
                "UnitType": 3
            },
            "HoursOfPrecipitation": 0,
            "HoursOfRain": 0,
            "HoursOfSnow": 0,
            "HoursOfIce": 0,
            "CloudCover": 98,
            "Evapotranspiration": {
                "Value": 0.3,
                "Unit": "mm",
                "UnitType": 3
            },
            "SolarIrradiance": {
                "Value": 21.6,
                "Unit": "W/m²",
                "UnitType": 33
            }
        },
        "Sources": [
            "AccuWeather"
        ],
        "MobileLink": "http://www.accuweather.com/en/ph/davao-city/262966/daily-weather-forecast/262966?day=3&unit=c&lang=en-us",
        "Link": "http://www.accuweather.com/en/ph/davao-city/262966/daily-weather-forecast/262966?day=3&unit=c&lang=en-us"
    }
]

export {
    debounce,
    WEATHER_OBJECT,
    UNIT_TYPES,
    testObect
}