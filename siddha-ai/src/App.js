import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./components/index/Index";
import Personaldetails from "./components/personaldetails/Personaldetails";
import Address from "./components/address/Address";
import Insurance from "./components/insurance/Insurance";
import Verify from "./components/verify/Verify";
import Contact from "./components/contact/Contact";
import Referral from "./components/referral/Referral";
import Confirm from "./components/confirm/Confirm";
import Success from "./components/success/Success";
import { ContextProvider } from "./context/Context";
import Privacypractices from "./components/privacypractices/Privacypractices";
import Consenttotreatment from "./components/consenttotreatment/Consenttotreatment";
import { useEffect } from "react";
import Layout from "./Layouts/layout/Layout";
import { NA } from "./components/not-authorised/NA";
import Eula from "./components/eula/eula";

function App() {
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      // Display a confirmation dialog
      e.preventDefault();
      e.returnValue = "";
    };

    // Attach the event listener when the component mounts
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  console.log(
    "%cV1.1.0 - fix insurance not showing drchrono",
    "color: fuchsia",
  );

  return (
    <>
      <Router>
        <ContextProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/personaldetails" element={<Personaldetails />} />
              <Route path="/address" element={<Address />} />
              <Route path="/insurance" element={<Insurance />} />
              <Route path="/verify" element={<Verify />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/referral" element={<Referral />} />
              <Route path="/confirm" element={<Confirm />} />
              <Route path="/success" element={<Success />} />
              <Route path="/eula" element={<Eula />} />
              <Route path="/privacypractices" element={<Privacypractices />} />
              <Route
                path="/consenttotreatment"
                element={<Consenttotreatment />}
              />
              <Route path="/NA" element={<NA />} />
            </Routes>
          </Layout>
        </ContextProvider>
      </Router>
    </>
  );
}

export default App;
