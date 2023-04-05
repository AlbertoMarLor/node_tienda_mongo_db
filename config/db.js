const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL);


//  protocolo://user:password@host:puerto/nombre_bd    como no tenemos usuario, en nuestro caso no ponemos user y passwrod