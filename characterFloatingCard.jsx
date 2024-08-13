import React from 'react';

//
const CharacterFloatingCard = ({ character }) => {
  return (
    <div className="relative max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Floating effect */}
      <div className="absolute inset-0 transform -translate-y-4 -translate-x-2 z-10 bg-white p-6 rounded-xl shadow-2xl">
        <div className="md:flex">
          {/* Image section */}
          <div className="md:flex-shrink-0 bg-gray-100 w-full h-48 md:w-48 flex items-center justify-center rounded-xl">
            {character.image ? (
                //sets image for floating page.
              <img className="h-48 w-full object-cover md:w-48 rounded-xl" src={character.image} alt={character.name} />
            ) : (
              <div className="h-48 w-full flex items-center justify-center text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V4z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 8h.01M12 8h.01M16 8h.01M8 12h8m-8 4h8" />
                </svg>
              </div>
            )}
          </div>

          {/* Text section */}
          <div className="p-6">
            {/* Sets information about characters */}
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{character.name}</div>
            <p className="block mt-1 text-lg leading-tight font-medium text-black">{character.status}</p>
            <p className="mt-2 text-gray-500">{character.description || "Brilliant but sociopathic scientist who drags his grandson on interdimensional adventures."}</p>
            <p className="mt-2 text-gray-500"><span className="font-semibold">Location:</span> {character.location?.name || "Unknown location"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterFloatingCard;
