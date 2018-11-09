const TARGET = process.env.npm_lifecycle_event

const runs = {
    build: './config/webpack.config.prod'
}
module.exports = require(runs[TARGET])