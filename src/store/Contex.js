import React, { useCallback, useState } from "react";

const Contex = React.createContext({
  isModalOpen: false,
  openModal: () => {},
  closeModal: () => {},
  position: {
    lat: 0,
    lon: 0,
  },
  currentWeather: null,
  setCurrentWeather: () => {},
  setPositionHandler: () => {},
});

export const ContexProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [position, setPosition] = useState({ lat: 0, lon: 0 });

  const openModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const setPositionHandler = useCallback((lat, lon) => {
    setPosition({ lat, lon });
  }, []);

  return (
    <Contex.Provider
      value={{
        isModalOpen,
        openModal,
        closeModal,
        position,
        setPositionHandler,
        currentWeather,
        setCurrentWeather,
      }}
    >
      {children}
    </Contex.Provider>
  );
};

export default Contex;
