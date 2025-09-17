"use strict";

// Edita sólo este fichero

const formEvent = document.getElementById("newEvent");
const imgPreviewSection = document.getElementById("imgPreview");

formEvent.image.addEventListener('change', (event) => {
    let file = event.target.files[0];
    let reader = new FileReader();

    if (file) reader.readAsDataURL(file);
    reader.addEventListener('load', e => {
        imgPreviewSection.classList.remove("d-none");
        imgPreviewSection.src = reader.result;
    });
});

