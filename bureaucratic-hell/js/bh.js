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

    if (tncWindow) tncWindow.classList.remove("hidden");

    const tolerance = 5;

    const handler = function () {
        if (scrollText.scrollTop + scrollText.clientHeight >= scrollText.scrollHeight - tolerance) {
            tncCheckBox.disabled = false
            tncButton.disabled = false;
            scrollText.removeEventListener('scroll', handler);
        }
    };
    scrollText.addEventListener('scroll', handler);
}