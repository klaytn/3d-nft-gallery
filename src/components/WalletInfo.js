import React from 'react'

import './WalletInfo.scss'

const WalletInfo = ({ address }) => {
  return (
    <div className="WalletInfo">
      <h2 className="WalletInfo__title">Wallet Information</h2>
      <div className="WalletInfo__infoBox">
        <div className="WalletInfo__info">
          <span className="WalletInfo__label">Wallet Address</span>
          {address}
        </div>
      </div>
    </div>
  )
}

export default WalletInfo
