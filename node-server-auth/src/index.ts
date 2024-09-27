import App from "./app/app";
import Env from "./env";

// create a new app
const app = new App();

// start the app
app.start(Env.port);