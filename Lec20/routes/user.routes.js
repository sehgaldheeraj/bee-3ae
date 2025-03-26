const router = require("express").Router();
router.get("/register", (req, res) => res.render("register"));
router.get("/login", (req, res) => res.render("login"));
router.post("/register", async (req, res) => {
  const { fullname, email, password, phone } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10); //10 salt rounds

    await User.create({ fullname, email, password: hashedPassword, phone });
    res.status(201).send({ msg: "Account created successfully" });
  } catch (err) {
    res.send({ msg: err.message });
  }
});
//login
router.post("/login", async (req, res) => {
  passport.authenticate("local");
});

function isAuthenticated(req, res, next) {
  if (!req.session.user) {
    return res.status(401).send({ msg: "Unauthorized" });
  }
  next();
}

router.get("/profile", isAuthenticated, (req, res) => {
  res.send({ msg: "Welcome" });
});

module.exports = router;
