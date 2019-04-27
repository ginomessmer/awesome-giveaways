import React from 'react';
import './App.scss';
import { BrowserRouter, Route } from 'react-router-dom';
import { SubmissionPage } from './features/submissions/submission-page';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Route exact path="/" component={SubmissionPage} />
    </BrowserRouter>
  );
}

export default App;
