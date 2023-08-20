//todo when source is empty, failover to next source

game.creeps[builder1173].store[RESOURCE_ENERGY]


var creepSpawnProps = {
    builder: [WORK, CARRY, MOVE],
    harvester: [WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE],
    upgrader: [WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE],
    attacker: [ATTACK, CARRY, MOVE],
}

var droppedResources = creep.room.find(FIND_DROPPED_RESOURCES);
if (creep.pickup(droppedResources[0]) == ERR_NOT_IN_RANGE) {
    creep.moveTo(droppedResources[0], { reusePath: 3, visualizePathStyle: { stroke: '#ffaa00' } });
}

var defendStructures = creep.room.find(FIND_STRUCTURES, {
    filter: (structure) => {
        return (structure.structureType == STRUCTURE_EXTENSION ||
            structure.structureType == STRUCTURE_SPAWN ||
            structure.structureType == STRUCTURE_TOWER);
    }
});
creep.moveTo(defendStructures[0], { reusePath: 5, visualizePathStyle: { stroke: '#00ff3c' } });

var targets = creep.room.find(FIND_STRUCTURES, {
    filter: object => object.hits < object.hitsMax
});
targets += creep.room.find(FIND_CONSTRUCTION_SITES);

targets.sort((a, b) => a.progress - b.progress);


var targets = creep.room.find(FIND_STRUCTURES, {
    filter: (structure) => {
        return (structure.structureType == STRUCTURE_SPAWN) &&
            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
    }
});
if (targets.length == 0) {
    targets = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType == STRUCTURE_EXTENSION) &&
                structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
        }
    });
}

var fallbackCreepSpawnProps = {
    builder: [WORK, CARRY, MOVE],
    harvester: [WORK, CARRY, MOVE],
    upgrader: [WORK, CARRY, MOVE],
    attacker: [ATTACK, WORK, CARRY, MOVE],
}
var spawnPropsDesired = fallbackCreepSpawnProps
var hostiles = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
if (hostiles.length > 0) {
    roleAttacker.run(creep);
}

var spawnPropsDesired = 1 == 1 ? creepSpawnProps : fallbackCreepSpawnProps
randomcolor.run()

function getRandomColor() {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    return "#" + r.toString(16) + g.toString(16) + b.toString(16);
}
var towers = Game.spawns[Spawn0].room.find(FIND_STRUCTURES, { filter: { structureType: STRUCTURE_TOWER, my: true } });
towers.forEach(tower => {

});

var repairtargets = creep.room.find(FIND_STRUCTURES, {
    filter: object => object.hits < object.hitsMax
});
var closestRepairTarget = creep.pos.findClosestByPath(repairtargets);
if (closestRepairTarget != null) {
    if (creep.repair(closestRepairTarget) == ERR_NOT_IN_RANGE) {
        creep.moveTo(closestRepairTarget);
    }
}


var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
var closestTarget = creep.pos.findClosestByPath(targets);
if (closestTarget != null ) {
    if (creep.build(closestTarget) == ERR_NOT_IN_RANGE) {
        creep.moveTo(closestTarget, { reusePath: 3, visualizePathStyle: { stroke: randomColor.run() } });
    }
} else {
    //console.log("can't find construction site")
}


