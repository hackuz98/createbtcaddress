import { ECPairFactory } from 'ecpair'
import * as ecc from 'tiny-secp256k1';
import bitcoin from 'bitcoinjs-lib';

const ECPair = ECPairFactory(ecc);

const NETWORK = bitcoin.networks.bitcoin;
const privateKey = "2fcaa1fea7788610a21d1b485991c83776543fe022390f59d47b24834e781e43";
const keyPair = ECPair.fromPrivateKey(Buffer.from(privateKey, 'hex'))

//WIF Compressed: KxpcQw25BVpUC3ME16XU4b8NfjAAk8DfBxUigwtoRnK9Tk78zzgs
console.log("WIF: ", keyPair.toWIF())

/*P2WSH (P2WSH => P2WPKH)
bc1qs2dy2x7gxzz2rq83z4vsw290tpwvwl3lu20a060ku0hljnzzdp4sgvpwsu
*/
const redeemScript0 = bitcoin.payments.p2wpkh({ pubkey: keyPair.publicKey, network: NETWORK }).output
const P2WSH_P2WPKH = bitcoin.payments.p2wsh({ redeem: { output: redeemScript0, network: NETWORK }, network: NETWORK });
console.log("P2WSH (P2WSH => P2WPKH):", P2WSH_P2WPKH.address);
console.log("Hash (Hex):", P2WSH_P2WPKH.hash.toString('hex'));
console.log("Output (Hex):", P2WSH_P2WPKH.output.toString('hex'));
console.log("Redeem Script (Hex):", redeemScript0.toString('hex'));
console.log("Witness Script (Hex):", P2WSH_P2WPKH.redeem.output.toString('hex'));

/*P2WSH (P2WSH => P2PKH)
bc1qtt66lsq6d924kmn0yfnmyls6yhl69nz4s2jfluwv97025tnep8uq8re7np
*/
const redeemScript1 = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey, network: NETWORK }).output;
const P2WSH_P2PKH = bitcoin.payments.p2wsh({ redeem: { output: redeemScript1, network: NETWORK }, network: NETWORK });

const redeemScriptHex1 = redeemScript1.toString('hex');
console.log("P2WSH (P2WSH => P2PKH):", P2WSH_P2PKH.address);
console.log("Redeem Script (Hex):", redeemScriptHex1);
console.log("Witness Script (Hex):", P2WSH_P2PKH.redeem.output.toString('hex'));