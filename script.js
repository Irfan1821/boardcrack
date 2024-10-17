// Initialize Stripe
const stripe = Stripe("your-publishable-key"); // Replace with your Stripe publishable key
const elements = stripe.elements();
const cardElement = elements.create("card");
cardElement.mount("#card-element");

// Add event listeners to the Enroll Now buttons
const enrollButtons = document.querySelectorAll(".enroll-btn");
enrollButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    // Show the payment form
    document.getElementById("payment-form-container").style.display = "block";
    // Get course amount from data attribute
    const courseAmount = button.getAttribute("data-amount");
    document
      .getElementById("payment-form")
      .setAttribute("data-amount", courseAmount);
  });
});

const form = document.getElementById("payment-form");
form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const { paymentMethod, error } = await stripe.createPaymentMethod({
    type: "card",
    card: cardElement,
  });

  if (error) {
    // Show error to the customer
    document.getElementById("payment-result").innerText = error.message;
  } else {
    // Here you can show success message
    const amount = form.getAttribute("data-amount");
    document.getElementById(
      "payment-result"
    ).innerText = `Payment successful! You paid ${amount / 100} dollars.`;

    // Optionally, clear the form
    form.reset();
    // Hide the payment form after successful payment
    document.getElementById("payment-form-container").style.display = "none";
  }
});
