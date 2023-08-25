import React, { useEffect, useState, useContext, useCallback } from "react";
import Header from "../components/Header";
import WeatherCard from "../components/WeatherCard";

import SendRequest from "../client/api";

import { Carousel } from "primereact/carousel";
import Card from "../components/ui/Card";

import cloud from "./assets/rain-drops.png";
import { NavLink } from "react-router-dom";
import Contex from "../store/Contex";

const ProductService = [
  {
    id: "13000",
    code: "f230fh0g3",
    name: "Bamboo Watch",
    description: "Product Description",
    image: "bamboo-watch.jpg",
    price: 65,
    category: "Accessories",
    quantity: 24,
    inventoryStatus: "INSTOCK",
    rating: 5,
  },
];

const Home = () => {
  const [products, setProducts] = useState([...ProductService]);
  const { setPositionHandler, position, setCurrentWeather, currentWeather } =
    useContext(Contex);
  // const { data } = useRouteLoaderData("home");
  // console.log(data);
  // const [currentWeather, setCurrentWeather] = useState(null);

  const getPosition = useCallback(() => {
    navigator.geolocation.getCurrentPosition(async (e) => {
      try {
        setPositionHandler(e.coords.latitude, e.coords.longitude);
      } catch (e) {
        console.log(e);
      }
    });
  }, [setPositionHandler]);

  const fetchData = useCallback(async () => {
    if (position.lat === 0 || position.lon === 0) return;
    const endpoint = `/current.json`;
    try {
      const response = await SendRequest(
        "GET",
        endpoint,
        null,
        `${position.lat},${position.lon}`
      );
      // console.log(response);
      setCurrentWeather(response);
    } catch (e) {
      console.log(e);
    }
  }, [position.lat, position.lon]);

  const responsiveOptions = [
    {
      breakpoint: "1199px",
      numVisible: 1,
      numScroll: 1,
    },
    {
      breakpoint: "991px",
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: "767px",
      numVisible: 1,
      numScroll: 1,
    },
  ];

  // const weather = (props) => (
  //   <NavLink to={"detail/id"}>
  //     <WeatherCard currentWeather={currentWeather ? currentWeather : null} />
  //   </NavLink>
  // );

  useEffect(() => {
    getPosition();
  }, [getPosition]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div>
      <Header />
      <div className="carousel md:w-[390px]">
        {/* <Carousel
          value={currentWeather ? currentWeather : products}
          numVisible={1}
          numScroll={1}
          className="custom-carousel"
          circular
          itemTemplate={weather}
          showNavigators={false}
        /> */}
        {currentWeather && (
          <NavLink
            to={`detail/` + currentWeather.location.region.toLowerCase()}
          >
            <WeatherCard currentWeather={currentWeather} />
          </NavLink>
        )}
      </div>
      <h1 className="px-4 font-Roboto text-xl font-bold">Your Favourite </h1>
      <Card style={`bg-primary-100`}>
        <div className="flex w-full justify-between">
          <div className="w-1/3">
            <p className="text-gray-400">New York</p>
            <p className="text-5xl font-bold flex h-full items-center justify-center w-full">
              <span className="text-font-100">12&deg;</span>
            </p>
          </div>
          <div className="w-2/3 flex justify-center items-center h-full">
            <img src={cloud} alt="sunny-cloud" className="w-32 h-32" />
          </div>
        </div>
      </Card>
    </div>
  );
};
export default Home;

// export const currentWeather = async (props) => {
//   const coords = {
//     lat: 0,
//     lon: 0,
//   };
//   let response = null;
//   navigator.geolocation.getCurrentPosition(async (e) => {
//     try {
//       coords.lat = e.coords.latitude;
//       coords.lon = e.coords.longitude;

//       response = await SendRequest(
//         "GET",
//         "/current.json",
//         null,
//         `${coords.lat},${coords.lon}`
//       );
//       return defer({
//         data: await response,
//       });
//     } catch (e) {
//       console.log(e);
//     }
//   });
//   return defer({
//     data: response,
//   });
// };
