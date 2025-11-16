// Variables for all main pages
const voluemSelectorPage = document.getElementById("volume-selector-window")
const volumeConfirmPage = document.getElementById('modal');
const tncPage = document.getElementById("tandc-window");
const loadingPage = document.getElementById("loading-page")
const securityPage = document.getElementById("security-page")

// Volume Selector Confirm Popup
function voluemSelector() {
    const submitBtn = document.getElementById('volume-btn-submit');
    const volumeInput = document.getElementById('volume-selector');
    const confirmWindowText = document.getElementById('modal-text');
    const confirmWindowCancelBtn = document.getElementById('modal-cancel');
    const ConfirmWindowConfirmBtn = document.getElementById('modal-confirm');

    function openConfirmation() {
        confirmWindowText.textContent = `Set volume to ${volumeInput.value}%?`;
        volumeConfirmPage.classList.remove('hidden');
    }
    function closeConfirmation() {
        volumeConfirmPage.classList.add('hidden');
    }

    submitBtn.addEventListener('click', openConfirmation);
    confirmWindowCancelBtn.addEventListener('click', closeConfirmation);

    ConfirmWindowConfirmBtn.addEventListener('click', openTnC);
}
voluemSelector()

// Terms and conditions 
function openTnC() {
    const scrollText = document.getElementById("tandc-scroll-text");
    const tncButton = document.getElementById("tandc-btn");
    const tncCheckBox = document.getElementById("tandc-checkbox")

    const tncPopup = document.getElementById("tandc-popup")
    const tncPopupCountdown = document.getElementById("tandc-close-sec")

    tncPage.classList.remove("hidden");

    // Scroll detection
    const tolerance = 5;
    function scrollHandler() {
        // Check if we have reched the bottom
        if (scrollText.scrollTop + scrollText.clientHeight >= scrollText.scrollHeight - tolerance) {
            tncCheckBox.disabled = false
            scrollText.removeEventListener('scroll', scrollHandler);
        }

        // Sometimes scroll back up "glitchy effect"
        let chance = Math.random()
        // 1.25% chance
        console.log(chance)
        if (chance > 0.9875) {
            console.log("scrolling")
            scrollText.scrollBy(0, -200)
        }
    };
    scrollText.addEventListener('scroll', scrollHandler);

    // Submit button
    function tncSubmit() {
        const checked = tncCheckBox.checked

        if (checked) {
            // Move to next screen
            loadLoadingBar();
        } else {
            // Show popup and then reload page
            tncPopup.classList.remove("hidden")
            let countdown = 4
            setInterval(() => {
                tncPopupCountdown.textContent = countdown
                countdown--

                if (countdown < 0) {
                    location.reload()
                }
            }, 1000);
        }
    }
    tncButton.addEventListener("click", tncSubmit)
}

// Loading Bar Page
function loadLoadingBar() {
    const loadingBar = document.getElementById("load-bar")
    const loadingCancelBtn = document.getElementById("load-cancel")

    loadingPage.classList.remove("hidden")

    var counter = 0
    // TODO: Implement random number (js has dumb random function)
    var target = 62
    const loadingProgressLoop = setInterval(() => {
        loadingBar.value = counter
        counter++

        if (counter == target) {
            clearInterval(loadingProgressLoop)
            loadSecurityPage()
        }
    }, 125);

    function loadingCancelBtnClick() {
        location.reload()
    }
    loadingCancelBtn.addEventListener("click", loadingCancelBtnClick)
}

// Security Page
function loadSecurityPage() {
    const securityInput = document.getElementById("security-input")
    const securityButton = document.getElementById("security-submit")
    const securityHintLink = document.getElementById("security-hint-link")
    const securityHintPopup = document.getElementById("security-hint-popup")
    const securityHintPopupBtn = document.getElementById("security-hint-popup-btn")
    const securityIncorrectPopup = document.getElementById("security-incorrect-popup")
    const securityIncorrectPopupBtn = document.getElementById("security-incorrect-popup-btn")

    securityPage.classList.remove("hidden")

    const correctPW = "permission"
    function securityButtonClick() {
        if (securityInput.value == correctPW) {
            openSuccessPage()
        } else {
            securityIncorrectPopup.classList.remove("hidden")
        }
    }
    securityButton.addEventListener("click", securityButtonClick)

    function securityHintLinkClick() {
        securityHintPopup.classList.remove("hidden")
    }
    securityHintLink.addEventListener("click", securityHintLinkClick)

    function securityIncorrectPopupBtnClose() {
        securityIncorrectPopup.classList.add("hidden")
    }
    securityIncorrectPopupBtn.addEventListener("click", securityIncorrectPopupBtnClose)

    function securityHintPopupClose() {
        securityHintPopup.classList.add("hidden")
    }
    securityHintPopupBtn.addEventListener("click", securityHintPopupClose)
}

// Success Page
function openSuccessPage() {
    const successPage = document.querySelector("#success-page")
    const successPageRestartBtn = document.querySelector("#success-page-restart")

    // Close all other pages in reverse order of opening with delay
    securityPage.classList.add("hidden")
    setTimeout(() => {
        loadingPage.classList.add("hidden")
    }, 750);
    setTimeout(() => {
        tncPage.classList.add("hidden")
    }, 1500);
    setTimeout(() => {
        volumeConfirmPage.classList.add("hidden")
    }, 2250);
    setTimeout(() => {
        voluemSelectorPage.classList.add("hidden")
    }, 3000);
    setTimeout(() => {
        successPage.classList.remove("hidden")
        successPageRestartBtn.addEventListener("click", () => { location.reload() })
    }, 3750)
}