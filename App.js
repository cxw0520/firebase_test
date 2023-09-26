import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./Header";
import Signin from './pages/Signin'
import Posts from "./pages/Posts";
import NewPost from "./pages/NewPost";
import Draw from "./pages/Draw";


function App(){
    return (
    <BrowserRouter>
        <Header/>
        <Routes>
            <Route 
                path="/" exact 
                element={<Posts/>}> 
            </Route>
            <Route 
                path="/" 
                exact element="首頁">
            </Route>
            <Route 
                path="/signin" 
                exact element={<Signin />}>
            </Route>
            <Route
                path="/new-post"
                exact element={<NewPost />}>
            </Route>
            <Route
                path="/draw"
                exact element={<Draw />}>
            </Route>

        </Routes>
    </BrowserRouter>
    
    );
}

export default App;