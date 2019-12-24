const userTable = document.getElementById('users');
const URL = 'http://mtg.justingajitos.com/api/users/';

const deleteUser = e => {
  if (e.target.nodeName === 'BUTTON') {
    const username = e.target.parentElement.parentElement.getAttribute('data-username');

    console.log(e.target.parentElement.parentElement.getAttribute('data-username'));

    fetch(URL + username, {
      method: 'DELETE'
    })
      .then(res => {
        console.log(res.status);
        location.reload();
      })
      .catch(err => console.log(err));
  }
};

userTable.addEventListener('click', deleteUser);
