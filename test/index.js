window.jQuery(function () {

  var _ = window._;
  var app = window.app;
  var test = window.test;
  var equal = window.equal;

  module('Hubbub');

  test('repo url is correct', function () {
    var repo = new app.Repo.Model({
      name: 'backbone',
      owner: {login: 'backstopmedia'}
    });
    var url = 'https://api.github.com/repos/backstopmedia/backbone';
    equal(_.result(repo, 'url'), url);
  });

  test('repo issues url is correct', function () {
    var repo = new app.Repo.Model({
      name: 'backbone',
      owner: {login: 'backstopmedia'}
    });
    var url = 'https://api.github.com/repos/backstopmedia/backbone/issues';
    equal(_.result(repo.issues, 'url'), url);
  });

  test('repo should have an owner/name style displayName', function () {
    var repo = new app.Repo.Model({
      name: 'backbone',
      owner: {login: 'backstopmedia'}
    });
    equal(repo.displayName(), 'backstopmedia/backbone');
  });

  test('adding a repo to the board should persist the repo', function () {
    var board = new app.Board.Model();
    var repo = new app.Repo.Model({
      id: 1,
      name: 'backbone',
      owner: {login: 'bob'}
    });
    board.repos.add(repo);

    var repos = app.Repo.Collection.withOwner('bob');
    repos.fetch();
    equal(repos.length, 1);
    repo.destroy();
    board.destroy();
  });
});
