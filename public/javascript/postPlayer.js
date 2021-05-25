const submitPlayerBtn = document.querySelector('#submitPlayerBtn');

async function sendPlayer() {

  const first_name = document.querySelector('#firstname').value.trim();
  const last_name = document.querySelector('#lastname').value.trim();
  const position_played = document.querySelector('#position').value.trim();

  if(first_name && last_name && position_played) {
    const response = await fetch('/team-members/', {
      method: 'post',
      body: JSON.stringify({
        first_name,
        last_name,
        position_played
      }),
      headers: { 'Content-Type': 'application/json' }
    })
    if(response.ok) {
      console.log('success')
    } else {
      alert(response.statusText)
    }
  } 
}

submitPlayerBtn.addEventListener('click', sendPlayer)