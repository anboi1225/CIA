// console.log(__dirname);

module.exports = function(app, passport){

  // app.use(function(err, req, resp, next){
  //   resp.json()
  // })

  app.get("/profile", isLoggedIn);
  app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });
	app.get("*", function(req, resp){
		resp.sendFile("modules/core/client/views/core.client.index.html", {root : "./"});
	});
  app.post('/signup',function(req, res, next){
    passport.authenticate('local-signup', function(err, user, info){
      if(!user) {res.json({type: "error", info: info.message});}
      else {res.json(req.user);}
    })(req, res, next);
  });
  app.post('/signin', function(req, res, next) {
    passport.authenticate('local-signin', function(err, user, info) {
      if (err) { return next(err); }
      if (!user) { res.json({type: "error", info: info.message}); }
      req.logIn(user, function(err) {
        if (err) { return next(err); }
        res.json(req.user);
      });
    })(req, res, next);
  });  
  /*
    never use app.use out of server.js
    app.use("/user/restful", userCRUD);
  */
}

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();
    // if they aren't redirect them to the home page
    res.redirect('/');
}