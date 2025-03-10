import { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import CriarAlbum from "../pages/CreateAlbum/CriarAlbum";
import Signin from "../pages/Signin";
import Signup from "../pages/Signup";
import useAuth from "../hooks/useAuth"; 
import AlbumDetail from "../pages/AlbumDetails";

const Private = ({ Item }) => {
  const { isAuthenticated } = useAuth(); 
  return isAuthenticated ? <Item /> : <Signin />; 
};

const RoutesApp = () => {
  return (
    <BrowserRouter>
      <Fragment>
        <Routes>
          <Route path="/home" element={<Private Item={Home} />} />
          <Route path="/criar-album" element={<CriarAlbum />} />
          <Route path="/" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/album/:albumId" element={< Private Item={AlbumDetail} />} />
          <Route path="*" element={<Signin />} />
        </Routes>
      </Fragment>
    </BrowserRouter>
  );
};

export default RoutesApp;
