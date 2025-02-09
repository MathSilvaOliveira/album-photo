const mongoose = require("mongoose");

const AlbumSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    descricao: { type: String, required: true },
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },
    fotos: [{ type: String }], 
}, { timestamps: true });

const Album = mongoose.model("Album", AlbumSchema);
module.exports = Album;
