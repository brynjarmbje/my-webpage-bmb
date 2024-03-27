import React from 'react';
import MusicPlayer from './components/MusicPlayer'; // Adjust the path as necessary
import Header from './components/Header';
import Footer from './components/Footer';
import MenuComponent from './components/MenuComponent';



function App() {
  const goToExPage = () => {
    window.location.href = '/examples/ex.html';
  };

    return (
        <div className="App">
                      <Header />
            <header className="App-header">
                <h1>Welcome to My Music App</h1>
            </header>
            <main>
                <MusicPlayer />
                <button onClick={goToExPage}>Go to Ex Page</button>
                <MenuComponent />
            </main>
            <Footer />
        </div>
    );
}

export default App;
