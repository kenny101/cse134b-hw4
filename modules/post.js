const post = (id, title, date, summary, docID) => {
  const blogPosts = document.getElementById(docID);
  const newBlog = document.createElement("article");
  newBlog.id = `post-${id}`;
  newBlog.innerHTML = `<h2>${title}</h2>
    <span id="date-${id}">
      Posted on: <time datetime="${date}">${date}</time> 
    </span>
    <p>${summary}</p>
    `;
  newBlog.innerHTML = DOMPurify.sanitize(newBlog.innerHTML);
  blogPosts.appendChild(newBlog);
};

export default post;
