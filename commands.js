use ecommerce
db.createUser({
  user: "johndoe",
  pwd: "mypassword",
  roles: [{ role: "readWrite", db: "mydatabase" }]
})
