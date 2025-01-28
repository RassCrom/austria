# Austria mapping project

This project is a map-based application built with React and Mapbox GL JS...

## Features

- **Interactive Map**: Displays a Mapbox map with 3D terrain capabilities.
- **GeoJSON Data Layers**: Loads and displays various GeoJSON datasets (e.g., salamander habitats, city infrastructure).
- **Custom Icons**: Loads custom icons from image files and displays them based on GeoJSON data.
- **3D Visualization**: Integrates Mapbox's 3D terrain feature for enhanced visualization of elevation data.

## Demo

You can see the live demo of this project [here](#).

## Installation

To set up this project locally, follow these steps:

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/map-navigation.git
2. Install dependencies:
    cd map-navigation
    yarn install
3. Create a .env file in the root of the project and add your Mapbox token:
    VITE_MAPBOX_TOKEN=your_mapbox_token_here
4. Start the development server:
    yarn run dev

Your application should now be running at http://localhost:5174

## Usage

Once the application is running, you can interact with the map:

- **Zoom and Pan**: Use the mouse scroll wheel or drag the map to zoom and pan.
- **Custom Layers**: The map displays data from various GeoJSON sources, such as salamander habitats and city infrastructure, with custom markers and layers.

### Layers and Icons

- **GeoJSON Source**: GeoJSON data is fetched and displayed on the map as layers.
- **3D Terrain**: Terrain data is integrated using Mapbox’s terrain RGB tiles to enhance the 3D visualization of geographic features.

## Technologies Used

- **React**: Frontend framework for building the application.
- **Mapbox GL JS**: Mapping library for displaying the map and adding interactive layers.
- **Axios**: For making HTTP requests to fetch GeoJSON data.
- **Vite**: Development environment for fast builds and hot module replacement.
- **Mapbox Terrain RGB**: To add 3D terrain elevation to the map.
- **React router**
- **Redux toolkit**
- **Threebox plugin (Threejs)**
- **GSAP**

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
