const posts = [
	{
		username: 'mansimar@email.com',
		title: 'title-1'
	},
	{
		username: 'xyz@z.com',
		title: 'title-2'
	}
];

function getPosts(request, response) {
	console.log(request.user);
  response.json(posts.filter(post => post.username === request.user.credential));
}

module.exports = {
	getPosts,
}