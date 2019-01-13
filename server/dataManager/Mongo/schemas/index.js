import mongoose from 'mongoose';


const ConfigSchema = new mongoose.Schema({
    version: Number,
    data: String
});

const EnviormentScehma = new mongoose.Schema({
    configIds: [{type: mongoose.Schema.Types.ObjectId, ref: 'configs'}]
});

const ServiceSchema = new mongoose.Schema({
    name: String,
    description: String,
    enviormentIds: [{type: mongoose.Schema.Types.ObjectId, ref: 'envirorments'}]
});

module.exports = {
    Config: mongoose.model('configs', ConfigSchema),
    Enviorment: mongoose.model('envirorments', EnviormentScehma),
    Service: mongoose.model('services', ServiceSchema)
};