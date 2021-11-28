import { BrowserRouter, NavLink, Route, Switch } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import Books from "./Books";
import Chapters from "./Chapters";
import Paragraphs from "./Paragraphs";


function App() {
  return (
    <div className="App">

      <BrowserRouter>
      <div className="header">
        <NavLink exact activeClassName="active" to="/">Home</NavLink>
        <NavLink activeClassName="active" to="/register">Register</NavLink>
        <NavLink activeClassName="active" to="/login">Login</NavLink>
        <NavLink activeClassName="active" to="/Books">Books</NavLink>
        <NavLink activeClassName="active" to="/Chapters">Chapters</NavLink>
        <NavLink activeClassName="active" to="/Paragraphs">Paragraphs</NavLink>

      </div>
      <div className="content">
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/register" component={Register}></Route>
          <Route path="/books" component={Books}></Route>
          <Route path="/chapters" component={Chapters}></Route>
          <Route path="/paragraphs" component={Paragraphs}></Route>

        </Switch>

      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
