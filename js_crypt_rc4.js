class RC4Context {
    constructor() {
        this.s = new Array(256);
    }

    #swap(first, second) {
        let temp = this.s[first];
        this.s[first] = this.s[second];
        this.s[second] = temp;
    }

    init(data) {
        this.x = 0;
        this.y = 0;
        let i1 = 0;
        let i2 = 0;
        
        // Initialize key array
        for (let i = 0; i < this.s.length; i++) {
            this.s[i] = i % this.s.length;
        }
        
        // Key scheduling algorithm
        for (let i = 0; i < this.s.length; i++) {
            i2 = (data[i1] + this.s[i] + i2) % this.s.length;
            i1 = (i1 + 1) % data.length;
            this.#swap(i, i2);
        }
    }

    crypt(data) {
        let i = 0, j = 0;
        let output = new Uint8Array(data);
        for (let k = 0; k < output.length; k++) {
            i = (i + 1) % 256;
            j = (j + this.s[i]) % 256;
            this.#swap(i, j);
            output[k] ^= this.s[(this.s[i] + this.s[j]) % 256];
        }
        return output;
    }
}
