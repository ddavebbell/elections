document.addEventListener("DOMContentLoaded", function() {

	$.ajax({
		url: 'https://enchanto-election.herokuapp.com',
		method: 'GET',
		dataType: 'JSON'
	}).done(function(candidates){
			var list = document.querySelector('#list');
			for (var i = 0; i < candidates.candidates.length; i++) {

				let liTag = document.createElement('li');
				liTag.className = 'candidate'
				liTag.innerHTML = '<p>Name: <b>' + candidates.candidates[i].name + '</b></p><p>Votes: ' + candidates.candidates[i].votes + '</p>'
					list.appendChild(liTag);

				// Voting form and button
				var form = document.createElement('form');
				form.className = 'vote';
				form.setAttribute('method', 'POST');
				form.setAttribute('action', 'https://enchanto-election.herokuapp.com/votes?name=');
					list.appendChild(form);

				var button = document.createElement('button');
				button.innerText = `Vote: ${candidates.candidates[i].name}`

// need to get this to work
				button.addEventListener('submit', function(event){
					event.preventDefault();

					console.log(
						event
					);

				});


				button.setAttribute('type', 'submit');
				liTag.append(form);
				form.append(button);

				let bottomThing = document.createElement('p');
				bottomThing.innerText = '+-----------------------+'
				liTag.append(bottomThing);
				list.append(liTag);


				// hidden field
				var hidden = document.createElement('input');
				hidden.setAttribute('type', 'hidden');
				hidden.setAttribute('name', 'name');
				hidden.setAttribute('value', candidates.candidates[i].id);
				form.insertAdjacentElement('beforeend', hidden);
 			};

	 }).fail( function() {
		 alert('failed!!')
	 });




	//  $.ajax({
  // url: "https://enchanto-election.herokuapp.com/votes?id=",
  // type: "POST",
  // success: function(candidate) {

});
