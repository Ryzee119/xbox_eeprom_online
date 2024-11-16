class SHA1Context {
    constructor() {
        this.intermediate = new Uint32Array(5);
        this.msg_blk = new Uint8Array(64);
        this.msg_blk_index = 0;
        this.length = 0;
        this.computed = false;
        this.reset(0x67452301, 0xEFCDAB89, 0x98BADCFE, 0x10325476, 0xC3D2E1F0);
    }

    #rotate(bits, val) {
        return (val << bits) | (val >>> (32 - bits));
    }

    fill(a, b, c, d, e) {
        this.intermediate[0] = a;
        this.intermediate[1] = b;
        this.intermediate[2] = c;
        this.intermediate[3] = d;
        this.intermediate[4] = e;
    }

    #process() {
        const k = [0x5A827999, 0x6ED9EBA1, 0x8F1BBCDC, 0xCA62C1D6];
        const w = new Uint32Array(80);
        let [a, b, c, d, e] = this.intermediate;

        for (let i = 0; i < 16; i++) {
            w[i] = ((this.msg_blk[i * 4] << 24) | (this.msg_blk[i * 4 + 1] << 16) |
                (this.msg_blk[i * 4 + 2] << 8) | this.msg_blk[i * 4 + 3]) >>> 0;
        }

        for (let i = 16; i < 80; i++) {
            w[i] = this.#rotate(1, w[i - 3] ^ w[i - 8] ^ w[i - 14] ^ w[i - 16]);
        }

        for (let i = 0; i < 80; i++) {
            let temp = (this.#rotate(5, a) + w[i] + e) >>> 0;
            switch (Math.floor(i / 20)) {
                case 0:
                    temp += (k[0] + ((b & c) | (~b & d))) >>> 0;
                    break;
                case 1:
                    temp += (k[1] + (b ^ c ^ d)) >>> 0;
                    break;
                case 2:
                    temp += (k[2] + ((b & c) | (b & d) | (c & d))) >>> 0;
                    break;
                case 3:
                    temp += (k[3] + (b ^ c ^ d)) >>> 0;
                    break;
            }
            e = d;
            d = c;
            c = this.#rotate(30, b);
            b = a;
            a = temp >>> 0;
        }

        this.intermediate[0] = (this.intermediate[0] + a) >>> 0;
        this.intermediate[1] = (this.intermediate[1] + b) >>> 0;
        this.intermediate[2] = (this.intermediate[2] + c) >>> 0;
        this.intermediate[3] = (this.intermediate[3] + d) >>> 0;
        this.intermediate[4] = (this.intermediate[4] + e) >>> 0;

        this.msg_blk_index = 0;
    }

    #pad() {
        this.msg_blk[this.msg_blk_index++] = 0x80;
        if (this.msg_blk_index > 56) {
            while (this.msg_blk_index < 64) {
                this.msg_blk[this.msg_blk_index++] = 0;
            }
            this.#process();
        }

        while (this.msg_blk_index < 56) {
            this.msg_blk[this.msg_blk_index++] = 0;
        }

        const lenHigh = Math.floor(this.length / 0x100000000);
        const lenLow = this.length & 0xFFFFFFFF;

        this.msg_blk[56] = (lenHigh >>> 24) & 0xFF;
        this.msg_blk[57] = (lenHigh >>> 16) & 0xFF;
        this.msg_blk[58] = (lenHigh >>> 8) & 0xFF;
        this.msg_blk[59] = lenHigh & 0xFF;
        this.msg_blk[60] = (lenLow >>> 24) & 0xFF;
        this.msg_blk[61] = (lenLow >>> 16) & 0xFF;
        this.msg_blk[62] = (lenLow >>> 8) & 0xFF;
        this.msg_blk[63] = lenLow & 0xFF;

        this.#process();
    }

    input(data) {
        this.length += data.length * 8;
        for (let i = 0; i < data.length; i++) {
            this.msg_blk[this.msg_blk_index++] = data[i];
            if (this.msg_blk_index === 64) {
                this.#process();
            }
        }
    }

    result() {
        if (!this.computed) {
            this.#pad();
            this.computed = true;
        }
        const output = new Uint8Array(20);
        for (let i = 0; i < 20; ++i) {
            output[i] = (this.intermediate[i >> 2] >>> (8 * (3 - (i % 4)))) & 0xFF;
        }
        return output;
    }
    reset(h0 = 0x67452301, h1 = 0xEFCDAB89, h2 = 0x98BADCFE, h3 = 0x10325476, h4 = 0xC3D2E1F0, length = 0) {
        this.fill(h0, h1, h2, h3, h4);
        this.msg_blk_index = 0;
        this.computed = false;
        this.length = length;
    }
}
