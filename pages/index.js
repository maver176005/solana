// pages/index.js
import Link from 'next/link';

const HomePage = () => {
    return (
        <div style={{ padding: '20px' }}>
            <h1>Solana Wallet App</h1>
            <nav>
                <ul>
                    <li>
                        <Link href="/wallet">
                           Создать кошелек
                        </Link>
                    </li>
                    <li>
                        <Link href="/transaction">
                            Перевод SOL
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default HomePage;
