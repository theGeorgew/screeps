var creepSpawnCounts = {
    harvester: 23,
    builder: 4,
    upgrader: 16,
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
var noExtraProps = {
    builder: null,
    harvester: null,
    upgrader: null,
    attacker: null,
    healer: null,
}
var defaultBodyBase = [ MOVE, MOVE, WORK, CARRY] ;
var fallback = false
var spawnPropsDesired = !fallback ? creepSpawnProps : fallbackCreepSpawnProps
var spawnCountsDesired = !fallback ? creepSpawnCounts : fallbackCreepSpawnCounts

module.exports = {spawnCountsDesired,spawnPropsDesired,noExtraProps,defaultBodyBase};