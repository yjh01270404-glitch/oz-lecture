const apiUrl = "https://jsonplaceholder.typicode.com";

async function displayPostDetail() {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get("postId");
    if (!postId) throw new Error("No post ID provided");

    const cacheKey = `post_${postId}`;
    const cachedData = localStorage.getItem(cacheKey);

    let post;

    if (cachedData) {
      const parsed = JSON.parse(cachedData);
      const now = Date.now();
      const isValid = now - parsed.timestamp < 5 * 60 * 1000;

      if (isValid) {
        post = parsed.data;
        console.log("Post loaded from localStorage");
      } else {
        localStorage.removeItem(cacheKey);
      }
    }

    if (!post) {
      const response = await fetch(`${apiUrl}/posts/${postId}`);
      if (!response.ok) throw new Error("Failed to fetch post");
      post = await response.json();

      localStorage.setItem(
        cacheKey,
        JSON.stringify({
          data: post,
          timestamp: Date.now()
        })
      );

      console.log("Post fetched from API");
    }

    renderPost(post);
  } catch (error) {
    console.error("Error:", error.message);
    document.getElementById("post-detail").innerHTML =
      "<p>Error loading post details</p>";
  }
}

function renderPost(post) {
  const postDetail = document.getElementById("post-detail");
  postDetail.innerHTML = `
        <h3>${post.title}</h3>
        <p>${post.body}</p>
    `;
}

displayPostDetail();
