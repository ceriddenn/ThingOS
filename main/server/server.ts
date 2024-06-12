import express from 'express'
import { store } from '../background';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

app.use(cors())
app.use(bodyParser.json())

// Basic route
app.post('/s/confirm/external', async (req, res) => {
  const body = req.body;
  console.log(body)
  const vehicleMake = body.vehicleMake as string;
  const vehicleModel = body.vehicleModel as string;
  const transmission = body.vehicleTransmission as string;

  const vehicleObj = {
    make: vehicleMake,
    model: vehicleModel,
    transmission: transmission
  }

  const extSetupCompleted = store.set("extSetup", body.isCompleted as boolean);
  const vObj = store.set("vehicleMeta", vehicleObj);

  res.json({ message: "External setup completed successfully!", data: { isCompleted: extSetupCompleted, vMeta: vObj}})
});

app.get('/s/confirm/external', async (req,res) => {
  const extSetupComplete = store.get("extSetup")
  res.json({ isCompleted: extSetupComplete});
})

// Start the server
const startServer = () => {
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
}

export { startServer }
