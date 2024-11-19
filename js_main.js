// Can be set to true in console to run tests against known inputs
// and asserts the output is correct
let run_tests = true;

window.onload = function () {
    generateHex(16, 'confounder');
    generateHex(32, 'hddKey');
    generateDigits(12, 'serial');
    generateHex(32, 'onlineKey');
    document.getElementById('ramTiming').value = document.getElementById('ramSelect').value;
    document.getElementById('thermalCalibration').value = "82518000" // Values from my 1.6 but they change!

    // Prefix MAC address with 0050F2 - what xbox uses
    generateHex(12, 'macAddress', '0050F2');

    // Add event listeners to all the inputs to validate them on changes
    const inputs = document.querySelectorAll('.form-control, select.form-select, input[type="checkbox"]');
    inputs.forEach(input => {
        if (input.type === 'checkbox') {
            input.onchange = validateInputs;
        } else {
            input.oninput = validateInputs;
        }
    });

    // Put some known values in the fields for testing
    if (run_tests) {
        document.getElementById('confounder').value = 'EA21198E07C78F3D';
        document.getElementById('hddKey').value = '6B14F3B9129DDC2F84CCC756CC40397D';
        document.getElementById('serial').value = '158397697439';
        document.getElementById('macAddress').value = '00125AD2C6A4';
        document.getElementById('onlineKey').value = 'E883D4C79CF631A885D7FB87069F4FEF';
    }

    validateInputs();
};

function generateFile() {
    const littleEndian = true;
    let eeprom = new EEPROM(EEPROM_SIZE, littleEndian);

    const inputs = document.querySelectorAll('.form-control, select.form-select, input[type="checkbox"]');
    inputs.forEach(input => {
        let label = input.closest('.mb-3') && input.closest('.mb-3').querySelector('.form-label') ?
            input.closest('.mb-3').querySelector('.form-label').textContent :
            input.id;

        const eepromField = input.getAttribute('data-eeprom');

        if (input.type === 'checkbox') {
            if (!input.checked) {
                return;
            }
        }

        if (eepromField == 'confounder_unencrypted') {
            console.assert(input.value.length == EEPROM_ENCRYPTED_CONFOUNDER_SIZE * 2);
            eeprom.write(EEPROM_ENCRYPTED_CONFOUNDER_OFFSET, hexStringToUint8Array(input.value));
        }

        if (eepromField == 'hdd_key_unencrypted') {
            console.assert(input.value.length == EEPROM_ENCRYPTED_HDD_KEY_SIZE * 2);
            eeprom.write(EEPROM_ENCRYPTED_HDD_KEY_OFFSET, hexStringToUint8Array(input.value));
        }

        if (eepromField == 'region_unencrypted') {
            eeprom.writeUint32(EEPROM_ENCRYPTED_XBOX_REGION_OFFSET, hexUint32ToUint32(input.value));
        }

        if (eepromField == 'serial_number') {
            // S/N is written as ASCII
            eeprom.write(EEPROM_FACTORY_SERIAL_NUMBER_OFFSET, new TextEncoder().encode(input.value));
        }

        if (eepromField == 'mac_address') {
            eeprom.write(EEPROM_FACTORY_MAC_ADDRESS_OFFSET, hexStringToUint8Array(input.value));
        }

        if (eepromField == 'online_key') {
            eeprom.write(EEPROM_FACTORY_ONLINE_KEY_OFFSET, hexStringToUint8Array(input.value));
        }

        if (eepromField == 'video_standard') {
            eeprom.writeUint32(EEPROM_FACTORY_VIDEO_STANDARD_OFFSET, hexUint32ToUint32(input.value));
        }

        if (eepromField == 'timezone_data') {
            eeprom.write(EEPROM_USER_TIMEZONE_BIAS_OFFSET, hexStringToUint8Array(input.value));
        }

        if (eepromField == 'language') {
            eeprom.writeUint32(EEPROM_USER_LANGUAGE_OFFSET, hexUint32ToUint32(input.value));
        }

        if (eepromField == 'video_flags') {
            eeprom.orUint32(EEPROM_USER_VIDEO_SETTINGS_OFFSET, hexUint32ToUint32(input.value));
        }

        if (eepromField == 'audio_flags') {
            eeprom.orUint32(EEPROM_USER_AUDIO_SETTINGS_OFFSET, hexUint32ToUint32(input.value));
        }

        if (eepromField == 'parental_control_games') {
            eeprom.writeUint32(EEPROM_USER_PARENTAL_CONTROL_GAMES_OFFSET, hexUint32ToUint32(input.value));
        }

        if (eepromField == 'parental_control_passcode') {
            eeprom.writeUint32(EEPROM_USER_PARENTAL_CONTROL_PASSCODE_OFFSET, hexUint32ToUint32(input.value));
        }

        if (eepromField == 'parental_control_movies') {
            eeprom.writeUint32(EEPROM_USER_PARENTAL_CONTROL_MOVIES_OFFSET, hexUint32ToUint32(input.value));
        }

        if (eepromField == 'xlive_ip_address') {
            eeprom.writeUint32(EEPROM_USER_XLIVE_IP_ADDRESS_OFFSET, hexUint32ToUint32(input.value));
        }

        if (eepromField == 'xlive_dns_address') {
            eeprom.writeUint32(EEPROM_USER_XLIVE_DNS_ADDRESS_OFFSET, hexUint32ToUint32(input.value));
        }

        if (eepromField == 'xlive_default_gateway_address') {
            eeprom.writeUint32(EEPROM_USER_XLIVE_DEFAULT_GATEWAY_ADDRESS_OFFSET, hexUint32ToUint32(input.value));
        }

        if (eepromField == 'xlive_subnet_mask') {
            eeprom.writeUint32(EEPROM_USER_XLIVE_SUBNET_MASK_OFFSET, hexUint32ToUint32(input.value));
        }

        if (eepromField == 'misc_flags') {
            eeprom.orUint32(EEPROM_USER_MISC_FLAGS_OFFSET, hexUint32ToUint32(input.value));
        }

        if (eepromField == 'dvd_region') {
            eeprom.writeUint32(EEPROM_USER_DVD_REGION_OFFSET, hexUint32ToUint32(input.value));
        }

        if (eepromField == 'ram_timing') {
            eeprom.write(EEPROM_FACTORY_16_RAM_TIMING_OFFSET, hexStringToUint8Array(input.value));
        }

        if (eepromField == 'thermal_calibration') {
            eeprom.write(EEPROM_FACTORY_16_TEMP_CALIBRATION_OFFSET, hexStringToUint8Array(input.value));
        }
    });

    // Write the factory settings checksum
    checksum = calculateChecksum(eeprom.read(EEPROM_FACTORY_OFFSET + 4, EEPROM_FACTORY_SIZE - 4));
    eeprom.writeUint32(EEPROM_FACTORY_CHECKSUM_OFFSET, checksum);

    // Write the user settings checksum
    checksum = calculateChecksum(eeprom.read(EEPROM_USER_OFFSET + 4, EEPROM_USER_SIZE - 4));
    eeprom.writeUint32(EEPROM_USER_CHECKSUM_OFFSET, checksum);

    // Let's do the encryption stages

    // Read revision - this changes the SHA1 intermediate values
    hardware_revision = document.getElementById("hardwareRevision").value;

    const encrypted_start_offset = EEPROM_ENCRYPTED_CONFOUNDER_OFFSET;
    const encrypted_size = EEPROM_ENCRYPTED_CONFOUNDER_SIZE + EEPROM_ENCRYPTED_HDD_KEY_SIZE + EEPROM_ENCRYPTED_XBOX_REGION_SIZE;
    const data_to_encrypt = eeprom.read(encrypted_start_offset, encrypted_size);

    // SHA1 Stage 1 - perform the first hash calculation over the currently unencrypted area (confounder, hdd key, region)
    // to determine the main sha1 hash
    let sha1_hash = do_eeprom_sha1_loop(hardware_revision, data_to_encrypt);
    console.log("SHA1 HASH: " + sha1_hash);

    // SHA1 Stage 2 - perform the second hash calculation over the main sha1 hash to determine the RC4 key
    let rc4_key = do_eeprom_sha1_loop(hardware_revision, sha1_hash);
    console.log("RC4 KEY: " + rc4_key);

    // RC4 using the the new key to encrypt the data
    const rc4 = new RC4Context();
    rc4.init(rc4_key);
    rc4_result = rc4.crypt(data_to_encrypt);
    console.log("RC4 RESULT: " + rc4_result);

    // Write the SHA1 hash to the EEPROM image
    eeprom.write(EEPROM_ENCRYPTED_SHA1_HASH_OFFSET, sha1_hash);

    // Write the RC4 hash to the EEPROM image
    eeprom.write(encrypted_start_offset, rc4_result);

    const eeprom_final = eeprom.read(0, EEPROM_SIZE);
    console.log(eeprom_final);
    if (run_tests) {
        hardware_revision = document.getElementById("hardwareRevision").value;
        eepromTest(hardware_revision, eeprom_final);
    } else {
        saveFile(eeprom_final);
    }
}

function saveFile(eeprom8_array) {
    const blob = new Blob([eeprom8_array], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;

    // xbox_eeprom_YYYY_MM_DD_HH_MM_SS.bin
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const fileName = `xbox_eeprom_${year}_${month}_${day}_${hours}_${minutes}_${seconds}.bin`;

    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function parseFile(input) {
    const littleEndian = true;
    const file = input.files[0];
    if (file && file.size === 256) {
        eeprom = new EEPROM(EEPROM_SIZE, littleEndian);

        const reader = new FileReader();
        reader.onload = function (event) {
            file_data = new Uint8Array(event.target.result);
            eeprom.write(0, file_data);
            console.log(file_data)

            hardware_revision = ["0x09", "0x0A", "0x0B", "0x0C"];

            // Loop through the hardware revisions to find the valid one
            let rc4 = new RC4Context();
            for (let i = 0; i < hardware_revision.length; i++) {
                // Pull the SHA1 hash from the eeprom file
                let sha1_hash = eeprom.read(EEPROM_ENCRYPTED_SHA1_HASH_OFFSET, EEPROM_ENCRYPTED_SHA1_HASH_SIZE);

                // Determine the RC4 decryption key
                let rc4_decypt_key = do_eeprom_sha1_loop(hardware_revision[i], sha1_hash);
                rc4.init(rc4_decypt_key);

                // Decrypt the data
                let data_to_decrypt = eeprom.read(EEPROM_ENCRYPTED_CONFOUNDER_OFFSET, EEPROM_ENCRYPTED_CONFOUNDER_SIZE + EEPROM_ENCRYPTED_HDD_KEY_SIZE + EEPROM_ENCRYPTED_XBOX_REGION_SIZE);
                let decrypted_result = rc4.crypt(data_to_decrypt);

                // To verify it's valid, to a SHA1 over the decrypted data and verify it is the same as the one in the eeprom file
                let sha1_hash_test = do_eeprom_sha1_loop(hardware_revision[i], decrypted_result);
                if (arraysEqual(sha1_hash_test, sha1_hash)) {
                    console.log("Found valid hardware revision: " + hardware_revision[i]);
                    eeprom.write(EEPROM_ENCRYPTED_CONFOUNDER_OFFSET, decrypted_result);

                    // Now pull everything out of the eeprom for parsing
                    let confounder = eeprom.read(EEPROM_ENCRYPTED_CONFOUNDER_OFFSET, EEPROM_ENCRYPTED_CONFOUNDER_SIZE);
                    let hdd_key = eeprom.read(EEPROM_ENCRYPTED_HDD_KEY_OFFSET, EEPROM_ENCRYPTED_HDD_KEY_SIZE);
                    let region = eeprom.readUint32(EEPROM_ENCRYPTED_XBOX_REGION_OFFSET);
                    let serial = eeprom.read(EEPROM_FACTORY_SERIAL_NUMBER_OFFSET, EEPROM_FACTORY_SERIAL_NUMBER_SIZE);
                    let mac_address = eeprom.read(EEPROM_FACTORY_MAC_ADDRESS_OFFSET, EEPROM_FACTORY_MAC_ADDRESS_SIZE);
                    let online_key = eeprom.read(EEPROM_FACTORY_ONLINE_KEY_OFFSET, EEPROM_FACTORY_ONLINE_KEY_SIZE);
                    let video_standard = eeprom.readUint32(EEPROM_FACTORY_VIDEO_STANDARD_OFFSET);
                    let timezone_data = eeprom.read(EEPROM_USER_TIMEZONE_BIAS_OFFSET, EEPROM_USER_TIMEZONE_DATA_SIZE);
                    let language = eeprom.readUint32(EEPROM_USER_LANGUAGE_OFFSET);
                    let video_flags = eeprom.readUint32(EEPROM_USER_VIDEO_SETTINGS_OFFSET);
                    let audio_flags = eeprom.readUint32(EEPROM_USER_AUDIO_SETTINGS_OFFSET);
                    let parental_control_games = eeprom.readUint32(EEPROM_USER_PARENTAL_CONTROL_GAMES_OFFSET);
                    let parental_control_passcode = eeprom.readUint32(EEPROM_USER_PARENTAL_CONTROL_PASSCODE_OFFSET);
                    let parental_control_movies = eeprom.readUint32(EEPROM_USER_PARENTAL_CONTROL_MOVIES_OFFSET);
                    let xlive_ip_address = eeprom.readUint32(EEPROM_USER_XLIVE_IP_ADDRESS_OFFSET);
                    let xlive_dns_address = eeprom.readUint32(EEPROM_USER_XLIVE_DNS_ADDRESS_OFFSET);
                    let xlive_default_gateway_address = eeprom.readUint32(EEPROM_USER_XLIVE_DEFAULT_GATEWAY_ADDRESS_OFFSET);
                    let xlive_subnet_mask = eeprom.readUint32(EEPROM_USER_XLIVE_SUBNET_MASK_OFFSET);
                    let misc_flags = eeprom.readUint32(EEPROM_USER_MISC_FLAGS_OFFSET);
                    let dvd_region = eeprom.readUint32(EEPROM_USER_DVD_REGION_OFFSET);
                    let ram_timings = eeprom.read(EEPROM_FACTORY_16_RAM_TIMING_OFFSET, EEPROM_FACTORY_16_RAM_TIMING_SIZE);
                    let thermal_calibration = eeprom.read(EEPROM_FACTORY_16_TEMP_CALIBRATION_OFFSET, EEPROM_FACTORY_16_TEMP_CALIBRATION_SIZE);

                    // Apply the data to the form
                    document.getElementById('hardwareRevision').value = hardware_revision[i];
                    document.getElementById('confounder').value = uint8ArrayToHexString(confounder);
                    document.getElementById('hddKey').value = uint8ArrayToHexString(hdd_key);
                    document.getElementById('region').value = uint32ToHexUint32(region);
                    document.getElementById('serial').value = new TextDecoder().decode(serial);
                    document.getElementById('macAddress').value = uint8ArrayToHexString(mac_address);
                    document.getElementById('onlineKey').value = uint8ArrayToHexString(online_key);
                    document.getElementById('videoStandard').value = uint32ToHexUint32(video_standard);
                    document.getElementById('timezoneData').value = uint8ArrayToHexString(timezone_data);
                    document.getElementById('language').value = uint32ToHexUint32(language);
                    document.getElementById('dvdRegion').value = uint32ToHexUint32(dvd_region);

                    // Video Flags
                    document.getElementById('videoAspect').value = uint32ToHexUint32(video_flags & 0x00110000);
                    document.getElementById('video480p').checked = (video_flags & 0x00080000) ? true : false;
                    document.getElementById('video720p').checked = (video_flags & 0x00020000) ? true : false;
                    document.getElementById('video1080i').checked = (video_flags & 0x00040000) ? true : false;
                    document.getElementById('video60hz').checked = (video_flags & 0x00400000) ? true : false;
                    document.getElementById('video50hz').checked = (video_flags & 0x00800000) ? true : false;

                    // Audio Flags
                    document.getElementById('audioOutput').value = uint32ToHexUint32(audio_flags & 0x00000003);
                    document.getElementById('audioAC3').checked = (audio_flags & 0x00010000) ? true : false;
                    document.getElementById('audioDTS').checked = (audio_flags & 0x00020000) ? true : false;

                    // Misc Flags
                    document.getElementById('miscAutoOff').checked = (misc_flags & 0x00000001) ? true : false;
                    document.getElementById('daylightSavings').checked = (misc_flags & 0x00000002) ? true : false;
                    document.getElementById('xboxLiveAutoSignIn').checked = (misc_flags & 0x00000004) ? true : false;
                    document.getElementById('showXblivePoli').checked = (misc_flags & 0x00000008) ? true : false;

                    // Ram Timings (1.6)
                    document.getElementById('ramTiming').value = uint8ArrayToHexString(ram_timings);
                    if (ram_timings[0x03] == 0x02) {
                        document.getElementById('ramSelect').value = "68AADD0246458F8F7856BB69010446458F8F7856BB69010446458F8F7856BB69120346458F8F7856BB69020246458F8F7856BB691202";
                    } else if (ram_timings[0x03] == 0x42) {
                        document.getElementById('ramSelect').value = "68AADD4246458F8F7856BB69010446458F8F7856BB69010446458F8F7856BB69120446458F8F7856BB69020346458F8F7856BB690203";
                    } else {
                        document.getElementById('ramSelect').value = "000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000";
                    }

                    // Thermal Calibration (1.6)
                    document.getElementById('thermalCalibration').value = uint8ArrayToHexString(thermal_calibration);

                    // Todo
                    //document.getElementById('parentalControlGames').value = uint32ToHexUint32(parental_control_games);
                    //document.getElementById('parentalControlPasscode').value = uint32ToHexUint32(parental_control_passcode);
                    //document.getElementById('parentalControlMovies').value = uint32ToHexUint32(parental_control_movies);
                    //document.getElementById('xliveIpAddress').value = uint32ToHexUint32(xlive_ip_address);
                    //document.getElementById('xliveDnsAddress').value = uint32ToHexUint32(xlive_dns_address);
                    //document.getElementById('xliveDefaultGatewayAddress').value = uint32ToHexUint32(xlive_default_gateway_address);
                    //document.getElementById('xliveSubnetMask').value = uint32ToHexUint32(xlive_subnet_mask);

                    validateInputs();

                    return;
                }
            }
            alert("Invalid EEPROM file, unable to decrypt");
            return;
        };
        reader.readAsArrayBuffer(file);
    } else {
        alert("Please upload a valid 256-byte file.");
    }
}
