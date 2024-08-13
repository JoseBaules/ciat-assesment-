import React, { useState } from 'react';

const CharacterCard = ({ character }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleClickOutside = (e) => {
    if (e.target.id === 'modal-overlay') {
      closeModal();
    }
  };

  return (
    <>
      {/* Character Card */}
      <div
        onClick={openModal}
        className="group block transform transition-transform hover:scale-105 cursor-pointer">

        <div className="bg-white p-6 mb-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex justify-center">
            {character.image ? (
              <img
                // Sets character profile picture using the src.
                src={character.image}
                alt={character.name}
                className="w-32 h-32 rounded-full object-cover"
              />
            ) : (

              // if not source, No Image. 
              <div className="w-32 h-32 bg-gray-300 rounded-full flex items-center justify-center text-gray-500 text-xl">
                No Image
              </div>
            )}
          </div>
          <h2 className="text-xl font-semibold mt-4 text-center group-hover:text-indigo-600 transition-colors">
            {character.name}
          </h2>
          <div className="text-center mt-2">
            <p className="text-gray-700">
              <span className="font-medium">Status:</span> {character.status}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Species:</span> {character.species}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Location:</span> {character.location?.name || "Unknown location"}
            </p>
          </div>
        </div>
      </div>

      {/* Modal for Floating Card */}
      {isModalOpen && (
        <div
          id="modal-overlay"
          onClick={handleClickOutside}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 md:w-1/2 lg:w-1/3 relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 focus:outline-none"
            >
              &times;
            </button>
            <div className="flex justify-center mb-4">
              {character.image ? (
                <img
                  src={character.image}
                  alt={character.name}
                  className="w-32 h-32 rounded-full object-cover"
                />
              ) : (
                <div className="w-32 h-32 bg-gray-300 rounded-full flex items-center justify-center text-gray-500 text-xl">
                  No Image
                </div>
              )}
            </div>
            <h2 className="text-2xl font-bold text-center mb-4">{character.name}</h2>
            <div className="text-center">
              <p className="text-gray-700 mb-2">
                <span className="font-medium">Status:</span> {character.status}
              </p>
              <p className="text-gray-700 mb-2">
                <span className="font-medium">Species:</span> {character.species}
              </p>
              <p className="text-gray-700 mb-2">
                <span className="font-medium">Location:</span> {character.location?.name || "Unknown location"}
              </p>
              {/* {character.description && (
                <p className="text-gray-700">{character.description}</p>
              )} */}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CharacterCard;
  