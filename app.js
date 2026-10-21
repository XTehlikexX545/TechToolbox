// ========================================
// TECHTOOLBOX
// Main JavaScript
// ========================================

console.log("TechToolbox başlatıldı.");

// Password Generator kartını bul
const passwordCard = document.querySelector(".tool-card.red");

// Kart bulunursa tıklama olayını ekle
if (passwordCard) {

    passwordCard.addEventListener("click", function () {

        openPasswordGenerator();

    });

}


// ========================================
// PASSWORD GENERATOR
// ========================================

function openPasswordGenerator() {

    // Daha önce panel oluşturulduysa tekrar oluşturma
    if (document.getElementById("password-modal")) {
        return;
    }

    const modal = document.createElement("div");

    modal.id = "password-modal";

    modal.innerHTML = `

        <div class="password-panel">

            <button
                class="close-password"
                id="close-password"
            >
                ×
            </button>

            <div class="password-title">
                &gt;_ PASSWORD GENERATOR
            </div>

            <div class="password-content">

                <label>
                    PASSWORD LENGTH
                </label>

                <input
                    type="number"
                    id="password-length"
                    min="4"
                    max="128"
                    value="16"
                >

                <label class="check-row">
                    <input
                        type="checkbox"
                        id="uppercase"
                        checked
                    >
                    UPPERCASE
                </label>

                <label class="check-row">
                    <input
                        type="checkbox"
                        id="lowercase"
                        checked
                    >
                    LOWERCASE
                </label>

                <label class="check-row">
                    <input
                        type="checkbox"
                        id="numbers"
                        checked
                    >
                    NUMBERS
                </label>

                <label class="check-row">
                    <input
                        type="checkbox"
                        id="symbols"
                        checked
                    >
                    SYMBOLS
                </label>

                <div class="password-result">

                    <input
                        type="text"
                        id="generated-password"
                        readonly
                        placeholder="GENERATE PASSWORD..."
                    >

                    <button id="copy-password">
                        COPY
                    </button>

                </div>

                <button
                    class="generate-password"
                    id="generate-password"
                >
                    &gt; GENERATE PASSWORD
                </button>

            </div>

        </div>

    `;

    document.body.appendChild(modal);


    // Kapat
    document
        .getElementById("close-password")
        .addEventListener("click", function () {

            modal.remove();

        });


    // Generate
    document
        .getElementById("generate-password")
        .addEventListener("click", generatePassword);


    // Copy
    document
        .getElementById("copy-password")
        .addEventListener("click", copyPassword);


    // İlk parolayı otomatik oluştur
    generatePassword();

}


// ========================================
// PASSWORD GENERATION
// ========================================

function generatePassword() {

    const length =
        Number(
            document.getElementById("password-length").value
        );


    const uppercase =
        document.getElementById("uppercase").checked;

    const lowercase =
        document.getElementById("lowercase").checked;

    const numbers =
        document.getElementById("numbers").checked;

    const symbols =
        document.getElementById("symbols").checked;


    let characters = "";


    if (uppercase) {

        characters +=
            "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    }


    if (lowercase) {

        characters +=
            "abcdefghijklmnopqrstuvwxyz";

    }


    if (numbers) {

        characters +=
            "0123456789";

    }


    if (symbols) {

        characters +=
            "!@#$%^&*()_+-=[]{}|;:,.<>?";

    }


    // Hiçbir seçenek seçilmediyse
    if (characters.length === 0) {

        alert(
            "En az bir karakter türü seçmelisin."
        );

        return;

    }


    let password = "";


    for (let i = 0; i < length; i++) {

        const randomIndex =
            Math.floor(
                Math.random() * characters.length
            );

        password +=
            characters[randomIndex];

    }


    document
        .getElementById("generated-password")
        .value = password;

}


// ========================================
// COPY PASSWORD
// ========================================

function copyPassword() {

    const password =
        document
            .getElementById("generated-password")
            .value;


    if (!password) {
        return;
    }


    navigator.clipboard
        .writeText(password)
        .then(function () {

            const button =
                document.getElementById(
                    "copy-password"
                );

            button.textContent = "COPIED ✓";


            setTimeout(function () {

                button.textContent = "COPY";

            }, 1500);

        });

}

// ========================================
// UUID GENERATOR
// ========================================

const uuidCard = document.querySelector(".tool-card.orange");

if (uuidCard) {

    uuidCard.addEventListener("click", function () {

        openUUIDGenerator();

    });

}


// ========================================
// UUID GENERATOR PANEL
// ========================================

function openUUIDGenerator() {

    // Panel zaten açıksa tekrar açma
    if (document.getElementById("uuid-modal")) {
        return;
    }


    const modal = document.createElement("div");

    modal.id = "uuid-modal";


    modal.innerHTML = `

        <div class="uuid-panel">

            <button
                class="close-uuid"
                id="close-uuid"
            >
                ×
            </button>


            <div class="uuid-title">
                &gt;_ UUID GENERATOR
            </div>


            <div class="uuid-content">


                <label>
                    QUANTITY
                </label>


                <input
                    type="number"
                    id="uuid-quantity"
                    min="1"
                    max="100"
                    value="1"
                >


                <label>
                    UUID VERSION
                </label>


                <select id="uuid-version">

                    <option value="v4">
                        UUID v4
                    </option>

                </select>


                <div
                    class="uuid-result"
                    id="uuid-result"
                >
                    GENERATE UUID...
                </div>


                <div class="uuid-buttons">


                    <button
                        class="generate-uuid"
                        id="generate-uuid"
                    >
                        &gt; GENERATE UUID
                    </button>


                    <button
                        class="copy-uuid"
                        id="copy-uuid"
                    >
                        COPY
                    </button>


                </div>


            </div>

        </div>

    `;


    document.body.appendChild(modal);


    // Kapat
    document
        .getElementById("close-uuid")
        .addEventListener("click", function () {

            modal.remove();

        });


    // Generate
    document
        .getElementById("generate-uuid")
        .addEventListener("click", generateUUIDs);


    // Copy
    document
        .getElementById("copy-uuid")
        .addEventListener("click", copyUUIDs);


    // İlk UUID'yi oluştur
    generateUUIDs();

}


// ========================================
// UUID v4 GENERATOR
// ========================================

function createUUIDv4() {

    // Modern tarayıcı / Android WebView
    if (
        window.crypto &&
        crypto.randomUUID
    ) {

        return crypto.randomUUID();

    }


    // Fallback
    const bytes =
        new Uint8Array(16);


    crypto.getRandomValues(bytes);


    // UUID version 4
    bytes[6] =
        (bytes[6] & 0x0f) | 0x40;


    bytes[8] =
        (bytes[8] & 0x3f) | 0x80;


    const hex =
        Array
            .from(bytes)
            .map(
                byte =>
                    byte
                        .toString(16)
                        .padStart(2, "0")
            )
            .join("");


    return (

        hex.substring(0, 8) +
        "-" +
        hex.substring(8, 12) +
        "-" +
        hex.substring(12, 16) +
        "-" +
        hex.substring(16, 20) +
        "-" +
        hex.substring(20, 32)

    );

}


// ========================================
// GENERATE UUIDs
// ========================================

function generateUUIDs() {

    const quantity =
        Math.min(
            Math.max(
                Number(
                    document
                        .getElementById(
                            "uuid-quantity"
                        )
                        .value
                ),
                1
            ),
            100
        );


    const uuids = [];


    for (
        let i = 0;
        i < quantity;
        i++
    ) {

        uuids.push(
            createUUIDv4()
        );

    }


    document
        .getElementById("uuid-result")
        .textContent =
            uuids.join("\n");

}


// ========================================
// COPY UUIDs
// ========================================

function copyUUIDs() {

    const result =
        document
            .getElementById("uuid-result")
            .textContent;


    if (
        !result ||
        result === "GENERATE UUID..."
    ) {

        return;

    }


    navigator.clipboard
        .writeText(result)
        .then(function () {

            const button =
                document.getElementById(
                    "copy-uuid"
                );


            button.textContent =
                "COPIED ✓";


            setTimeout(function () {

                button.textContent =
                    "COPY";

            }, 1500);

        });

}

// ========================================
// COLOR TOOL
// ========================================

const colorCard = document.querySelector(".tool-card.green");

if (colorCard) {

    colorCard.addEventListener("click", function () {

        openColorTool();

    });

}


// ========================================
// COLOR TOOL PANEL
// ========================================

function openColorTool() {

    if (document.getElementById("color-modal")) {
        return;
    }

    const modal = document.createElement("div");

    modal.id = "color-modal";

    modal.innerHTML = `

        <div class="color-panel">

            <button
                class="close-color"
                id="close-color"
            >
                ×
            </button>

            <div class="color-title">
                &gt;_ COLOR TOOL
            </div>

            <div class="color-content">

                <div
                    class="color-preview"
                    id="color-preview"
                >
                    <span>COLOR</span>
                </div>


                <div class="color-picker-row">

                    <label>
                        SELECT COLOR
                    </label>

                    <input
                        type="color"
                        id="color-picker"
                        value="#00ff88"
                    >

                </div>


                <div class="color-value">

                    <div class="value-label">
                        HEX
                    </div>

                    <div class="value-row">

                        <input
                            type="text"
                            id="hex-value"
                            readonly
                        >

                        <button
                            class="copy-color"
                            data-target="hex-value"
                        >
                            COPY
                        </button>

                    </div>

                </div>


                <div class="color-value">

                    <div class="value-label">
                        RGB
                    </div>

                    <div class="value-row">

                        <input
                            type="text"
                            id="rgb-value"
                            readonly
                        >

                        <button
                            class="copy-color"
                            data-target="rgb-value"
                        >
                            COPY
                        </button>

                    </div>

                </div>


                <div class="color-value">

                    <div class="value-label">
                        HSL
                    </div>

                    <div class="value-row">

                        <input
                            type="text"
                            id="hsl-value"
                            readonly
                        >

                        <button
                            class="copy-color"
                            data-target="hsl-value"
                        >
                            COPY
                        </button>

                    </div>

                </div>

            </div>

        </div>

    `;

    document.body.appendChild(modal);


    // Kapat
    document
        .getElementById("close-color")
        .addEventListener("click", function () {

            modal.remove();

        });


    // Renk değiştiğinde
    document
        .getElementById("color-picker")
        .addEventListener("input", updateColor);


    // Copy butonları
    document
        .querySelectorAll(".copy-color")
        .forEach(function (button) {

            button.addEventListener(
                "click",
                function () {

                    copyColorValue(
                        button.dataset.target,
                        button
                    );

                }
            );

        });


    // İlk rengi göster
    updateColor();

}


// ========================================
// UPDATE COLOR
// ========================================

function updateColor() {

    const color =
        document
            .getElementById("color-picker")
            .value;


    const rgb =
        hexToRgb(color);


    const hsl =
        rgbToHsl(
            rgb.r,
            rgb.g,
            rgb.b
        );


    document
        .getElementById("hex-value")
        .value =
            color.toUpperCase();


    document
        .getElementById("rgb-value")
        .value =
            `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;


    document
        .getElementById("hsl-value")
        .value =
            `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;


    const preview =
        document.getElementById(
            "color-preview"
        );


    preview.style.background =
        color;


    preview.style.boxShadow = `

        0 0 15px ${color},

        0 0 40px ${color},

        0 0 80px ${color}

    `;


    preview.style.color =
        getContrastColor(color);

}


// ========================================
// HEX → RGB
// ========================================

function hexToRgb(hex) {

    const cleanHex =
        hex.replace("#", "");


    return {

        r: parseInt(
            cleanHex.substring(0, 2),
            16
        ),

        g: parseInt(
            cleanHex.substring(2, 4),
            16
        ),

        b: parseInt(
            cleanHex.substring(4, 6),
            16
        )

    };

}


// ========================================
// RGB → HSL
// ========================================

function rgbToHsl(r, g, b) {

    r /= 255;
    g /= 255;
    b /= 255;


    const max =
        Math.max(r, g, b);

    const min =
        Math.min(r, g, b);


    let h;
    let s;

    const l =
        (max + min) / 2;


    if (max === min) {

        h = 0;
        s = 0;

    } else {

        const d =
            max - min;


        s =
            l > 0.5
                ? d / (2 - max - min)
                : d / (max + min);


        switch (max) {

            case r:

                h =
                    (g - b) / d +
                    (g < b ? 6 : 0);

                break;


            case g:

                h =
                    (b - r) / d +
                    2;

                break;


            case b:

                h =
                    (r - g) / d +
                    4;

                break;

        }


        h /= 6;

    }


    return {

        h: Math.round(h * 360),

        s: Math.round(s * 100),

        l: Math.round(l * 100)

    };

}


// ========================================
// TEXT COLOR CONTRAST
// ========================================

function getContrastColor(hex) {

    const rgb =
        hexToRgb(hex);


    const brightness =
        (
            rgb.r * 299 +
            rgb.g * 587 +
            rgb.b * 114
        ) / 1000;


    return brightness > 150
        ? "#000000"
        : "#ffffff";

}


// ========================================
// COPY COLOR
// ========================================

function copyColorValue(
    targetId,
    button
) {

    const input =
        document.getElementById(
            targetId
        );


    navigator.clipboard
        .writeText(input.value)
        .then(function () {

            const oldText =
                button.textContent;


            button.textContent =
                "COPIED ✓";


            setTimeout(function () {

                button.textContent =
                    oldText;

            }, 1200);

        });

}

// ========================================
// JSON FORMATTER
// ========================================

const jsonCard = document.querySelector(".tool-card.cyan");

if (jsonCard) {

    jsonCard.addEventListener("click", function () {

        openJSONFormatter();

    });

}


// ========================================
// JSON FORMATTER PANEL
// ========================================

function openJSONFormatter() {

    if (document.getElementById("json-modal")) {
        return;
    }


    const modal = document.createElement("div");

    modal.id = "json-modal";


    modal.innerHTML = `

        <div class="json-panel">

            <button
                class="close-json"
                id="close-json"
            >
                ×
            </button>


            <div class="json-title">
                &gt;_ JSON FORMATTER
            </div>


            <div class="json-content">


                <div class="json-label">
                    INPUT JSON
                </div>


                <textarea
                    id="json-input"
                    spellcheck="false"
                    placeholder='{"name":"TechToolbox","version":1}'
                ></textarea>


                <div class="json-actions">

                    <button
                        id="format-json"
                        class="format-json"
                    >
                        &gt; FORMAT
                    </button>


                    <button
                        id="minify-json"
                        class="minify-json"
                    >
                        MINIFY
                    </button>


                    <button
                        id="clear-json"
                        class="clear-json"
                    >
                        CLEAR
                    </button>

                </div>


                <div class="json-label">
                    OUTPUT
                </div>


                <textarea
                    id="json-output"
                    spellcheck="false"
                    readonly
                    placeholder="Formatted JSON will appear here..."
                ></textarea>


                <div
                    id="json-status"
                    class="json-status"
                >
                    READY
                </div>


                <button
                    id="copy-json"
                    class="copy-json"
                >
                    COPY OUTPUT
                </button>


            </div>

        </div>

    `;


    document.body.appendChild(modal);


    // Kapat
    document
        .getElementById("close-json")
        .addEventListener("click", function () {

            modal.remove();

        });


    // Format
    document
        .getElementById("format-json")
        .addEventListener("click", function () {

            formatJSON();

        });


    // Minify
    document
        .getElementById("minify-json")
        .addEventListener("click", function () {

            minifyJSON();

        });


    // Clear
    document
        .getElementById("clear-json")
        .addEventListener("click", function () {

            document.getElementById("json-input").value = "";

            document.getElementById("json-output").value = "";

            setJSONStatus("READY", false);

        });


    // Copy
    document
        .getElementById("copy-json")
        .addEventListener("click", function () {

            copyJSON();

        });


    // Örnek JSON
    document
        .getElementById("json-input")
        .value =
`{
    "name": "TechToolbox",
    "version": "1.0",
    "tools": 8,
    "developer": true
}`;

}


// ========================================
// FORMAT JSON
// ========================================

function formatJSON() {

    const input =
        document
            .getElementById("json-input")
            .value
            .trim();


    if (!input) {

        setJSONStatus(
            "INPUT EMPTY",
            true
        );

        return;

    }


    try {

        const parsed =
            JSON.parse(input);


        const formatted =
            JSON.stringify(
                parsed,
                null,
                4
            );


        document
            .getElementById("json-output")
            .value =
                formatted;


        setJSONStatus(
            "VALID JSON ✓",
            false
        );

    }

    catch (error) {

        document
            .getElementById("json-output")
            .value = "";


        setJSONStatus(
            "INVALID JSON ✕",
            true
        );

    }

}


// ========================================
// MINIFY JSON
// ========================================

function minifyJSON() {

    const input =
        document
            .getElementById("json-input")
            .value
            .trim();


    if (!input) {

        setJSONStatus(
            "INPUT EMPTY",
            true
        );

        return;

    }


    try {

        const parsed =
            JSON.parse(input);


        const minified =
            JSON.stringify(parsed);


        document
            .getElementById("json-output")
            .value =
                minified;


        setJSONStatus(
            "MINIFIED ✓",
            false
        );

    }

    catch (error) {

        document
            .getElementById("json-output")
            .value = "";


        setJSONStatus(
            "INVALID JSON ✕",
            true
        );

    }

}


// ========================================
// JSON STATUS
// ========================================

function setJSONStatus(
    message,
    isError
) {

    const status =
        document
            .getElementById("json-status");


    status.textContent =
        message;


    status.classList.toggle(
        "error",
        isError
    );

}


// ========================================
// COPY JSON
// ========================================

function copyJSON() {

    const output =
        document
            .getElementById("json-output")
            .value;


    if (!output) {
        return;
    }


    navigator.clipboard
        .writeText(output)
        .then(function () {

            const button =
                document.getElementById(
                    "copy-json"
                );


            button.textContent =
                "COPIED ✓";


            setTimeout(function () {

                button.textContent =
                    "COPY OUTPUT";

            }, 1500);

        });

}

// ========================================
// BASE64 ENCODER / DECODER
// ========================================

const base64Card =
    document.querySelector(".tool-card.purple");

if (base64Card) {

    base64Card.addEventListener(
        "click",
        function () {

            openBase64Tool();

        }
    );

}


// ========================================
// BASE64 PANEL
// ========================================

function openBase64Tool() {

    if (
        document.getElementById(
            "base64-modal"
        )
    ) {
        return;
    }


    const modal =
        document.createElement("div");

    modal.id =
        "base64-modal";


    modal.innerHTML = `

        <div class="base64-panel">

            <button
                class="close-base64"
                id="close-base64"
            >
                ×
            </button>


            <div class="base64-title">

                &gt;_ BASE64
                ENCODER / DECODER

            </div>


            <div class="base64-content">


                <div class="base64-label">

                    INPUT

                </div>


                <textarea
                    id="base64-input"
                    spellcheck="false"
                    placeholder="Enter text here..."
                ></textarea>


                <div class="base64-actions">

                    <button
                        id="encode-base64"
                        class="encode-base64"
                    >
                        &gt; ENCODE
                    </button>


                    <button
                        id="decode-base64"
                        class="decode-base64"
                    >
                        &gt; DECODE
                    </button>

                </div>


                <div class="base64-label">

                    OUTPUT

                </div>


                <textarea
                    id="base64-output"
                    spellcheck="false"
                    readonly
                    placeholder="Result will appear here..."
                ></textarea>


                <div class="base64-bottom">

                    <span
                        id="base64-status"
                        class="base64-status"
                    >
                        READY
                    </span>


                    <button
                        id="copy-base64"
                        class="copy-base64"
                    >
                        COPY
                    </button>

                </div>


            </div>

        </div>

    `;


    document.body.appendChild(
        modal
    );


    // Kapat

    document
        .getElementById(
            "close-base64"
        )
        .addEventListener(
            "click",
            function () {

                modal.remove();

            }
        );


    // Encode

    document
        .getElementById(
            "encode-base64"
        )
        .addEventListener(
            "click",
            encodeBase64
        );


    // Decode

    document
        .getElementById(
            "decode-base64"
        )
        .addEventListener(
            "click",
            decodeBase64
        );


    // Copy

    document
        .getElementById(
            "copy-base64"
        )
        .addEventListener(
            "click",
            copyBase64
        );

}


// ========================================
// ENCODE
// ========================================

function encodeBase64() {

    const input =
        document
            .getElementById(
                "base64-input"
            )
            .value;


    if (!input) {

        setBase64Status(
            "INPUT EMPTY",
            true
        );

        return;

    }


    try {

        /*
         * TextEncoder sayesinde
         * Türkçe karakterler de
         * düzgün şekilde desteklenir.
         */

        const bytes =
            new TextEncoder()
                .encode(input);


        let binary = "";


        bytes.forEach(
            function (byte) {

                binary +=
                    String.fromCharCode(
                        byte
                    );

            }
        );


        const encoded =
            btoa(binary);


        document
            .getElementById(
                "base64-output"
            )
            .value =
                encoded;


        setBase64Status(
            "ENCODED ✓",
            false
        );

    }

    catch (error) {

        setBase64Status(
            "ENCODE ERROR",
            true
        );

    }

}


// ========================================
// DECODE
// ========================================

function decodeBase64() {

    const input =
        document
            .getElementById(
                "base64-input"
            )
            .value
            .trim();


    if (!input) {

        setBase64Status(
            "INPUT EMPTY",
            true
        );

        return;

    }


    try {

        const binary =
            atob(input);


        const bytes =
            Uint8Array.from(
                binary,
                function (character) {

                    return character
                        .charCodeAt(0);

                }
            );


        const decoded =
            new TextDecoder()
                .decode(bytes);


        document
            .getElementById(
                "base64-output"
            )
            .value =
                decoded;


        setBase64Status(
            "DECODED ✓",
            false
        );

    }

    catch (error) {

        document
            .getElementById(
                "base64-output"
            )
            .value = "";


        setBase64Status(
            "INVALID BASE64 ✕",
            true
        );

    }

}


// ========================================
// STATUS
// ========================================

function setBase64Status(
    message,
    isError
) {

    const status =
        document
            .getElementById(
                "base64-status"
            );


    status.textContent =
        message;


    status.classList.toggle(
        "error",
        isError
    );

}


// ========================================
// COPY
// ========================================

function copyBase64() {

    const output =
        document
            .getElementById(
                "base64-output"
            )
            .value;


    if (!output) {
        return;
    }


    navigator.clipboard
        .writeText(output)
        .then(
            function () {

                const button =
                    document
                        .getElementById(
                            "copy-base64"
                        );


                button.textContent =
                    "COPIED ✓";


                setTimeout(
                    function () {

                        button.textContent =
                            "COPY";

                    },
                    1500
                );

            }
        );

}

// ========================================
// URL ENCODER / DECODER
// ========================================

const urlCard =
    document.querySelector(".tool-card.blue");

if (urlCard) {

    urlCard.addEventListener(
        "click",
        function () {

            openURLTool();

        }
    );

}


// ========================================
// URL TOOL PANEL
// ========================================

function openURLTool() {

    if (
        document.getElementById(
            "url-modal"
        )
    ) {
        return;
    }


    const modal =
        document.createElement("div");

    modal.id =
        "url-modal";


    modal.innerHTML = `

        <div class="url-panel">

            <button
                class="close-url"
                id="close-url"
            >
                ×
            </button>


            <div class="url-title">

                &gt;_ URL
                ENCODER / DECODER

            </div>


            <div class="url-content">


                <div class="url-label">

                    INPUT

                </div>


                <textarea
                    id="url-input"
                    spellcheck="false"
                    placeholder="Enter URL or text here..."
                ></textarea>


                <div class="url-actions">

                    <button
                        id="encode-url"
                        class="encode-url"
                    >
                        &gt; ENCODE
                    </button>


                    <button
                        id="decode-url"
                        class="decode-url"
                    >
                        &gt; DECODE
                    </button>

                </div>


                <div class="url-label">

                    OUTPUT

                </div>


                <textarea
                    id="url-output"
                    spellcheck="false"
                    readonly
                    placeholder="Result will appear here..."
                ></textarea>


                <div class="url-bottom">

                    <span
                        id="url-status"
                        class="url-status"
                    >
                        READY
                    </span>


                    <button
                        id="copy-url"
                        class="copy-url"
                    >
                        COPY
                    </button>

                </div>


            </div>

        </div>

    `;


    document.body.appendChild(
        modal
    );


    // Kapat

    document
        .getElementById(
            "close-url"
        )
        .addEventListener(
            "click",
            function () {

                modal.remove();

            }
        );


    // Encode

    document
        .getElementById(
            "encode-url"
        )
        .addEventListener(
            "click",
            encodeURL
        );


    // Decode

    document
        .getElementById(
            "decode-url"
        )
        .addEventListener(
            "click",
            decodeURL
        );


    // Copy

    document
        .getElementById(
            "copy-url"
        )
        .addEventListener(
            "click",
            copyURL
        );

}


// ========================================
// ENCODE URL
// ========================================

function encodeURL() {

    const input =
        document
            .getElementById(
                "url-input"
            )
            .value;


    if (!input) {

        setURLStatus(
            "INPUT EMPTY",
            true
        );

        return;

    }


    try {

        const encoded =
            encodeURIComponent(
                input
            );


        document
            .getElementById(
                "url-output"
            )
            .value =
                encoded;


        setURLStatus(
            "ENCODED ✓",
            false
        );

    }

    catch (error) {

        setURLStatus(
            "ENCODE ERROR",
            true
        );

    }

}


// ========================================
// DECODE URL
// ========================================

function decodeURL() {

    const input =
        document
            .getElementById(
                "url-input"
            )
            .value;


    if (!input) {

        setURLStatus(
            "INPUT EMPTY",
            true
        );

        return;

    }


    try {

        const decoded =
            decodeURIComponent(
                input
            );


        document
            .getElementById(
                "url-output"
            )
            .value =
                decoded;


        setURLStatus(
            "DECODED ✓",
            false
        );

    }

    catch (error) {

        document
            .getElementById(
                "url-output"
            )
            .value =
                "";


        setURLStatus(
            "INVALID URL ENCODING ✕",
            true
        );

    }

}


// ========================================
// STATUS
// ========================================

function setURLStatus(
    message,
    isError
) {

    const status =
        document
            .getElementById(
                "url-status"
            );


    status.textContent =
        message;


    status.classList.toggle(
        "error",
        isError
    );

}


// ========================================
// COPY
// ========================================

function copyURL() {

    const output =
        document
            .getElementById(
                "url-output"
            )
            .value;


    if (!output) {
        return;
    }


    navigator.clipboard
        .writeText(output)
        .then(
            function () {

                const button =
                    document
                        .getElementById(
                            "copy-url"
                        );


                button.textContent =
                    "COPIED ✓";


                setTimeout(
                    function () {

                        button.textContent =
                            "COPY";

                    },
                    1500
                );

            }
        );

}

// ========================================
// LOREM IPSUM GENERATOR
// ========================================

const loremCard =
    document.querySelector(".tool-card.yellow");

if (loremCard) {

    loremCard.addEventListener(
        "click",
        function () {

            openLoremTool();

        }
    );

}


// ========================================
// LOREM IPSUM PANEL
// ========================================

function openLoremTool() {

    if (
        document.getElementById(
            "lorem-modal"
        )
    ) {
        return;
    }


    const modal =
        document.createElement("div");

    modal.id =
        "lorem-modal";


    modal.innerHTML = `

        <div class="lorem-panel">

            <button
                class="close-lorem"
                id="close-lorem"
            >
                ×
            </button>


            <div class="lorem-title">

                &gt;_ LOREM IPSUM

            </div>


            <div class="lorem-content">


                <div class="lorem-options">


                    <div class="lorem-option">

                        <label>
                            PARAGRAPHS
                        </label>

                        <input
                            type="number"
                            id="lorem-paragraphs"
                            min="1"
                            max="20"
                            value="3"
                        >

                    </div>


                    <div class="lorem-option">

                        <label>
                            WORDS / PARAGRAPH
                        </label>

                        <input
                            type="number"
                            id="lorem-words"
                            min="5"
                            max="100"
                            value="30"
                        >

                    </div>

                </div>


                <div class="lorem-actions">

                    <button
                        id="generate-lorem"
                        class="generate-lorem"
                    >
                        &gt; GENERATE
                    </button>


                    <button
                        id="clear-lorem"
                        class="clear-lorem"
                    >
                        CLEAR
                    </button>

                </div>


                <div class="lorem-label">

                    OUTPUT

                </div>


                <textarea
                    id="lorem-output"
                    spellcheck="false"
                    readonly
                    placeholder="Generated text will appear here..."
                ></textarea>


                <div class="lorem-bottom">

                    <span
                        id="lorem-status"
                        class="lorem-status"
                    >
                        READY
                    </span>


                    <button
                        id="copy-lorem"
                        class="copy-lorem"
                    >
                        COPY
                    </button>

                </div>


            </div>

        </div>

    `;


    document.body.appendChild(
        modal
    );


    // Kapat

    document
        .getElementById(
            "close-lorem"
        )
        .addEventListener(
            "click",
            function () {

                modal.remove();

            }
        );


    // Generate

    document
        .getElementById(
            "generate-lorem"
        )
        .addEventListener(
            "click",
            generateLorem
        );


    // Clear

    document
        .getElementById(
            "clear-lorem"
        )
        .addEventListener(
            "click",
            function () {

                document
                    .getElementById(
                        "lorem-output"
                    )
                    .value = "";


                setLoremStatus(
                    "CLEARED",
                    false
                );

            }
        );


    // Copy

    document
        .getElementById(
            "copy-lorem"
        )
        .addEventListener(
            "click",
            copyLorem
        );


    // İlk metni oluştur

    generateLorem();

}


// ========================================
// LOREM WORD BANK
// ========================================

const loremWords = [

    "lorem",
    "ipsum",
    "dolor",
    "sit",
    "amet",
    "consectetur",
    "adipiscing",
    "elit",
    "integer",
    "nec",
    "odio",
    "praesent",
    "libero",
    "sed",
    "cursus",
    "ante",
    "dapibus",
    "diam",
    "sed",
    "nisi",
    "nulla",
    "quis",
    "sem",
    "at",
    "nibh",
    "elementum",
    "imperdiet",
    "duis",
    "sagittis",
    "ipsum",
    "praesent",
    "mauris",
    "fusce",
    "nec",
    "tellus",
    "sed",
    "augue",
    "semper",
    "porta",
    "mauris",
    "massa",
    "vestibulum",
    "lacinia",
    "arcu",
    "eget",
    "nulla",
    "class",
    "aptent",
    "taciti",
    "sociosqu",
    "ad",
    "litora",
    "torquent",
    "per",
    "conubia",
    "nostra",
    "inceptos",
    "himenaeos",
    "curabitur",
    "sodales",
    "ligula",
    "in",
    "libero",
    "sed",
    "dignissim",
    "lacinia",
    "nunc",
    "curabitur",
    "tortor",
    "pellentesque",
    "nibh",
    "aenean",
    "quam",
    "in",
    "scelerisque",
    "sem",
    "at",
    "dolor",
    "maecenas",
    "mattis",
    "sed",
    "convallis",
    "tristique",
    "semper",
    "proin",
    "ut",
    "ligula",
    "vel",
    "nunc",
    "egestas",
    "porttitor",
    "morbi",
    "lectus",
    "risus",
    "iaculis",
    "vel",
    "suscipit",
    "quis",
    "luctus",
    "non",
    "massa",
    "fusce",
    "ac",
    "turpis",
    "quis",
    "ligula",
    "lacinia",
    "aliquet",
    "mauris",
    "ipsum",
    "nulla",
    "metus",
    "metus",
    "ullamcorper",
    "vel",
    "tincidunt",
    "sed",
    "euismod",
    "nunc",
    "ac",
    "odio",
    "tincidunt",
    "tempor",
    "nullam",
    "sit",
    "amet",
    "erat",
    "sed",
    "fermentum",
    "feugiat",
    "felis",
    "imperdiet",
    "accumsan",
    "quam",
    "nunc",
    "commodo",
    "odio",
    "velit",
    "placerat",
    "vitae",
    "interdum",
    "sem",
    "pretium",
    "eget",
    "porttitor",
    "odio",
    "nunc",
    "id",
    "tellus",
    "integer",
    "vel",
    "nibh",
    "sit",
    "amet",
    "quam",
    "egestas",
    "placerat",
    "maecenas",
    "blandit",
    "lectus",
    "a",
    "hendrerit",
    "urna",
    "diam",
    "sollicitudin",
    "nibh",
    "eget",
    "lorem",
    "integer",
    "laoreet",
    "massa",
    "vitae",
    "sagittis",
    "finibus",
    "nunc",
    "erat",
    "ultricies",
    "nisi",
    "nec",
    "viverra",
    "massa",
    "nulla",
    "sed",
    "efficitur",
    "vel",
    "eros",
    "donec",
    "vel",
    "nisl",
    "ut",
    "sapien",
    "rhoncus",
    "finibus",
    "et",
    "quis",
    "turpis",
    "vestibulum",
    "ante",
    "ipsum",
    "primis",
    "in",
    "faucibus",
    "orci",
    "luctus",
    "et",
    "ultrices",
    "posuere",
    "cubilia",
    "curae",
    "donec",
    "vel",
    "semper",
    "augue",
    "nam",
    "eget",
    "ligula",
    "vitae",
    "magna",
    "mollis",
    "maximus",
    "aliquam",
    "erat",
    "volutpat",
    "etiam",
    "ultrices",
    "eros",
    "quis",
    "urna",
    "vestibulum",
    "nec",
    "tempor",
    "leo",
    "aliquam",
    "erat",
    "volutpat",
    "nam",
    "sit",
    "amet",
    "sem",
    "vitae",
    "massa",
    "efficitur",
    "fringilla",
    "nunc",
    "aliquet",
    "metus",
    "quis",
    "semper",
    "feugiat",
    "orci",
    "velit",
    "congue",
    "turpis",
    "dui",
    "id",
    "nisl",
    "vestibulum",
    "auctor",
    "urna",
    "vel",
    "condimentum",
    "massa",
    "malesuada",
    "sed",
    "pretium",
    "magna",
    "aliquam",
    "erat",
    "volutpat",
    "duis",
    "laoreet",
    "tellus",
    "ut",
    "turpis",
    "vulputate",
    "blandit",
    "donec",
    "viverra",
    "sapien",
    "sed",
    "arcu",
    "ultrices",
    "facilisis",
    "integer",
    "quis",
    "augue",
    "non",
    "diam",
    "condimentum",
    "convallis",
    "mauris",
    "aenean",
    "eu",
    "justo",
    "vitae",
    "urna",
    "ultricies",
    "tincidunt",
    "nullam",
    "quis",
    "nunc",
    "aliquet",
    "blandit",
    "mi",
    "quis",
    "consectetur",
    "turpis",
    "integer",
    "finibus",
    "malesuada",
    "odio",
    "vel",
    "faucibus",
    "sem",
    "nunc",
    "interdum",
    "diam",
    "vitae",
    "sollicitudin",
    "nisl",
    "porttitor",
    "aenean",
    "facilisis",
    "nibh",
    "vitae",
    "consequat",
    "nunc",
    "ultrices",
    "ligula",
    "vel",
    "justo",
    "finibus",
    "accumsan",
    "vivamus",
    "pretium",
    "ipsum",
    "vitae",
    "nibh",
    "porttitor",
    "aliquam",
    "erat",
    "volutpat",
    "cras",
    "eu",
    "lorem",
    "quis",
    "metus",
    "malesuada",
    "condimentum",
    "nunc",
    "aliquam",
    "diam",
    "eget",
    "metus",
    "ullamcorper",
    "ultricies",
    "nibh",
    "sed",
    "faucibus",
    "turpis",
    "vitae",
    "arcu",
    "consectetur",
    "hendrerit",
    "ipsum",
    "nunc",
    "fermentum",
    "lacus",
    "vel",
    "ultricies",
    "justo",
    "dictum",
    "integer",
    "mattis",
    "nibh",
    "vitae",
    "nunc",
    "auctor",
    "ultricies",
    "semper",
    "nam",
    "efficitur",
    "turpis",
    "quis",
    "lectus",
    "malesuada",
    "aliquet",
    "vivamus",
    "nunc",
    "justo",
    "volutpat",
    "quis",
    "erat",
    "sodales",
    "aliquam",
    "nunc",
    "massa",
    "ullamcorper",
    "vel",
    "viverra",
    "sed",
    "nibh",
    "praesent",
    "tempor",
    "urna",
    "vel",
    "tincidunt",
    "fermentum",
    "mauris",
    "eget",
    "eros",
    "vestibulum",
    "ante",
    "ipsum",
    "primis",
    "in",
    "faucibus",
    "orci",
    "luctus",
    "et",
    "ultrices",
    "posuere",
    "cubilia",
    "curae"
];


// ========================================
// GENERATE LOREM
// ========================================

function generateLorem() {

    const paragraphCount =
        Math.min(
            Math.max(
                Number(
                    document
                        .getElementById(
                            "lorem-paragraphs"
                        )
                        .value
                ),
                1
            ),
            20
        );


    const wordsPerParagraph =
        Math.min(
            Math.max(
                Number(
                    document
                        .getElementById(
                            "lorem-words"
                        )
                        .value
                ),
                5
            ),
            100
        );


    const paragraphs = [];


    for (
        let p = 0;
        p < paragraphCount;
        p++
    ) {

        const words = [];


        for (
            let i = 0;
            i < wordsPerParagraph;
            i++
        ) {

            const randomIndex =
                Math.floor(
                    Math.random() *
                    loremWords.length
                );


            words.push(
                loremWords[randomIndex]
            );

        }


        let paragraph =
            words.join(" ");


        paragraph =
            paragraph.charAt(0)
                .toUpperCase() +
            paragraph.slice(1);


        paragraph += ".";


        paragraphs.push(
            paragraph
        );

    }


    document
        .getElementById(
            "lorem-output"
        )
        .value =
            paragraphs.join("\n\n");


    setLoremStatus(
        "GENERATED ✓",
        false
    );

}


// ========================================
// STATUS
// ========================================

function setLoremStatus(
    message,
    isError
) {

    const status =
        document
            .getElementById(
                "lorem-status"
            );


    status.textContent =
        message;


    status.classList.toggle(
        "error",
        isError
    );

}


// ========================================
// COPY
// ========================================

function copyLorem() {

    const output =
        document
            .getElementById(
                "lorem-output"
            )
            .value;


    if (!output) {
        return;
    }


    navigator.clipboard
        .writeText(output)
        .then(
            function () {

                const button =
                    document
                        .getElementById(
                            "copy-lorem"
                        );


                button.textContent =
                    "COPIED ✓";


                setTimeout(
                    function () {

                        button.textContent =
                            "COPY";

                    },
                    1500
                );

            }
        );

}

// ========================================
// TIMESTAMP CONVERTER
// ========================================

const timestampCard =
    document.querySelector(".tool-card.teal");

if (timestampCard) {

    timestampCard.addEventListener(
        "click",
        function () {

            openTimestampTool();

        }
    );

}


// ========================================
// TIMESTAMP PANEL
// ========================================

function openTimestampTool() {

    if (
        document.getElementById(
            "timestamp-modal"
        )
    ) {
        return;
    }


    const modal =
        document.createElement("div");

    modal.id =
        "timestamp-modal";


    modal.innerHTML = `

        <div class="timestamp-panel">

            <button
                class="close-timestamp"
                id="close-timestamp"
            >
                ×
            </button>


            <div class="timestamp-title">

                &gt;_ TIMESTAMP CONVERTER

            </div>


            <div class="timestamp-content">


                <!-- UNIX → DATE -->

                <div class="timestamp-section">

                    <div class="timestamp-label">

                        UNIX TIMESTAMP → DATE

                    </div>


                    <input
                        type="number"
                        id="timestamp-input"
                        placeholder="Example: 1786427342"
                    >


                    <button
                        id="convert-timestamp"
                        class="convert-timestamp"
                    >
                        &gt; CONVERT
                    </button>


                    <div
                        id="timestamp-date-result"
                        class="timestamp-result"
                    >
                        RESULT WILL APPEAR HERE
                    </div>

                </div>


                <!-- DATE → UNIX -->

                <div class="timestamp-section">

                    <div class="timestamp-label">

                        DATE → UNIX TIMESTAMP

                    </div>


                    <input
                        type="datetime-local"
                        id="date-input"
                    >


                    <button
                        id="convert-date"
                        class="convert-date"
                    >
                        &gt; CONVERT
                    </button>


                    <div
                        id="date-timestamp-result"
                        class="timestamp-result"
                    >
                        RESULT WILL APPEAR HERE
                    </div>

                </div>


                <!-- CURRENT TIME -->

                <div class="timestamp-section current-time">

                    <div class="timestamp-label">

                        CURRENT TIME

                    </div>


                    <div
                        id="current-timestamp"
                        class="current-timestamp"
                    >
                        ---
                    </div>


                    <button
                        id="copy-current-timestamp"
                        class="copy-current-timestamp"
                    >
                        COPY TIMESTAMP
                    </button>

                </div>


            </div>

        </div>

    `;


    document.body.appendChild(
        modal
    );


    // Kapat

    document
        .getElementById(
            "close-timestamp"
        )
        .addEventListener(
            "click",
            function () {

                modal.remove();

            }
        );


    // Unix → Date

    document
        .getElementById(
            "convert-timestamp"
        )
        .addEventListener(
            "click",
            convertTimestamp
        );


    // Date → Unix

    document
        .getElementById(
            "convert-date"
        )
        .addEventListener(
            "click",
            convertDateToTimestamp
        );


    // Şu anki zaman

    updateCurrentTimestamp();


    // Copy

    document
        .getElementById(
            "copy-current-timestamp"
        )
        .addEventListener(
            "click",
            copyCurrentTimestamp
        );


    // Tarih alanını şu anki zamana ayarla

    const now =
        new Date();


    const localDate =
        new Date(
            now.getTime() -
            now.getTimezoneOffset() * 60000
        )
            .toISOString()
            .slice(0, 16);


    document
        .getElementById(
            "date-input"
        )
        .value =
            localDate;

}


// ========================================
// UNIX → DATE
// ========================================

function convertTimestamp() {

    const input =
        document
            .getElementById(
                "timestamp-input"
            )
            .value
            .trim();


    if (!input) {

        document
            .getElementById(
                "timestamp-date-result"
            )
            .textContent =
                "PLEASE ENTER A TIMESTAMP";

        return;

    }


    const timestamp =
        Number(input);


    if (
        !Number.isFinite(timestamp)
    ) {

        document
            .getElementById(
                "timestamp-date-result"
            )
            .textContent =
                "INVALID TIMESTAMP";

        return;

    }


    /*
     * Unix timestamp saniye
     * cinsindendir.
     *
     * JavaScript Date ise
     * milisaniye kullanır.
     */

    const date =
        new Date(
            timestamp * 1000
        );


    if (
        Number.isNaN(
            date.getTime()
        )
    ) {

        document
            .getElementById(
                "timestamp-date-result"
            )
            .textContent =
                "INVALID DATE";

        return;

    }


    document
        .getElementById(
            "timestamp-date-result"
        )
        .textContent =
            formatDate(date);

}


// ========================================
// DATE → UNIX
// ========================================

function convertDateToTimestamp() {

    const input =
        document
            .getElementById(
                "date-input"
            )
            .value;


    if (!input) {

        document
            .getElementById(
                "date-timestamp-result"
            )
            .textContent =
                "PLEASE SELECT A DATE";

        return;

    }


    const date =
        new Date(input);


    const timestamp =
        Math.floor(
            date.getTime() / 1000
        );


    document
        .getElementById(
            "date-timestamp-result"
        )
        .textContent =
            timestamp;

}


// ========================================
// FORMAT DATE
// ========================================

function formatDate(date) {

    const year =
        date.getFullYear();


    const month =
        String(
            date.getMonth() + 1
        ).padStart(2, "0");


    const day =
        String(
            date.getDate()
        ).padStart(2, "0");


    const hours =
        String(
            date.getHours()
        ).padStart(2, "0");


    const minutes =
        String(
            date.getMinutes()
        ).padStart(2, "0");


    const seconds =
        String(
            date.getSeconds()
        ).padStart(2, "0");


    return (
        `${year}-${month}-${day} ` +
        `${hours}:${minutes}:${seconds}`
    );

}


// ========================================
// CURRENT TIMESTAMP
// ========================================

function updateCurrentTimestamp() {

    const timestamp =
        Math.floor(
            Date.now() / 1000
        );


    const element =
        document
            .getElementById(
                "current-timestamp"
            );


    if (element) {

        element.textContent =
            timestamp;

    }

}


// ========================================
// COPY CURRENT TIMESTAMP
// ========================================

function copyCurrentTimestamp() {

    const timestamp =
        document
            .getElementById(
                "current-timestamp"
            )
            .textContent;


    navigator.clipboard
        .writeText(timestamp)
        .then(
            function () {

                const button =
                    document
                        .getElementById(
                            "copy-current-timestamp"
                        );


                button.textContent =
                    "COPIED ✓";


                setTimeout(
                    function () {

                        button.textContent =
                            "COPY TIMESTAMP";

                    },
                    1500
                );

            }
        );

}

// ========================================
// TOOL SEARCH + CATEGORY FILTER
// ========================================

const toolSearch =
    document.getElementById(
        "tool-search"
    );


const clearSearch =
    document.getElementById(
        "clear-search"
    );


const searchResultInfo =
    document.getElementById(
        "search-result-info"
    );


const toolCards =
    document.querySelectorAll(
        ".tool-card"
    );


const categoryButtons =
    document.querySelectorAll(
        ".category-btn"
    );


let activeCategory = "all";


// ========================================
// FILTER TOOLS
// ========================================

function filterTools() {

    const query =
        toolSearch
            ? toolSearch.value
                .trim()
                .toLowerCase()
            : "";


    let visibleTools = 0;


    toolCards.forEach(
        function (card) {

            const cardText =
                card.textContent
                    .toLowerCase();


            const cardCategory =
                card.dataset.category ||
                "utility";


            const matchesSearch =
                query === "" ||
                cardText.includes(query);


            const matchesCategory =
                activeCategory === "all" ||
                cardCategory === activeCategory;


            if (
                matchesSearch &&
                matchesCategory
            ) {

                card.classList.remove(
                    "search-hidden"
                );


                card.classList.add(
                    "search-match"
                );


                visibleTools++;

            }

            else {

                card.classList.remove(
                    "search-match"
                );


                card.classList.add(
                    "search-hidden"
                );

            }

        }
    );


    updateSearchInfo(
        visibleTools,
        query
    );


    updateClearButton(
        query
    );

}


// ========================================
// SEARCH RESULT INFO
// ========================================

function updateSearchInfo(
    count,
    query
) {

    if (count === 0) {

        searchResultInfo.textContent =
            "NO TOOLS FOUND";

        return;

    }


    if (query !== "") {

        searchResultInfo.textContent =
            count === 1
                ? "1 TOOL FOUND"
                : `${count} TOOLS FOUND`;

        return;

    }


    searchResultInfo.textContent =
        count === 1
            ? "1 TOOL AVAILABLE"
            : `${count} TOOLS AVAILABLE`;

}


// ========================================
// CLEAR SEARCH
// ========================================

function updateClearButton(
    query
) {

    if (!clearSearch) {
        return;
    }


    clearSearch.style.display =
        query !== ""
            ? "block"
            : "none";

}


// ========================================
// SEARCH INPUT
// ========================================

if (toolSearch) {

    toolSearch.addEventListener(
        "input",
        filterTools
    );

}


// ========================================
// CLEAR SEARCH
// ========================================

if (clearSearch) {

    clearSearch.addEventListener(
        "click",
        function () {

            toolSearch.value = "";

            filterTools();

            toolSearch.focus();

        }
    );

}


// ========================================
// ESC KEY
// ========================================

if (toolSearch) {

    toolSearch.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape"
            ) {

                toolSearch.value = "";

                filterTools();

            }

        }
    );

}


// ========================================
// CATEGORY BUTTONS
// ========================================

categoryButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                activeCategory =
                    button.dataset.category;


                categoryButtons.forEach(
                    function (btn) {

                        btn.classList.remove(
                            "active"
                        );

                    }
                );


                button.classList.add(
                    "active"
                );


                filterTools();

            }
        );

    }
);


// ========================================
// INITIAL STATE
// ========================================

filterTools();

// ========================================
// ⭐ FAVORITES SYSTEM
// ========================================

const FAVORITES_KEY = "techtoolbox_favorites";

function getFavorites() {
    try {
        return JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
    } catch {
        return [];
    }
}

function saveFavorites(favorites) {
    localStorage.setItem(
        FAVORITES_KEY,
        JSON.stringify(favorites)
    );
}

function getToolName(card) {
    const title = card.querySelector(
        ".tool-name, .tool-title, h3, h4"
    );

    if (title) {
        return title.textContent.trim();
    }

    return card.textContent
        .trim()
        .replace(/\s+/g, " ")
        .substring(0, 80);
}

function updateFavoriteButton(button, isFavorite) {
    button.textContent = isFavorite ? "★" : "☆";

    button.classList.toggle(
        "favorite-active",
        isFavorite
    );

    button.title = isFavorite
        ? "Remove from favorites"
        : "Add to favorites";
}

function setupFavorites() {
    const cards = document.querySelectorAll(".tool-card");

    let favorites = getFavorites();

    cards.forEach((card) => {

        if (card.querySelector(".favorite-button")) {
            return;
        }

        const toolName = getToolName(card);

        const favoriteButton =
            document.createElement("button");

        favoriteButton.className =
            "favorite-button";

        favoriteButton.type = "button";

        updateFavoriteButton(
            favoriteButton,
            favorites.includes(toolName)
        );

        favoriteButton.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();

                favorites = getFavorites();

                const index =
                    favorites.indexOf(toolName);

                if (index === -1) {
                    favorites.push(toolName);
                } else {
                    favorites.splice(index, 1);
                }

                saveFavorites(favorites);

                updateFavoriteButton(
                    favoriteButton,
                    favorites.includes(toolName)
                );

                if (
                    window.currentCategory ===
                    "favorites"
                ) {
                    filterFavorites();
                }
            }
        );

        card.style.position = "relative";

        card.appendChild(favoriteButton);
    });
}


// ========================================
// ⭐ FAVORITES FILTER
// ========================================

function filterFavorites() {

    const cards =
        document.querySelectorAll(".tool-card");

    const favorites = getFavorites();

    cards.forEach((card) => {

        const toolName =
            getToolName(card);

        if (favorites.includes(toolName)) {
            card.style.display = "";
        } else {
            card.style.display = "none";
        }
    });

    updateSearchInfo(
        favorites.length,
        "FAVORITES"
    );
}


// ========================================
// ⭐ FAVORITES CATEGORY BUTTON
// ========================================

function createFavoritesButton() {

    const categoryButtons =
        document.querySelectorAll(
            ".category-btn"
        );

    if (!categoryButtons.length) {
        console.warn(
            "Category buttons not found."
        );
        return;
    }

    if (
        document.querySelector(
            ".favorites-category"
        )
    ) {
        return;
    }

    const container =
        categoryButtons[0].parentElement;

    const button =
        document.createElement("button");

    button.className =
        "category-btn favorites-category";

    button.type = "button";

    button.dataset.category =
        "favorites";

    button.textContent =
        "★ FAVORITES";

    button.addEventListener(
        "click",
        function () {

            window.currentCategory =
                "favorites";

            document
                .querySelectorAll(
                    ".category-btn"
                )
                .forEach(function (btn) {

                    btn.classList.remove(
                        "active"
                    );

                });

            button.classList.add(
                "active"
            );

            filterFavorites();
        }
    );

    container.appendChild(button);
}


// ========================================
// INITIALIZE FAVORITES
// ========================================

window.currentCategory = "all";

setupFavorites();

createFavoritesButton();

// ============================================================
// NUMBER BASE CONVERTER
// ============================================================

const numberBaseTool = document.querySelector(
    '[data-tool="number-base"]'
);

const numberBaseModal = document.getElementById(
    "number-base-modal"
);

const baseInput = document.getElementById(
    "base-input"
);

const baseInputType = document.getElementById(
    "base-input-type"
);

const convertBaseButton = document.getElementById(
    "convert-base"
);

const baseError = document.getElementById(
    "base-error"
);

const resultBinary = document.getElementById(
    "result-binary"
);

const resultOctal = document.getElementById(
    "result-octal"
);

const resultDecimal = document.getElementById(
    "result-decimal"
);

const resultHex = document.getElementById(
    "result-hex"
);


// OPEN MODAL
if (numberBaseTool && numberBaseModal) {

    numberBaseTool.addEventListener(
        "click",
        function () {

            numberBaseModal.classList.add("active");

            setTimeout(() => {
                baseInput.focus();
            }, 100);

        }
    );

}


// CLOSE MODAL
const numberBaseClose =
    document.querySelector(
        '[data-close="number-base-modal"]'
    );

if (numberBaseClose) {

    numberBaseClose.addEventListener(
        "click",
        function () {

            numberBaseModal.classList.remove(
                "active"
            );

        }
    );

}


// CONVERT
if (convertBaseButton) {

    convertBaseButton.addEventListener(
        "click",
        function () {

            const value =
                baseInput.value.trim();

            const inputBase =
                Number(baseInputType.value);

            baseError.textContent = "";

            if (!value) {

                baseError.textContent =
                    "⚠ ENTER A VALUE";

                return;
            }


            try {

                const decimal =
                    parseInt(value, inputBase);


                if (isNaN(decimal)) {

                    throw new Error(
                        "Invalid number"
                    );

                }


                resultBinary.textContent =
                    decimal.toString(2);

                resultOctal.textContent =
                    decimal.toString(8);

                resultDecimal.textContent =
                    decimal.toString(10);

                resultHex.textContent =
                    decimal.toString(16)
                        .toUpperCase();


            } catch (error) {

                resultBinary.textContent = "-";
                resultOctal.textContent = "-";
                resultDecimal.textContent = "-";
                resultHex.textContent = "-";

                baseError.textContent =
                    "⚠ INVALID VALUE FOR SELECTED BASE";

            }

        }
    );

}


// ENTER KEY
if (baseInput) {

    baseInput.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Enter") {

                convertBaseButton.click();

            }

            if (event.key === "Escape") {

                numberBaseModal.classList.remove(
                    "active"
                );

            }

        }
    );

}

// ============================================================
// NUMBER BASE CONVERTER - CLICK FIX
// ============================================================

document.addEventListener("click", function (event) {

    const tool = event.target.closest(
        '[data-tool="number-base"]'
    );

    if (tool) {

        const modal = document.getElementById(
            "number-base-modal"
        );

        if (modal) {

            modal.classList.add("active");

            const input = document.getElementById(
                "base-input"
            );

            if (input) {
                setTimeout(() => {
                    input.focus();
                }, 100);
            }

        }

    }

});


// ============================================================
// NUMBER BASE CONVERTER - CLOSE FIX
// ============================================================

document.addEventListener("click", function (event) {

    const closeButton = event.target.closest(
        '[data-close="number-base-modal"]'
    );

    if (closeButton) {

        const modal = document.getElementById(
            "number-base-modal"
        );

        if (modal) {
            modal.classList.remove("active");
        }

    }

});

// ============================================================
// HASH GENERATOR
// ============================================================

document.addEventListener("click", function (event) {

    const tool = event.target.closest(
        '[data-tool="hash-generator"]'
    );

    if (!tool) return;

    const modal = document.getElementById(
        "hash-generator-modal"
    );

    if (modal) {

        modal.classList.add("active");

        const input = document.getElementById(
            "hash-input"
        );

        if (input) {

            setTimeout(() => {
                input.focus();
            }, 100);

        }

    }

});


// ============================================================
// HASH GENERATOR CLOSE
// ============================================================

document.addEventListener("click", function (event) {

    const closeButton = event.target.closest(
        '[data-close="hash-generator-modal"]'
    );

    if (!closeButton) return;

    const modal = document.getElementById(
        "hash-generator-modal"
    );

    if (modal) {
        modal.classList.remove("active");
    }

});


// ============================================================
// HASH FUNCTIONS
// ============================================================

async function generateHash(
    text,
    algorithm
) {

    const encoder =
        new TextEncoder();

    const data =
        encoder.encode(text);

    const hashBuffer =
        await crypto.subtle.digest(
            algorithm,
            data
        );

    const hashArray =
        Array.from(
            new Uint8Array(hashBuffer)
        );

    return hashArray
        .map(
            byte =>
                byte
                    .toString(16)
                    .padStart(2, "0")
        )
        .join("");

}


// ============================================================
// GENERATE HASHES
// ============================================================

const generateHashButton =
    document.getElementById(
        "generate-hash"
    );


if (generateHashButton) {

    generateHashButton.addEventListener(
        "click",
        async function () {

            const input =
                document.getElementById(
                    "hash-input"
                );

            const text =
                input.value;


            if (!text) {

                document.getElementById(
                    "hash-md5"
                ).textContent = "ENTER TEXT";

                return;

            }


            // SHA-1
            const sha1 =
                await generateHash(
                    text,
                    "SHA-1"
                );


            // SHA-256
            const sha256 =
                await generateHash(
                    text,
                    "SHA-256"
                );


            // SHA-512
            const sha512 =
                await generateHash(
                    text,
                    "SHA-512"
                );


            document.getElementById(
                "hash-sha1"
            ).textContent = sha1;


            document.getElementById(
                "hash-sha256"
            ).textContent = sha256;


            document.getElementById(
                "hash-sha512"
            ).textContent = sha512;


            /*
             * MD5 is intentionally handled separately.
             *
             * Browser Web Crypto API does NOT support MD5.
             *
             * We will add a local MD5 implementation
             * in the next patch.
             */

            document.getElementById(
                "hash-md5"
            ).textContent =
                "MD5 MODULE";

        }
    );

}


// ============================================================
// COPY HASH
// ============================================================

document.addEventListener(
    "click",
    async function (event) {

        const button =
            event.target.closest(
                ".hash-copy"
            );

        if (!button) return;


        const targetId =
            button.dataset.copy;

        const target =
            document.getElementById(
                targetId
            );


        if (
            !target ||
            target.textContent === "-"
        ) {
            return;
        }


        try {

            await navigator.clipboard.writeText(
                target.textContent
            );

            const oldText =
                button.textContent;

            button.textContent =
                "COPIED ✓";


            setTimeout(() => {

                button.textContent =
                    oldText;

            }, 1200);


        } catch (error) {

            console.error(
                "Copy failed:",
                error
            );

        }

    }
);

// =====================================================
// JWT DECODER
// =====================================================

const jwtCard = document.querySelector(
    '[data-tool="jwt-decoder"]'
);

const jwtModal = document.getElementById(
    "jwt-decoder-modal"
);

const jwtClose = document.getElementById(
    "jwt-close"
);

const jwtInput = document.getElementById(
    "jwt-input"
);

const jwtDecodeButton = document.getElementById(
    "jwt-decode"
);

const jwtHeader = document.getElementById(
    "jwt-header"
);

const jwtPayload = document.getElementById(
    "jwt-payload"
);

const jwtSignature = document.getElementById(
    "jwt-signature"
);


// -----------------------------------------------------
// OPEN MODAL
// -----------------------------------------------------

if (jwtCard && jwtModal) {

    jwtCard.addEventListener(
        "click",
        function () {

            jwtModal.classList.add("active");

        }
    );

}


// -----------------------------------------------------
// CLOSE MODAL
// -----------------------------------------------------

if (jwtClose && jwtModal) {

    jwtClose.addEventListener(
        "click",
        function () {

            jwtModal.classList.remove("active");

        }
    );

}


// -----------------------------------------------------
// BASE64URL DECODER
// -----------------------------------------------------

function decodeJWTPart(part) {

    try {

        let base64 = part
            .replace(/-/g, "+")
            .replace(/_/g, "/");

        while (base64.length % 4) {

            base64 += "=";

        }

        const decoded = atob(base64);

        const bytes = Uint8Array.from(
            decoded,
            char => char.charCodeAt(0)
        );

        const text = new TextDecoder().decode(bytes);

        return JSON.parse(text);

    } catch (error) {

        return null;

    }

}


// -----------------------------------------------------
// DECODE JWT
// -----------------------------------------------------

if (jwtDecodeButton) {

    jwtDecodeButton.addEventListener(
        "click",
        function () {

            const token = jwtInput.value.trim();

            jwtHeader.value = "";
            jwtPayload.value = "";
            jwtSignature.value = "";

            if (!token) {

                alert("Please enter a JWT token.");

                return;

            }


            const parts = token.split(".");

            if (parts.length !== 3) {

                alert(
                    "Invalid JWT format.\n\nExpected:\nHEADER.PAYLOAD.SIGNATURE"
                );

                return;

            }


            const header = decodeJWTPart(parts[0]);

            const payload = decodeJWTPart(parts[1]);


            if (!header || !payload) {

                alert(
                    "JWT could not be decoded."
                );

                return;

            }


            jwtHeader.value =
                JSON.stringify(
                    header,
                    null,
                    4
                );


            jwtPayload.value =
                JSON.stringify(
                    payload,
                    null,
                    4
                );


            jwtSignature.value =
                parts[2];


        }
    );

}


// =====================================================
// JWT ENCODER
// =====================================================

const jwtEncodeButton =
    document.getElementById("jwt-encode");

const jwtEncodeHeader =
    document.getElementById("jwt-encode-header");

const jwtEncodePayload =
    document.getElementById("jwt-encode-payload");

const jwtSecret =
    document.getElementById("jwt-secret");

const jwtEncodedOutput =
    document.getElementById("jwt-encoded-output");

const jwtCopyButton =
    document.getElementById("jwt-copy");


// =====================================================
// BASE64URL ENCODER
// =====================================================

function encodeBase64URL(text) {

    const bytes =
        new TextEncoder().encode(text);

    let binary = "";

    bytes.forEach(function (byte) {

        binary += String.fromCharCode(byte);

    });

    return btoa(binary)
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/g, "");

}


// =====================================================
// HMAC SHA-256 SIGNATURE
// =====================================================

async function createJWTSignature(
    data,
    secret
) {

    const encoder =
        new TextEncoder();

    const keyData =
        encoder.encode(secret);

    const cryptoKey =
        await crypto.subtle.importKey(
            "raw",
            keyData,
            {
                name: "HMAC",
                hash: "SHA-256"
            },
            false,
            ["sign"]
        );

    const signature =
        await crypto.subtle.sign(
            "HMAC",
            cryptoKey,
            encoder.encode(data)
        );

    const bytes =
        new Uint8Array(signature);

    let binary = "";

    bytes.forEach(function (byte) {

        binary += String.fromCharCode(byte);

    });

    return btoa(binary)
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/g, "");

}


// =====================================================
// ENCODE JWT
// =====================================================

if (jwtEncodeButton) {

    jwtEncodeButton.addEventListener(
        "click",
        async function () {

            try {

                const headerText =
                    jwtEncodeHeader.value.trim();

                const payloadText =
                    jwtEncodePayload.value.trim();

                const secret =
                    jwtSecret.value;


                if (!headerText) {

                    alert("HEADER JSON is empty.");

                    return;

                }


                if (!payloadText) {

                    alert("PAYLOAD JSON is empty.");

                    return;

                }


                if (!secret) {

                    alert("SECRET KEY is empty.");

                    return;

                }


                // JSON kontrolü

                const header =
                    JSON.parse(headerText);

                const payload =
                    JSON.parse(payloadText);


                // Algoritmayı zorunlu olarak HS256 yapıyoruz

                header.alg = "HS256";

                header.typ =
                    header.typ || "JWT";


                // JSON → Base64URL

                const encodedHeader =
                    encodeBase64URL(
                        JSON.stringify(header)
                    );


                const encodedPayload =
                    encodeBase64URL(
                        JSON.stringify(payload)
                    );


                // Header.Payload

                const unsignedToken =
                    encodedHeader +
                    "." +
                    encodedPayload;


                // HMAC-SHA256

                const signature =
                    await createJWTSignature(
                        unsignedToken,
                        secret
                    );


                // Final JWT

                const token =
                    unsignedToken +
                    "." +
                    signature;


                jwtEncodedOutput.value =
                    token;


            }

            catch (error) {

                alert(
                    "Invalid JSON.\n\n" +
                    "Please check your Header and Payload."
                );

                console.error(
                    "JWT Encode Error:",
                    error
                );

            }

        }
    );

}


// =====================================================
// COPY GENERATED JWT
// =====================================================

if (jwtCopyButton) {

    jwtCopyButton.addEventListener(
        "click",
        async function () {

            const token =
                jwtEncodedOutput.value.trim();


            if (!token) {

                return;

            }


            try {

                await navigator.clipboard.writeText(
                    token
                );


                const oldText =
                    jwtCopyButton.textContent;


                jwtCopyButton.textContent =
                    "COPIED ✓";


                setTimeout(function () {

                    jwtCopyButton.textContent =
                        oldText;

                }, 1500);


            }

            catch (error) {

                console.error(
                    "JWT copy failed:",
                    error
                );

            }

        }
    );

}

// =====================================================
// REGEX TESTER
// =====================================================

const regexCard =
    document.querySelector(
        '[data-tool="regex-tester"]'
    );

const regexModal =
    document.getElementById(
        "regex-tester-modal"
    );

const regexClose =
    document.getElementById(
        "regex-close"
    );

const regexPattern =
    document.getElementById(
        "regex-pattern"
    );

const regexText =
    document.getElementById(
        "regex-test-text"
    );

const regexFlags =
    document.getElementById(
        "regex-flags"
    );

const regexTestButton =
    document.getElementById(
        "regex-test"
    );

const regexStatus =
    document.getElementById(
        "regex-status"
    );

const regexResults =
    document.getElementById(
        "regex-results"
    );


// =====================================================
// OPEN
// =====================================================

if (regexCard && regexModal) {

    regexCard.addEventListener(
        "click",
        function () {

            regexModal.classList.add(
                "active"
            );

            setTimeout(
                function () {

                    regexPattern.focus();

                },
                100
            );

        }
    );

}


// =====================================================
// CLOSE
// =====================================================

if (regexClose && regexModal) {

    regexClose.addEventListener(
        "click",
        function () {

            regexModal.classList.remove(
                "active"
            );

        }
    );

}


// =====================================================
// TEST REGEX
// =====================================================

if (regexTestButton) {

    regexTestButton.addEventListener(
        "click",
        function () {

            const pattern =
                regexPattern.value;

            const text =
                regexText.value;

            const flags =
                regexFlags.value;


            regexResults.value = "";


            if (!pattern) {

                regexStatus.textContent =
                    "REGEX EMPTY";

                regexStatus.classList.add(
                    "error"
                );

                return;

            }


            if (!text) {

                regexStatus.textContent =
                    "TEST TEXT EMPTY";

                regexStatus.classList.add(
                    "error"
                );

                return;

            }


            try {

                const regex =
                    new RegExp(
                        pattern,
                        flags
                    );


                const matches =
                    text.match(regex);


                if (!matches) {

                    regexStatus.textContent =
                        "NO MATCH ✕";

                    regexStatus.classList.add(
                        "error"
                    );

                    regexResults.value =
                        "No matches found.";

                    return;

                }


                regexStatus.classList.remove(
                    "error"
                );


                regexStatus.textContent =
                    `${matches.length} MATCH${matches.length === 1 ? "" : "ES"} ✓`;


                regexResults.value =
                    matches
                        .map(
                            function (
                                match,
                                index
                            ) {

                                return (
                                    `${index + 1}. ${match}`
                                );

                            }
                        )
                        .join("\n");


            }

            catch (error) {

                regexStatus.textContent =
                    "INVALID REGEX ✕";

                regexStatus.classList.add(
                    "error"
                );

                regexResults.value =
                    error.message;

            }

        }
    );

}



/* =========================================
   TOOLBOX MODE SELECTOR
   ========================================= */

(function () {

    const dailyModeButton = document.getElementById("daily-mode");
    const developerModeButton = document.getElementById("developer-mode");
    const backToModesButton = document.getElementById("back-to-modes");

    const toolCards = document.querySelectorAll(".tool-card");

    if (
        !dailyModeButton ||
        !developerModeButton ||
        !backToModesButton
    ) {
        return;
    }


    function showMode(mode) {

        document.body.classList.add("toolbox-mode-active");

        toolCards.forEach(function (card) {

            const cardMode = card.getAttribute("data-mode");

            if (cardMode === mode) {
                card.hidden = false;
            } else {
                card.hidden = true;
            }

        });

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }


    function showMainMenu() {

        document.body.classList.remove("toolbox-mode-active");

        toolCards.forEach(function (card) {
            card.hidden = false;
        });

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }


    dailyModeButton.addEventListener("click", function () {
        showMode("daily");
    });


    developerModeButton.addEventListener("click", function () {
        showMode("developer");
    });


    backToModesButton.addEventListener("click", function () {
        showMainMenu();
    });


})();


/* =========================================
   QR CODE GENERATOR
   ========================================= */

(function () {

    const qrToolCard = document.querySelector(
        '[data-tool="qr-generator"]'
    );

    const qrGeneratorModal = document.getElementById(
        "qr-generator-modal"
    );

    const qrCloseButton = document.getElementById(
        "qr-close"
    );

    const qrInput = document.getElementById(
        "qr-input"
    );

    const qrGenerateButton = document.getElementById(
        "qr-generate"
    );

    const qrOutput = document.getElementById(
        "qr-output"
    );

    const qrStatus = document.getElementById(
        "qr-status"
    );

    const qrDownloadButton = document.getElementById(
        "qr-download"
    );

    const qrClearButton = document.getElementById(
        "qr-clear"
    );


    if (
        !qrToolCard ||
        !qrGeneratorModal ||
        !qrCloseButton ||
        !qrInput ||
        !qrGenerateButton ||
        !qrOutput ||
        !qrStatus ||
        !qrDownloadButton ||
        !qrClearButton
    ) {
        return;
    }


    /* ==============================
       OPEN MODAL
       ============================== */

    qrToolCard.addEventListener("click", function () {

        qrGeneratorModal.classList.add("active");

    });


    /* ==============================
       CLOSE MODAL
       ============================== */

    qrCloseButton.addEventListener("click", function () {

        qrGeneratorModal.classList.remove("active");

    });


    /* ==============================
       GENERATE QR
       ============================== */

    qrGenerateButton.addEventListener("click", function () {

        const qrText = qrInput.value.trim();


        if (!qrText) {

            qrStatus.textContent = "ENTER TEXT OR URL";

            qrStatus.classList.add("error");

            return;

        }


        if (typeof QRCode === "undefined") {

            qrStatus.textContent = "QR MODULE NOT LOADED";

            qrStatus.classList.add("error");

            return;

        }


        qrStatus.classList.remove("error");

        qrOutput.innerHTML = "";

        qrDownloadButton.disabled = true;


        try {

            new QRCode(qrOutput, {

                text: qrText,

                width: 220,

                height: 220,

                colorDark: "#000000",

                colorLight: "#ffffff",

                correctLevel: QRCode.CorrectLevel.H

            });


            qrStatus.textContent = "QR CODE GENERATED";

            qrDownloadButton.disabled = false;


        } catch (error) {

            qrStatus.textContent = "QR GENERATION ERROR";

            qrStatus.classList.add("error");

            console.error(error);

        }

    });


    /* ==============================
       DOWNLOAD QR
       ============================== */

    qrDownloadButton.addEventListener("click", function () {

        const canvas = qrOutput.querySelector("canvas");

        const image = qrOutput.querySelector("img");


        let imageURL = null;


        if (canvas) {

            imageURL = canvas.toDataURL("image/png");

        } else if (image) {

            imageURL = image.src;

        }


        if (!imageURL) {

            qrStatus.textContent = "QR CODE NOT FOUND";

            qrStatus.classList.add("error");

            return;

        }


        const downloadLink = document.createElement("a");

        downloadLink.href = imageURL;

        downloadLink.download = "techtoolbox-qr.png";

        document.body.appendChild(downloadLink);

        downloadLink.click();

        downloadLink.remove();


        qrStatus.textContent = "QR CODE DOWNLOADED";

        qrStatus.classList.remove("error");

    });


    /* ==============================
       CLEAR
       ============================== */

    qrClearButton.addEventListener("click", function () {

        qrInput.value = "";

        qrOutput.innerHTML = "";

        qrDownloadButton.disabled = true;

        qrStatus.textContent = "READY";

        qrStatus.classList.remove("error");

        qrInput.focus();

    });


})();






