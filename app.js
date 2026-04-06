import "dotenv/config";
import express from "express";
import path from "path";
import session from "express-session";
import flash from "connect-flash";
import methodOverride from "method-override";
import HomeRouter from "./routes/home.js";

const app = express();
app.use(
  session({
    secret: process.env.SESSION_SECRET || "default_secret",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: process.env.NODE_ENV === "production" },
  }),
);
app.use(flash());
app.use(express.static("public"));
app.set("views", path.join(import.meta.dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(
  methodOverride((req, res) => {
    if (req.body && typeof req.body === "object" && "_method" in req.body) {
      const method = req.body._method;
      delete req.body._method;
      return method;
    }
  }),
);

app.use("/", HomeRouter);
app.use((err, req, res, next) => {
  console.error(err);
  const errorMessage = err?.cause?.errorMessage || err?.detail;
  const formErrors = err?.cause?.formErrors;
  if (errorMessage) req.session.errorMessage = errorMessage;
  if (formErrors) req.session.formErrors = formErrors;
  if (err?.cause?.redirectRoute) {
    res
      .status(err?.cause?.statusCode || 500)
      .redirect(err?.cause?.redirectRoute);
  } else {
    res.status(err?.cause?.statusCode || 500).render("error", {
      errorMessage: errorMessage || "Internal Server Error",
    });
  }
});

app.listen(process.env.PORT || 3000, (err) => {
  if (err) throw err;
  console.log(`Server running at port ${process.env.PORT}`);
});
