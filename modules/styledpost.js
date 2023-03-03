import customdialog from "../modules/styledcustomdialog.js";


// Remove a post from localstorage given the id
function removePostFromLocalStore(id) {
  let localPosts = JSON.parse(localStorage.getItem("postData"));
  const filteredPosts = localPosts.filter((post) => post.id !== String(id));
  localStorage.setItem("postData", JSON.stringify(filteredPosts));
}

// Update a post with specific id with corresponding title, date, and summary
function updatePostFromLocalStore(id, title, date, summary) {
  let localPosts = JSON.parse(localStorage.getItem("postData"));
  var editedPost = {
    id: String(id),
    title: title,
    date: date,
    summary: summary,
  };
  localPosts = localPosts.map((post) =>
    post.id !== editedPost.id ? post : editedPost
  );
  localStorage.setItem("postData", JSON.stringify(localPosts));

  const blog = document.getElementById(`post-${id}`);
  blog.innerHTML = `<h2>${title}</h2>
    <span id="date-${id}">
      Posted on: <time datetime="${date}">${date}</time> 
    </span>
    <p>${summary}</p>
    <span hidden class="material-symbols-outlined" id="edit-icon-${id}">
        edit_note
    </span>

    <span hidden class="material-symbols-outlined" id="delete-icon-${id}">
        delete
    </span>
    `;
}


// Handle updating and deleting posts 
const post = (id, title, date, summary, docID) => {
  const blogPosts = document.getElementById(docID);
  const newBlog = document.createElement("article");
  newBlog.id = `post-${id}`;
  newBlog.innerHTML = `<h2>${title}</h2>
    <span id="date-${id}">
      Posted on: <time datetime="${date}">${date}</time> 
    </span>
    <p>${summary}</p>
    <span hidden class="material-symbols-outlined" id="edit-icon-${id}">
        edit_note
    </span>

    <span hidden class="material-symbols-outlined" id="delete-icon-${id}">
        delete
    </span>
    `;

  newBlog.innerHTML = DOMPurify.sanitize(newBlog.innerHTML);
  blogPosts.appendChild(newBlog);

  const editIcon = document.getElementById(`edit-icon-${id}`);
  const deleteIcon = document.getElementById(`delete-icon-${id}`);

  const currentBlog = document.getElementById(`post-${id}`);
  currentBlog.addEventListener("mouseover", () => {
    editIcon.style.display = "inline-block";
    deleteIcon.style.display = "inline-block";
  });

  currentBlog.addEventListener("mouseout", () => {
    editIcon.style.display = "none";
    deleteIcon.style.display = "none";
  });

  editIcon.addEventListener("click", () => {
    customdialog(`
      <form method="dialog" id="edit-form">
      <label for="post-title">Post Title:</label><br>
      <input type="text" id="post-title" name="post-title" value="${title}"required><br><br>
    
      <label for="post-date">Post Date:</label><br>
      <input type="date" id="post-date" name="post-date" value="${date}" required><br><br>
    
      <label for="post-summary">Post Summary:</label><br>
      <textarea id="post-summary" name="post-summary" rows="2" cols="30" required>${summary}</textarea><br><br>
    
      <input type="submit" value="Save">
      <button id="cancel-edit-button">Cancel</button>
    </form>
            `);

    const cancelButton = document.getElementById("cancel-edit-button");
    const dialog = document.querySelector("dialog");
    cancelButton.addEventListener("click", () => {
      dialog.close();
    });

    const editForm = document.getElementById("edit-form");
    editForm.addEventListener("submit", (e) => {
      const formObj = new FormData(e.target);
      const postData = {
        title: formObj.get("post-title"),
        date: formObj.get("post-date"),
        summary: formObj.get("post-summary"),
      };
      updatePostFromLocalStore(
        id,
        postData.title,
        postData.date,
        postData.summary
      );
    });
  });

  deleteIcon.addEventListener("click", () => {
    currentBlog.remove();
    removePostFromLocalStore(id);
  });
};

export default post;
