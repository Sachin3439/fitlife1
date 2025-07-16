import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Form from "./Screens/Form";
import Home from './Screens/Home';
import Register from './Screens/Register';
import Navbard from './Dashboard/Navbard';
import Dashboard from './Dashboard/Dashboard';
import Footer from './Screens/Footer';
import Bmi from './Dashboard/Bmi';
import Contactd from './Dashboard/Contactd';
import Exercise from './Dashboard/Exercise';
import DietPlanPage from './Dashboard/DietPlanPage';
import Thank from './Screens/Thank';
import About from './Screens/About';
import Body from './Screens/Body';
import Forgetpass from './Screens/Forgetpass';
import Chatbot from './Dashboard/Chatbot';
import "./App.css";

function MainLayout() {
  const location = useLocation();

  // ✅ Footer will be hidden ONLY on the chatbot page
  const hideFooter = location.pathname === '/chatbot';

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/body" element={<Body />} />
        <Route path='/about' element={<About />} />
        <Route path='/thank-you' element={<Thank />} />
        <Route path="/login" element={<Form />} />
        <Route path="/dashboard" element={<Navbard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboardhome" element={<Dashboard />} />
        <Route path="/bmi" element={<Bmi />} />
        <Route path="/contactd" element={<Contactd />} />
        <Route path="/exercise" element={<Exercise />} />
        <Route path="/diet" element={<DietPlanPage />} />
        <Route path='/forgetpass' element={<Forgetpass />} />
        <Route path='/chatbot' element={<Chatbot />} />
      </Routes>

      {/* ✅ Conditionally Render Footer */}
      {!hideFooter && <Footer />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <MainLayout />
    </BrowserRouter>
  );
}

export default App;
