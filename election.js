document.addEventListener("DOMContentLoaded", function() {
	$.ajax({
		url: 'https://enchanto-election.herokuapp.com',
		method: 'GET',
		dataType: 'JSON'
	}).done(function(response){
			var list = document.querySelector('#list');
			const candidates = response.candidates;

			for (var i = 0; i < candidates.length; i++) {
				const candidate = candidates[i]
				let liTag = candidateLiTag(list, candidate)
				let form = candidateForm(list, candidate)

				var button = document.createElement('button');
				button.innerText = `Vote: ${candidates[i].name}`

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
				hidden.setAttribute('value', candidates[i].id);
				form.insertAdjacentElement('beforeend', hidden);
 			};

	 }).fail( function() {
		 alert('failed!!')
	 });
});

function candidateLiTag(list, candidate) {
	let li = document.createElement('li');
	li.className = 'candidate'
	li.innerHTML = `<p>Name: <b>${candidate.name}</b></p><p>Votes: ${candidate.votes}</p>`
	list.appendChild(li);
	return li;
}

function candidateForm(list, candidate) {
	let form = document.createElement('form');
	form.className = 'vote';
	form.setAttribute('method', 'POST');
	form.setAttribute('action', `https://enchanto-election.herokuapp.com/votes?id=${candidate.id}`);
	list.appendChild(form);
	return form;
}
