const http = require('http');
const url = require('url');
const PORT = process.env.PORT || 3000;


function isNaturalNumberString(s) {
    if (typeof s !== 'string' || s.length === 0) return false;
    
    if (!/^[0-9]+$/.test(s)) return false;
    
    const stripped = s.replace(/^0+/, '') || '0';
    if (stripped === '0') return false; 
    return true;
}

function gcd(a, b) {
    while (b > 0n) {
        [a, b] = [b, a % b];
    }
    return a;
}

function lcm(a, b) {
    const g = gcd(a, b);
    return (a * b) / g;
}

const server = http.createServer((req, res) => {
    const parsed = url.parse(req.url, true);
    const xStr = parsed.query.x;
    const yStr = parsed.query.y;

    let result;

    if (!isNaturalNumberString(xStr) || !isNaturalNumberString(yStr)) {
        result = 'NaN';
    } else {
        try {
            const xBig = BigInt(xStr);
            const yBig = BigInt(yStr);
            result = lcm(xBig, yBig).toString();
        } catch (e) {
            result = 'NaN';
        }
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
