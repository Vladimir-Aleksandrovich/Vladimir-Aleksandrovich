
import './App.css';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Footer from './components/Footer/Footer';
import PostListProvider from './components/context/PostContext';
function App() {
  
  return (
     <PostListProvider>
    <div className="container py-5">
     <Header/>
     <Main/>
     <Footer/>
    </div>
    </PostListProvider>
  );
}

export default App;
