var roleHarvester = require('role.harvesterV2');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleAttacker = require('role.attacker');
var towerHandler = require('tower.handler');
var purgeDeadCreeps = require('maint.memory');
var creepSpawn = require('main.creepSpawn');
var { noExtraProps, spawnCountsDesired } = require('./vars');

module.exports.loop = function () {

    console.log('----')
    //console.log(MAX_CREEP_SIZE)
    // TODO: fix meh tower Handler when you have one
    towerHandler.run();
    purgeDeadCreeps.run();

    var harvesterCreeps = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    console.log('harvesters: '+harvesterCreeps.length)
    if (harvesterCreeps.length < spawnCountsDesired.harvester) {
        creepSpawn.run('harvester');
    } else {
        creepSpawn.run('builder');
        creepSpawn.run('upgrader');
        creepSpawn.run('attacker');
        //creepSpawn.run('harvester');
    }


    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        var hostiles = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (hostiles != null) {
            //console.log("found hostile, engaging!")
            if (creep.body.find((bodyType) => bodyType == 'ATTACK')) {
                roleAttacker.run(creep);
            }
        } else {
            if (creep.memory.role == 'harvester') {
                roleHarvester.run(creep);
            } else if (creep.memory.role == 'upgrader') {
                roleUpgrader.run(creep);
            } else if (creep.memory.role == 'builder') {
                roleBuilder.run(creep);
            } else if (creep.memory.role == 'attacker') {
                roleAttacker.run(creep);
            }
        }
    }
}
