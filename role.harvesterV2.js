var randomColor = require('util.randomcolor');

var roleHarvester = {
    /** @param {Creep} creep **/
    run: function (creep) {
        if (creep.memory.transfering && creep.store[RESOURCE_ENERGY] == 0) {
            //console.log(creep.store[RESOURCE_ENERGY])
            creep.memory.transfering = false;
            creep.say('🔄 harvest');
        }
        if (!creep.memory.transfering && creep.store.getFreeCapacity() == 0) {
            creep.memory.transfering = true;
            creep.say('🚧 transfering');
        }
        if (creep.memory.transfering) {
            var closesttarget = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_TOWER ||
                        structure.structureType == STRUCTURE_SPAWN) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });

            if (closesttarget != null) {
                if (creep.transfer(closesttarget, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(closesttarget, { reusePath: 0, visualizePathStyle: { stroke: randomColor.run() } });
                } else (
                    console.log("No targets to dump energy to, increase spawn counts")
                )
            }
        } else {
            var droppedResources = creep.room.find(FIND_DROPPED_RESOURCES);
            var closestDroppResource = creep.pos.findClosestByPath(droppedResources);
            if (creep.pickup(closestDroppResource) == ERR_NOT_IN_RANGE) {
                creep.moveTo(closestDroppResource, { reusePath: 5, visualizePathStyle: { stroke: '#ffaa00' } });
            }
            var sources = creep.room.find(FIND_SOURCES_ACTIVE);
            var closestSources = creep.pos.findClosestByPath(sources);
            if (creep.harvest(closestSources) == ERR_NOT_IN_RANGE) {
                creep.moveTo(closestSources, { ignoreCreeps:false, reusePath: 15, visualizePathStyle: { stroke: randomColor.run() } });
            }
        }
    }
};
module.exports = roleHarvester;
