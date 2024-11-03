import Login from './Component/Login';
import Form from './Component/ComplaintForm';
import PrimarySearchAppBar from './Component/PrimaryAppSearchBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NewUser from './Component/NewUser';
import Footer from './Component/Footer';
import Overview from './Component/Overview';
import DetailedView from './Component/DetailedView';
import CheckComplaint from './Component/CheckComplaint';
import ComplaintProfile from './Component/ComplaintProfile';
import LandingPage from './Component/LandingPage';
function App() {
    
    return (
        <Router>
            <div>
             <PrimarySearchAppBar />            
        </div>
           <div style={{padding:100}}>
           <Routes>
                <Route path='/' Component={LandingPage}></Route>
                <Route path ="Login"  Component={Login} ></Route>
                <Route path="Form" Component={Form}></Route>
                <Route path="NewUser" Component={NewUser}></Route>
                <Route path="Overview" Component={Overview}></Route>
                <Route path="DetailedView" Component={DetailedView}></Route>
                <Route path="CheckComplaint" Component={CheckComplaint}></Route>
                <Route path="ComplaintProfile" Component={ComplaintProfile}></Route>
            </Routes>
           </div>
            <Footer />
        </Router>
    );
}

export default App;
