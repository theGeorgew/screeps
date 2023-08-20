var randomColor = require('util.randomcolor');

var roleAttacker = {
    /** @param {Creep} creep **/
    run: function (creep) {
        if (creep.memory.attacking == null) {
            creep.memory.attacking = false
            creep.say('activating attack');
        }
        if (creep.memory.attacking && creep.store[RESOURCE_ENERGY] == 0) {
            //console.log(creep.store[RESOURCE_ENERGY])
            creep.memory.attacking = false;
            creep.say('🔄');
        }
        if (!creep.memory.attacking && creep.store.getFreeCapacity() == 0) {
            creep.memory.attacking = true;
            creep.say('🗡︎');
        }
        if (creep.memory.attacking) {
            //var targets = creep.room.find(FIND_HOSTILE_CREEPS);
            var hostile = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            if (hostile != null) {
                console.log("found hostile, moving to attack")
                //if (targets.length > 0) {
                if (creep.attack(hostile) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(hostile, { reusePath: 0, visualizePathStyle: { stroke: randomColor.run() } });
                }
            } else {
                //console.log("can't find enemies, going to defend structure")
                var defendStructures = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION ||
                            structure.structureType == STRUCTURE_SPAWN ||
                            structure.structureType == STRUCTURE_TOWER);
                    }
                });
                creep.moveTo(defendStructures[0], { reusePath: 5, visualizePathStyle: { stroke: randomColor.run() } });

            }
        } else {
            var sources = creep.room.find(FIND_SOURCES_ACTIVE);
            //console.log("attack = false, and need energy")
            if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], { reusePath: 3, visualizePathStyle: { stroke: randomColor.run() } });
            }
        }
    }
};
module.exports = roleAttacker;
