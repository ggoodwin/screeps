let wallRepHits = 2000;

var roleWallRepairer = {
  run: function(creep) {
    if(creep.memory.repairing && creep.carry.energy == 0) {
        creep.memory.repairing = false;
        creep.say('harvesting');
    }
    if(!creep.memory.repairing && creep.carry.energy == creep.carryCapacity) {
        creep.memory.repairing = true;
    }

    if(creep.memory.repairing) {
      if (creep.carry.energy != 0) {
        var targetWall = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (structure) => {
                    return (structure.structureType == STRUCTURE_WALL
                & structure.hits != structure.hitsMax) & structure.hits < wallRepHits;
        }});
        if(targetWall) {
            if(creep.repair(targetWall) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targetWall);
            }
        }
      } else {
        var sources = creep.room.find(FIND_SOURCES);
        if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(sources[0]);
        }
      }
    }
  }
};
module.exports = roleWallRepairer;
