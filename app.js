const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

function gcd(a, b) {
    while (b) {
        [a, b] = [b, a % b];
    }
    return a;
}

function lcm(a, b) {
    const bigA = BigInt(a);
    const bigB = BigInt(b);
    const bigG = BigInt(gcd(a, b));
    return String(bigA * bigB / bigG);
}

app.get('/skemetrtalgat_gmail_com', (req, res) => {
    const x = req.query.x;
    const y = req.query.y;

    const xNum = Number(x);
    const yNum = Number(y);

    res.setHeader('Content-Type', 'text/plain');

    if (
        !x || !y ||
        !Number.isInteger(xNum) || !Number.isInteger(yNum) ||
        xNum <= 0 || yNum <= 0
    ) {
        return res.send('NaN');
    }

    res.send(lcm(xNum, yNum));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});