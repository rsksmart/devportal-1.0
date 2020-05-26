(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = global || self, factory(global.RskPegInAddressVerifier = {}));
}(this, (function (exports) { 'use strict';

    // Base58 encoding/decoding
    // Originally written by Mike Hearn for BitcoinJ
    // Copyright (c) 2011 Google Inc
    // Ported to JavaScript by Stefan Thomas
    // Merged Buffer refactorings from base58-native by Stephen Pair
    // Copyright (c) 2013 BitPay Inc

    var ALPHABET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
    var ALPHABET_MAP = {};
    for (var i = 0; i < ALPHABET.length; ++i) {
        ALPHABET_MAP[ALPHABET.charAt(i)] = i;
    }
    var BASE = ALPHABET.length;

    var base58 = {
        decode: function(string) {
            if (string.length === 0) return [];

            var i, j, bytes = [0];
            for (i = 0; i < string.length; ++i) {
                var c = string[i];
                if (!(c in ALPHABET_MAP)) throw new Error('Non-base58 character');

                for (j = 0; j < bytes.length; ++j) bytes[j] *= BASE;
                bytes[0] += ALPHABET_MAP[c];

                var carry = 0;
                for (j = 0; j < bytes.length; ++j) {
                    bytes[j] += carry;
                    carry = bytes[j] >> 8;
                    bytes[j] &= 0xff;
                }

                while (carry) {
                    bytes.push(carry & 0xff);
                    carry >>= 8;
                }
            }
            // deal with leading zeros
            for (i = 0; string[i] === '1' && i < string.length - 1; ++i){
                bytes.push(0);
            }

            return bytes.reverse();
        }
    };

    function createCommonjsModule(fn, module) {
    	return module = { exports: {} }, fn(module, module.exports), module.exports;
    }

    var sha256 = createCommonjsModule(function (module, exports) {
    (function(I){function w(c,a,d){var l=0,b=[],g=0,f,n,k,e,h,q,y,p,m=!1,t=[],r=[],u,z=!1;d=d||{};f=d.encoding||"UTF8";u=d.numRounds||1;if(u!==parseInt(u,10)||1>u)throw Error("numRounds must a integer >= 1");if(0===c.lastIndexOf("SHA-",0))if(q=function(b,a){return A(b,a,c)},y=function(b,a,l,f){var g,e;if("SHA-224"===c||"SHA-256"===c)g=(a+65>>>9<<4)+15,e=16;else throw Error("Unexpected error in SHA-2 implementation");for(;b.length<=g;)b.push(0);b[a>>>5]|=128<<24-a%32;a=a+l;b[g]=a&4294967295;
    b[g-1]=a/4294967296|0;l=b.length;for(a=0;a<l;a+=e)f=A(b.slice(a,a+e),f,c);if("SHA-224"===c)b=[f[0],f[1],f[2],f[3],f[4],f[5],f[6]];else if("SHA-256"===c)b=f;else throw Error("Unexpected error in SHA-2 implementation");return b},p=function(b){return b.slice()},"SHA-224"===c)h=512,e=224;else if("SHA-256"===c)h=512,e=256;else throw Error("Chosen SHA variant is not supported");else throw Error("Chosen SHA variant is not supported");k=B(a,f);n=x(c);this.setHMACKey=function(b,a,g){var e;if(!0===m)throw Error("HMAC key already set");
    if(!0===z)throw Error("Cannot set HMAC key after calling update");f=(g||{}).encoding||"UTF8";a=B(a,f)(b);b=a.binLen;a=a.value;e=h>>>3;g=e/4-1;if(e<b/8){for(a=y(a,b,0,x(c));a.length<=g;)a.push(0);a[g]&=4294967040;}else if(e>b/8){for(;a.length<=g;)a.push(0);a[g]&=4294967040;}for(b=0;b<=g;b+=1)t[b]=a[b]^909522486,r[b]=a[b]^1549556828;n=q(t,n);l=h;m=!0;};this.update=function(a){var c,f,e,d=0,p=h>>>5;c=k(a,b,g);a=c.binLen;f=c.value;c=a>>>5;for(e=0;e<c;e+=p)d+h<=a&&(n=q(f.slice(e,e+p),n),d+=h);l+=d;b=f.slice(d>>>
    5);g=a%h;z=!0;};this.getHash=function(a,f){var d,h,k,q;if(!0===m)throw Error("Cannot call getHash after setting HMAC key");k=C(f);switch(a){case "HEX":d=function(a){return D(a,e,k)};break;case "B64":d=function(a){return E(a,e,k)};break;case "BYTES":d=function(a){return F(a,e)};break;case "ARRAYBUFFER":try{h=new ArrayBuffer(0);}catch(v){throw Error("ARRAYBUFFER not supported by this environment");}d=function(a){return G(a,e)};break;default:throw Error("format must be HEX, B64, BYTES, or ARRAYBUFFER");
    }q=y(b.slice(),g,l,p(n));for(h=1;h<u;h+=1)q=y(q,e,0,x(c));return d(q)};this.getHMAC=function(a,f){var d,k,t,u;if(!1===m)throw Error("Cannot call getHMAC without first setting HMAC key");t=C(f);switch(a){case "HEX":d=function(a){return D(a,e,t)};break;case "B64":d=function(a){return E(a,e,t)};break;case "BYTES":d=function(a){return F(a,e)};break;case "ARRAYBUFFER":try{d=new ArrayBuffer(0);}catch(v){throw Error("ARRAYBUFFER not supported by this environment");}d=function(a){return G(a,e)};break;default:throw Error("outputFormat must be HEX, B64, BYTES, or ARRAYBUFFER");
    }k=y(b.slice(),g,l,p(n));u=q(r,x(c));u=y(k,e,h,u);return d(u)};}function m(){}function D(c,a,d){var l="";a/=8;var b,g;for(b=0;b<a;b+=1)g=c[b>>>2]>>>8*(3+b%4*-1),l+="0123456789abcdef".charAt(g>>>4&15)+"0123456789abcdef".charAt(g&15);return d.outputUpper?l.toUpperCase():l}function E(c,a,d){var l="",b=a/8,g,f,n;for(g=0;g<b;g+=3)for(f=g+1<b?c[g+1>>>2]:0,n=g+2<b?c[g+2>>>2]:0,n=(c[g>>>2]>>>8*(3+g%4*-1)&255)<<16|(f>>>8*(3+(g+1)%4*-1)&255)<<8|n>>>8*(3+(g+2)%4*-1)&255,f=0;4>f;f+=1)8*g+6*f<=a?l+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(n>>>
    6*(3-f)&63):l+=d.b64Pad;return l}function F(c,a){var d="",l=a/8,b,g;for(b=0;b<l;b+=1)g=c[b>>>2]>>>8*(3+b%4*-1)&255,d+=String.fromCharCode(g);return d}function G(c,a){var d=a/8,l,b=new ArrayBuffer(d),g;g=new Uint8Array(b);for(l=0;l<d;l+=1)g[l]=c[l>>>2]>>>8*(3+l%4*-1)&255;return b}function C(c){var a={outputUpper:!1,b64Pad:"=",shakeLen:-1};c=c||{};a.outputUpper=c.outputUpper||!1;!0===c.hasOwnProperty("b64Pad")&&(a.b64Pad=c.b64Pad);if("boolean"!==typeof a.outputUpper)throw Error("Invalid outputUpper formatting option");
    if("string"!==typeof a.b64Pad)throw Error("Invalid b64Pad formatting option");return a}function B(c,a){var d;switch(a){case "UTF8":case "UTF16BE":case "UTF16LE":break;default:throw Error("encoding must be UTF8, UTF16BE, or UTF16LE");}switch(c){case "HEX":d=function(a,b,c){var f=a.length,d,k,e,h,q;if(0!==f%2)throw Error("String of HEX type must be in byte increments");b=b||[0];c=c||0;q=c>>>3;for(d=0;d<f;d+=2){k=parseInt(a.substr(d,2),16);if(isNaN(k))throw Error("String of HEX type contains invalid characters");
    h=(d>>>1)+q;for(e=h>>>2;b.length<=e;)b.push(0);b[e]|=k<<8*(3+h%4*-1);}return {value:b,binLen:4*f+c}};break;case "TEXT":d=function(c,b,d){var f,n,k=0,e,h,q,m,p,r;b=b||[0];d=d||0;q=d>>>3;if("UTF8"===a)for(r=3,e=0;e<c.length;e+=1)for(f=c.charCodeAt(e),n=[],128>f?n.push(f):2048>f?(n.push(192|f>>>6),n.push(128|f&63)):55296>f||57344<=f?n.push(224|f>>>12,128|f>>>6&63,128|f&63):(e+=1,f=65536+((f&1023)<<10|c.charCodeAt(e)&1023),n.push(240|f>>>18,128|f>>>12&63,128|f>>>6&63,128|f&63)),h=0;h<n.length;h+=1){p=k+
    q;for(m=p>>>2;b.length<=m;)b.push(0);b[m]|=n[h]<<8*(r+p%4*-1);k+=1;}else if("UTF16BE"===a||"UTF16LE"===a)for(r=2,n="UTF16LE"===a&&!0||"UTF16LE"!==a&&!1,e=0;e<c.length;e+=1){f=c.charCodeAt(e);!0===n&&(h=f&255,f=h<<8|f>>>8);p=k+q;for(m=p>>>2;b.length<=m;)b.push(0);b[m]|=f<<8*(r+p%4*-1);k+=2;}return {value:b,binLen:8*k+d}};break;case "B64":d=function(a,b,c){var f=0,d,k,e,h,q,m,p;if(-1===a.search(/^[a-zA-Z0-9=+\/]+$/))throw Error("Invalid character in base-64 string");k=a.indexOf("=");a=a.replace(/\=/g,
    "");if(-1!==k&&k<a.length)throw Error("Invalid '=' found in base-64 string");b=b||[0];c=c||0;m=c>>>3;for(k=0;k<a.length;k+=4){q=a.substr(k,4);for(e=h=0;e<q.length;e+=1)d="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(q[e]),h|=d<<18-6*e;for(e=0;e<q.length-1;e+=1){p=f+m;for(d=p>>>2;b.length<=d;)b.push(0);b[d]|=(h>>>16-8*e&255)<<8*(3+p%4*-1);f+=1;}}return {value:b,binLen:8*f+c}};break;case "BYTES":d=function(a,b,c){var d,n,k,e,h;b=b||[0];c=c||0;k=c>>>3;for(n=0;n<a.length;n+=
    1)d=a.charCodeAt(n),h=n+k,e=h>>>2,b.length<=e&&b.push(0),b[e]|=d<<8*(3+h%4*-1);return {value:b,binLen:8*a.length+c}};break;case "ARRAYBUFFER":try{d=new ArrayBuffer(0);}catch(l){throw Error("ARRAYBUFFER not supported by this environment");}d=function(a,b,c){var d,n,k,e,h;b=b||[0];c=c||0;n=c>>>3;h=new Uint8Array(a);for(d=0;d<a.byteLength;d+=1)e=d+n,k=e>>>2,b.length<=k&&b.push(0),b[k]|=h[d]<<8*(3+e%4*-1);return {value:b,binLen:8*a.byteLength+c}};break;default:throw Error("format must be HEX, TEXT, B64, BYTES, or ARRAYBUFFER");
    }return d}function r(c,a){return c>>>a|c<<32-a}function J(c,a,d){return c&a^~c&d}function K(c,a,d){return c&a^c&d^a&d}function L(c){return r(c,2)^r(c,13)^r(c,22)}function M(c){return r(c,6)^r(c,11)^r(c,25)}function N(c){return r(c,7)^r(c,18)^c>>>3}function O(c){return r(c,17)^r(c,19)^c>>>10}function P(c,a){var d=(c&65535)+(a&65535);return ((c>>>16)+(a>>>16)+(d>>>16)&65535)<<16|d&65535}function Q(c,a,d,l){var b=(c&65535)+(a&65535)+(d&65535)+(l&65535);return ((c>>>16)+(a>>>16)+(d>>>16)+(l>>>16)+(b>>>
    16)&65535)<<16|b&65535}function R(c,a,d,l,b){var g=(c&65535)+(a&65535)+(d&65535)+(l&65535)+(b&65535);return ((c>>>16)+(a>>>16)+(d>>>16)+(l>>>16)+(b>>>16)+(g>>>16)&65535)<<16|g&65535}function x(c){var a=[],d;if(0===c.lastIndexOf("SHA-",0))switch(a=[3238371032,914150663,812702999,4144912697,4290775857,1750603025,1694076839,3204075428],d=[1779033703,3144134277,1013904242,2773480762,1359893119,2600822924,528734635,1541459225],c){case "SHA-224":break;case "SHA-256":a=d;break;case "SHA-384":a=[new m,new m,
    new m,new m,new m,new m,new m,new m];break;case "SHA-512":a=[new m,new m,new m,new m,new m,new m,new m,new m];break;default:throw Error("Unknown SHA variant");}else throw Error("No SHA variants supported");return a}function A(c,a,d){var l,b,g,f,n,k,e,h,m,r,p,w,t,x,u,z,A,B,C,D,E,F,v=[],G;if("SHA-224"===d||"SHA-256"===d)r=64,w=1,F=Number,t=P,x=Q,u=R,z=N,A=O,B=L,C=M,E=K,D=J,G=H;else throw Error("Unexpected error in SHA-2 implementation");d=a[0];l=a[1];b=a[2];g=a[3];f=a[4];n=a[5];k=a[6];e=a[7];for(p=
    0;p<r;p+=1)16>p?(m=p*w,h=c.length<=m?0:c[m],m=c.length<=m+1?0:c[m+1],v[p]=new F(h,m)):v[p]=x(A(v[p-2]),v[p-7],z(v[p-15]),v[p-16]),h=u(e,C(f),D(f,n,k),G[p],v[p]),m=t(B(d),E(d,l,b)),e=k,k=n,n=f,f=t(g,h),g=b,b=l,l=d,d=t(h,m);a[0]=t(d,a[0]);a[1]=t(l,a[1]);a[2]=t(b,a[2]);a[3]=t(g,a[3]);a[4]=t(f,a[4]);a[5]=t(n,a[5]);a[6]=t(k,a[6]);a[7]=t(e,a[7]);return a}var H;H=[1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,
    2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,
    2756734187,3204031479,3329325298];(module.exports&&(module.exports=w),exports=w);})();
    });

    function numberToHex (number) {
        var hex = Math.round(number).toString(16);
        if(hex.length === 1) {
            hex = '0' + hex;
        }
        return hex;
    }
    function sha256$1(hexString) {
        var sha = new sha256('SHA-256', 'HEX');
        sha.update(hexString);
        return sha.getHash('HEX');
    }

    var utils = {
        toHex: function (arrayOfBytes) {
            var hex = '';
            for(var i = 0; i < arrayOfBytes.length; i++) {
                hex += numberToHex(arrayOfBytes[i]);
            }
            return hex;
        },
        sha256Checksum: function (payload) {
            return sha256$1(sha256$1(payload)).substr(0, 8);
        }
    };

    const ADDRESS_TYPES = {
        P2PKH: 'p2pkh',
        P2SH: 'p2sh',
        BECH32: 'bech32'
    };

    const NETWORKS = {
        MAINNET: 'mainnet',
        TESTNET: 'testnet'
    };

    var constants = {
        ADDRESS_TYPES,
        NETWORKS
    };

    let { toHex, sha256Checksum } = utils;
    let { ADDRESS_TYPES: ADDRESS_TYPES$1, NETWORKS: NETWORKS$1 } = constants;

    var DEFAULT_NETWORK_TYPE = 'prod';

    const ADDRESS_TYPE_INFO = {};
    ADDRESS_TYPE_INFO['00'] = {
        network: NETWORKS$1.MAINNET,
        type: ADDRESS_TYPES$1.P2PKH
    };
    ADDRESS_TYPE_INFO['05'] = {
        network: NETWORKS$1.MAINNET,
        type: ADDRESS_TYPES$1.P2SH
    };
    ADDRESS_TYPE_INFO['6f'] = {
        network: NETWORKS$1.TESTNET,
        type: ADDRESS_TYPES$1.P2PKH
    };
    ADDRESS_TYPE_INFO['c4'] = {
        network: NETWORKS$1.TESTNET,
        type: ADDRESS_TYPES$1.P2SH
    };

    function getDecoded(address) {
        try {
            return base58.decode(address);
        } catch (e) {
            // if decoding fails, assume invalid address
            return null;
        }
    }

    function getAddressType(address) {
        var expectedLength = 25;
        var decoded = getDecoded(address);

        if (decoded) {
            var length = decoded.length;

            if (length !== expectedLength) {
                return null;
            }

            var checksum = toHex(decoded.slice(length - 4, length)),
                body = toHex(decoded.slice(0, length - 4)),
                goodChecksum = sha256Checksum(body);

            return checksum === goodChecksum ? toHex(decoded.slice(0, expectedLength - 24)) : null;
        }

        return null;
    }

    function isValidP2PKHandP2SHAddress(address, networkType) {
        networkType = networkType || DEFAULT_NETWORK_TYPE;

        var addressType = getAddressType(address);

        if (addressType && ADDRESS_TYPE_INFO[addressType]) {
            if (networkType === NETWORKS$1.MAINNET || networkType === NETWORKS$1.TESTNET) {
                return ADDRESS_TYPE_INFO[addressType].network == networkType;
            } else {
                return true;
            }
        }

        return false;
    }

    function getAddressInfo(address) {
        const addressType = getAddressType(address);

        return ADDRESS_TYPE_INFO[addressType] || null;
    }

    var p2pkhP2sha = {
        isValid: isValidP2PKHandP2SHAddress,
        getAddressInfo: getAddressInfo
    };

    // Copyright (c) 2017 Pieter Wuille
    //
    // Permission is hereby granted, free of charge, to any person obtaining a copy
    // of this software and associated documentation files (the "Software"), to deal
    // in the Software without restriction, including without limitation the rights
    // to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    // copies of the Software, and to permit persons to whom the Software is
    // furnished to do so, subject to the following conditions:
    //
    // The above copyright notice and this permission notice shall be included in
    // all copies or substantial portions of the Software.
    //
    // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    // IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    // FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    // AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    // LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    // OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
    // THE SOFTWARE.

    var CHARSET = 'qpzry9x8gf2tvdw0s3jn54khce6mua7l';
    var GENERATOR = [0x3b6a57b2, 0x26508e6d, 0x1ea119fa, 0x3d4233dd, 0x2a1462b3];

    var bech32 = {
      decode: decode,
      encode: encode,
    };


    function polymod (values) {
      var chk = 1;
      for (var p = 0; p < values.length; ++p) {
        var top = chk >> 25;
        chk = (chk & 0x1ffffff) << 5 ^ values[p];
        for (var i = 0; i < 5; ++i) {
          if ((top >> i) & 1) {
            chk ^= GENERATOR[i];
          }
        }
      }
      return chk;
    }

    function hrpExpand (hrp) {
      var ret = [];
      var p;
      for (p = 0; p < hrp.length; ++p) {
        ret.push(hrp.charCodeAt(p) >> 5);
      }
      ret.push(0);
      for (p = 0; p < hrp.length; ++p) {
        ret.push(hrp.charCodeAt(p) & 31);
      }
      return ret;
    }

    function verifyChecksum (hrp, data) {
      return polymod(hrpExpand(hrp).concat(data)) === 1;
    }

    function createChecksum (hrp, data) {
      var values = hrpExpand(hrp).concat(data).concat([0, 0, 0, 0, 0, 0]);
      var mod = polymod(values) ^ 1;
      var ret = [];
      for (var p = 0; p < 6; ++p) {
        ret.push((mod >> 5 * (5 - p)) & 31);
      }
      return ret;
    }

    function encode (hrp, data) {
      var combined = data.concat(createChecksum(hrp, data));
      var ret = hrp + '1';
      for (var p = 0; p < combined.length; ++p) {
        ret += CHARSET.charAt(combined[p]);
      }
      return ret;
    }

    function decode (bechString) {
      var p;
      var has_lower = false;
      var has_upper = false;
      for (p = 0; p < bechString.length; ++p) {
        if (bechString.charCodeAt(p) < 33 || bechString.charCodeAt(p) > 126) {
          return null;
        }
        if (bechString.charCodeAt(p) >= 97 && bechString.charCodeAt(p) <= 122) {
            has_lower = true;
        }
        if (bechString.charCodeAt(p) >= 65 && bechString.charCodeAt(p) <= 90) {
            has_upper = true;
        }
      }
      if (has_lower && has_upper) {
        return null;
      }
      bechString = bechString.toLowerCase();
      var pos = bechString.lastIndexOf('1');
      if (pos < 1 || pos + 7 > bechString.length || bechString.length > 90) {
        return null;
      }
      var hrp = bechString.substring(0, pos);
      var data = [];
      for (p = pos + 1; p < bechString.length; ++p) {
        var d = CHARSET.indexOf(bechString.charAt(p));
        if (d === -1) {
          return null;
        }
        data.push(d);
      }
      if (!verifyChecksum(hrp, data)) {
        return null;
      }
      return {hrp: hrp, data: data.slice(0, data.length - 6)};
    }

    // Copyright (c) 2017 Pieter Wuille
    //
    // Permission is hereby granted, free of charge, to any person obtaining a copy
    // of this software and associated documentation files (the "Software"), to deal
    // in the Software without restriction, including without limitation the rights
    // to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    // copies of the Software, and to permit persons to whom the Software is
    // furnished to do so, subject to the following conditions:
    //
    // The above copyright notice and this permission notice shall be included in
    // all copies or substantial portions of the Software.
    //
    // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    // IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    // FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    // AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    // LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    // OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
    // THE SOFTWARE.


    let { ADDRESS_TYPES: ADDRESS_TYPES$2, NETWORKS: NETWORKS$2 } = constants;

    const PREFIXES = {
      BC: 'bc',
      TB: 'tb'
    };

    const NETWORK_BY_PREFIX = {};
    NETWORK_BY_PREFIX[PREFIXES.BC] = NETWORKS$2.MAINNET;
    NETWORK_BY_PREFIX[PREFIXES.TB] = NETWORKS$2.TESTNET;

    function convertbits (data, frombits, tobits, pad) {
      var acc = 0;
      var bits = 0;
      var ret = [];
      var maxv = (1 << tobits) - 1;
      for (var p = 0; p < data.length; ++p) {
        var value = data[p];
        if (value < 0 || (value >> frombits) !== 0) {
          return null;
        }
        acc = (acc << frombits) | value;
        bits += frombits;
        while (bits >= tobits) {
          bits -= tobits;
          ret.push((acc >> bits) & maxv);
        }
      }
      if (pad) {
        if (bits > 0) {
          ret.push((acc << (tobits - bits)) & maxv);
        }
      } else if (bits >= frombits || ((acc << (tobits - bits)) & maxv)) {
        return null;
      }
      return ret;
    }

    function decode$1 (hrp, addr) {
      var dec = bech32.decode(addr);
      if (dec === null || dec.hrp !== hrp || dec.data.length < 1 || dec.data[0] > 16) {
        return null;
      }
      var res = convertbits(dec.data.slice(1), 5, 8, false);
      if (res === null || res.length < 2 || res.length > 40) {
        return null;
      }
      if (dec.data[0] === 0 && res.length !== 20 && res.length !== 32) {
        return null;
      }
      return {version: dec.data[0], program: res};
    }

    function encode$1 (hrp, version, program) {
      var ret = bech32.encode(hrp, [version].concat(convertbits(program, 8, 5, true)));
      if (decode$1(hrp, ret) === null) {
        return null;
      }
      return ret;
    }

    function isValidAddress(address, networkType) {
        let hrp = null;
        var ret = null;

        if (networkType === NETWORKS$2.TESTNET || networkType === NETWORKS$2.MAINNET) {
            hrp = networkType === NETWORKS$2.TESTNET ? PREFIXES.TB : PREFIXES.BC;
            ret = decode$1(hrp, address);
        } else {
            hrp = PREFIXES.BC;
            ret = decode$1(hrp, address);

            if (ret === null) {
                hrp = PREFIXES.TB;
                ret = decode$1(hrp, address);
            }
        }

        if (ret === null) {
            return false;
        }

        var recreate = encode$1(hrp, ret.version, ret.program);
        return recreate === address.toLowerCase();
    }

    function getAddressInfo$1(address) {
      if (!address) {
        return null;
      }
      let prefix = address.toString().substring(0,2);

      let network = NETWORK_BY_PREFIX[prefix.toLowerCase()];

      if (network && isValidAddress(address, network)) {
        return { network, type: ADDRESS_TYPES$2.BECH32 };
      }
      return null;
    }

    var segwitAddr = {
        isValidAddress: isValidAddress,
        getAddressInfo: getAddressInfo$1
    };

    let { ADDRESS_TYPES: ADDRESS_TYPES$3 } = constants;

    var peginAddressVerificator = {
        isValidAddress: function (address, networkType) {
            return p2pkhP2sha.isValid(address, networkType) || 
            segwitAddr.isValidAddress(address, networkType);
        },
        getAddressInformation: (address) => {
            return p2pkhP2sha.getAddressInfo(address) || 
            segwitAddr.getAddressInfo(address);
        },
        canPegIn: (addressInfo) => {
            return addressInfo && 
                addressInfo.type == ADDRESS_TYPES$3.P2PKH || 
                addressInfo.type == ADDRESS_TYPES$3.P2SH;
        }
    };
    var peginAddressVerificator_1 = peginAddressVerificator.isValidAddress;
    var peginAddressVerificator_2 = peginAddressVerificator.getAddressInformation;
    var peginAddressVerificator_3 = peginAddressVerificator.canPegIn;

    exports.canPegIn = peginAddressVerificator_3;
    exports.default = peginAddressVerificator;
    exports.getAddressInformation = peginAddressVerificator_2;
    exports.isValidAddress = peginAddressVerificator_1;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
