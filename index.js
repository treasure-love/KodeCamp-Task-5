const amountContainer = document.getElementById("amountContainer");
const amountPrefix = document.getElementById("amountPrefix");

const termContainer = document.getElementById("termContainer");
const termSuffix = document.getElementById("termSuffix");

const rateContainer = document.getElementById("rateContainer");
const rateSuffix = document.getElementById("rateSuffix");


const amountError = document.getElementById("amountError");
const termError = document.getElementById("termError");
const rateError = document.getElementById("rateError");
const typeError = document.getElementById("typeError");



const monthlyPaymentOutput = document.getElementById("monthlyPayment");
const totalRepaymentOutput = document.getElementById("totalPayment");


const amountInput = document.getElementById("mortgage-amount");
const termInput = document.getElementById("mortgage-term");
const rateInput = document.getElementById("interest-rate");
const repaymentRadio = document.getElementById ("repayment");
const interestOnlyRadio = document.getElementById ("interestOnly");
const calBtn = document.getElementById("calBtn");
const emptyResult = document.getElementById("emptyResult");
const completedResult = document.getElementById("completedResult");

completedResult.classList.add("hidden");

calBtn.addEventListener("click", function() {
    const amountValue = amountInput.value;
    const termValue = termInput.value;
    const rateValue = rateInput.value;

    let hasError = false;

    if (amountValue === "") {
        
        amountError.classList.remove("hidden");

        amountContainer.classList.remove("border-Slate-300");
        amountContainer.classList.add("border-Red")

        amountPrefix.classList.remove("bg-Slate-300", "text-Slate-900");
        amountPrefix.classList.add("bg-Red", "text-White")
        
        hasError = true;
    } else {
        amountError.classList.add("hidden");

        amountContainer.classList.remove("border-Red");
        amountContainer.classList.add("border-Slate-300");

        amountPrefix.classList.remove("bg-Red", "text-White");
        amountPrefix.classList.add("bg-Slate-300", "text-Slate-900");
    }

    if (termValue === "") {
        termError.classList.remove("hidden");

        termContainer.classList.remove("border-Slate-300");
        termContainer.classList.add("border-Red");

        termSuffix.classList.remove("bg-Slate-300", "text-Slate-900");
        termSuffix.classList.add("bg-Red", "text-White");

        hasError = true;
    } else {
        termError.classList.add("hidden");

        termContainer.classList.remove("border-Red");
        termContainer.classList.add("border-Slate-300");

        termSuffix.classList.remove("bg-Red", "text-White");
        termSuffix.classList.add("bg-Slate-300", "text-Slate-900")
    }   

    if (rateValue === "") {
        rateError.classList.remove("hidden");

        rateContainer.classList.remove("border-Slate-300");
        rateContainer.classList.add("border-Red");

        rateSuffix.classList.remove("bg-Slate-300", "text-Slate-900");
        rateSuffix.classList.add("bg-Red", "text-White");

        hasError = true;
    } else {
        rateError.classList.add("hidden");

        rateContainer.classList.remove("border-Red");
        rateContainer.classList.add("border-Slate-300");

        rateSuffix.classList.remove("bg-Red", "text-White");
        rateSuffix.classList.add("bg-Slate-300", "text-Slate-900");
    }

    if (!repaymentRadio.checked && !interestOnlyRadio.checked) {
        typeError.classList.remove("hidden");
        hasError = true;
    } else {
        typeError.classList.add("hidden");
    }

    if (hasError) {
        return;
    }


    const amount = Number(amountValue);
    const term = Number(termValue);
    const rate = Number(rateValue);


    const monthlyRate = rateValue / 100 / 12;
    const numberOfPayments = termValue * 12;

    let monthlyPayment;
    let totalRepayment;


    if (repaymentRadio.checked) {

        monthlyPayment =
            (amount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
            (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

        totalRepayment = monthlyPayment * numberOfPayments;

    } else {

        monthlyPayment = amount * monthlyRate;

        totalRepayment = amount + (monthlyPayment * numberOfPayments);

    }

    monthlyPaymentOutput.textContent = "£" + monthlyPayment.toLocaleString("en-GB", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2

    });

    totalRepaymentOutput.textContent = "£" + totalRepayment.toLocaleString("en-GB", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2

    });


    emptyResult.classList.add("hidden");
    completedResult.classList.remove("hidden");

});

const clearBtn = document.getElementById("clearBtn");

clearBtn.addEventListener("click", function() {
    amountInput.value = "";
    termInput.value = "";
    rateInput.value = "";


    repaymentRadio.checked = false;
    interestOnlyRadio.checked = false;

    amountError.classList.add("hidden");
    termError.classList.add("hidden");
    rateError.classList.add("hidden");
    typeError.classList.add("hidden");

    monthlyPaymentOutput.textContent = "£0.00";
    totalRepaymentOutput.textContent ="£0.00";


    completedResult.classList.add("hidden");
    emptyResult.classList.remove("hidden");


   
});

