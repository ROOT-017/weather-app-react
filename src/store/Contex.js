import React, { useCallback, useEffect, useRef, useState } from "react";

const Contex = React.createContext({
  isModalOpen: false,
  openModal: () => {},
  closeModal: () => {},
  position: {
    lat: 0,
    lon: 0,
  },
  currentWeather: null,
  setCurrentWeather: (data) => {},
  setPositionHandler: () => {},
  isLoading: true,
  toggleLoading: () => {},
  toast: null,
  toastHandler: (option) => {},
  isFavorite: null,
  addFavorite: (fav) => {},
  removeFavorite: () => {},
});

export const ContexProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [position, setPosition] = useState({ lat: 0, lon: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const [isFavorite, setIsFavorite] = useState(null);

  useEffect(() => {
    const lat = localStorage.getItem("lat");
    const lon = localStorage.getItem("lon");
    const fav = localStorage.getItem("fav");
    if (fav) {
      setIsFavorite(JSON.parse(fav));
    }
    if (lat && lon) {
      setPosition({ lat, lon });
    }
  }, []);

  const toast = useRef(null);

  const openModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const setPositionHandler = useCallback((lat, lon) => {
    setPosition({ lat, lon });
  }, []);

  const toggleLoading = () => {
    setIsLoading((prevState) => !prevState);
  };

  const toastHandler = useCallback(
    (option) => {
      toast.current.show(option);
    },
    [toast]
  );

  const addFavorite = (fav) => {
    localStorage.setItem("fav", JSON.stringify(fav));
    setIsFavorite(fav);
  };

  const removeFavorite = () => {
    localStorage.removeItem("fav");
    setIsFavorite(null);
  };

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
        isLoading,
        toggleLoading,
        toast,
        toastHandler,
        isFavorite,
        addFavorite,
        removeFavorite,
      }}
    >
      {children}
    </Contex.Provider>
  );
};

export default Contex;
