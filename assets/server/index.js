const { Connection, PublicKey } = require('@solana/web3.js');

const connection = new Connection('https://api.mainnet-beta.solana.com', 'confirmed');
const walletAddress = new PublicKey('FwKD9VVSjAMxSyLaTK2H92g9vzYVdHrBAi4ZtkgBxNtc');

let currentBalance = null;

async function fetchBalance() {
    try {
        const balanceLamports = await connection.getBalance(walletAddress);
        const balanceSol = balanceLamports / 1e9;
        currentBalance = balanceSol;
    } catch (error) {
        console.error('Ошибка :', error);
    }
}

setInterval(fetchBalance, 2 * 60 * 1000);
fetchBalance();

function getBalance() {
    return currentBalance;
}

module.exports = { getBalance };
