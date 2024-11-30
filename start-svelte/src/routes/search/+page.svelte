<!-- <script>
  import { onDestroy } from 'svelte';

  let searchQuery = '';
  let suggestions = [];
  let timeout = null;

  const handleSearch = () => {
      alert(`검색어: ${searchQuery}`);
  };

  const fetchSuggestions = (query) => {
      if (query.length > 0) {
          fetch(`/suggest?q=${encodeURIComponent(query)}`)
              .then((response) => response.json())
              .then((data) => {
                  suggestions = data;
              })
              .catch((error) => {
                  console.error(error);
              });
      } else {
          suggestions = [];
      }
  };

  const handleInput = () => {
      clearTimeout(timeout);
      const query = searchQuery;

      timeout = setTimeout(() => {
          fetchSuggestions(query);
      }, 300); // 300ms 지연 (디바운스)
  };

  onDestroy(() => {
      clearTimeout(timeout);
  });
</script>

<style>
  .search-container {
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
  #suggestions {
      margin-top: 0.5rem;
      max-width: 300px;
      margin-left: auto;
      margin-right: auto;
      text-align: left;
  }
  .suggestion-item {
      display: block;
      width: 100%;
      padding: 0.5rem;
      background-color: #73adec;
      border: none;
      text-align: left;
      cursor: pointer;
  }
  .suggestion-item:hover {
      background-color: #e9e9e9;
  }
</style>

<div class="search-container">
  <h1>검색 페이지</h1>
  <input
      type="text"
      bind:value={searchQuery}
      placeholder="검색어를 입력하세요"
      autocomplete="off"
      on:input={handleInput}
  />
  <div id="suggestions">
      {#if suggestions.length > 0}
          {#each suggestions as flower}
              <button
                  type="button"
                  class="suggestion-item"
                  on:click={() => {
                      searchQuery = flower.name;
                      suggestions = [];
                  }}
              >
                  {flower.name}
              </button>
          {/each}
      {/if}
  </div>
  <button on:click={handleSearch}>검색</button>
</div> -->

<script>
    import { onDestroy } from 'svelte';
    import { goto } from '$app/navigation';

    let searchQuery = '';
    let suggestions = [];
    let timeout = null;

    const handleSearch = () => {
        // 검색 결과 페이지로 이동
        goto(`/search/${encodeURIComponent(searchQuery)}`);
    };

    const fetchSuggestions = (query) => {
        if (query.length > 0) {
            fetch(`/suggest?q=${encodeURIComponent(query)}`)
                .then((response) => response.json())
                .then((data) => {
                    suggestions = data;
                })
                .catch((error) => {
                    console.error(error);
                });
        } else {
            suggestions = [];
        }
    };

    const handleInput = () => {
        clearTimeout(timeout);
        const query = searchQuery;

        timeout = setTimeout(() => {
            fetchSuggestions(query);
        }, 300); // 300ms 지연 (디바운스)
    };

    onDestroy(() => {
        clearTimeout(timeout);
    });
</script>

<style>
    .search-container {
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
    #suggestions {
        margin-top: 0.5rem;
        max-width: 300px;
        margin-left: auto;
        margin-right: auto;
        text-align: left;
    }
    .suggestion-item {
        display: block;
        width: 100%;
        padding: 0.5rem;
        background-color: #73adec;
        border: none;
        text-align: left;
        cursor: pointer;
    }
    .suggestion-item:hover {
        background-color: #e9e9e9;
    }
</style>

<div class="search-container">
    <h1>검색 페이지</h1>
    <input
        type="text"
        bind:value={searchQuery}
        placeholder="검색어를 입력하세요"
        autocomplete="off"
        on:input={handleInput}
    />
    <div id="suggestions">
        {#if suggestions.length > 0}
            {#each suggestions as flower}
                <button
                    type="button"
                    class="suggestion-item"
                    on:click={() => {
                        searchQuery = flower.name;
                        suggestions = [];
                    }}
                >
                    {flower.name}
                </button>
            {/each}
        {/if}
    </div>
    <button on:click={handleSearch}>검색</button>
</div>
