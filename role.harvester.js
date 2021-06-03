let roleHarvester = {
  run: function(creep) {
    if(creep.carry.energy < creep.carryCapacity) {
        let sources = creep.room.find(FIND_SOURCES);
        if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(sources[0]);
        }
    }
    else {
        let target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (structure) => {
                    return (structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_EXTENSION || (structure.structureType == STRUCTURE_TOWER && (structure.energy < structure.energyCapacity - 249))
                    ) &&
                    structure.energy < structure.energyCapacity;
                    }
        });
        if (target == null) {
            let target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_CONTAINER || structure.structureType == STRUCTURE_STORAGE) && structure.store[RESOURCE_ENERGY] < structure.storeCapacity;
                        }
            });
        }
        if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
        }
        if (target == null) {
            creep.moveTo(Game.flags.Idle)
        }
    }
  }
};

module.exports = roleHarvester;
