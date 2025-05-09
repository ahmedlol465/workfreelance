import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout";
import SignInPage from "./pages/SignIn";
import PasswordRecoveryPage from "./pages/RecoveryPassword";
import JoinUsPage from "./pages/JoinUs";
import AccountSetup from "./pages/AccountSetUp";
import BusinessGallery from "./components/BussnissGallaryFreeLance";
import ControlPanel from "./pages/ControlPanal";
import UserAccount from "./pages/UserAccount";
import FinancialTransactions from "./pages/AccountBalance";
import AddProjectForm from "./pages/AddProject";
import AddServiceForm from "./pages/AddService";
import ServiceListingPage from "./pages/ServiceListPage";
import BusinessGalleryPage from "./pages/BusinessGalleryPage";
import SettingPage from "./pages/User-setting";
import EditAccountPage from "./pages/user-profile";
import OpenProjects from "./pages/Projects";
import FreelancerList from "./pages/Freelancers";
import ContactMePage from "./pages/ContactMePage";
import Home from "./pages/HomePage";
import ServicesPolicyPage from "./components/Policis/ServicesPolicyPage";
import TermsOfUsePage from "./components/Policis/TermsOfUsePage";
import GuaranteeYourRightsPage from "./components/Policis/GuaranteeYourRightsPage";
import HowToBeFreelancerPage from "./components/Policis/HowToBeFreelancerPage";
import AboutUsPage from "./components/Policis/AboutUsPage";
import PrivacyStatementPage from "./components/Policis/PrivacyStatementPage";
import FrequentlyAskedQuestionsPage from "./components/Policis/FrequentlyAskedQuestionsPage";
import HowToAddProjectPage from "./components/Policis/HowToAddProjectPage";
import ServicesPage from "./pages/ServicesPage";
// import ServiceCard from "./pages/ServiceDetailsPage";
import StaticServiceCard from "./pages/ServiceDetailsPage";
import MyFavourites from "./pages/MyFavourites";
import BankAccountsComponent from "./pages/BankAccountsComponent";
import EmailComponent from "./pages/EmailComponent";
import CreditCardComponent from "./pages/CreditCardComponent";
import IdentityVerification from "./pages/IdentityVerification";
import AboutCompaniesPage from './components/Policis/AboutCompaniesPage'
import SearchResults from "./pages/Search";
import Offers from "./pages/Offer";
import Chat from "./pages/Chat";

const isAuth = localStorage.getItem("token");



function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/react" element={<Home />} />
          <Route path="/react/signin" element={<SignInPage />} />
          <Route path="/react/password-recovery" element={<PasswordRecoveryPage />} />
          <Route path="/react/joinUs" element={<JoinUsPage />} />
          <Route path="/react/accountSetup" element={<AccountSetup />} />
          <Route path="/react/businessGallery" element={<BusinessGallery />} />

          <Route path="/react/ServiceListingPage" element={<ServiceListingPage />} />
          <Route path="/react/FreelancerList" element={<FreelancerList />} />
          <Route
            path="/react/BusinessGalleryPage"
            element={<BusinessGalleryPage />}
          />
              <Route path="/react/OpenProjects" element={<OpenProjects />} />
              <Route path="/react/AboutCompaniesPage" element={<AboutCompaniesPage />} />
              <Route path="/react/SearchResults" element={<SearchResults />} />

          {isAuth && (
            <Route>
              <Route path="/react/UserAccount" element={<UserAccount />} />
              {<Route path="/react/ControlPanel" element={<ControlPanel />} />}
              <Route
                path="/react/FinancialTransactions"
                element={<FinancialTransactions />}
              />
              <Route path="/react/AddProjectForm" element={<AddProjectForm />} />
              <Route path="/react/AddServiceForm" element={<AddServiceForm />} />


              <Route path="/react/SettingPage" element={<SettingPage />} />

              <Route path="/react/EditAccountPage" element={<EditAccountPage />} />

              <Route
                path="/react/ContactMePage/:freelancerId"
                element={<ContactMePage />}
              />
            </Route>
          )}

          <Route path="/react/ServicesPolicyPage" element={<ServicesPolicyPage />} />
          <Route path="/react/TermsOfUsePage" element={<TermsOfUsePage />} />
          <Route
            path="/react/GuaranteeYourRightsPage"
            element={<GuaranteeYourRightsPage />}
          />
          <Route
            path="/react/HowToBeFreelancerPage"
            element={<HowToBeFreelancerPage />}
          />
          <Route path="/react/AboutUsPage" element={<AboutUsPage />} />
          <Route
            path="/react/PrivacyStatementPage"
            element={<PrivacyStatementPage />}
          />
          <Route
            path="/react/FrequentlyAskedQuestionsPage"
            element={<FrequentlyAskedQuestionsPage />}
          />
          <Route
            path="/react/HowToAddProjectPage"
            element={<HowToAddProjectPage />}
          />
          <Route
            path="/react/ServicesPage/:categoryParam"
            element={<ServicesPage />}
          />
          <Route
            path="/react/StaticServiceCard/:id"
            element={<StaticServiceCard />}
          />
          <Route
            path="/react/MyFavourites"
            element={<MyFavourites />}
          />
          <Route
            path="/react/BankAccounts"
            element={<BankAccountsComponent />}
          />
          <Route
            path="/react/Email"
            element={<EmailComponent />}
          />
          <Route
            path="/react/CreditCard"
            element={<CreditCardComponent />}
          />
          <Route
            path="/react/IdentityVerification"
            element={<IdentityVerification />}
          />
          <Route
            path="/react/project/:id"
            element={<Offers />}
          />
          <Route
            path="/react/Chat"
            element={<Chat />}
          />

          {/* <Route path="/AccountData" element={<AccountData />} /> */}
          <Route path="*" element={<Home />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
