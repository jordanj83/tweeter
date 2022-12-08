$(document).ready(function() {

  const $form = $('#tweet-form');
  loadTweets();
  $form.on('submit', tweetSubmitted);

});

const tweetSubmitted = (event) => {
  event.prevent
  if (!$('#tweet-text').val()) {
    return alert('invalid submission');
  }


  if ($('#tweet-text').val().length > 140) {
    return alert('message exceeds limit');
  }


  event.preventDefault();
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
  const date = tweetObj.created_at; /// time ago, will have to come back and format
  
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
  <p>${text}</p>
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


