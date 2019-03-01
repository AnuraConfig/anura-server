import mongoose from 'mongoose';


const ConfigSchema = new mongoose.Schema({
    version: Number,
    data: String,
    type: String
})

const EnvironmentSchema = new mongoose.Schema({
    name: String,
    configs: [{type: mongoose.Schema.Types.String, ref: 'configs'}]
})

const ServiceSchema = new mongoose.Schema({
    name: String,
    description: String,
    environments: [{type: mongoose.Schema.Types.String, ref: 'environments'}]
})

module.exports = {
    Config: mongoose.model('configs', ConfigSchema),
    Environment: mongoose.model('environments', EnvironmentSchema),
    Service: mongoose.model('services', ServiceSchema)
}