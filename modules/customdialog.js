const customdialog = (innerHTML) => {
    const mainDialog = document.getElementById("main-dialog");
    mainDialog.innerHTML = DOMPurify.sanitize(innerHTML);
    mainDialog.showModal();
}

export default customdialog;