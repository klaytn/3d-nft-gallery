<img width="50%" src="https://user-images.githubusercontent.com/32542557/162716172-e180ec80-8c7e-4f48-a59a-132b8c577d13.png"><img width="50%" src="https://user-images.githubusercontent.com/32542557/162716176-60d07f67-6c2f-421f-810a-9a9ceb457971.png"> 


### 1) Introduction
NFT Gallery is a BApp that works with Kaikas and Klip wallet. This project refers to the source code of the [Kaikas tutorial](https://github.com/klaytn/kaikas-tutorial). And the 3d WebGL game is created with Unity. Once you log in with your Kaikas wallet or Klip wallet, you can place your NFT on the wall. This project uses NodeJS v16.14.2.

### 2) Getting started
1. Open terminal
2. Clone the repo by running `git clone https://github.com/klaytn/3d-nft-gallery.git`
3. `cd 3d-nft-gallery`
4. Write `.env` file in configs folder. (To generate Authentication Key, visit [here](https://docs.klaytnapi.com/v/en/getting-started/get-ready#getting-started-getready-key))
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
