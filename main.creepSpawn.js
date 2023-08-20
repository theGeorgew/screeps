 var calcCreepSpawnBody = require('main.creepSpawnBody')
// var vars = require('vars')

var creepSpawnCounts = {
    harvester: 26,
    builder: 14,
    upgrader: 2,
    attacker: 0,
    healer: 0
}
var fallbackCreepSpawnCounts = {
    builder: 0,
    harvester: 10,
    upgrader: 0,
    attacker: 0,
    healer: 0
}
var creepSpawnProps = {
    builder: [WORK, CARRY, MOVE], //[       WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE],//[WORK,WORK,CARRY,MOVE],
    harvester: [WORK,WORK, CARRY, MOVE],//[WORK, WORK, CARRY, MOVE, MOVE], //[       WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], //[WORK,WORK,CARRY,MOVE],//[WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE], //
    upgrader: [WORK, CARRY, MOVE, MOVE], //[WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE,MOVE],//[WORK,CARRY,MOVE], //[WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE,MOVE],
    attacker: [ATTACK, WORK, CARRY, MOVE],
    healer: [WORK, CARRY, MOVE, HEAL],
}
var fallbackCreepSpawnProps = {
    builder: [MOVE,MOVE,WORK,CARRY],
    harvester: [MOVE,MOVE,WORK,CARRY],
    upgrader: [MOVE,MOVE,WORK,CARRY],
    attacker: [MOVE,MOVE,WORK,CARRY,ATTACK],
    healer: [MOVE,MOVE,WORK,CARRY,HEAL],
}
var fallback = false
var spawnPropsDesired = !fallback ? creepSpawnProps : fallbackCreepSpawnProps
var spawnCountsDesired = !fallback ? creepSpawnCounts : fallbackCreepSpawnCounts

var creepSpawn = {
    /** @param {Creep} creep **/
    run: function (CreepType) {
        var filteredCreeps = _.filter(Game.creeps, (creep) => creep.memory.role == CreepType);
        console.log(CreepType + 's: ' + filteredCreeps.length);

        if (filteredCreeps.length < spawnCountsDesired[CreepType]) {
            var newName = CreepType + Game.time;
            console.log('Spawning new ' + CreepType + ' : ' + newName);
            // var creepSpawnDodyParts = calcCreepSpawnBody.run(creepType)
            //Game.spawns['Spawn0'].spawnCreep(creepSpawnDodyParts, newName,

            Game.spawns['Spawn0'].spawnCreep(spawnPropsDesired[CreepType], newName,
                { memory: { role: CreepType } });
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
