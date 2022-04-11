<img width="1563" alt="Screen Shot 2022-03-04 at 11 56 05 AM" src="https://user-images.githubusercontent.com/32542557/156690631-3069d86a-9822-44ba-b8db-24076b2d17d5.png">

### 1) Introduction
NFT Gallery is a BApp that works with Kaikas. This project refers to the source code of the Kaikas tutorial (https://github.com/klaytn/kaikas-tutorial). 
Once you log in with your Kaikas wallet, the game screen shows max 5 NFT images owned by you. 

### 2) Getting started
1. Open terminal
2. Clone the repo by running `git clone https://github.com/Yeonju-Kim/NFT-Gallery.git`
3. `cd kaikas-tutorial`
4. Write `.env` file in configs folder. (https://docs.klaytnapi.com/undefined/get-ready#getting-started-getready-key)
```
ACCESS_KEY_ID={YourAccessKeyID}
SECRET_ACCESS_KEY={YourSecretAccessKey}
```
5. Run `npm install` to install node packages
6. Run `npm run local`
7. App should be running on https://localhost:8888

#### Builds the app for production
1. Run `npm run build` to build app
2. Run `npm start`
3. App should be running on https://localhost:5555

### 3) Move a Player in Unity 
Move the view around using the mouse, the WASD keys to move left/right/forward/backward. 
