import express from 'express'
import { store } from '../background';
import cors from 'cors';
const app = express();
const port = 3000;

app.use(cors())

// Basic route
app.post('/s/confirm/external', async (req, res) => {
  const body = req.body;
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
  res.redirect('http://10.42.0.1:8888/setup/obd_pairing');
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
