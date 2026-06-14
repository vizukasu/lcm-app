const express = require('express');
const app = express();

function gcd(a, b) {
    while (b) [a, b] = [b, a % b];
    return a;
}

function lcm(a, b) {
    return (a * b) / gcd(a, b);
}

app.get('/:email', (req, res) => {
    const x = Number(req.query.x);
    const y = Number(req.query.y);

    if (!Number.isFinite(x) || !Number.isFinite(y) || x <= 0 || y <= 0) {
        return res.send('NaN');
    }

    res.type('text/plain');
    res.send(String(lcm(x, y)));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT);