{
  const express = require("express");
  const app = express();
  const { InitializeDatabase } = require("./src/config/DatabaseConnection");
  const GenreRoutes = require("./src/routes/GenreRoutes");
  const MovieRoutes = require("./src/routes/MovieRoutes");

  //Bootstrapping
  InitializeDatabase();
  //Global Middlewares
  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: true,
    })
  );

  //Routing
  app.get("/welcome", (req, res, next) => {
    res.status(200).send({ message: "Server is Up & Running :dd" });
  });

  app.use("/api/v1/genre", GenreRoutes);
  app.use("/api/v1/movie", MovieRoutes);

  app.listen(process.env.PORT, () =>
    console.log(`APP is running on ${process.env.PORT}`)
  );
}
