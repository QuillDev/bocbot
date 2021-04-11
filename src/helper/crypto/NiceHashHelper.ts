import CryptoJS from "crypto-js";
import get from "got";
import { NicehashBalance } from "src/@types/NicehashBalance";
const domain = "https://api2.nicehash.com";
const endpoint = "/main/api/v2/accounting/accounts2";

const createNonce = () => {
    var s = '', length = 32;
    do {
        s += Math.random().toString(36).substr(2);
    } while (s.length < length);
    s = s.substr(0, length);
    return s;
}


const genHeaders = async (method: string, endpoint: string) => {
    const hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, process.env.NH_SECRET!);
    const time = new Date().getTime().toString();
    const nonce = createNonce();

    hmac.update(process.env.NH_KEY!);
    hmac.update("\0");
    hmac.update(time);
    hmac.update("\0");
    hmac.update(nonce);
    hmac.update("\0");
    hmac.update("\0");
    hmac.update(process.env.NH_ORG!);
    hmac.update("\0");
    hmac.update("\0");
    hmac.update(method.toUpperCase());
    hmac.update("\0");
    hmac.update(endpoint);
    hmac.update("\0");

    return {
        "X-Time": time,
        "X-Nonce": nonce,
        "X-Organization-Id": process.env.NH_ORG!,
        "X-Request-Id": nonce,
        "X-Auth": process.env.NH_KEY! + ':' + hmac.finalize().toString(CryptoJS.enc.Hex)
    }
}

export const getBalance = async () => {
    const res = await get(domain + endpoint, {
        headers: await genHeaders("GET", endpoint),
        responseType: "json"
    });
    if (res.statusCode === 401) {
        throw new Error("Request not authorized, ping Dylan if this happens repeatedly.");
    }
    if (res.statusCode !== 200) {
        throw new Error("Bad request, is Nicehash down?");
    }
    if (!res.body) {
        throw new Error("Received bad data body!");
    }
    return res.body as NicehashBalance;
}
