import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
// import { themeOptions } from './themeOptions';

// Firebase!
import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyBOa-U8vaK5jwVdy3kvOUGPa8Y-pjTWdCA",
  authDomain: "bapanadle.firebaseapp.com",
  projectId: "bapanadle",
  storageBucket: "bapanadle.firebasestorage.app",
  messagingSenderId: "93106692969",
  appId: "1:93106692969:web:c970591a664a108eb053f8",
  measurementId: "G-10PDGP8ZHN"
};
initializeApp(firebaseConfig);

const rootElement = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(rootElement);

root.render(
    <StrictMode>
        {/* <ThemeProvider theme={createTheme(themeOptions)}> */}
            <App />
        {/* </ThemeProvider> */}
    </StrictMode>,
);
