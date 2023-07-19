import Image from "next/image";

interface weatherProps {
  data: {
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
  };
}
const Weather: React.FC<weatherProps> = ({ data }) => {
  return (
    <div className="flex justify-between h-[80vh] max-h-[100vh] m-auto items-center flex-col mt-16 text-white">
      <div className="flex gap-x-32 items-center ">
        <div>
          <Image
            src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
            alt=""
            width={100}
            height={100}
          />
          <p className="text-2xl text-center">{data.weather[0].main}</p>
        </div>
        <p className="text-8xl">{(data.main.temp - 273.15).toFixed(0)}&#176;</p>
      </div>

      <div className="flex flex-col justify-center bg-black/50 p-9 rounded-xl mb-6">
        <p className="text-center text-2xl pb-6">
          {data.name}, {data.sys.country}
        </p>
        <div className="flex gap-24 mt-4">
          <div className="flex flex-col">
            <p className="font-bold text-2xl">
              {data.main.feels_like.toFixed(0)}&#176;
            </p>
            <p className="text-xl">Feels Like</p>
          </div>
          <div className="flex flex-col">
            <p className="font-bold text-2xl">{data.main.humidity}%</p>
            <p className="text-xl">Humidity</p>
          </div>
          <div className="flex flex-col">
            <p className="font-bold text-2xl">
              {data.wind.speed.toFixed(0)} MPH
            </p>
            <p className="text-xl">Winds</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
