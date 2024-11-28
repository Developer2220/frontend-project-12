/* eslint-disable functional/no-expression-statement */
import ReactDOM from 'react-dom/client';
import init from './init.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

const app = async () => {
  const root = ReactDOM.createRoot(document.querySelector('#chat'));
  root.render(await init());
};

app();