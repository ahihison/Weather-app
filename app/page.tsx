"use client";
import Weather from "@/components/Weather";
import axios from "axios";
import Image from "next/image";

import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { BounceLoader } from "react-spinners";
interface typeWeather {
  weather: [
    {
      icon: string;
      main: string;
    }
  ];
  sys: {
    country: string;
  };
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
  name: string;
}

export default function Home() {
  const [weather, setWeather] = useState<typeWeather | null>(null);
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`;

  const fetchWeather = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    axios.get(url).then((res) => {
      setWeather(res.data);
      console.log(res.data);
    });
    setCity("");
    setLoading(false);
  };
  const handleKeyPress = (e: any) => {
    if (e.key === "Enter") {
      fetchWeather(e);
    }
  };
  console.log(weather);

  if (loading) {
    return (
      <div className="w-[100wh] h-[100vh] flex justify-center items-center">
        <BounceLoader color="#22c55e" size={40} />
      </div>
    );
  } else {
    return (
      <main>
        <div className="absolute top-0 right-0 left-0 bottom-0 bg-black/70 z-[1]" />

        <Image
          src="/weather.jpg"
          alt="image-weather"
          layout="fill"
          className="object-cover"
        />
        {/* Search Input */}
        <div className="flex justify-center items-center">
          <div className="relative z-[2] flex items-center justify-center mt-4 border-2 border-white/50 text-white w-[70%] max-w-[500px] rounded-lg font-bold">
            <input
              onChange={(e) => setCity(e.target.value)}
              onKeyDown={handleKeyPress}
              type="text"
              placeholder="Search city"
              className="w-full p-4  bg-transparent  focus:border-white/70 focus:outline-none"
            />
            <button onClick={fetchWeather}>
              <BsSearch size={20} className="mr-3" color="white" />
            </button>
          </div>
        </div>
        {/* Weather */}
        <div className="z-[2] relative">
          {weather?.main && <Weather data={weather} />}
        </div>
      </main>
    );
  }
}
