<!-- src/routes/search/[query]/+page.svelte -->
<script>
    export let data;

    let results = data.results;
    let comments = results.comments;
</script>

<h1>검색 결과:</h1>
<p>이름 : {results.name}</p>
<p>개화시기 : {results.bloomingTime}</p>
<p>설명 : {results.description}</p>
<p></p>

    <h1>댓글:</h1>
    <ul>
        {#each comments as comment}
            <li>
                <p>작성자 : {comment.commentAuthor}</p>
                <p>댓글 : {comment.context}</p>
            </li>
        {/each}
    </ul>

