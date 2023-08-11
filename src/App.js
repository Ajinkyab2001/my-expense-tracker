import { Routes,Route } from 'react-router-dom';
import './App.css';
import Navigation from './components/pages/Navigation';
import About from './components/pages/About/About';
import Expenses from './components/pages/Expenses/Expenses';
import Auth from './components/pages/Auth/Auth';
import Home from './components/pages/Home/Home';
import ChangePassword from './components/pages/ChangePassword/ChangePassword';
import CompleteProfileButtonWindow from './components/profile/CompleteProfileButtonWindow';
import CompleteProfile from './components/profile/CompleteProfile';
import EmailVerification from './components/profile/EmailVerification';
import ResetPassword from './components/profile/ResetPassword';
import { useContext } from 'react';


function App() {
  
  return (
    <div className="App">
    <Navigation />
    <Routes>
    <Route index path="/" element={<Home />} /> 
    <Route index path="/about" element={<About />} /> 
    <Route index path="/expenses" element={<Expenses />} /> 
    <Route index path="/auth" element={<Auth />} />
    <Route index path="/ChangePassword" element={<ChangePassword />} />
    <Route index path="/completeprofilebuttonwindow" element={<CompleteProfileButtonWindow />} />
    <Route index path="/completeprofile" element={<CompleteProfile />} />
    <Route index path="/emailverification" element={<EmailVerification />} />
    <Route index path="/resetpassword" element={<ResetPassword />} />



       </Routes>
    </div>
  );
}

export default App;
