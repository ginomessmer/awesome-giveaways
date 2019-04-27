import React from 'react';
import './App.scss';
import { BrowserRouter, Route } from 'react-router-dom';
import { SubmissionPage } from './features/submissions/submission-page';
import { DashboardPage } from './features/dashboard/dashboard-page';
import { PrivacyPolicyPage } from './features/privacy/privacy-policy-page';
import { WinnerPage } from './features/dashboard/winner-page';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Route exact path="/" component={SubmissionPage} />
      <Route path="/dashboard" component={DashboardPage} />
      <Route path="/winner" component={WinnerPage} />

      <Route path="/privacy" component={PrivacyPolicyPage} />
    </BrowserRouter>
  );
}

export default App;
