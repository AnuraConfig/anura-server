import mongoose from 'mongoose';

const ConfigSchema = new mongoose.Schema({
    _id: String,
    version: Number,
    data: String
});

const EnviormentScehma = new mongoose.Schema({
    _id: String,
    configIds: [{type: mongoose.Schema.Types.ObjectId, ref: 'configs'}]
});

module.exports = {
    Config: mongoose.model('configs', ConfigSchema),
    Enviorment: mongoose.model('envirorments', EnviormentScehma)
};