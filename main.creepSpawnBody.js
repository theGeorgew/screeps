function calcBodyCost(body) {
    return _.reduce(body, (sum, part) => sum + BODYPART_COST[part], 0);
}
exports.run = function (creepType) {

    
    var workerBody = [];
    var bodyIteration = [bodyMod, MOVE, MOVE, WORK, CARRY];
    while (calcBodyCost(workerBody) + calcBodyCost(bodyIteration) <= Game.spawns['Spawn0'].room.energyAvailable &&
        workerBody.length + bodyIteration.length <= MAX_CREEP_SIZE) {
        workerBody = workerBody.concat(bodyIteration);
    }
    return workerBody;
}