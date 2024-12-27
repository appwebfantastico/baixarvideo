import fastify from 'fastify';
import { fetchPostJson } from '../src/index.js';

const app = fastify();

app.get('/', async (request, reply) => {
    reply.send('/download/?url=Link-do-video-instagram');
});

app.get('/download/', async (request, reply) => {
    const { url } = request.query;

    if (!url) {
        reply.send({ error: 'forneça uma URL do instagram' });
        return;
    }
    try {
        const resultado = await fetchPostJson(url);
        reply.send({ ...resultado });
    } catch (err) {
        reply.status(500).send({ error: 'Erro ao processar a URL' });
    }
});

export default async (req, res) => {
    await app.ready();
    app.server.emit('request', req, res);
};
