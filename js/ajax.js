// Set up page
$(function() {
  // attach form submission to search function
  $('#searchForm').on('submit', search);
});
function search(event) {
	
  // prevent submit redirect
  event.preventDefault();

  clearSearchResults();

// get user input + save it in var userInput
// First word of input placeholder = default value.
var userInput = $('#query').val() || 'dank';
  console.log('user input was', userInput);

  $.get('https://www.reddit.com/search.json', {
  q: userInput,
  limit: 10
  }).done(function(response) {
  	console.log(response.data.children);
  	addSearchResult(response.data.children);
  });
}

// Clear previous search results.
function clearSearchResults() {
	// document.getElementById('results').value = '';
	$('#results').html('');
}

// Adds a single result object to the page.
function addSearchResult(results) {
	for (var i = 0; i < results.length; i++) {
		console.log(results[i].data.title);

// create <div> to contain search result link
	var div = document.createElement('div');

	    // create an <a> tag
	    // var a =  $('<a>');
	    var a = document.createElement('a');
	    a.href = results[i].data.url;
	    a.textContent = results[i].data.title;

	    var img = document.createElement('img');
	    img.src = results[i].data;

	    // put the link inside div
	    $(div).append(img);
	    $(div).append(a);

	    // add <div> to the list of search results
	    $('#results').append(div);
	}
}