import axios from "axios";

const instance= axios.create({
    baseURL:"https://react-burger-builder-2735d-default-rtdb.firebaseio.com/"
});



export default instance;