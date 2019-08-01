document.addEventListener("DOMContentLoaded", async function() {
	const candidates = await fetchCandidates();
	const list = document.querySelector('#list');

	for (var i = 0; i < candidates.length; i++) {
		const candidate = candidates[i]
		constructForm(list, candidate)
	};
});

function constructForm(list, candidate) {
	let liTag = candidateLiTag(list, candidate);
	let form = candidateForm(list, candidate);
	let submit = submitInputTag(candidate);
	liTag.append(form);
	form.append(submit);
	createDivider(liTag)
	list.append(liTag);
	createHiddenField(form, candidate)
}

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

	form.addEventListener('submit', function(event){
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

function createHiddenField(form, candidate) {
	hidden = document.createElement('input');
	hidden.setAttribute('type', 'hidden');
	hidden.setAttribute('name', 'id');
	hidden.setAttribute('value', candidate.id);
	form.insertAdjacentElement('beforeend', hidden);
}
