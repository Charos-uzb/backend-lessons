const textElement = document.querySelector("#text");
const keyboardElement = document.querySelector(".keyboard");

function Keyboard(textArea, keyboardElement) {
    this.textArea = textArea;
    this.keyboardElement = keyboardElement;
    this.isUpperCase = false;
    this.keys = [
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
        ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]"],
        ["a", "s", "d", "f", "g", "h", "j", "k", "l", ";"],
        ["z", "x", "c", "v", "b", "n", "m", ",", ".", "?"],
    ];
    this.renderKeys = () => {
        this.keyboardElement.innerHTML = "";
        const firstLineElement = document.createElement("div");
        const secondLineElement = document.createElement("div");
        const thirdLineElement = document.createElement("div");
        const fourthLineElement = document.createElement("div");
        const fifthLineElement = document.createElement("span");
        fifthLineElement.id = "space";
        fifthLineElement.innerHTML += "[____________________________________]";
        this.keys[0].forEach((key) => {
            const keyElement = `<span class="key">${key}</span>`;
            firstLineElement.innerHTML += keyElement;
        });
        firstLineElement.innerHTML += `<span id='backspace'>Backspace</span>`;

        secondLineElement.innerHTML += `<span id='capslock'>CapsLk</span>`;
        this.keys[1].forEach((key) => {
            const keyElement = `<span class="key">${key}</span>`;
            secondLineElement.innerHTML += keyElement;
        });
        secondLineElement.innerHTML += `<span id='enter'>Enter</span>`;

        this.keys[2].forEach((key) => {
            const keyElement = `<span class="key">${key}</span>`;
            thirdLineElement.innerHTML += keyElement;
        });
        this.keys[3].forEach((key) => {
            const keyElement = `<span class="key">${key}</span>`;
            fourthLineElement.innerHTML += keyElement;
        });

        firstLineElement.classList.add("firstrow");
        secondLineElement.classList.add("secondrow");
        thirdLineElement.classList.add("thirdrow");
        fourthLineElement.classList.add("fourthrow");
        keyboardElement.appendChild(firstLineElement);
        keyboardElement.appendChild(secondLineElement);
        keyboardElement.appendChild(thirdLineElement);
        keyboardElement.appendChild(fourthLineElement);
        keyboardElement.appendChild(fifthLineElement);
    };
    this.keysClick = () => {
        const keys = document.querySelectorAll("span.key");
        const capslockBtn = document.querySelector("#capslock");
        const spaceBtn = document.querySelector("#space");
        const enterBtn = document.querySelector("#enter");
        const backspaceBtn = document.querySelector("#backspace");
        keys.forEach((key) => {
            key.addEventListener("click", (e) => {
                const keyText = e.target.textContent.trim();
                this.textArea.value += keyText;
            });
        });
        capslockBtn.addEventListener("click", (e) => {
            this.keys = this.keys.map((keyRow) => {
                keyRow = keyRow.map((key) => {
                    key = key.toString();
                    key = this.isUpperCase
                        ? key.toLowerCase()
                        : key.toUpperCase();
                    return key;
                });
                return keyRow;
            });
            this.isUpperCase = !this.isUpperCase;
            this.renderKeys();
            this.keysClick();
        });
        spaceBtn.addEventListener("click", (e) => {
            this.textArea.value += " ";
        });
        enterBtn.addEventListener("click", (e) => {
            this.textArea.value += "\n";
        });
        backspaceBtn.addEventListener("click", (e) => {
            var
             text = this.textArea.value;
            text = text.split("");
            text.splice(text.length - 1);
            text = text.join("");
            this.textArea.value = text;
        });
    };
}
const keyboard = new Keyboard(textElement, keyboardElement);

keyboard.renderKeys();
keyboard.keysClick();
