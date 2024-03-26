CREATE TABLE music_files (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    artist VARCHAR(255),
    album VARCHAR(255),
    year INT,
    file_url TEXT
);