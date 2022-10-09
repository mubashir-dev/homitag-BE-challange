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
  app.get("/welecome", () => {
    res.send(200, { message: "App is running successfully" });
  });

  app.use("/api/v1/genre", GenreRoutes);
  app.use("/api/v1/movie", MovieRoutes);

  app.listen(3000, () => console.log(`APP is running on ${process.env.PORT}`));
}
