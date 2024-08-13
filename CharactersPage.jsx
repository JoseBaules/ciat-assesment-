import React, { useEffect, useState } from 'react';


import axios from 'axios';
import CharacterCard from '../character-card/CharacterCard';

export default function SearchForm() {

  //Holds the list of all characters retrieved from the API.
  const [characters, setCharacters] = useState([]);

  //Function to update the 'characters' state.
  const [searchText, setSearchText] = useState('');

  //Tracks the current page number for pagination.
  const [currentPage, setCurrentPage] = useState(1);

  //Holds the number of characters to show per page.
  const charactersPerPage = 10;

  //Fetchs data from the python server running localy.
  useEffect(() => {
    const fetchCharacters = async () => {
      try 
      {
        //Requests data from the python local server.
        const response = await axios.get('http://127.0.0.1:5000/');

        //Printing response data.
        console.log(response.data); 

        // Stores response data, if empty just blank
        setCharacters(response.data || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchCharacters();
  }, []);

  // Check if characters is an array before calling filter
  const filteredCharacters = Array.isArray(characters)
    ? characters.filter(character =>
        character.name.toLowerCase().includes(searchText.toLowerCase())
      )
    : [];

  // Pagination logic
  const indexOfLastCharacter = currentPage * charactersPerPage;
  const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage;
  const currentCharacters = filteredCharacters.slice(indexOfFirstCharacter, indexOfLastCharacter);

  const nextPage = () => {
    if (currentPage < Math.ceil(filteredCharacters.length / charactersPerPage)) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  // UI
  return (
    <div className="p-4 bg-white">
      <h1 className="text-2xl font-bold mb-4">Rick & Morty Characters</h1>

      {/* Searching box component */}
      <input
        className="border p-2 mb-4 rounded w-full"
        type="text"
        placeholder="Search characters..."
        onChange={e => setSearchText(e.target.value)}

        // Stores the text user is looking for.
        value={searchText}
      />

      {/* Holds the CharacterCard for each character */}
      <div className="grid grid-cols-2 gap-4">

        {/* Iterate through the array of characters */}
        {currentCharacters.map(character => 
        (
          // Sends Character information to the Floating Character card/
          <CharacterCard key={character.id} character={character} />
        ))}

      </div>

      <div className="flex justify-between mt-4">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className="bg-gray-300 p-2 rounded"
        >
          Previous
        </button>
        <span className="p-2">
          Page {currentPage} of {Math.ceil(filteredCharacters.length / charactersPerPage)}
        </span>
        <button
          onClick={nextPage}
          disabled={currentPage === Math.ceil(filteredCharacters.length / charactersPerPage)}
          className="bg-gray-300 p-2 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
}
