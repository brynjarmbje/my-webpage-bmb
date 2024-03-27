import React from 'react';
import MusicPlayer from './components/MusicPlayer'; // Adjust the path as necessary
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
    return (
        <div className="App">
                      <Header />
            <header className="App-header">
                <h1>Welcome to My Music App</h1>
            </header>
            <main>
                <MusicPlayer />
            </main>
            <Footer />
        </div>
    );
}

export default App;
