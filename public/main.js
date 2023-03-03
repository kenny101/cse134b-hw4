import customdialog from "../modules/customdialog.js";

// Handles styling and editing of the dialog text
const dialogHander = {
  doc: document.getElementById("dialog-text"),
  style: `
            display: inline-block;
            border-style: double;
            text-align: center;
            padding: 12px;
            `,
  removedStyle: `
                display: none;
                border-style: none;
                `,
  addStyle() {
    this.doc.style.cssText = this.style;
  },
  removeStyle() {
    this.doc.style.cssText = this.removedStyle;
  },
  setText(text) {
    this.doc.textContent = text;
  },
};

// Handles alert button events
const alertsHandler = {
  doc: document.getElementById("alert-btn"),
  addClickEvent() {
    this.doc.addEventListener("click", () => {
      dialogHander.removeStyle();
      customdialog(`<p>Alert pressed!</p>
        <form method="dialog">
            <button>OK</button>
        </form>`);
    });
  },
};

// Handles confirm button events
const confirmHandler = {
  doc: document.getElementById("confirm-btn"),
  addClickEvent() {
    this.doc.addEventListener("click", () => {
      customdialog(`
          <form method="dialog">
            <p>Do you confirm this?</p>
            <button id="cancel-btn">Cancel</button>
            <button id="ok-btn">OK</button>
          </form>`);

      const cancel = document.getElementById("cancel-btn");
      const ok = document.getElementById("ok-btn");

      cancel.addEventListener("click", () => {
        dialogHander.setText(`Confirm result: false`);
        dialogHander.addStyle();
      });

      ok.addEventListener("click", () => {
        dialogHander.setText(`Confirm result: true`);
        dialogHander.addStyle();
      });
    });
  },
};

// Handles prompt button events
const promptHandler = {
  doc: document.getElementById("prompt-btn"),
  addClickEvent() {
    this.doc.addEventListener("click", () => {
      customdialog(`
        <form method="dialog" id="prompt-handler-form">
        <label for="fname">What is your name?</label><br><br>
        <input type="text" id="fname" name="fname"><br><br>
        <button>Cancel</button>
        <input type="submit" value="Ok">
        </form>`);
      let result = "";
      const promptForm = document.getElementById("prompt-handler-form");
      promptForm.addEventListener("submit", (e) => {
        const formData = new FormData(e.target);
        result = formData.get("fname");
        if (result == "" || result == null) {
          dialogHander.setText(`User didn't input anything`);
          dialogHander.addStyle();
        } else {
          dialogHander.doc.innerHTML = `Prompt result: ${DOMPurify.sanitize(result)}`;
          // dialogHander.setText(`Prompt result: ${result}`); // (Safer way)
          dialogHander.addStyle();
        }
      });
      
    });
  },
};

alertsHandler.addClickEvent();
confirmHandler.addClickEvent();
promptHandler.addClickEvent();
