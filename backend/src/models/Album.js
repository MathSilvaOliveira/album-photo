const mongoose = require("mongoose");

const AlbumSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    descricao: { type: String, required: true },
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false }, // Relaciona com o usuário
    fotos: [{ type: String }], // Lista de URLs de fotos (iremos adicionar o upload depois)
}, { timestamps: true });

const Album = mongoose.model("Album", AlbumSchema);
module.exports = Album;
