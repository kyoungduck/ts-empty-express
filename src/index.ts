import './initialize';
import express from 'express';

const app = express();
const PORT = process.env.SERVER_PORT || 3000;
const packageVersion = require('../package.json').version;

app.listen({ port: PORT }, () => {
	console.log(`vipho upload server running port : ${PORT}`);
	console.log(`upload server version ${packageVersion}`);
});
