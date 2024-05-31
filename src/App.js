import React from 'react';
import { useRoutes } from "react-router-dom";
import Login from "./components/auth/login";
import Register from "./components/auth/register"; 
import CarsList from "./components/cars/CarsList";
import AddCar from "./components/cars/AddCar";
import CarInfo from './components/check/CarInfo'; // Імпортуйте новий компонент
import Header from "./components/header";
import Home from "./components/home";
import { AuthProvider } from "./contexts/authContext";

function App() {
  const routesArray = [
    {
      path: "*",
      element: <Login />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/home",
      element: <Home />,
    },
    {
      path: "/cars",
      element: <CarsList />
    },
    {
      path: "/add-car",
      element: <AddCar />
    },
    {
      path: "/car-info", // Додайте новий маршрут
      element: <CarInfo />
    }
  ];
  let routesElement = useRoutes(routesArray);
  return (
    <AuthProvider>
      <Header />
      <div className="w-full h-screen flex flex-col">{routesElement}</div>
      
    </AuthProvider>
  );
}

export default App;
