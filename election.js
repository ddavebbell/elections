document.addEventListener("DOMContentLoaded", async function() {
	let candidates = await fetchCandidates();
	var list = document.querySelector('#list');

	for (var i = 0; i < candidates.length; i++) {
		const candidate = candidates[i]
		let liTag = candidateLiTag(list, candidate)
		let form = candidateForm(list, candidate)
		let submit = submitInputTag(candidate)

		form.addEventListener('submit', function(event){
			// event.preventDefault();

			$.ajax({
				url: 'http://localhost:3000/votes',
				method: 'POST',
				dataType: 'JSON',
				data: {id: this.querySelector('input[type=hidden]').value}
			}).done(function(response){
				console.log(`Vote submitted!`)
			}).fail(function(response){
				console.log('Voted Failed!')
			})

			window.location.href = 'index.html';
		});

		// Group and append the li
		liTag.append(form);
		form.append(submit);
		createDivider(liTag)
		list.append(liTag);


		// hidden field
		var hidden = document.createElement('input');
		hidden.setAttribute('type', 'hidden');
		hidden.setAttribute('name', 'id');
		hidden.setAttribute('value', candidates[i].id);
		form.insertAdjacentElement('beforeend', hidden);
	};
});

async function fetchCandidates() {
	let candidates;
	await $.ajax({
		url: 'http://localhost:3000',
		method: 'GET',
		dataType: 'JSON'
	}).done(function(response) {
		candidates = response.candidates;
	}).fail(function(response) {
		alert('failed!!')
	})
	return candidates;
}

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
	form.setAttribute('action', '');
	list.appendChild(form);
	return form;
}

function createDivider(liTag) {
	let divider = document.createElement('p');
	divider.innerText = '+-----------------------+'
	liTag.appendChild(divider);
}

function submitInputTag(candidate) {
	let submit = document.createElement('input');
	submit.value = `Vote: ${candidate.name}`
	submit.setAttribute('type', 'submit');
	return submit;
}

// candidate = `<li>Name: ${response.candidates[i].name}<br>Votes: ${response.candidates[i].votes}
// <form id="form${i}" action="POST" action=action="https://bb-election-api.herokuapp.com/vote">
// <input type="submit" value="Vote!">
// <input type="hidden" name=${response.candidates[i].name} value=${response.candidates[i].name}>
// </form>
// </li><br>`;
// election.insertAdjacentHTML('beforeend',candidate)
//
// var forms = document.querySelectorAll('form')
//
// forms[i].addEventListener('submit',function(e){
// 	e.preventDefault();
// 	$.ajax({
// 		url: 'https://bb-election-api.herokuapp.com/vote',
// 		method: 'POST',
// 		dataType: 'JSON',
// 		data: {name: this.querySelector('input[type=hidden]').value}
// 	}).done(function(){
// 		console.log(`Vote submitted!`)
// 	}).fail(function(){
// 		console.log('Voted Failed!')
// 	})
// });
