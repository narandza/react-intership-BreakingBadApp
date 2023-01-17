import "./App.scss";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import HomePage from "./pages/HomePage/HomePage";
import CharactersPage from "./pages/CharactersPage/CharactersPage";
import ViewCharacterPage from "./pages/ViewCharacterPage/ViewCharacterPage";
import "react-toastify/dist/ReactToastify.css";
import FavouritesPage from "./pages/FavouritesPage/FavouritesPage";

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/characters" element={<CharactersPage />} />
          <Route path="/characters/:id" element={<ViewCharacterPage />} />
          <Route path="/favourites" element={<FavouritesPage />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
