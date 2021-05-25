async function editFormHandler(event) {
    event.preventDefault();

    const team_name = document.querySelector('input[name="team_name"]').value.trim();
    const team_type = document.querySelector('input[name="team_type"]').value.trim();
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length -1
    ];
    const response = await fetch(`/api/team_edit/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            team_name,
            team_type
        }),
        header: {
            'Content-Type': 'application/json'
        }
    });
    if(response.ok) {
        console.log(response);
        document.location.replace('/teamroster');        
    }else{
        alert(response.statusText);
    }
}

document.querySelector('.edit-team').addEventListener('submit', editFormHandler);