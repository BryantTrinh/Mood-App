let choice = 0;
let emoji1 = document.getElementById('emoji1');
let emoji2 = document.getElementById('emoji2');
let emoji3 = document.getElementById('emoji3');
let emoji4 = document.getElementById('emoji4');
let emoji5 = document.getElementById('emoji5');
let selected_moods = [];

const newPostFormHandler = async (event) => {
  console.log('STARTING createPost.js');
  event.preventDefault();

  const title = document.querySelector('#post-title-input').value.trim();
  const content = document.querySelector('#post-content-input').value.trim();

  const moodInput = document.querySelectorAll('.mood-input');
  for (let i = 0; i < moodInput.length; i++) {
    if (moodInput[i].checked) {
      selected_moods.push(moodInput[i].value);
    }
  }
  console.log('>>> selected_moods array: ', selected_moods);

  // make array to string here and put in POST request for a new column "moods" e.g. '1, 4'
  // then in GET request, split the string over the commas to turn back into array
  // then loop over array to assign each number in the array to the corresponding mood emoji
  selected_moods = selected_moods.join(',');
  // console.log('>>> selected moods: ', selected_moods);
  // console.log('>>> title: ', title);
  // console.log('>>> content: ', content);
  
  await fetch('/api/post', {
    method: 'POST',
    body: JSON.stringify({ title, content, selected_moods }),
    headers: { 'Content-Type': 'application/json' },
  });

  document.location.replace('/profile');
  };

// const selectEmojis = async (event) => {
//   console.log('SELECTING emojis');
//   event.preventDefault();

  event.target.classList.remove('filter-grey');
}

function changeEmojiFilter() {
  emoji1.classList.remove("clicked");
  emoji2.classList.remove("clicked");
  emoji3.classList.remove("clicked");

  if (choice === 1) {
    emoji1.classList.add("clicked");
  } else if (choice === 2) {
    emoji2.classList.add("clicked");
  } else if (choice === 3) {
    emoji3.classList.add("clicked");
  }
}

function selectChoice(emojiId) {
  if (choice !== emojiId) {
    choice = emojiId;
  } else if (choice === emojiId) {
    choice = 0;
  }
  changeEmojiFilter();
}