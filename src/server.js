import { app } from './app.js';

const port = process.env.PORT ? process.env.PORT : 3001;
const host = '0.0.0.0';

app.listen(port, host, () => {
  console.log(`***** SERVER STARTED ON PORT ${port} *****`);
});
