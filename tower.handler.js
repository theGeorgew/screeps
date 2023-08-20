var towerHandler = {
    run: function() {
    //var tower = Game.getObjectById('167ff9e8331d0a35c1dc418e');
    var towers = Game.spawns['Spawn0'].room.find(FIND_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER, my: true}});
    towers.forEach(tower => {
        
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
        });
        if(closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        }
        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        }
    
});

	}
};
module.exports = towerHandler;
