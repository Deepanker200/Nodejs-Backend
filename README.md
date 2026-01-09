# I am using Express 5 or higher but in tutorial it was using 4 version

# Tip:
    - "scripts": {
    "start": "node src/app.js",
    "dev":"nodemon src/app.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  }

# req.query~ It is for "?" query parameters
# req.params~ For dynamic ids

# Middleware
  - If next() without res.send()~ Cannot get /user
  - If no res.send() or next() then infinte loop

# Note: First create schema then model
  - db.collection("User").find() or User.find() both are same but different syntax
  - .mongodb.net/devTinders ~ Correct way