(() => {
    const cardList = document.querySelectorAll(".card");
    const popup = document.querySelector(".popupWrapper");
    const form = document.querySelector(".formOrder");
    const popupPurchase = popup.querySelector("#purchaseName");
    const popupSubmit = popup.querySelector(".formOrder__submit");
    const popupBuyer = popup.querySelector("#buyer");
    const popupPhone = popup.querySelector("#phonenumber");
    const popupBuyerError = popup.querySelector(".buyer__error");
    let phoneValid, nameValid;

    function fillPopup() {
        let name = this.querySelector(".card__title").innerText;
        popupPurchase.value = name;
        popupPurchase.disabled = true;
        popup.style.visibility = "visible";
    };

    function closePopup(e) {
        let field = e.target;
        if (field.className === "popupWrapper") popup.style.visibility = "hidden";
    };

    function checkPopupForm() {
        if (phoneValid && nameValid) {
            popupSubmit.removeAttribute("disabled");
        } else {
            popupSubmit.setAttribute("disabled", "true");
        };
    };

    function validatePhone() {
        let value = this.value;
        let length = value.length;
        value = value.replace(/[^0-9\+\-\ ]/g, "");
        popupPhone.value = value;
        if (value.charAt(0) === "9" && value.charAt(0) !== "+") {
            value = "+7-" + value;
            popupPhone.value = value;
        };
        if (value.charAt(0) === "7" && value.charAt(0) !== "+") {
            value = "+" + value + "-";
            popupPhone.value = value;
        };
        if (length === 6 || length === 10 || length === 13) {
            value = value + "-";
            popupPhone.value = value;
        };
        if (length >= 16) {
            value = value.substr(0, 16);
            popupPhone.value = value;
            phoneValid = true;
            popupPhone.style.borderColor = "black";
        } else {
            phoneValid = false;
            popupPhone.style.borderColor = "orangered";
        };
        checkPopupForm();
    };

    function vaidateBuyer() {
        let value = this.value;
        let error = `Имя должно быть от 6 символов. Сейчас ${value.length}`;
        value = value.replace(/[^a-zA-Zа-яёА-ЯЁ]+$/g, "");
        popupBuyer.value = value;
        popupBuyerError.textContent = error;
        if (value.length < 6) {
            popupBuyer.style.borderColor = "orangered";
            popupBuyerError.style.display = "inline-block";
            nameValid = false;
        }
        if (value.length >= 6) {
            popupBuyer.style.borderColor = "black";
            popupBuyerError.style.display = "none";
            nameValid = true;
        }
        checkPopupForm();
    };

    async function sendEmail(e) {
        e.preventDefault();
        let formData = new FormData(form);
        if (phoneValid && nameValid) {
            let response = await fetch("sendmail.php", {
                method: 'POST',
                body: formData
            });
            if (response.ok) {
                let result = await response.json();
                alert(result.message);
                form.reset();
            } else {
                alert("Ошибка");
            }
        }
    }

    const addListenersByClick = (element, handler) => {
        if (element.length) {
            element.forEach(item => {
                item.addEventListener("click", handler);
            });
        } else {
            element.addEventListener("click", handler);
        }
    };

    function init() {
        addListenersByClick(cardList, fillPopup);
        addListenersByClick(popup, closePopup);
        popupPhone.addEventListener("keyup", validatePhone);
        popupBuyer.addEventListener("keyup", vaidateBuyer);
        form.addEventListener("submit", sendEmail);
    }

    init();
})()