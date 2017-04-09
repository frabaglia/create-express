module.exports = (req, res, next) => {
    var options = {
        root: __dirname + '/../views/',
        dotfiles: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
        }
    };

    res.sendFile("index.html", options, function(err) {
        if (err) {
            let err = new Error("Can't open index file.")
            err.status = 500
            next(err)
        }
    })
}
