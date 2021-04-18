import { app } from './app.js';

const port = process.env.PORT ? process.env.PORT : 3001;

app.listen(port, host, () => {
  console.log(`***** SERVER STARTED ON PORT ${port} *****`);
});
