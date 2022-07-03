function makeFriendsList(friends) {

  let ul = document.createElement('ul');
  friends.forEach((friend) => {
    let li = document.createElement('li');
    li.innerHTML = friend.firstName + ' ' + friend.lastName;
    ul.appendChild(li);
  });
  return ul;
}
