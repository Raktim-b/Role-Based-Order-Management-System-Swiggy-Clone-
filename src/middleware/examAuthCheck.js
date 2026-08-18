const jwt = require("jsonwebtoken");

const examAuthCheck = (req, res, next) => {
  try {
    const token = req.cookies.examToken;

    if (!token) {
      req.flash("error", "Please login to continue the assessment.");

      return res.redirect("/candidate/exam/login");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "candidate") {
      req.flash("error", "Unauthorized access.");

      return res.redirect("/candidate/exam/login");
    }

    req.user = decoded;

    next();
  } catch (error) {
    res.clearCookie("examToken");

    req.flash("error", "Your exam session has expired.");

    return res.redirect("/candidate/exam/login");
  }
};

module.exports = examAuthCheck;
