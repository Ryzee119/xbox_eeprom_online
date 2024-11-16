function calculateChecksum(data) {
    const bytes = new Uint8Array(data);
    const view = new DataView(bytes.buffer);

    let high = 0;
    let low = 0;

    for (let i = 0; i < bytes.length / 4; i++) {
        const val = view.getUint32(i * 4, true);

        // JavaScript bitwise operations are 32-bit, so we need to use Number operations
        const sum = (high * Math.pow(2, 32)) + low;

        high = Math.floor((sum + val) / Math.pow(2, 32));

        // Update low (ensuring we keep only the lower 32 bits)
        low = (low + val) >>> 0;
    }

    // Final result needs to be unsigned 32-bit
    return (~(high + low)) >>> 0;
}
