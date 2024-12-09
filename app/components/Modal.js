import React, { useEffect, useState } from 'react';
import classes from './Modal.module.css';
import { useBasename } from '@/app/_hooks/useBaseNames';
import Image from 'next/image';

const Modal = ({ isOpen, onClose, address, chainName, chainId, onChangeNetwork, onSignOut }) => {
    const { basename } = useBasename();
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (event.target.className.includes(classes.modalBackground)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('click', handleOutsideClick);
        }

        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, [isOpen, onClose]);

    const handleCopyAddress = async () => {
        await navigator.clipboard.writeText(address);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    };

    if (!isOpen) return null;

    return (
        <div className={classes.modalBackground}>
            <div className={classes.modalContent}>
                <div className={classes.modalTitleArea}>
                    <Image src="/images/ui/user.png" alt="User" className={classes.accountImage} width={60} height={60} />
                    {basename && <div className={classes.accountName}>{basename}</div>}
                    {!basename && <div className={classes.accountName}>{address.slice(0, 5)}...{address.slice(-4)}</div>}
                </div>

                <div className={classes.modalButtonArea}>
                    <button className={classes.modalButton} onClick={handleCopyAddress}>
                        <Image src="/images/ui/copy.png" alt="Copy" className={classes.modalButtonIcon} width={20} height={20} />
                        {copied ? 'Copied!' : 'Copy Address'}
                    </button>
                    <button className={classes.modalButton} onClick={onSignOut}>
                        <Image src="/images/ui/logout.png" alt="Disconnect" className={classes.modalButtonIcon} width={20} height={20} />
                        Disconnect
                    </button>
                </div>

                {chainId !== 8453 && (
                    <div className={classes.modalButtonArea}>
                        <button className={classes.modalButton} onClick={onChangeNetwork}>
                            Connect to Base Network
                        </button>
                    </div>
                )}
                <div className={classes.modalButtonTitle}>
                    {`Connected Network: `}<strong>{chainName}</strong>
                </div>
            </div>
        </div>
    );
};

export default Modal;