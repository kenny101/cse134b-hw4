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
      alert("Alert pressed!");
      dialogHander.removeStyle();
    });
  },
};

// Handles confirm button events
const confirmHandler = {
  doc: document.getElementById("confirm-btn"),
  addClickEvent() {
    this.doc.addEventListener("click", () => {
      const result = confirm("Do you confirm this?");
      dialogHander.addStyle();
      dialogHander.setText(`Confirm result: ${result}`);
    });
  },
};

// Handles prompt button events
const promptHandler = {
  doc: document.getElementById("prompt-btn"),
  addClickEvent() {
    this.doc.addEventListener("click", () => {
      const result = String(prompt("What is your name?"));
      dialogHander.addStyle();
      if (result == "" || result == null) {
        dialogHander.setText(`User didn't input anything`);
      } else {
        dialogHander.doc.innerHTML = `Prompt result: ${result}`;
        // dialogHander.setText(`Prompt result: ${result}`); // (Safer way)
      }
    });
  },
};

// Handles safer prompt button events
const saferPromptHandler = {
  doc: document.getElementById("safer-prompt-btn"),
  addClickEvent() {
    this.doc.addEventListener("click", () => {
      const result = DOMPurify.sanitize(prompt("What is your name?"));
      dialogHander.addStyle();
      if (result == "" || result == null) {
        dialogHander.setText(`User didn't input anything`);
      } else {
        dialogHander.doc.innerHTML = `Prompt result: ${result}`;
        // dialogHander.setText(`Prompt result: ${result}`); // (Safer way)
      }
    });
  },
};

// Execute button handlers and dialog handler
alertsHandler.addClickEvent();
confirmHandler.addClickEvent();
promptHandler.addClickEvent();
saferPromptHandler.addClickEvent();
