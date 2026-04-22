import { useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FontSizeContext, ShowModalContext } from './provider';
import { MainPage } from '../pages/main';

const queryClient = new QueryClient();

export const App = () => {
  const [fontSize, setFontSize] = useState('16px');
  const [showModal, setShowModal] = useState(false);

  // эффект срабатывает только при изменении fontSize
  useEffect(() => {
    document.documentElement.style.fontSize = fontSize;
    console.log(`Размер шрифта изменен на ${fontSize}`);
  }, [fontSize]);

  // тут эффект будет выполняться после каждого изменения любого state или props
  // useEffect(() => {
  //   console.log('Эффект срабатывает на КАЖДЫЙ рендер!');
  // });

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
