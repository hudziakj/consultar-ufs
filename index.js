import express from "express";
import colecaoUf from "./dados.js";
import {} from "dotenv/config";

const app = express();
const porta = process.env.PORT;

const buscarUfsPorNome = (nomeUf) => {
	return colecaoUf.filter((uf) =>
		uf.nome.toLowerCase().includes(nomeUf.toLowerCase())
	);
};

app.get("/ufs", (req, res) => {
	const nomeUf = req.query.busca;
	console.log(nomeUf);
	const resultado = nomeUf ? buscarUfsPorNome(nomeUf) : colecaoUf;
	if (resultado.length > 0) {
		res.json(resultado);
	} else {
		res.status(404).send({ erro: "Nenhuma UF encontrada!" });
	}
});

app.get("/ufs/:iduf", (req, res) => {
	const idUF = parseInt(req.params.iduf);
	const uf = colecaoUf.find((u) => u.id === idUF);
	res.json(uf);
});

app.listen(porta, () => {
	console.log(`Servidor iniciado na porta ${porta}`);
});
