from flask import Flask, jsonify
from flask_cors import CORS
import requests
from models import Character, Response, Info, Origin, Location  # Ensure model imports are correct

# Defines API's endpoint.
url = 'https://rickandmortyapi.com/api/character?page=1'

# Creates a Flask app
app = Flask(__name__)


CORS(app)

# Function to convert dictionary to dataclass instance
def extract_data(cls, data):
    # Crop if response-level
    if cls == Response:
        info = extract_data(Info, data['info'])
        results = [extract_data(Character, item) for item in data['results']]
        return cls(info=info, results=results)
    # Crop if Info-level
    if cls == Info:
        return cls(count=data['count'], pages=data['pages'], next=data['next'], prev=data['prev'])
    # Crop if Character-level
    if cls == Character:

        return cls(
            id=data['id'],
            name=data['name'],
            status=data['status'],
            species=data['species'],
            type=data['type'],
            gender=data['gender'],
            origin=extract_data(Origin, data['origin']),
            location=extract_data(Location, data['location']),
            image=data['image'],
            episode=data['episode'],
            url=data['url'],
            created=data['created']
        )
    # Crop if origin-level
    if cls == Origin:
        return cls(name=data['name'], url=data['url'])
    # Crop if Location-level
    if cls == Location:
        return cls(name=data['name'], url=data['url'])
    raise ValueError(f"Unknown class: {cls}")

# Define a route
@app.route('/')
def pull_data():
    try:
        # Get Response from API
        response = requests.get(url)
        # Raise an HTTPError for bad responses
        response.raise_for_status()
        data = response.json()

        # Convert raw data to dataclass instances.
        validated_data = extract_data(Response, data)

        # Extract and format character information.
        characters = validated_data.results

        # Holds list of characters pulled from API.
        character_list = []

        for character in characters:
            character_info = {
                'id': character.id,
                'name': character.name,
                'status': character.status,
                'species': character.species,
                'location': character.location,
                'image': character.image
            }
            character_list.append(character_info)
        # Return the list of character info as JSON
        return jsonify(character_list)

    # Return an error message and 500 status code
    except requests.RequestException as e:
        return jsonify({"error": str(e)}), 500
    # Return an error message and 500 status code
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Run the app
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
