const urlSandbox = "https://developers.decidir.com/api/v2";
const urlProduccion = "https://live.decidir.com/api/v2";

const decidirSandbox = new Decidir(urlSandbox);
decidirSandbox.setTimeout(0);

const decidirProduccion = new Decidir(urlProduccion);
decidirProduccion.setTimeout(3000);