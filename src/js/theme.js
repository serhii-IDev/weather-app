export const theme = function () {
    const blockNowDeg = document.querySelector('.block-info__degrees');
    const btnTheme = document.querySelector('.theme');
    const btnF = document.querySelector('.theme-btn__f');
    const nowDeg = document.querySelector('.degrees');

    function replacementСelsius(deg) {
        nowDeg.textContent = Math.round((+deg * 9 / 5) + 32);
    }

    function replacementFahrenheit(deg) {
        nowDeg.textContent = Math.round((+deg - 32) * 5 / 9);
    }

    if (btnTheme) {
        btnTheme.addEventListener('click', () => {
            blockNowDeg.classList.toggle('repl');
            btnF.classList.toggle('bg');
            if (btnF.classList.contains('bg')) {
                replacementСelsius(nowDeg.textContent);
            } else {
                replacementFahrenheit(nowDeg.textContent);
            }

        })
    }
}



