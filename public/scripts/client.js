  const createTweetElement = function(tweetObj) {
  const name = tweetObj.user.name;
  const avatar = tweetObj.user.avatars;
  const handle = tweetObj.user.handle;
  const text = tweetObj.content.text;
  const date = tweetObj.created_at; /// time ago, will have to come back and format
  
  const $tweet = $(`<article class="tweet-spot">
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
      <i>${date}</i>
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
  
  for(const tweet of tweets ) {
  const element = createTweetElement(tweet)
  // calls createTweetElement for each tweet
  $('#tweet-container').prepend(element);
  }

}





// Fake data taken from initial-tweets.json
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]


// Test / driver code (temporary). Eventually will get this from the server.
const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
    "handle": "@SirIsaac"
  },
  "content": {
    "text": "If I have seen further it is by standing on the shoulders of giants"
  },
  "created_at": 1461116232227
};


$(document).ready(function() {
  renderTweets(data);

  const $form = $('#tweet-form');
  $form.on('submit', (event) => {
    event.preventDefault();
    const result = $form.serialize();
    $.post('/tweets', result, (response) => {

      const loadTweets = () => {
        $.get('/tweets', (tweets) =>{
          renderTweets(tweets)
        });
      }
      loadTweets()
    });
  });
});