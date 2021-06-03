//Variables
var roadRepTotal = 1000;

var roleRepairer = {
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
              var repRoad = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                  filter: function (object) {
                      if (object.structureType == STRUCTURE_ROAD & object.hits < roadRepTotal) {
                          return true;
                      }
                      else {
                          return false;
                      }
                  }
              });
              if (repRoad) {
                  creep.moveTo(repRoad);
                  creep.repair(repRoad);
              } else {
                creep.moveTo(Game.flags.Idle);
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
module.exports = roleRepairer;
