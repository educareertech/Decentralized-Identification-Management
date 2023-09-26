// import SignUp from './Components/Signup';
// import Login from './Components/Login';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import * as c from './Pages';
import ProtectedRoutes from './ProtectedRoutes';


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<c.Home />} />
        <Route path='/login' element={<c.Login />} />
        <Route path='/register' element={<c.Register />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/welcome" element={<c.Welcome />} />
          <Route path='/UserProfile' element={<c.UserProfile />}  />
          <Route path='/CreateCredential' element={<c.CreateCredential />}  />
          <Route path='/IssueCredential/:did' element={<c.IssueCredential />}  />
          <Route path='/Credentials' element={<c.Credentials />}  />
          <Route path='/MyCredentials' element={<c.MyCredentials />} />
          <Route path='/ProviderProfile' element={<c.ProviderProfile />} />
          <Route path='/GetUserInfo' element={<c.GetUserInfo />} />
          <Route path='/GetCredentialInfo' element={<c.GetCredentialInfo />} />
          <Route path='/ProviderDetail/:providerId' element={<c.ProviderDetail />} />
          <Route path='/IssuedCredentials/:schemaId' element={<c.IssuedCredential />} />
          <Route path='/CredentialAccess/:schemaId' element={<c.CredentialAccess />} />
          <Route path='/InfoAccess' element={<c.InfoAccess />} />
          <Route path='/AboutUs' element={<c.AboutUs />} />
          <Route path='/Developers' element={<c.Developers />} />
        </Route>
      </Routes>
    </Router>
  );
}


export default App;
