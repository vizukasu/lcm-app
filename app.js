const http = require('http');
const url = require('url');
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

const server = http.createServer((req, res) => {
    const parsed = url.parse(req.url, true);
    const x = parsed.query.x;
    const y = parsed.query.y;

    const xNum = Number(x);
    const yNum = Number(y);

    let result;

    if (
        !x || !y ||
        !Number.isInteger(xNum) || !Number.isInteger(yNum) ||
        xNum <= 0 || yNum <= 0
    ) {
        result = 'NaN';
    } else {
        result = lcm(xNum, yNum);
    }

    const body = Buffer.from(result, 'utf8');
    res.writeHead(200, {
        'Content-Type': 'text/plain',
        'Content-Length': body.length
    });
    res.end(body);
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});