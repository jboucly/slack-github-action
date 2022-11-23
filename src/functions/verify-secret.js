const crypto = require('crypto');

const sigHashAlg = 'sha256';
const secret = process.env.WEBHOOK_SECRET;
const sigHeaderName = 'X-Hub-Signature-256';

const verifySecret = (req, res, next) => {
    if (!req.rawBody) {
        return next('Request body empty');
    }

    const hmac = crypto.createHmac(sigHashAlg, secret);
    const sig = Buffer.from(req.get(sigHeaderName) || '', 'utf8');
    const digest = Buffer.from(sigHashAlg + '=' + hmac.update(req.rawBody).digest('hex'), 'utf8');

    if (sig.length !== digest.length || !crypto.timingSafeEqual(digest, sig)) {
        return next(`Request body digest (${digest}) did not match ${sigHeaderName} (${sig})`);
    }

    return next();
};

exports.verifySecret = verifySecret;
