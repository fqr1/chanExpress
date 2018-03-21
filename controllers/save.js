const ErrorHelper = require('../helpers/ErrorHelper');
const saveService = require('../services/saveService');

exports.save = (req, res, next) => {
    console.log('save controller');
    const board1 = req.params.board;
    const id1 = req.params.id;

    const board = req.body.board;
    const id = req.body.id;

    try{
        ErrorHelper.verifyRequiredAndThrowException({board, id});
        saveService.save(board, id)
            .then(r => res.json(r))
            .catch(err => ErrorHelper.catchError(res, err));
    }catch(err){
        ErrorHelper.catchError(res, err);
    }
};
