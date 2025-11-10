// Volume Selector Confirm Popup
const submitBtn = document.getElementById('volume-btn-submit');
const volumeInput = document.getElementById('volume-selector');
const modal = document.getElementById('modal');
const modalText = document.getElementById('modal-text');
const modalClose = document.getElementById('modal-close-btn');
const modalCancel = document.getElementById('modal-cancel');
const modalConfirm = document.getElementById('modal-confirm');

function openModal() {
    modalText.textContent = `Set volume to ${volumeInput.value}?`;
    modal.classList.remove('hidden');
}
function closeModal() {
    modal.classList.add('hidden');
}

submitBtn.addEventListener('click', openModal);
modalClose.addEventListener('click', closeModal);
modalCancel.addEventListener('click', closeModal);

modalConfirm.addEventListener('click', openTnC);

// Terms and conditions 
function openTnC() {
    const tncWindow = document.getElementById("tandc-window");
    const scrollText = document.getElementById("tandc-scroll-text");
    const tncButton = document.getElementById("tandc-btn");
    const tncCheckBox = document.getElementById("tandc-checkbox")

    const tncPopup = document.getElementById("tandc-popup")
    const tncPopupCountdown = document.getElementById("tandc-close-sec")

    tncWindow.classList.remove("hidden");

    // Scroll detection
    const tolerance = 5;
    function scrollHandler() {
        if (scrollText.scrollTop + scrollText.clientHeight >= scrollText.scrollHeight - tolerance) {
            tncCheckBox.disabled = false
            scrollText.removeEventListener('scroll', scrollHandler);
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
    const loadingPage = document.getElementById("loading-page")
    const loadingBar = document.getElementById("load-bar")
    const loadingCancelBtn = document.getElementById("load-cancel")

    loadingPage.classList.remove("hidden")

    var counter = 0
    // TODO: Implement random number (js has dumb random function)
    var target = 62
    const loadingProgressLoop = setInterval(() => {
        loadingBar.value = counter
        counter++

        console.log(counter)

        if (counter == target) {
            // Show admin password popup
            console.log("Target met")
            clearInterval(loadingProgressLoop)
        }
    }, 175);

    function loadingCancelBtnClick() {
        location.reload()
    }
    loadingCancelBtn.addEventListener("click", loadingCancelBtnClick)
}