import React, { useCallback } from 'react';
import { useConnect } from 'wagmi';
import classes from './CreateWalletButton.module.css';

export function CreateWalletButton() {
    const { connectors, connect, data } = useConnect();
   
    const createWallet = useCallback(() => {
      const coinbaseWalletConnector = connectors.find(
        (connector) => connector.id === 'coinbaseWalletSDK'
      );
      if (coinbaseWalletConnector) {
        connect({ connector: coinbaseWalletConnector });
      }
    }, [connectors, connect]);
    return (
      <button className={classes.button} onClick={createWallet} style={{marginTop:'10px'}}>
        Create Wallet
      </button>
    );
  }