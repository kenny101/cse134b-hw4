import customdialog from "../modules/customdialog.js";
import post from "../modules/post.js";

const postHandler = {
  doc: document.getElementById("add-btn"),
  posts: [],
  loadPostsFromLocalStore() {
    if (localStorage.getItem("postData")) {
      const addedIds = new Set();
      let localPosts = JSON.parse(localStorage.getItem("postData"));
      localPosts.forEach((obj) => {
        const curId = String(obj.id);
        if (!addedIds.has(curId)) {
          this.posts.push(obj);
        }
        addedIds.add(obj.id);
      });
    }
    this.updateLocalStorePosts();
  },
  updateLocalStorePosts() {
    localStorage.setItem("postData", JSON.stringify(this.posts));
  },
  getAndUpdateId() {
    if (!localStorage.id) {
      localStorage.id = 0;
    }
    localStorage.id = parseInt(localStorage.id) + 1;
    return localStorage.id;
  },
  addClickHandler() {
    this.doc.addEventListener("click", () => {
      customdialog(`
      <form method="dialog" id="post-form"> 
      <label for="post-title">Post Title:</label><br>
      <input type="text" id="post-title" name="post-title" required><br><br>
    
      <label for="post-date">Post Date:</label><br>
      <input type="date" id="post-date" name="post-date" required><br><br>
    
      <label for="post-summary">Post Summary:</label><br>
      <textarea id="post-summary" name="post-summary" rows="2" cols="30" required></textarea><br><br>
    
      <input type="submit" value="Submit">
      <button id="cancel-button">Cancel</button>
    </form>
            `);

      const postForm = document.getElementById("post-form");

      const cancelButton = document.getElementById("cancel-button");
      const dialog = document.querySelector("dialog");

      cancelButton.addEventListener("click", () => {
        postForm.setAttribute("novalidate", "");
        dialog.close();
      });

      postForm.addEventListener("submit", (e) => {
        // novalidate attribute indicates that the cancel button was clicked
        if (postForm.hasAttribute("novalidate")) {
          return;
        }

        const formObj = new FormData(e.target);
        const postData = {
          id: this.getAndUpdateId(),
          title: formObj.get("post-title"),
          date: formObj.get("post-date"),
          summary: formObj.get("post-summary"),
        };

        post(
          postData.id,
          postData.title,
          postData.date,
          postData.summary,
          "blog-posts"
        );
        this.posts.push(postData);
        this.loadPostsFromLocalStore();
      });
    });
  },
  loadAllPosts() {
    this.loadPostsFromLocalStore();
    this.posts.forEach(({ id, title, date, summary }) => {
      post(id, title, date, summary, "blog-posts");
    });
  },
};

postHandler.addClickHandler();
postHandler.loadAllPosts();
