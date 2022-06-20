import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./components/App";
import Nav from "./components/Nav";
import LandingPage from "./components/LandingPage";
import ProfilePage from "./components/ProfilePage";
import CreatePost from "./components/CreatePost";

const RouteSwitch = () => {
  return (
    <BrowserRouter basename="/maeditt-app">
      <Routes>
        <Route path="/:currentUserId/feed" element={
          <div>
            <Nav/>
            <App />
          </div>
        } />
        <Route path="/" exact element={<LandingPage />} />
        <Route path="/:currentUserId/user/:UserId"  element={
        <div>
            <Nav/>
            <ProfilePage/>
        </div>
        } />
        <Route path="/:currentUserId/create-post" exact element={<CreatePost />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteSwitch;