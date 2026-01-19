# I am using Express 5 or higher but in tutorial it was using 4 version

# Tip:
    - "scripts": {
    "start": "node src/app.js",
    "dev":"nodemon src/app.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  }

# Note: DB Connection name then collection name inside it

# req.query~ It is for "?" query parameters
# req.params~ For dynamic ids

# Middleware
  - If next() without res.send()~ Cannot get /user
  - If no res.send() or next() then infinte loop

# Note: First create schema then model
  - db.collection("User").find() or User.find() both are same but different syntax
  - .mongodb.net/devTinders ~ Correct way

# JSON Keys uses quotes ("") whereas JS Object Keys doesn't use them
# express.json()~ For converting JSON into JS object

# Validate on schema not on patch will work only for new document inserted we use runValidators in API to do this

# npm i validator~ For validation in MongoDB Schema & Express too
- In Mongoose, schema validation runs automatically for create and save, but NOT for update operations unless runValidators: true is used.