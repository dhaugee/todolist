-- for logging set up and manipulation of the to-do list database

CREATE TABLE Items (
    ID INT AUTO_INCREMENT PRIMARY KEY, -- Probably good to have for identifying items 
    title VARCHAR(250) NOT NULL,
    deadline DATETIME NOT NULL,
    complete BOOLEAN NOT NULL, -- Should always be initialized to false
);