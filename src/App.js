import React from 'react';
import MusicPlayer from './components/MusicPlayer'; // Adjust the path as necessary

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>Welcome to My Music App</h1>
            </header>
            <main>
                <MusicPlayer />
            </main>
        </div>
    );
}

export default App;
