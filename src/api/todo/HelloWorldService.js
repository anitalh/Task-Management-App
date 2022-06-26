import axios from 'axios'
import { API_URL } from '../../constants';

class HelloWorldService {
    executeHelloWorldPathVariableService(name) {
        return axios.get(`${API_URL}/hello-world/path-variable/${name}`);
    }

executeHelloWorldPathVariableService(name) {
    return axios.get(`${API_URL}/hello-world/path-variable/${name}`);
   }
}

export default new HelloWorldService();