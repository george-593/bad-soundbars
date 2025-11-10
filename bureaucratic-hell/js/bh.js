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
tncWindow = document.getElementById("tandc-window")

function openTnC() {
    tncWindow.classList.remove("hidden")
}