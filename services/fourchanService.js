const fetch = require('node-fetch')

const board = 'https://a.4cdn.org/boards.json'
const threads = (boardParam) => `https://a.4cdn.org/${boardParam}/threads.json`
const content = (boardParam, thread) => `https://a.4cdn.org/${boardParam}/thread/${thread}.json`
const catalog = (boardParam) => `https://a.4cdn.org/${boardParam}/catalog.json`
exports.getFileUrl = (board, tim, ext) => `http://i.4cdn.org/${board}/${tim}${ext}`;
exports.getFileThumbnailUrl = (board, tim, ext) => `http://i.4cdn.org/${board}/${tim}s${ext}`;

exports.getBoard = () => {
    return fetch(board).then(r => {
        console.log('GOT BOARD - ', r);
        return r.json();
    }).then(debug => {
        console.log('Object.keys(debug)', Object.keys(debug));
        console.log('debug', debug.boards);
        return debug
    })
}


exports.getCatalog = (boardParam) => {
    console.log('WILL GET CATALOG');
    return fetch(catalog(boardParam)).then(r => {
        console.log('GOT CATALOG - ', r);
        return r.json();
    }).then(debug => {
        console.log('debug', debug)
        return debug
    })
}

exports.getThreads = (boardParam) => {
    return fetch(threads(boardParam)).then(r => {
        console.log('GOT THREADS - ', r);
        return r.json();
    })
}

exports.getContent = (boardParam, thread) => {
    return fetch(content(boardParam, thread)).then(r => {
        //console.log('GOT CONTENT - ', r);
        return r.json();
    }).then(debug => {
        //console.log('debug', debug);
        //console.log('Object.keys(debug)', Object.keys(debug));
        return debug
    })
}
