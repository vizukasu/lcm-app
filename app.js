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
    return (a * b) / gcd(a, b);
}

app.get('/', (req, res) => {
    const x = req.query.x;
    const y = req.query.y;

    const xNum = Number(x);
    const yNum = Number(y);

    if (
        !x || !y ||
        !Number.isInteger(xNum) || !Number.isInteger(yNum) ||
        xNum <= 0 || yNum <= 0
    ) {
        return res.send('NaN');
    }

    res.send(String(lcm(xNum, yNum)));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});