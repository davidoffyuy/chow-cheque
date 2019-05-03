import firebase from 'firebase';
import { devConfig, prodConfig} from './firebase.conf.js';

const config = process.env.NODE_ENV === 'production' ? prodConfig : devConfig;

export default firebase.initializeApp(config);