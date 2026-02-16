import { useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FontSizeContext, ShowModalContext } from './provider';
import { MainPage } from '../pages/main';

const queryClient = new QueryClient();

export const App = () => {
  const [fontSize, setFontSize] = useState('16px');
  const [showModal, setShowModal] = useState(false);


  useEffect(() => {
    document.documentElement.style.fontSize = fontSize;
  }, [fontSize]);

  return (
    <QueryClientProvider client={queryClient}>
      <FontSizeContext.Provider value={{ fontSize, setFontSize }}>
        <ShowModalContext.Provider value={{ showModal, setShowModal }}>
          <MainPage />
        </ShowModalContext.Provider>
      </FontSizeContext.Provider>
    </QueryClientProvider>
  )
}
