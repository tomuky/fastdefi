import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useConnect } from 'wagmi';
import { CoinbaseWalletLogo } from './CoinbaseWalletLogo';
 
const GRADIENT_BORDER_WIDTH = 2;
 
const buttonStyles = {
  background: 'transparent',
  border: '1px solid transparent',
  boxSizing: 'border-box',
  color: 'white',
  cursor: 'pointer',
};
 
const contentWrapperStyle = {
  position: 'relative',
};
 
function Gradient({ children, style, isAnimationDisabled = false }) {
  const [isAnimating, setIsAnimating] = useState(false);
  const gradientStyle = useMemo(() => {
    const rotate = isAnimating ? '720deg' : '0deg';
    return {
      transform: `rotate(${rotate})`,
      transition: isAnimating
        ? 'transform 2s cubic-bezier(0.27, 0, 0.24, 0.99)'
        : 'none',
      ...style,
    };
  }, [isAnimating, style]);
 
  const handleMouseEnter = useCallback(() => {
    if (isAnimationDisabled || isAnimating) return;
    setIsAnimating(true);
  }, [isAnimationDisabled, isAnimating, setIsAnimating]);
 
  useEffect(() => {
    if (!isAnimating) return;
    const animationTimeout = setTimeout(() => {
      setIsAnimating(false);
    }, 2000);
    return () => {
      clearTimeout(animationTimeout);
    };
  }, [isAnimating]);
 
  return (
    <div style={contentWrapperStyle} onMouseEnter={handleMouseEnter}>
      <div className="gradient-background" style={gradientStyle} />
      {children}
    </div>
  );
}
 
export function BlackCreateWalletButton({ height = 48, width = 200, mobile = false, style }) {
  const { connectors, connect } = useConnect();

  height = mobile ? 40 : height;
  width = mobile ? 150 : width;
 
  const minButtonHeight = 40;
  const minButtonWidth = 120;
  const buttonHeight = Math.max(minButtonHeight, height);
  const buttonWidth = Math.max(minButtonWidth, width);
  const gradientDiameter = Math.max(buttonHeight, buttonWidth);
  const styles = useMemo(
    () => ({
      gradientContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
        borderRadius: buttonHeight / 2,
        height: buttonHeight,
        width: buttonWidth,
        boxSizing: 'border-box',
        overflow: 'hidden',
      },
      gradient: {
        background:
          'conic-gradient(from 180deg, #45E1E5 0deg, #0052FF 86.4deg, #B82EA4 165.6deg, #FF9533 255.6deg, #7FD057 320.4deg, #45E1E5 360deg)',
        position: 'absolute',
        width: gradientDiameter * 1.5,
        height: gradientDiameter * 1.5,
        top: -(gradientDiameter * 1.5 - buttonHeight) / 2,
        left: -(gradientDiameter * 1.5 - buttonWidth) / 2,
      },
      buttonBody: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        boxSizing: 'border-box',
        backgroundColor: '#000000',
        height: buttonHeight - GRADIENT_BORDER_WIDTH * 2,
        width: buttonWidth - GRADIENT_BORDER_WIDTH * 2,
        fontFamily: 'Arial, sans-serif',
        fontWeight: 'bold',
        fontSize: mobile ? 16 : 18,
        borderRadius: buttonHeight / 2,
        position: 'relative',
        paddingRight: mobile ? 0 : 10,
      },
    }),
    [buttonHeight, buttonWidth, gradientDiameter, mobile]
  );
 
  const createWallet = useCallback(() => {
    const coinbaseWalletConnector = connectors.find(
      (connector) => connector.id === 'coinbaseWalletSDK'
    );
    if (coinbaseWalletConnector) {
      connect({ connector: coinbaseWalletConnector });
    }
  }, [connectors, connect]);

  return (
    <button style={{...buttonStyles, ...style}} onClick={createWallet}>
      <div style={styles.gradientContainer}>
        <Gradient style={styles.gradient}>
          <div style={styles.buttonBody}>
            {!mobile && <CoinbaseWalletLogo size={mobile ? 20 : 26} containerStyles={{ paddingRight: 10, display: 'flex', alignItems: 'center' }}/>}
            Create Wallet
          </div>
        </Gradient>
      </div>
    </button>
  );
}