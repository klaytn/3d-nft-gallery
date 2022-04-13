import React, { Component } from 'react'
import CaverExtKAS from 'caver-js-ext-kas'
import caver from '../klaytn/caver'
import WalletInfo from '../components/WalletInfo'
import './KaikasPage.scss'
import { prepare, getResult } from 'klip-sdk'
import QRCode from 'qrcode.react'


// console.log(process.env.ACCESS_KEY_ID)
// console.log(process.env.SECRET_ACCESS_KEY)
const caverExtKas = new CaverExtKAS(8217, process.env.ACCESS_KEY_ID, process.env.SECRET_ACCESS_KEY)
var klipLink = "" 
var newCursor = "" 

class KaikasPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      account: null,
      network: null,
      RequestStatus: null,
      walletType: null,
      walletSelected: false,
    }
  }

  getImg = async(tokenUri) => {
    const { unityContext } = this.props
    const src = await fetch(tokenUri)
      .then(function (response){
        return response.json();
      })
      .then(async (json)=>{
        var reg_video = /(.*?)\.(webm|mp4|m4v|ogv)$/;
        var reg_gif = /(.*?)\.(gif)$/;
        if(json.hasOwnProperty("animation_url") && json.animation_url.match(reg_video))
        {
          unityContext.send("NFTList", "addUrl", json.animation_url);
          unityContext.send("NFTList", "loadNFT");
        }
        else if(!json.image.match(reg_gif)){
          unityContext.send("NFTList", "addUrl", json.image);
          unityContext.send("NFTList", "loadNFT");
        }
        else{
          await this.getNFTUriInFailedCase();
        }
      })
      .catch(async (e)=>{
        console.error(e)
        if(newCursor != "")
        {
          await this.getNFTUriInFailedCase();
        }
        else{
          unityContext.send("NFTList", "loadNFT");
        }
      })
  }

  getNFTUriInFailedCase = async()=>{
    //method that retrieves one more NFT for failed case.
    const { account } = this.state 
    const { unityContext } = this.props
    const query = {
      kind: caverExtKas.kas.tokenHistory.queryOptions.kind.NFT,
      size: 1,
      cursor: newCursor
    }
    const ret = await caverExtKas.kas.tokenHistory.getTokenListByOwner(account, query)
    newCursor = ret.cursor
    for await (const element of ret.items){
      await this.getImg(element.extras.tokenUri)
    } 
    unityContext.send("NFTList", "updateCursor", newCursor)
  }

  getNFTUri = async()=> {
    const { account } = this.state
    const { unityContext, currentCursor } = this.props
    const query = {
      kind: caverExtKas.kas.tokenHistory.queryOptions.kind.NFT,
      size: 9,
      cursor: currentCursor,
    }
    const ret = await caverExtKas.kas.tokenHistory.getTokenListByOwner(account, query)
    if(ret.items.length == 0)
    {
      unityContext.send("NFTList", "loadNFT")
    }
    unityContext.send("NFTList", "reset")
    newCursor = ret.cursor
    unityContext.send("NFTList", "addCursor", newCursor)
    for await (const element of ret.items){
      await this.getImg(element.extras.tokenUri)
    }
  }

  loadAccountInfo = async (e) => {
    const walletType = e.target.value
    this.setState({
      walletType : e.target.value,
      walletSelected: true
    })
    
    if (walletType == "kaikas-wallet") {
      const { klaytn } = window
      if (klaytn){
        try {
          await klaytn.enable()
          this.setAccountInfo(klaytn)
          klaytn.on('accountsChanged', () => this.setAccountInfo(klaytn))

        } catch (error) {
          console.log('User denied account access')
        }
      } else {
        console.log('Non-Kaikas browser detected. You should consider trying Kaikas!')
      }
    }

    if (walletType == "klip-wallet"){
      const bappName = '3d-nft-gallery'
      const res = await prepare.auth({ bappName })
      if (res.err) {
        console.log(res.err)
      } else if (res.request_key) {
        klipLink = 'https://klipwallet.com/?target=/a2a?request_key='+ res.request_key
        const interval = setInterval(()=> {
          getResult(res.request_key).then((data)=>{
            this.setState({
              account: (data.status == "completed") ? data.result.klaytn_address : null,
              RequestStatus : data.status
            })
            if(data.status == "completed" || data.status == "canceled" || data.status=="error"){
              clearInterval(interval)
            }
          })
        }, 1000);
      }
    }
  }

  setAccountInfo = async () => {
    const { klaytn } = window
    if (klaytn === undefined) return
    const account = klaytn.selectedAddress
    this.setState({
      account, 
    })
  }

  render() {
    const { account, RequestStatus, walletSelected, walletType, } = this.state
    const { unityLoaded, currentCursor } = this.props

    if (unityLoaded && walletSelected &&  account != null && currentCursor != null)
    { 
      this.getNFTUri();
    }

    return (
      <div className="KaikasPage">
        {unityLoaded?
        <div className="KaikasPage__main">
        {(walletType == "klip-wallet" && RequestStatus == "prepared") ? <div><h2 className="info">Scan QR Code with your phone. </h2><QRCode value ={klipLink}/></div>: null}
        {(walletType == "klip-wallet" && (RequestStatus == "canceled" || RequestStatus == "error")) ? <div><h2 className="info"> Login process is failed.</h2></div>: null}
        {!walletSelected?
          <div>
            <h2 className="info">Connect your wallet. </h2>
            <select  id="wallet-type" onChange={this.loadAccountInfo} className="custom_select">
              <option value="wallet-type"> wallet-type</option>
              <option value="kaikas-wallet"> kaikas</option>
              <option value="klip-wallet"> klip</option>
            </select>
          </div>: null}
        {account!=null ? <WalletInfo address={account}/>: null}
        </div> : null}
      </div>
    )
  }
}

export default KaikasPage
