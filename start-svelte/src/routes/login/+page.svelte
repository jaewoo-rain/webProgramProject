<script>
  let id = '';
  let password = '';
  let message = '';

  const handleLogin = async () => {
    const response = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id, password })
    });

    const result = await response.json();
    console.log(result)
    message = result.message;
    
  };
</script>

<style>
  .login-container {
    margin: 2rem;
    text-align: center;
  }
  input {
    padding: 0.5rem;
    font-size: 1rem;
    margin-right: 0.5rem;
  }
  button {
    padding: 0.5rem 1rem;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
</style>

<div class="login-container">
  <h1>로그인 페이지</h1>
  <input type="text" bind:value={id} placeholder="아이디를 입력하세요" />
  <br><input type="password" bind:value={password} placeholder="비밀번호를 입력하세요" />
  <br><button on:click={handleLogin}>로그인</button>
  {#if message}
    <p>{message}</p>
  {/if}
</div>