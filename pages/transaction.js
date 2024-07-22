// pages/transaction.js
import { useState, useEffect } from 'react';
import TransactionComponent from '../components/Transactions';
import { Keypair } from '@solana/web3.js';

const TransactionPage = () => {
    const [wallet, setWallet] = useState(null);

    useEffect(() => {
        const savedWallet = localStorage.getItem('wallet');
        if (savedWallet) {
            const { publicKey, secretKey } = JSON.parse(savedWallet);
            const loadedWallet = Keypair.fromSecretKey(Uint8Array.from(secretKey));
            setWallet(loadedWallet);
        }
    }, []);

    return (
        <div>
            {wallet ? <TransactionComponent wallet={wallet} /> : <div>Кошелек не загружен</div>}
        </div>
    );
};

export default TransactionPage;
