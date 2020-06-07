$(document).ready(function () {
  $('#searchUser').on('keyup', function (event) {
    let username = event.target.value;
    $.ajax({
      url: 'https://api.github.com/users/' + username,
      data: {
        client_id: '72499a9b336c045ade63',
        client_secret: '88145f8e3bfdb619666e2a92bbb7a40523819f26',
      },
    }).done(function (user) {
      $.ajax({
        url: 'https://api.github.com/users/' + username + '/repos',
        data: {
          client_id: '72499a9b336c045ade63',
          client_secret: '88145f8e3bfdb619666e2a92bbb7a40523819f26',
          sort: 'created: asc',
          per_page: 15,
        },
      }).done(function (repos) {
        $.each(repos, function (index, repo) {
          $('#repos').append(`
            <div class="table-success table table-hover">
            <div class="row">
            <div class="col-md-6">
            <strong>${repo.name}</strong>: ${repo.description}
            </div>
            <div class="col-md-3">
            <button type="button" class="btn btn-primary">Forks: ${repo.forks_count}</button>
            <button type="button"  class="btn btn-warning">Watchers: ${repo.watchers_count}</button>
            <button type="button" class="btn btn-success">Stars: ${repo.stargazers_count}</button>
            
            </div>
            <div class="col-md-3">
            <button type="button" class="btn btn-success">Language(s): ${repo.language}</button>
            <a href="${repo.html_url}" class="btn btn-info" target="_blank">Repo Page</a>
            <button type="button" class="btn btn-secondary"> Issues: ${repo.open_issues_count}</button>
            </div>

            </div>
            </div>
            `);
        });
      });
      $('#profile').html(`
      <div class="card bg-secondary mb-3">
  <h3 class="card-header">${user.name}</h3>
 
  <div class="card-body">
 <div class="row">
 <div class="col-md-3">
 <img class="thumbnail avatar"  src="${user.avatar_url}"><br><br>
 <a class="btn btn-primary btn-block" href="${user.html_url}" target="_blank">View Profile</a>
 </div>
 
 <div class="col-md-9">
 <button type="button" class="btn btn-primary">Public Repos: ${user.public_repos}</button>
<button type="button"  class="btn btn-warning">Public Gists: ${user.public_gists}</button>
<button type="button" class="btn btn-success">Followers: ${user.followers}</button>
<button type="button" class="btn btn-info">Following: ${user.following}</button>
<br>
<br>
<ul class="list-group">
<li class="list-group-item">Bio: ${user.bio}</li>
<li class="list-group-item">Company: ${user.company}</li>
<li class="list-group-item">Website/blog: ${user.blog}</li>
<li class="list-group-item">Location: ${user.location}</li>
<li class="list-group-item">Member Since: ${user.created_at}</li>
</ul>
 </div>   
    
  </div>
</div>
<h3 class="page-header">Latest Repos</h3>
<div id="repos">
</div>
    `);
    });
  });
});
