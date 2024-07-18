import { exec } from "child_process";
import kill from "kill-port";

const PORT = 8000;

async function startApp() {
  try {
    await kill(PORT, "tcp");
    console.log(`Successfully killed process on port ${PORT} and Starting the App`);
    startCommand();
  } catch (error) {
    console.error(`Failed to kill port ${PORT}: ${error.message}`);
    startCommand();
  }
}

function startCommand() {
  console.log(`Starting the app on the port ${PORT}...`);
  exec(
    `cross-env PORT=${PORT} react-scripts start`,
    (error, stdout, stderr) => {
      if (error) {
        console.error(`Error starting app: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`Stderr: ${stderr}`);
      }
      console.log(`Stdout: ${stdout}`);
    }
  );
}

startApp();
