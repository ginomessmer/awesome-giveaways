import React from 'react';
import './App.scss';
import { BrowserRouter, Route } from 'react-router-dom';
import { SubmissionPage } from './features/submissions/submission-page';
import { DashboardPage } from './features/dashboard/dashboard-page';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Route exact path="/" component={SubmissionPage} />
      <Route path="/dashboard" component={DashboardPage} />
    </BrowserRouter>
  );
}

export default App;
