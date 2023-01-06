let selected_moods = [];


const newPostFormHandler = async (event) => {
  console.log('STARTING createPost.js');
  event.preventDefault();

  const title = document.querySelector('#post-title-input').value.trim();
  const content = document.querySelector('#post-content-input').value.trim();
  // const spotifyEmbed = 

  const moodInput = document.querySelectorAll('.mood-input');
  for (let i = 0; i < moodInput.length; i++) {
    if (moodInput[i].checked) {
      selected_moods.push(moodInput[i].value);
    }
  }
  console.log('>>> selected_moods array: ', selected_moods);
  selected_moods = selected_moods.join(',');

  await fetch('/api/post', {
    method: 'POST',
    body: JSON.stringify({ title, content, selected_moods }),
    // body: JSON.stringify({ title, content, selected_moods, spotify_embed_code }),
    headers: { 'Content-Type': 'application/json' },
  });

  document.location.replace('/profile');
  };
