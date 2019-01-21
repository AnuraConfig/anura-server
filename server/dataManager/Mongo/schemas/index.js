import mongoose from 'mongoose';


const ConfigSchema = new mongoose.Schema({
    version: Number,
    data: String
})

const EnviormentScehma = new mongoose.Schema({
    name: String,
    configs: [{type: mongoose.Schema.Types.ObjectId, ref: 'configs'}]
})

const ServiceSchema = new mongoose.Schema({
    name: String,
    description: String,
    environments: [{type: mongoose.Schema.Types.ObjectId, ref: 'environments'}]
})

module.exports = {
    Config: mongoose.model('configs', ConfigSchema),
    Enviorment: mongoose.model('environments', EnviormentScehma),
    Service: mongoose.model('services', ServiceSchema)
}