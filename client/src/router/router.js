import React from "react";
import {
    BrowserRouter as Router,
    Switch, Route,
} from "react-router-dom"


// pages
import FrontPage from '../components/pages/front_page/front_page'
import ChatRoom from '../components/pages/chat_room/chat_room'

export default function App() {
    return (
        <Router>
            <Switch>
                <Route path="/" component={FrontPage} exact={true} />
                <Route path="/chatroom" component={ChatRoom} />
            </Switch>
        </Router>
    );
}