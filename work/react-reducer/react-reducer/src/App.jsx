
import { useReducer } from "react";
import {reducer, initialState} from './reducer';
import ContentComp from "./components/ContentComp";
import LoginComp from './components/LoginComp';

function App(){
  const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <main className="">
          <div className={`app ${state}`}></div>
          {!isLoggedIn && <LoginComp />}
          {isLoggedIn && <ContentComp />} 
        </main>
    );
}

export default App;
