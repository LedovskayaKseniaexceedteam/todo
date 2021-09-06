import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import {App} from './App';
import { store } from './redux';
import { Provider } from 'react-redux';

ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
  document.getElementById('root')
);

