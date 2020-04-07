import configDev from '../config/store.dev';
import configProd from '../config/store.prod';

const { store, history } = process.env.NODE_ENV === "production" ? configProd() : configDev();

export {
  store,
  history
}
