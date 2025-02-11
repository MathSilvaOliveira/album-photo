const mongoose = require("mongoose");

const FotoSchema = new mongoose.Schema({
    filename: { type: String, required: true },  
    titulo: { type: String, default: "Sem título" },  
    descricao: { type: String, default: "" },  
    dataDeAquisicao: { type: Date, default: Date.now },  
    tamanho: { type: Number, required: true },  
    corPredominante: { type: String, default: "Desconhecido" }  
});

const AlbumSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    descricao: { type: String, required: true },
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    fotos: [FotoSchema]  
}, { timestamps: true });

const Album = mongoose.model("Album", AlbumSchema);
module.exports = Album;
