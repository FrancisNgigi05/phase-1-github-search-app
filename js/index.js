const formSubmission = document.getElementById('github-form');

// Submission event listener
formSubmission.addEventListener('submit', function(event) {
	// Preventing reloading of the page
	event.preventDefault();

	// getting the value of the serch input
	const searchInput = document.getElementById('search').value;

	// fetching the serch input from the api
	fetch (`https://api.github.com/search/users?q=${searchInput}`)
		.then(response => response.json())// Getting the response back in json format
		.then(data => {
			// The variables to append the data
			const userList = document.getElementById('user-list');
			const repoosList = document.getElementById('repos-list');

			// Clear previous search results
			userList.innerHTML = '';
			repoosList.innerHTML= '';
			// Creating a loop for generating lists and appending thos lists one by one
			for (const item of data.items) {
				// list of users and profile
				const userli = document.createElement('li');
				userli.textContent = `User: ${item.login}, Profile: ${item.html_url}`

				// Appending the list created at the ul with the id="users-list"
				userList.appendChild(userli);

				// If data is a repo
				if (item.repos_url) {
					fetch(item.repos_url)
						.then(response => response.json())
						.then(repoData => {
							// Creating a list to store the repos
							for (const repo of repoData){
								const repoli = document.createElement('li')
	
								repoli.textContent = `Repository: ${repo.name}, URL: ${repo.html_url}`;
	
								// Appending the repo info at the ul with the id=repos-list
								repoosList.appendChild(repoli);
							}
						})
						.catch(error => {
							console.error('Error fetchig user repos: ', error)
						})
				}
			}
		})
		.catch (error => {
			console.error('Error fetching github users: ', error)
		})
})
