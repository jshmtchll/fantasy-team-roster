//function used for grabbing data from a newly created team and sending it to the database through a fetch request
const submitTeamBtn = document.querySelector('#submitTeamBtn');

async function sendTeam(event) {
  event.preventDefault();

  const team_type = document.querySelector('input[name=teamType]:checked').placeholder;
  const team_name = document.querySelector('#teamName').value.trim()
  console.log(team_type, team_name);

  if(team_name && team_type) {
    const response = await fetch('/api/teams/', {
      method: 'post',
      body: JSON.stringify({
        team_type,
        team_name
      }),
      headers: {'Content-Type': 'application/json'}
    })
    if(response.ok) {
      console.log('success');
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText)
    }
  }
}

submitTeamBtn.addEventListener('click', sendTeam)