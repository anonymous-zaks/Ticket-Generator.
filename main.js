document.addEventListener("DOMContentLoaded", () => {
  // 1) Grab elements
  const form = document.getElementById("ticketForm");
  const avatarInput = document.getElementById("avatar");
  const nameInput = document.getElementById("fullName");
  const emailInput = document.getElementById("email");
  const githubInput = document.getElementById("github");

  const preview = document.getElementById("ticketPreview");
  const pName = document.getElementById("ticketName");
  const pEmail = document.getElementById("ticketEmail");
  const pGithub = document.getElementById("ticketGithub");
  const pAvatar = document.getElementById("ticketAvatar");
  const errors = document.getElementById("formErrors");

  // 2) Helpers
  function showError(msg) {
    if (!errors) return;
    errors.textContent = msg;
    errors.style.display = "block";
  }
  function clearError() {
    if (!errors) return;
    errors.textContent = "";
    errors.style.display = "none";
  }

  // 3) Live avatar preview when a file is chosen
  avatarInput?.addEventListener("change", () => {
    const file = avatarInput.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      showError("Please choose an image file (JPG or PNG).");
      avatarInput.value = "";
      return;
    }

    clearError();
    const url = URL.createObjectURL(file);
    pAvatar.src = url;
    pAvatar.onload = () => URL.revokeObjectURL(url); // free memory
  });

  // 4) Handle form submit (Generate Ticket)
  form?.addEventListener("submit", (e) => {
    e.preventDefault(); // stop page reload
    clearError();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const github = githubInput.value.trim();

    // Simple validation
    if (!name) return showError("Full name is required.");
    if (!/^\S+@\S+\.\S+$/.test(email)) return showError("Enter a valid email.");
    if (!github) return showError("GitHub username is required.");

    // Put values into the ticket preview
    pName.textContent = name;
    pEmail.textContent = email;
    pGithub.textContent = "@" + github.replace(/^@/, "");

    // Show the preview
    preview.hidden = false;
    preview.scrollIntoView({ behavior: "smooth", block: "center" });
  });
});
