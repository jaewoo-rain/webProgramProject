<script>
    import { onMount } from "svelte";
    import { page } from "$app/stores";
  
    let flower = {};
    let comments = [];
    let newComment = "";
  
    onMount(async () => {
      const response = await fetch(`/flower/${$page.params.id}`);
      flower = await response.json();
      comments = flower.comments || [];
    });
  
    function addComment() {
      if (newComment.trim()) {
        comments = [...comments, newComment];
        newComment = ""; // 입력 초기화
      }
    }
  
    // 유효한 Google Maps Embed URL
    let mapSrc = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345093945!2d144.95373531550468!3d-37.81627927975195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0x5045675218ce6e0!2sMelbourne%20VIC%2C%20Australia!5e0!3m2!1sen!2sus!4v1671111111111!5m2!1sen!2sus";
  </script>
  
  <style>
    .container {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 20px;
    }
  
    .header {
      font-size: 2rem;
      font-weight: bold;
      margin-bottom: 20px;
    }
  
    .content {
      display: flex;
      width: 100%;
      max-width: 1200px;
      gap: 20px;
      margin-bottom: 20px;
    }
  
    .left {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
    }
  
    .photo {
      width: 100%;
      max-width: 400px;
      height: 300px;
      background-color: #f0f0f0;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.2rem;
      color: #555;
      border: 1px solid #ddd;
    }
  
    .right {
      flex: 1;
      iframe {
        width: 100%;
        height: 300px;
        border: none;
      }
    }
  
    .description {
      text-align: center;
      font-size: 1.2rem;
      margin-bottom: 20px;
    }
  
    .comments {
      width: 100%;
      max-width: 800px;
    }
  
    .comments textarea {
      width: 100%;
      height: 80px;
      margin-bottom: 10px;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
      resize: none;
    }
  
    .comments button {
      padding: 10px 20px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
  
    .comments button:hover {
      background-color: #0056b3;
    }
  
    .comment-list {
      margin-top: 20px;
    }
  
    .comment {
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
      margin-bottom: 10px;
      background-color: #f9f9f9;
    }
  </style>
  
  <div class="container">
    <!-- 상단 꽃 이름 -->
    <div class="header">{flower.name}</div>
  
    <!-- 좌측 사진 / 우측 지도 -->
    <div class="content">
      <div class="left">
        <div class="photo">Flower Photo</div>
      </div>
      <div class="right">
        <iframe src={mapSrc} loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
      </div>
    </div>
  
    <!-- 텍스트 박스 설명 -->
    <div class="description">{flower.description}</div>
  
    <!-- 댓글 섹션 -->
    <div class="comments">
      <textarea
        bind:value={newComment}
        placeholder="댓글을 입력하세요..."
      ></textarea>
      <button on:click={addComment}>댓글 추가</button>
  
      <div class="comment-list">
        {#each comments as comment}
          <div class="comment">{comment}</div>
        {/each}
      </div>
    </div>
  </div>