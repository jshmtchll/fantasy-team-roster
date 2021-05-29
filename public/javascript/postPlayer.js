const submitPlayerBtn = document.querySelector('#submitPlayerBtn');

async function sendPlayer(event) {
  event.preventDefault();

  const first_name = document.querySelector('#firstname').value;
  const last_name = document.querySelector('#lastname').value;
  const position_played = document.querySelector('#position').value;
  const teamIndex = document.querySelector('#team-name').selectedIndex
  const team_id = document.querySelector('#team-name').options[teamIndex].value;
  const sports_team_name = document.querySelector('#team-name').options[teamIndex].innerHTML;
  const age = document.querySelector('#age').value;
  const win_percent = document.querySelector('#win-percent').value;

  if(first_name && last_name && position_played && team_id && age) {
    const response = await fetch('/api/team-members/', {
      method: 'post',
      body: JSON.stringify({
        first_name,
        last_name,
        position_played,
        team_id,
        sports_team_name,
        age,
        win_percent
      }),
      headers: { 'Content-Type': 'application/json' }
    })
    if(response.ok) {
      console.log('success')
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText)
    }
  } 
}

submitPlayerBtn.addEventListener('click', sendPlayer)