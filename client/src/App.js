import './App.css';
import Login from './components/Login';
import Signup from './components/Signup'
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import Profile from './components/Profile';
import {Routes, Route} from 'react-router-dom'
import {useState, useEffect} from 'react'
import GameBoard from './components/GameBoard';
import Leaderboard from './components/Leaderboard'
import About from './components/About';

function App() {
  const [user, setUser] = useState(null);
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    fetch('/questions')
      .then(resp => resp.json())
      .then(data => {
          setQuestions(data)
          console.log(data[0].prompt)
      });
    }, []);

  return (
    <div className="App">
      <Header setLoggedIn={setUser} loggedIn={user}/>
      <Routes>
        <Route exact path='/' element={<LandingPage isLoggedIn={user}/>}/>
        <Route exact path='/login' element={user === null ? <Login onLogin={setUser}/> : null} />
        <Route exact path='/signup' element={user === null ? <Signup onLogin={setUser}/> : null} />
        <Route exact path='/play' element={<GameBoard user={user} setUser={setUser} questions={questions}/>} />
        <Route exact path= '/profile' element={user? <Profile user={user} resetUser={setUser} questions={questions} /> : null} />
        <Route exact path='/leaderboard' element={<Leaderboard />} />
        <Route exact path='/about' element={<About />} />
      </Routes>
    </div>
  );
}


export default App;
