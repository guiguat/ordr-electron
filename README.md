# ORDR
> This is a restaurant management system made with TypeScript React & Electron in the frontend and a TypeScript NodeJS Express REST API as the backend

![](https://img.shields.io/badge/React-v^16.13.1-blue)
![](https://img.shields.io/badge/Firebase-Auth-orange)
![](https://img.shields.io/badge/Electron-v^9.0.4-blue)
![](https://img.shields.io/badge/Bootstrap-v4.5-purple)

Ordr helps the manager to keep track of the money that is comming in and also the stock of every product in the database, with an intuitive and clean user interface to make the seller's life easier and quicker

![](header.png)

## Installation

this section will be available in the future soon...

## Development setup

- ### Clone the API and this repository:

    ```sh
    #cloning the API repository
    git clone https://github.com/guiguat/Ordr-Api
    #cloning this repository 
    git clone https://github.com/guiguat/ordr-electron
    ```
- ### In one console, start the backend server:

    ```sh
    cd Ordr-Api 
    npm install
    npm run dev
    ```
- ### In another console, start the react app:

    ```sh
    cd ordr-electron
    npm install
    npm run start:web
    ```
    at this point you will be able to use the app in your browser

- ### If you want to run it as an electron app:

    ```sh
    npm run start:electron
    ```

## Contributing

1. Fork it (<https://github.com/guiguat/ordr-electron/fork>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request

## made with ♥ by Guilherme Guatura