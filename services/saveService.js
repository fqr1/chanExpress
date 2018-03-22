const http = require('http');
const fs = require('fs');

const FourchanService = require('./fourchanService');

exports.save = (board, id) => {
    console.log('save service');

    /*
    - Get the content of the board-id from 4chan
    - Iterate on posts and check if post is a file
    - if is a file, save it on
    */

    return FourchanService.getContent(board, id).then(r => {
        //TODO validate if posts variable exists
        saveContent(r.posts, board, id);
        return {status: 'doing'};
    });

/*
    const name = id;
    const extension = '.jpg';
    const filename = `${name}${extension}`;
    const destination = '';

    console.log('__dirname', __dirname);
    console.log('global', global.savesDir);

    const url = "http://i3.ytimg.com/vi/J---aiyznGQ/mqdefault.jpg6";


    return new Promise((resolve, reject) => {
        download(url, `${Date.now()}-${filename}`, err => err ? reject(err) : resolve({idk: 'what'}))
    })
    */
};

const downloadPromise = (url, filename) => {
    return new Promise((resolve, reject) => {
        const localFile = `${global.savesDir}/${filename}`;

        if(fs.existsSync(localFile)){
            console.log('File already exists!')
            resolve({saved: 'already exists'});
            return;
        }

        download(url, localFile, err => err ? reject(err) : resolve({saved: 'done'}))
    })
}

var download = function(url, dest, cb) {
    var file = fs.createWriteStream(dest);
    var request = http.get(url, function(response) {
        response.pipe(file);
        file.on('finish', function() {
            console.log('Finished!');
            file.close(cb);  // close() is async, call cb after close completes.
        });
    }).on('error', function(err) { // Handle errors
        fs.unlink(dest); // Delete the file async. (But we don't check the result)
        if (cb) cb(err.message);
    });
};

const saveContent = (content, board, id) => {
    console.log('save content');
    console.log('content is array?', Array.isArray(content));
    if(!Array.isArray(content)){
        console.warn('Content is not array');
        //TODO throw exception if always is an array
        return null;
    }


    const semanticUrl = content[0].semantic_url || '';

    console.log('+++++ SEMANTIC URL', semanticUrl);

    content
        .filter(c => c.tim)
        .map(c => {
           const url = FourchanService.getFileUrl(board, c.tim, c.ext);
           console.log('URL:', url);
           //check first if file already exists
            const fileName = `${id}-${semanticUrl}-${c.tim}${c.ext}`;
            return downloadPromise(url, fileName);
    });
};