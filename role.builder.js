var randomColor = require('util.randomcolor');

var roleBuilder = {
    /** @param {Creep} creep **/
    run: function (creep) {
        if (creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            //console.log(creep.store[RESOURCE_ENERGY])
            creep.memory.building = false;
            creep.say('🔄 harvest');
        }
        if (creep.store.getFreeCapacity() == 0) {
            creep.memory.building = true;
            creep.say('🚧 build');
        }
        if (creep.memory.building) {

            var repairtargets = creep.room.find(FIND_STRUCTURES, {
                filter: object => object.hits < object.hitsMax
            });
            var closestRepairTarget = creep.pos.findClosestByRange(repairtargets);
            if (closestRepairTarget != null) {
                if (creep.repair(closestRepairTarget) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(closestRepairTarget);
                }
            }
            var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            var closestTarget = creep.pos.findClosestByRange(targets);
            if (closestTarget != null ) {
                if (creep.build(closestTarget) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(closestTarget, { reusePath: 3, visualizePathStyle: { stroke: randomColor.run() } });
                }
            } else {
                //console.log("can't find construction site")
            }
            
        } else {
            var sources = creep.room.find(FIND_SOURCES_ACTIVE);
            if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], { reusePath: 3, visualizePathStyle: { stroke: randomColor.run() } });
            }
        }
    }
};
module.exports = roleBuilder;
