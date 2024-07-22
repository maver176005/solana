import React, { useState, useEffect, useRef } from 'react';
import { Connection, PublicKey, clusterApiUrl, Keypair } from '@solana/web3.js';

const Wallet = () => {
    const [wallet, setWallet] = useState(null);
    const [balance, setBalance] = useState(0);
    const walletRef = useRef(null);

    useEffect(() => {
        const savedWallet = localStorage.getItem('wallet');
        if (savedWallet) {
            const { publicKey, secretKey } = JSON.parse(savedWallet);
            const loadedWallet = Keypair.fromSecretKey(Uint8Array.from(secretKey));
            walletRef.current = loadedWallet;
            setWallet(loadedWallet);
            getBalance(loadedWallet.publicKey);
        }
    }, []);

    const createWallet = async () => {
        const newWallet = Keypair.generate();
        walletRef.current = newWallet;
        setWallet(newWallet);
        localStorage.setItem('wallet', JSON.stringify({
            publicKey: newWallet.publicKey.toString(),
            secretKey: Array.from(newWallet.secretKey),
        }));
        await getBalance(newWallet.publicKey);
    };

    const getBalance = async (publicKey) => {
        const connection = new Connection(clusterApiUrl('devnet'));
        const balance = await connection.getBalance(new PublicKey(publicKey));
        setBalance(balance / 1e9);
    };

    return (
        <div style={{ padding: '20px' }}>
            <header>
                <button onClick={createWallet}>Создать кошелек</button>
                <div>Баланс: {balance} SOL</div>
            </header>
            <main>
                {wallet ? (
                    <div>
                        <div>Адрес: {wallet.publicKey.toString()}</div>
                        <div>Private Key: {wallet.secretKey.join(', ')}</div>
                    </div>
                ) : (
                    <div>Кошелек не создан</div>
                )}
            </main>
        </div>
    );
};

export default Wallet;
