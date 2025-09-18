"use strict";

// Edita sólo este fichero

const formEvent = document.getElementById("newEvent");
const imgPreviewSection = document.getElementById("imgPreview");
const formulario = document.querySelectorAll(".form-control");
const submitBtn = document.querySelector("form > button");
const eventsContainer = document.getElementById("eventsContainer");
let fecha = "";
let fileUpload = "";

function newCard(name, date, description, price, image) {
    const newDiv = document.createElement("div");
    newDiv.classList.add("card");
    // newDiv.innerHTML = `
    //     <img class="card-img-top" src="${image}">
    //     <div class="card-body">
    //         <h4 class="card-title">${name}</h4>
    //         <p class="card-text">${description}</p>
    //     </div>
    //     <div class="card-footer">
    //         <small class="text-muted">
    // 		        ${date}
    // 		        <span class="float-right">${price} €</span>
    //         </small>
    //       </div>
    // `;

    const img = document.createElement("img");
    img.classList.add("car-img-top");

    // img.style.height = "20rem";
    img.style.width = "100%";
    img.src = image;
    newDiv.appendChild(img);

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    const h4 = document.createElement("h4");
    h4.classList.add("card-title");
    h4.innerText = name;
    const p = document.createElement("p");
    p.classList.add("card-text");
    p.innerText = description;
    cardBody.appendChild(h4);
    cardBody.appendChild(p);
    newDiv.appendChild(cardBody);

    const cardFooter = document.createElement("div");
    cardFooter.classList.add("card-footer");
    const small = document.createElement("small");
    small.classList.add("text-muted");
    small.innerText = date;
    const span = document.createElement("span");
    span.classList.add("float-right");
    span.innerText = price + " €";
    small.appendChild(span);
    cardFooter.appendChild(small);
    newDiv.appendChild(cardFooter);

    eventsContainer.appendChild(newDiv);
}

function parseDate(date) {
    const parseDate = new Date(date);
    const [month, day, year] = [
        parseDate.getMonth(),
        parseDate.getDate(),
        parseDate.getFullYear(),
    ];
    return `${day}/${month}/${year}`;
}

function resetForm() {
    formulario.forEach(input => {
        input.value = "";
        input.classList.remove("is-valid");
    });
    imgPreviewSection.src = "";

}

document.addEventListener("DOMContentLoaded", () => {

    document.addEventListener("keydown", () => {
        formulario.forEach(input => {
            if (input.value === "") {
                input.classList.add("is-invalid");
                return;
            } else if (input.value != "") {
                if (input.classList.contains("is-invalid")) {
                    input.classList.remove("is-invalid");
                }
                input.classList.add("is-valid");
            }
        });
    })

    formEvent.image.addEventListener('change', (event) => {
        let file = event.target.files[0];
        fileUpload = event.target.files[0];
        let reader = new FileReader();
        if (file) reader.readAsDataURL(file);
        reader.addEventListener('load', e => {
            imgPreviewSection.classList.remove("d-none");
            imgPreviewSection.src = reader.result;
            fileUpload = reader.result;
        });
    });

    submitBtn.addEventListener("click", (event) => {
        event.preventDefault();
        formulario.forEach(input => {
            if (input.value === "") {
                input.classList.add("is-invalid");
                return;
            } else if (input.value != "") {
                if (input.classList.contains("is-invalid")) {
                    input.classList.remove("is-invalid");
                }
                input.classList.add("is-valid");
            }
        });
        const [name, date, description, price, image] = formulario;
        if (name.classList.contains("is-invalid") || description.classList.contains("is-invalid") || price.classList.contains("is-invalid") || image.classList.contains("is-invalid") || date.classList.contains("is-invalid")) {
            return;
        };
        fecha = parseDate(date.value);
        newCard(name.value, fecha, description.value, price.value, fileUpload);
        resetForm();
    });
})

