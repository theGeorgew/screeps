const { noExtraProps, defaultBodyBase } = require('./vars');

function calcBodyCost(body) {
    return _.reduce(body, (sum, part) => sum + BODYPART_COST[part], 0);
}
exports.run = function (creepType) {
    //console.log('type:'+creepType)

    var bodyMod = noExtraProps[creepType];
    var workerBody = [];
    var bodyIteration = defaultBodyBase
    bodyIteration.push(bodyMod)
    bodyIteration = bodyIteration.filter(element => element);
    // console.log('bodyIteration:'+bodyIteration)
    // console.log('bodyIterationCost:'+calcBodyCost(bodyIteration))
    // console.log('energy,avail:'+Game.spawns['Spawn0'].room.energyAvailable)

    while (calcBodyCost(workerBody) + calcBodyCost(bodyIteration) <= Game.spawns['Spawn0'].room.energyAvailable &&
        workerBody.length + bodyIteration.length <= MAX_CREEP_SIZE) {
        //console.log('workerBody:'+workerBody)
        workerBody = workerBody.concat(bodyIteration);
    }
    //console.log('proposing workerBody:' + workerBody)
    return workerBody;
}