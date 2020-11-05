import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ClientPage from './components/pages/ClientPage';
import ContractorPage from './components/pages/ContractorPage';
import HomePage from './components/pages/HomePage';
import SearchListingsPage from './components/pages/SearchListingsPage';
import SearchContractorsPage from './components/pages/SearchContractorsPage';
import ErrorPage from './components/pages/ErrorPage';
import FirebasePlayground from './components/pages/FirebasePlayground';
import AboutPage from './components/pages/AboutPage';
import AccountSetup from './components/account/AccountSetup';
import "bootstrap/dist/css/bootstrap.min.css";
import IndividualListing from './components/pages/IndividualListing';
import IndividualContractor from './components/pages/IndividualContractor.js';

import { checkUserExists } from "./firebase/accountFunctions";

import { signOut } from "./firebase/authFunctions";

//https://stackoverflow.com/questions/90178/make-a-div-fill-the-height-of-the-remaining-screen-space

function App() {
    const [accountSetup, setAccountSetup] = useState();
    const pageOnLoad = window.location.pathname.toString();
    console.log("pageOnLoad: ", pageOnLoad);

    //signOut();
    const renderAccountSetup = () => {
        const UID = localStorage.getItem("UID");
        if (UID) {
            checkUserExists(UID)
                .then(data => {
                    if (data.exists === false) {
                        setAccountSetup(<AccountSetup UID={UID} />)
                    }
                    console.log(data)
                })
                .catch(err => console.log(err));
        }
    }
    useEffect(() => {
        renderAccountSetup();
    }, [])
    
    return (
        <main>
            <div className="box">
                <div className="box-header">
                    <Navbar activepage={pageOnLoad} />
                </div>
                {/* box-body div will stretch to fill out the screen until footer (if its smaller than the screen) */}
                <div className="box-body">
                    {accountSetup}
                    <Switch>
                        <Route path="/" component={HomePage} exact />
                        <Route path="/client" component={ClientPage} />
                        <Route path="/contractor" component={ContractorPage} />
                        <Route path="/searchlistings" component={SearchListingsPage} />
                        <Route path="/searchcontractors" component={SearchContractorsPage} />
                        <Route path="/firebaseplayground" component={FirebasePlayground} />
                        <Route path="/about" component={AboutPage} />
                        <Route path="/listing/:LID" children={<IndividualListing/>} />
                        <Route path="/contractors/:UID" children={<IndividualContractor/>} />
                        <Route component={ErrorPage} />
                    </Switch>
                </div>
                <div className="box-footer">
                    <Footer />
                </div>
            </div>
        </main>
    );
};
export default App;

























