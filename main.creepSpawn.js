var calcCreepSpawnBody = require('main.creepSpawnBody')
var { spawnCountsDesired } = require('./vars');


var creepSpawn = {
    /** @param {Creep} creep **/
    run: function (CreepType) {
        var filteredCreeps = _.filter(Game.creeps, (creep) => creep.memory.role == CreepType);
        console.log(CreepType + 's: ' + filteredCreeps.length);

        if (filteredCreeps.length < spawnCountsDesired[CreepType]) {
            var newName = CreepType + Game.time;
            var creepSpawnBodyParts = calcCreepSpawnBody.run(CreepType)
            if (creepSpawnBodyParts.length > 0) {
                console.log('Spawning new ' + CreepType + ': ' + newName + ' with parts: ' + creepSpawnBodyParts);
                Game.spawns['Spawn0'].spawnCreep(creepSpawnBodyParts, newName,
                    { memory: { role: CreepType } });
            } else {
                console.log('Not Enough energy for new: ' + CreepType + ' | energy avail:' + Game.spawns['Spawn0'].room.energyAvailable);
            }
        }

        if (Game.spawns['Spawn0'].spawning) {
            var spawningCreep = Game.creeps[Game.spawns['Spawn0'].spawning.name];
            Game.spawns['Spawn0'].room.visual.text(
                '🛠️' + spawningCreep.memory.role,
                Game.spawns['Spawn0'].pos.x + 1,
                Game.spawns['Spawn0'].pos.y,
                { align: 'left', opacity: 0.8 });
        }

    }
};
module.exports = creepSpawn;
