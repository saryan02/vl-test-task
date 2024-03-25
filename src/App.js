import './scss/app.scss'

import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Read from "./pages/Read";
import Update from "./pages/Update";
import Main from "./pages/Main";
import Create from "./pages/Create";
function App() {

    return (
        <>

            <Router>
                <Routes>
                    <Route path="/" exact element={<Main/>}></Route>
                    <Route path="/read/:id" exact element={<Read/>}></Route>
                    <Route path="/update/:id" exact element={<Update id='' date='' mark='' priority='' description='' title=''/>}></Route>
                    <Route path="/create" exact element={<Create />}></Route>

                </Routes>
            </Router>
        </>


    );
}

export default App;
