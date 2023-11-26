import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import Footer from './components/Layout/Footer/Footer';
import Header from './components/Layout/Header/Header';
import About from './components/About/about';
import NotFound from './components/Layout/NotFound/NotFound';
import Request from './components/Request/Request';
import Country from './components/Demo/Country';
import Translate from './components/LanguageTranslator/Translate';

// Germany Routes inports
import Quiz1 from './components/Germany/Quiz1';
import Category1 from './components/Germany/Category1';
import DragDropQuiz1 from './components/Germany/DragDropQuiz1';
import FillBlanks1 from './components/Germany/FillBlanks1';

//Russia Routes imports
import FillBlanks2 from './components/Russia/FillBlanks2';
import DragDropQuiz2 from './components/Russia/DragDropQuiz2';
import Category2 from './components/Russia/Category2';
import Quiz2 from './components/Russia/Quiz2';

//China Routes imports
import FillBlanks3 from './components/China/FillBlanks3';
import DragDropQuiz3 from './components/China/DragDropQuiz3';
import Category3 from './components/China/Category3';
import Quiz3 from './components/China/Quiz3';

//Japan Routes imports
import Quiz4 from './components/Japan/Quiz4';
import Category4 from './components/Japan/Category4';
import DragDropQuiz4 from './components/Japan/DragDropQuiz4';
import FillBlanks4 from './components/Japan/FillBlanks4';

//USA Routes imports
import Quiz5 from './components/USA/Quiz5';
import Category5 from './components/USA/Category5';
import DragDropQuiz5 from './components/USA/DragDropQuiz5';
import FillBlanks5 from './components/USA/FillBlanks5';

function App() {
  window.addEventListener('contextmenu', e => {
    e.preventDefault();
  });

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/request" element={<Request />} />
        <Route path="/Country" element={<Country />} />
        <Route path="/translator" element={<Translate />} />
        <Route path="*" element={<NotFound />} />

        {/* Germany routes */}
        <Route path="/quiz/Germany" element={<Category1 />} />
        <Route path="/germany/quiz" element={<Quiz1 />} />
        <Route path="/germany/drag-drop-quiz" element={<DragDropQuiz1 />} />
        <Route path="/germany/fill-blanks" element={<FillBlanks1 />} />

        {/* Russia Routes */}
        <Route path="/quiz/Russia" element={<Category2 />} />
        <Route path="/russia/quiz" element={<Quiz2 />} />
        <Route path="/russia/drag-drop-quiz" element={<DragDropQuiz2 />} />
        <Route path="/russia/fill-blanks" element={<FillBlanks2 />} />

        {/* China Routes */}
        <Route path="/quiz/China" element={<Category3 />} />
        <Route path="/china/quiz" element={<Quiz3 />} />
        <Route path="/china/drag-drop-quiz" element={<DragDropQuiz3 />} />
        <Route path="/china/fill-blanks" element={<FillBlanks3 />} />

        {/* Japan Routes */}
        <Route path="/quiz/Japan" element={<Category4 />} />
        <Route path="/japan/quiz" element={<Quiz4 />} />
        <Route path="/japan/drag-drop-quiz" element={<DragDropQuiz4 />} />
        <Route path="/japan/fill-blanks" element={<FillBlanks4 />} />

        {/* USA Routes */}
        <Route path="/quiz/USA" element={<Category5 />} />
        <Route path="/usa/quiz" element={<Quiz5 />} />
        <Route path="/usa/drag-drop-quiz" element={<DragDropQuiz5 />} />
        <Route path="/usa/fill-blanks" element={<FillBlanks5 />} />








      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
