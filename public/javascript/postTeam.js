//function used for grabbing data from a newly created team and sending it to the database through a fetch request
const submitTeamBtn = document.querySelector('#submitTeamNameBtn');

async function sendTeam(event) {
  event.preventDefault();

  const teamType = document.querySelector('input[name=teamType]').value.trim()
  const teamName = document.querySelector('#teamName').value.trim()
  
  if(teamName && teamType) {
    const response = await fetch('/teams/', {
      method: 'post',
      body: JSON.stringify({
        teamType,
        teamName
      }),
      headers: {'Content-Type': 'application/json'}
    })
    if(response.ok) {
      console.log('success')
    } else {
      alert(response.statusText)
    }
  }
}

submitTeamBtn.addEventListener('click', sendTeam)