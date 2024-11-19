const EEPROM_SIZE = 256
const EEPROM_ENCRYPTED_OFFSET = 0x00;
const EEPROM_ENCRYPTED_SIZE = (0x2F - 0x00) + 1;
const EEPROM_ENCRYPTED_SHA1_HASH_OFFSET = 0x00;
const EEPROM_ENCRYPTED_SHA1_HASH_SIZE = 20;
const EEPROM_ENCRYPTED_CONFOUNDER_OFFSET = 0x14;
const EEPROM_ENCRYPTED_CONFOUNDER_SIZE = 8;
const EEPROM_ENCRYPTED_HDD_KEY_OFFSET = 0x1C;
const EEPROM_ENCRYPTED_HDD_KEY_SIZE = 16;
const EEPROM_ENCRYPTED_XBOX_REGION_OFFSET = 0x2C;
const EEPROM_ENCRYPTED_XBOX_REGION_SIZE = 4;
const EEPROM_FACTORY_SETTINGS_OFFSET = 0x30;
const EEPROM_FACTORY_SETTINGS_SIZE = (0x5F - 0x30) + 1;
const EEPROM_FACTORY_SETTINGS_CHECKSUM_OFFSET = 0x30;
const EEPROM_FACTORY_SETTINGS_CHECKSUM_SIZE = 4;
const EEPROM_FACTORY_SETTINGS_SERIAL_NUMBER_OFFSET = 0x34;
const EEPROM_FACTORY_SETTINGS_SERIAL_NUMBER_SIZE = 12;
const EEPROM_FACTORY_SETTINGS_MAC_ADDRESS_OFFSET = 0x40;
const EEPROM_FACTORY_SETTINGS_MAC_ADDRESS_SIZE = 6;
const EEPROM_FACTORY_SETTINGS_PADDING1_OFFSET = 0x46;
const EEPROM_FACTORY_SETTINGS_PADDING1_SIZE = 2;
const EEPROM_FACTORY_SETTINGS_ONLINE_KEY_OFFSET = 0x48;
const EEPROM_FACTORY_SETTINGS_ONLINE_KEY_SIZE = 16;
const EEPROM_FACTORY_SETTINGS_VIDEO_STANDARD_OFFSET = 0x58;
const EEPROM_FACTORY_SETTINGS_VIDEO_STANDARD_SIZE = 4;
const EEPROM_FACTORY_SETTINGS_PADDING2_OFFSET = 0x5C;
const EEPROM_FACTORY_SETTINGS_PADDING2_SIZE = 4;
const EEPROM_USER_SETTINGS_OFFSET = 0x60;
const EEPROM_USER_SETTINGS_SIZE = (0xBF - 0x60) + 1;
const EEPROM_USER_SETTINGS_CHECKSUM_OFFSET = 0x60;
const EEPROM_USER_SETTINGS_CHECKSUM_SIZE = 4;
const EEPROM_USER_SETTINGS_TIMEZONE_BIAS_OFFSET = 0x64;
const EEPROM_USER_SETTINGS_TIMEZONE_BIAS_SIZE = 4;
const EEPROM_USER_SETTINGS_TIMEZONE_STD_NAME_OFFSET = 0x68;
const EEPROM_USER_SETTINGS_TIMEZONE_STD_NAME_SIZE = 4;
const EEPROM_USER_SETTINGS_TIMEZONE_DLT_NAME_OFFSET = 0x6C;
const EEPROM_USER_SETTINGS_TIMEZONE_DLT_NAME_SIZE = 4;
const EEPROM_USER_SETTINGS_PADDING1_OFFSET = 0x70;
const EEPROM_USER_SETTINGS_PADDING1_SIZE = 8;
const EEPROM_USER_SETTINGS_TIMEZONE_STD_START_OFFSET = 0x78;
const EEPROM_USER_SETTINGS_TIMEZONE_STD_START_SIZE = 4;
const EEPROM_USER_SETTINGS_TIMEZONE_DLT_START_OFFSET = 0x7C;
const EEPROM_USER_SETTINGS_TIMEZONE_DLT_START_SIZE = 4;
const EEPROM_USER_SETTINGS_PADDING2_OFFSET = 0x80;
const EEPROM_USER_SETTINGS_PADDING2_SIZE = 8;
const EEPROM_USER_SETTINGS_TIMEZONE_STD_BIAS_OFFSET = 0x88;
const EEPROM_USER_SETTINGS_TIMEZONE_STD_BIAS_SIZE = 4;
const EEPROM_USER_SETTINGS_TIMEZONE_DLT_BIAS_OFFSET = 0x8C;
const EEPROM_USER_SETTINGS_TIMEZONE_DLT_BIAS_SIZE = 4;
const EEPROM_USER_SETTINGS_TIMEZONE_DATA_SIZE = (EEPROM_USER_SETTINGS_TIMEZONE_BIAS_SIZE + EEPROM_USER_SETTINGS_TIMEZONE_STD_NAME_SIZE +
    EEPROM_USER_SETTINGS_TIMEZONE_DLT_NAME_SIZE + EEPROM_USER_SETTINGS_PADDING1_SIZE + EEPROM_USER_SETTINGS_TIMEZONE_STD_START_SIZE +
    EEPROM_USER_SETTINGS_TIMEZONE_DLT_START_SIZE + EEPROM_USER_SETTINGS_PADDING2_SIZE + EEPROM_USER_SETTINGS_TIMEZONE_STD_BIAS_SIZE +
    EEPROM_USER_SETTINGS_TIMEZONE_DLT_BIAS_SIZE);
const EEPROM_USER_SETTINGS_LANGUAGE_OFFSET = 0x90;
const EEPROM_USER_SETTINGS_LANGUAGE_SIZE = 4;
const EEPROM_USER_SETTINGS_VIDEO_SETTINGS_OFFSET = 0x94;
const EEPROM_USER_SETTINGS_VIDEO_SETTINGS_SIZE = 4;
const EEPROM_USER_SETTINGS_AUDIO_SETTINGS_OFFSET = 0x98;
const EEPROM_USER_SETTINGS_AUDIO_SETTINGS_SIZE = 4;
const EEPROM_USER_SETTINGS_PARENTAL_CONTROL_GAMES_OFFSET = 0x9C;
const EEPROM_USER_SETTINGS_PARENTAL_CONTROL_GAMES_SIZE = 4;
const EEPROM_USER_SETTINGS_PARENTAL_CONTROL_PASSCODE_OFFSET = 0xA0;
const EEPROM_USER_SETTINGS_PARENTAL_CONTROL_PASSCODE_SIZE = 4;
const EEPROM_USER_SETTINGS_PARENTAL_CONTROL_MOVIES_OFFSET = 0xA4;
const EEPROM_USER_SETTINGS_PARENTAL_CONTROL_MOVIES_SIZE = 4;
const EEPROM_USER_SETTINGS_XLIVE_IP_ADDRESS_OFFSET = 0xA8;
const EEPROM_USER_SETTINGS_XLIVE_IP_ADDRESS_SIZE = 4;
const EEPROM_USER_SETTINGS_XLIVE_DNS_ADDRESS_OFFSET = 0xAC;
const EEPROM_USER_SETTINGS_XLIVE_DNS_ADDRESS_SIZE = 4;
const EEPROM_USER_SETTINGS_XLIVE_DEFAULT_GATEWAY_ADDRESS_OFFSET = 0xB0;
const EEPROM_USER_SETTINGS_XLIVE_DEFAULT_GATEWAY_ADDRESS_SIZE = 4;
const EEPROM_USER_SETTINGS_XLIVE_SUBNET_MASK_OFFSET = 0xB4;
const EEPROM_USER_SETTINGS_XLIVE_SUBNET_MASK_SIZE = 4;
const EEPROM_USER_SETTINGS_MISC_FLAGS_OFFSET = 0xB8;
const EEPROM_USER_SETTINGS_MISC_FLAGS_SIZE = 4;
const EEPROM_USER_SETTINGS_DVD_REGION_OFFSET = 0xBC;
const EEPROM_USER_SETTINGS_DVD_REGION_SIZE = 4;
const EEPROM_FACTORY_16_RAM_TIMING_OFFSET = 0xC0;
const EEPROM_FACTORY_16_RAM_TIMING_SIZE = 54;
const EEPROM_FACTORY_16_TEMP_CALIBRATION_OFFSET = 0xF6;
const EEPROM_FACTORY_16_TEMP_CALIBRATION_SIZE = 4;

class EEPROM {
    constructor(eepromSize = 256, littleEndian = true) {
        this.buffer = new ArrayBuffer(eepromSize);
        this.dataView = new DataView(this.buffer);
        this.endian = littleEndian;
    }

    read(offset, length) {
        if (offset < 0 || offset + length > this.buffer.byteLength) {
            throw new Error('Read out of bounds');
        }
        let data = new Uint8Array(length);
        for (let i = 0; i < data.length; i++) {
            data[i] = this.dataView.getUint8(offset + i);
        }
        return data;
    }

    write(offset, data) {
        if (offset < 0 || offset + data.length > this.buffer.byteLength) {
            throw new Error('Write out of bounds');
        }
        for (let i = 0; i < data.length; i++) {
            this.dataView.setUint8(offset + i, data[i]);
        }
    }

    writeUint32(offset, value) {
        if (offset < 0 || offset + 4 > this.buffer.byteLength) {
            throw new Error('Write out of bounds');
        }
        this.dataView.setUint32(offset, value, this.endian);
    }

    readUint32(offset) {
        if (offset < 0 || offset + 4 > this.buffer.byteLength) {
            throw new Error('Read out of bounds');
        }
        return this.dataView.getUint32(offset, this.endian);
    }

    orUint32(offset, value) {
        if (offset < 0 || offset + 4 > this.buffer.byteLength) {
            throw new Error('OR operation out of bounds');
        }
        let currentValue = this.dataView.getUint32(offset, this.endian);
        let newValue = currentValue | value;
        this.dataView.setUint32(offset, newValue, this.endian);
    }
}

function do_eeprom_sha1_loop(hardware_revision, data) {
    const sha1 = new SHA1Context();

    // Let's do the encryption stages
    const sha1_intermediate_debug_first = [0x85F9E51A, 0xE04613D2, 0x6D86A50C, 0x77C32E3C, 0x4BD717A4];
    const sha1_intermediate_debug_second = [0x5D7A9C6B, 0xE1922BEB, 0xB82CCDBC, 0x3137AB34, 0x486B52B3];

    // 1.0
    const sha1_intermedia_retail1_first = [0x72127625, 0x336472B9, 0xBE609BEA, 0xF55E226B, 0x99958DAC];
    const sha1_intermedia_retail1_second = [0x76441D41, 0x4DE82659, 0x2E8EF85E, 0xB256FACA, 0xC4FE2DE8];

    // 1.1 to 1.5
    const sha1_intermedia_retail2_first = [0x39B06E79, 0xC9BD25E8, 0xDBC6B498, 0x40B4389D, 0x86BBD7ED];
    const sha1_intermedia_retail2_second = [0x9B49BED3, 0x84B430FC, 0x6B8749CD, 0xEBFE5FE5, 0xD96E7393];

    // 1.6
    const sha1_intermedia_retail3_first = [0x8058763A, 0xF97D4E0E, 0x865A9762, 0x8A3D920D, 0x08995B2C];
    const sha1_intermedia_retail3_second = [0x01075307, 0xA2f1E037, 0x1186EEEA, 0x88DA9992, 0x168A5609];

    // Determine which SHA1 intermediate values to use based on hardware revision
    let sha1_h_a;
    let sha1_h_b;
    if (hardware_revision == "0x09") {
        sha1_h_a = sha1_intermediate_debug_first;
        sha1_h_b = sha1_intermediate_debug_second;
    } else if (hardware_revision == "0x0A") {
        sha1_h_a = sha1_intermedia_retail1_first;
        sha1_h_b = sha1_intermedia_retail1_second;
    } else if (hardware_revision == "0x0B") {
        sha1_h_a = sha1_intermedia_retail2_first;
        sha1_h_b = sha1_intermedia_retail2_second;
    } else if (hardware_revision == "0x0C") {
        sha1_h_a = sha1_intermedia_retail3_first;
        sha1_h_b = sha1_intermedia_retail3_second;
    } else {
        alert("Invalid hardware revision.");
        return;
    }

    let sha1_hash = 0;
    sha1.reset(sha1_h_a[0], sha1_h_a[1], sha1_h_a[2], sha1_h_a[3], sha1_h_a[4], 512);
    sha1.input(new Uint8Array(data));
    sha1_hash = sha1.result();
    sha1.reset(sha1_h_b[0], sha1_h_b[1], sha1_h_b[2], sha1_h_b[3], sha1_h_b[4], 512);
    sha1.input(sha1_hash);
    return sha1.result();
}

function eepromTest(versionChar, eepromUint8Array) {
    // These blobs are the expected values for the EEPROM data generated with https://github.com/Ernegien/XboxEepromEditor
    const hexBlob_debug = `
        A9 F7 4F 15 BF 8B F7 53 DD 42 54 F2 84 69 B7 A0 
        7E 41 3C 72 92 BF EA 59 BC 86 9A 4B 24 71 B7 E1 
        D1 EF 97 1D 14 DF 78 26 9D 55 51 2A 9A C9 D4 E5 
        85 B6 71 A0 31 35 38 33 39 37 36 39 37 34 33 39 
        00 12 5A D2 C6 A4 00 00 E8 83 D4 C7 9C F6 31 A8 
        85 D7 FB 87 06 9F 4F EF 00 01 40 00 00 00 00 00 
        74 61 4D FB 2C 01 00 00 45 53 54 00 45 44 54 00 
        00 00 00 00 00 00 00 00 0A 05 00 02 04 01 00 02 
        00 00 00 00 00 00 00 00 00 00 00 00 C4 FF FF FF 
        01 00 00 00 00 00 0A 00 00 00 00 00 00 00 00 00 
        00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 
        00 00 00 00 00 00 00 00 00 00 00 00 01 00 00 00 
        00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 
        00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 
        00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 
        00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
    `;

    const hexBlock10 = `
        4E 90 E5 78 4F 78 60 2C 02 09 C6 66 E8 4E 92 79 
        D9 5C 83 44 A6 F4 4D 47 DB 59 DF 7E 02 6E 49 B0 
        2F 45 C9 C6 F0 B5 F1 22 74 79 BC 0D E0 BD 3C 64 
        85 B6 71 A0 31 35 38 33 39 37 36 39 37 34 33 39 
        00 12 5A D2 C6 A4 00 00 E8 83 D4 C7 9C F6 31 A8 
        85 D7 FB 87 06 9F 4F EF 00 01 40 00 00 00 00 00 
        74 61 4D FB 2C 01 00 00 45 53 54 00 45 44 54 00 
        00 00 00 00 00 00 00 00 0A 05 00 02 04 01 00 02 
        00 00 00 00 00 00 00 00 00 00 00 00 C4 FF FF FF 
        01 00 00 00 00 00 0A 00 00 00 00 00 00 00 00 00 
        00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 
        00 00 00 00 00 00 00 00 00 00 00 00 01 00 00 00 
        00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 
        00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 
        00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 
        00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
        `;

    const hexBlob11_14 = `
        BD A6 03 8B 87 76 8D EE 03 00 58 5B DC 54 EB 27 
        85 6B 95 DE 66 0B F7 C8 60 7E 2D C9 B8 99 F4 F3 
        8A 0A ED 30 A8 72 C0 5E 4B 91 4A 85 69 F8 55 1E 
        85 B6 71 A0 31 35 38 33 39 37 36 39 37 34 33 39 
        00 12 5A D2 C6 A4 00 00 E8 83 D4 C7 9C F6 31 A8 
        85 D7 FB 87 06 9F 4F EF 00 01 40 00 00 00 00 00 
        74 61 4D FB 2C 01 00 00 45 53 54 00 45 44 54 00 
        00 00 00 00 00 00 00 00 0A 05 00 02 04 01 00 02 
        00 00 00 00 00 00 00 00 00 00 00 00 C4 FF FF FF 
        01 00 00 00 00 00 0A 00 00 00 00 00 00 00 00 00 
        00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 
        00 00 00 00 00 00 00 00 00 00 00 00 01 00 00 00 
        00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 
        00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 
        00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 
        00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
    `;

    const hexBlock16 = `
        2E F5 36 16 81 21 71 70 4B 9D 18 2D 6A 0C B4 33 
        05 3F F2 DC 7C 79 06 02 5B B9 2B D7 69 34 38 9A 
        00 FE 2D 21 17 6F F7 68 4B C9 84 DF 2B 64 2F 84 
        85 B6 71 A0 31 35 38 33 39 37 36 39 37 34 33 39 
        00 12 5A D2 C6 A4 00 00 E8 83 D4 C7 9C F6 31 A8 
        85 D7 FB 87 06 9F 4F EF 00 01 40 00 00 00 00 00 
        74 61 4D FB 2C 01 00 00 45 53 54 00 45 44 54 00 
        00 00 00 00 00 00 00 00 0A 05 00 02 04 01 00 02 
        00 00 00 00 00 00 00 00 00 00 00 00 C4 FF FF FF 
        01 00 00 00 00 00 0A 00 00 00 00 00 00 00 00 00 
        00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 
        00 00 00 00 00 00 00 00 00 00 00 00 01 00 00 00 
        00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 
        00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 
        00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 
        00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
    `;

    let test_blob;
    if (hardware_revision == "0x09") {
        test_blob = hexBlob_debug;
    } else if (hardware_revision == "0x0A") {
        test_blob = hexBlock10;
    } else if (hardware_revision == "0x0B") {
        test_blob = hexBlob11_14;
    } else if (hardware_revision == "0x0C") {
        test_blob = hexBlock16;
    } else {
        console.assert("Invalid hardware revision.");
    }

    // Convert hex blob string to array, removing spaces
    const hexArray = test_blob
        .replace(/\s+/g, '')  // Remove all whitespace
        .match(/.{1,2}/g)     // Split into pairs
        .map(byte => parseInt(byte, 16));  // Convert each pair to number

    // Create Uint8Array from hex values for direct comparison
    const expectedArray = new Uint8Array(hexArray);

    const actualArray = eepromUint8Array;

    // First check lengths match
    console.assert(
        actualArray.length === expectedArray.length,
        `Length mismatch: expected ${expectedArray.length} bytes, got ${actualArray.length} bytes`
    );

    // Compare each byte
    for (let i = 0; i < expectedArray.length; i++) {
        console.assert(
            actualArray[i] === expectedArray[i],
            `Mismatch at offset ${i.toString(16).padStart(2, '0')}: ` +
            `expected ${expectedArray[i].toString(16).padStart(2, '0')}, ` +
            `got ${actualArray[i].toString(16).padStart(2, '0')}`
        );
    }
}

function validateInputs() {
    let isValid = true;
    const inputs = document.querySelectorAll('.form-control');

    inputs.forEach(input => {
        const lengthRequirement = input.getAttribute('data-length');
        const dataType = input.getAttribute('data-type');
        const value = input.value;

        let typeValid = true;
        if (dataType === 'hexadecimal') {
            typeValid = /^[0-9A-Fa-f]*$/.test(value);
        } else if (dataType === 'decimal') {
            typeValid = /^[0-9]*$/.test(value);
        }

        if (
            (lengthRequirement && value.length !== parseInt(lengthRequirement, 10)) ||
            !typeValid
        ) {
            input.classList.add('invalid');
            isValid = false;
        } else {
            input.classList.remove('invalid');
        }
    });

    // Do some conditional checks around video and audio settings against the video region
    const videoStandard = document.getElementById('videoStandard').value;
    const video480p = document.getElementById('video480p');
    const video720p = document.getElementById('video720p');
    const video1080i = document.getElementById('video1080i');
    const video50hz = document.getElementById('video50hz');

    const audioOutput = document.getElementById('audioOutput').value;
    const audioAC3 = document.getElementById('audioAC3');
    const audioDTS = document.getElementById('audioDTS');
    

    const NTSC = '0x00400100';
    const NTSCJ = '0x00400200';

    const STEREO = '0x00000000';
    const MONO = '0x00000001';
    const SURROUND = '0x00000002';
    

    // Condition: 480p, 720p, 1080i go red if video region is not NTSC or NTSCJ
    if (videoStandard == NTSC || videoStandard == NTSCJ) {
        video480p.classList.remove('invalid');
        video720p.classList.remove('invalid');
        video1080i.classList.remove('invalid');
    } else {
        video480p.classList.remove('invalid');
        video720p.classList.remove('invalid');
        video1080i.classList.remove('invalid');
        if (video480p.checked) {
            video480p.classList.add('invalid');
            isValid = false;
        } else {}
        if (video720p.checked) {
            video720p.classList.add('invalid');
            isValid = false;
        }
        if (video1080i.checked) {
            video1080i.classList.add('invalid');
            isValid = false;
        }
    }

    // Condition: 50Hz checkbox goes red if NTSC or NTSCJ is selected. 60Hz is okay in PAL
    if ((videoStandard == NTSC || videoStandard == NTSCJ) && video50hz.checked) {
        video50hz.classList.add('invalid');
        isValid = false;
    } else {
        video50hz.classList.remove('invalid');
    }

    // Condition: If AC3 "Dolby Digital" is selected but not surround, go red
    if (audioAC3.checked && audioOutput != SURROUND) {
        audioAC3.classList.add('invalid');
        isValid = false;
    } else {
        audioAC3.classList.remove('invalid');
    }

    // If any items within a tab are red make the tab red too
    const tabs = [
        { id: 'encrypted', tab: document.getElementById('encrypted-tab') },
        { id: 'factory', tab: document.getElementById('factory-tab') },
        { id: 'user', tab: document.getElementById('user-tab') }
    ];

    tabs.forEach(tabInfo => {
        const tabContent = document.getElementById(tabInfo.id);
        const invalidItems = tabContent.querySelectorAll('.invalid');

        if (invalidItems.length > 0) {
            tabInfo.tab.classList.add('tab-invalid');
            isValid = false;
        } else {
            tabInfo.tab.classList.remove('tab-invalid');
        }
    });

    // Disable the Download button if any field is invalid
    document.getElementById('generateBtn').disabled = !isValid;
}

function hexStringToUint8Array(hexString) {
    return new Uint8Array(hexString.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
}

function hexUint32ToUint32(hexValue) {
    return parseInt(hexValue, 16);
}
