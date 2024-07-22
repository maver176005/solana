import React, { useState, useEffect, useRef } from 'react';
import { Connection, PublicKey, clusterApiUrl, Transaction, SystemProgram } from '@solana/web3.js';

const TransactionComponent = ({ wallet }) => {
    const [amount, setAmount] = useState('');
    const [recipient, setRecipient] = useState('');
    const [balance, setBalance] = useState(0);
    const walletRef = useRef(wallet);

    useEffect(() => {
        if (wallet) {
            walletRef.current = wallet;
            getBalance(wallet.publicKey);
        }
    }, [wallet]);

    const getBalance = async (publicKey) => {
        const connection = new Connection(clusterApiUrl('devnet'));
        const balance = await connection.getBalance(publicKey);
        setBalance(balance / 1e9);
    };

    const sendTransaction = async () => {
        try {
            const connection = new Connection(clusterApiUrl('devnet'));
            const transaction = new Transaction().add(
                SystemProgram.transfer({
                    fromPubkey: walletRef.current.publicKey,
                    toPubkey: new PublicKey(recipient),
                    lamports: amount * 1e9,
                })
            );
            const signature = await connection.sendTransaction(transaction, [walletRef.current]);
            await connection.confirmTransaction(signature);
            alert('Транзакция выполнена: ' + signature);
            await getBalance(walletRef.current.publicKey);
        } catch (error) {
            console.error(error);
            alert('Ошибка при выполнении транзакции');
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <header>
                <button onClick={() => window.history.back()}>Назад</button>
                <div>Баланс: {balance} SOL</div>
            </header>
            <main>
                <input
                    type="text"
                    placeholder="Количество SOL"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Адрес получателя"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                />
                <button onClick={sendTransaction}>Отправить</button>
            </main>
        </div>
    );
};

export default TransactionComponent;
