let correctPIN = generatePIN(4); // Default level is Easy.

// reset input value
document.getElementById('pinGuess').value = '';

// get level by input radio id and set correctPIN based on level
document.querySelectorAll('input[name="level"]').forEach((input) => {
    input.addEventListener('change', () => {

        switch (input.id) {
            case 'easy':
                level = 4;
                break;
            case 'medium':
                level = 6;
                break;
            case 'hard':
                level = 8;
                break;
            case 'god':
                level = 20;
                break;
            default:
                level = 4;
                break;
        }

        correctPIN = generatePIN(level);


        // reset messages
        document.getElementById('messages').innerHTML = `<li class="text-info">Level telah diubah menjadi ${input.id}. Ayo tebak PIN dengan ${level} digit</li>`;

        // reset input value
        document.getElementById('pinGuess').value = '';
    });
});

function getLevel() {
    // get checked level
    const checkedLevel = document.querySelector('input[name="level"]:checked');

    switch (checkedLevel.id) {
        case 'easy':
            return 4;
        case 'medium':
            return 6;
        case 'hard':
            return 8;
        case 'god':
            return 20;
        default:
            return 4;
    }
}

function generatePIN(length) {
    let pin = '';
    for (let i = 0; i < length; i++) {
        pin += Math.floor(Math.random() * 10);
    }
    return pin;
}

function checkGuess() {
    const guess = document.getElementById('pinGuess').value;
    const level = getLevel();

    // filter non-digit input
    document.getElementById('pinGuess').value = guess.replace(/\D/g, '');

    if (guess.length !== level || !/^\d+$/.test(guess)) {
        const rules = `Tebakan harus berupa angka dengan panjang ${level} digit`;

        document.getElementById('messages').innerHTML = `<li class="text-danger">${rules}</li>`;
        return;
    }

    if (guess === correctPIN) {
        document.getElementById('messages').innerHTML = '<li class="text-success">Selamat, tebakanmu benar! Jawaban akan otomatis direset setelah <span id="timerPinChange">3</span> detik</li>';

        correctPIN = generatePIN(level);

        document.getElementById('pinGuess').value = '';

        let timer = 3;

        const timerPinChange = document.getElementById('timerPinChange');

        const interval = setInterval(() => {
            timer--;
            timerPinChange.textContent = timer;
            if (timer === 0) {
                clearInterval(interval);
                timerPinChange.textContent = '3';
            }
        }, 1000);

        // reset messages
        setTimeout(() => {
            document.getElementById('messages').innerHTML = '';
        }, 3000);

    } else {
        const messages = createHintMessages(guess, correctPIN);
        document.getElementById('messages').innerHTML = messages.join('');
    }
}

function createHintMessages(guess, correctPIN) {
    const messages = [];
    for (let i = 0; i < guess.length; i++) {
        if (guess[i] === correctPIN[i]) {
            messages.push(`<li class="text-success">Angka ${guess[i]} sudah pada posisi yang benar</li>`);
        } else if (correctPIN.includes(guess[i])) {
            messages.push(`<li class="text-warning">Angka ${guess[i]} ada pada jawaban, tapi pada posisi yang salah</li>`);
        } else {
            messages.push(`<li class="text-danger">Angka ${guess[i]} tidak ada pada jawaban</li>`);
        }
    }
    return messages;
}
