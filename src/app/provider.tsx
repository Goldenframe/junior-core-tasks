import { createContext, useContext } from "react";

type FontSizeContextType = {
  fontSize: string;
  setFontSize: (size: string) => void;
};

export const FontSizeContext = createContext<FontSizeContextType>({
  fontSize: '16px',
  setFontSize: () => { },
});

export const useFontSize = () => useContext(FontSizeContext);

type ShowModalContextType = {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
};

export const ShowModalContext = createContext<ShowModalContextType>({
  showModal: false,
  setShowModal: () => { }
});

export const useShowModal = () => useContext(ShowModalContext);