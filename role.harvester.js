// var roleHarvester = {
//     /** @param {Creep} creep **/
//     run: function (creep) {
//         //console.log(creep.store.getUsedCapacity())
//         if (creep.store.getFreeCapacity() > 0) { //        if (creep.store.getFreeCapacity() > 0) {
//             var droppedResources = creep.room.find(FIND_DROPPED_RESOURCES);
//             if (creep.pickup(droppedResources[0]) == ERR_NOT_IN_RANGE) {
//                 creep.moveTo(droppedResources[0], { reusePath: 5, visualizePathStyle: { stroke: '#ffaa00' } });
//             }

//             var sources = creep.room.find(FIND_SOURCES_ACTIVE);
//             if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
//                 creep.moveTo(sources[0], { reusePath: 5, visualizePathStyle: { stroke: '#ffaa00' } });
//             }
//         }
//         else {
//             var targets = creep.pos.findClosestByPath(FIND_STRUCTURES, {
//                 filter: (structure) => {
//                     return (structure.structureType == STRUCTURE_EXTENSION) &&
//                         structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
//                 }
//             });
//             if (targets.length == 0){
//                 targets = creep.pos.findClosestByPath(FIND_STRUCTURES, {
//                     filter: (structure) => {
//                         return (structure.structureType == STRUCTURE_SPAWN) &&
//                             structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
//                     }
//                 });
//             }
//             if (targets.length > 0) {
//                 if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
//                     creep.moveTo(targets[0], { reusePath: 50, visualizePathStyle: { stroke: '#ffffff' } });
//                 } else (
//                     console.log("No targets to dump energy to, increase spawn counts")
//                 )
//             }
//         }
//     }
// };
// module.exports = roleHarvester;
