const formElement = document.getElementById("formMatchs");

function getDataFromForm(event) {
    event.preventDefault();
    new FormData(formElement).forEach(console.log)
}


formElement.onsubmit = getDataFromForm;


