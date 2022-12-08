$(document).ready(function() {

  const $form = $('#tweet-form');
  loadTweets();
  $form.on('submit', tweetSubmitted);

});

const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const tweetSubmitted = (event) => {
  event.preventDefault();
  
  if (!$('#tweet-text').val()) {
    $('#error-msg-null').slideDown("slow", () => {});
    return setTimeout(() => $('.errors').slideUp(), 5000);
  }

  if ($('#tweet-text').val().length > 140) {
    $('#error-msg-length').slideDown("slow", () => {});
    return setTimeout(() => $('.errors').slideUp(), 5000);
  }


  const result = $('#tweet-form').serialize();
  $.post('/tweets', result, () => {
    $('#tweet-text').val('');
    $('.counter').text(140);
    loadTweets();
  });

};

const loadTweets = () => {
  $.get('/tweets', (tweets) => {
    

    renderTweets(tweets);

  });
};



const createTweetElement = function(tweetObj) {
  const name = tweetObj.user.name;
  const avatar = tweetObj.user.avatars;
  const handle = tweetObj.user.handle;
  const text = tweetObj.content.text;
  const date = tweetObj.created_at;
  const $tweet = $(`<article>

  <header>
    <div>
      <img src="${avatar}">
    <span>${name}</span>
    </div>
    <div>
      <i><strong>${handle}</strong></i>
    </div>
  </header>
  <p>${escape(text)}</p>
  <footer>
    <hr>
    <div>
      <i>${timeago.format(date)}</i>
      <div>
        <i class="fa-solid fa-flag"></i>
        <i class="fa-solid fa-retweet"></i>
        <i class="fa-solid fa-heart"></i>
        <i class="likes">1</i>
      </div>
    </div>
  </footer>
</article>`);
  return $tweet;
};


const renderTweets = function(tweets) {
  $('#tweet-container').empty();
  for(const tweet of tweets ) {
  const element = createTweetElement(tweet)
  // calls createTweetElement for each tweet
  $('#tweet-container').prepend(element);
  }

}


