import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { MainPage } from "../pages/main";
import { FontSizeContext, ShowModalContext } from "./provider";

const queryClient = new QueryClient();

export const App = () => {
  const [fontSize, setFontSize] = useState("16px");
  const [showModal, setShowModal] = useState(false);

  const fontSizeValue = useMemo(() => ({ fontSize, setFontSize }), [fontSize]);
  const showModalValue = useMemo(
    () => ({ showModal, setShowModal }),
    [showModal],
  );

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
      <FontSizeContext.Provider value={fontSizeValue}>
        <ShowModalContext.Provider value={showModalValue}>
          <MainPage />
        </ShowModalContext.Provider>
      </FontSizeContext.Provider>
    </QueryClientProvider>
  );
};
