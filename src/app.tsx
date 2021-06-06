import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AppContext from '../src/app-context';
import AppStore from './stores/app';
import AppApi from './apis/app';
import UserPage from './pages/user';
import PostPage from './pages/post';
import HomePage from './pages/home';

const store = new AppStore();
const api = new AppApi(store);

function App() {
  return (
    <AppContext.Provider value={{ store, api }}>
      <BrowserRouter>
        <Switch>
          <Route path="/user/:userId" component={UserPage} />
          <Route path="/post/:postId" component={PostPage} />
          <Route path="/" component={HomePage} />
        </Switch>
      </BrowserRouter>
    </AppContext.Provider>
  );
}
export default App;
