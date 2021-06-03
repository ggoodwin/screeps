var roleBaby = {
    run: function(creep) {
        var total = _.sum(creep.carry);
        if(total < creep.carryCapacity) {
            //var sources = creep.room.find(FIND_MINERALS);
            var source = Game.getObjectById('57b2be466597d18f3865c44d');
            if(creep.withdraw(source, RESOURCE_KEANIUM) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }
        }
        else {
            var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (structure) => {
                return (structure.structureType == STRUCTURE_STORAGE && structure.energy < structure.energyCapacity);
            }
            });
            if (target == null) {
                var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (structure) => {
                    return (structure.structureType == STRUCTURE_STORAGE && structure.store[RESOURCE_ENERGY] < structure.storeCapacity);
                }
                });
            }
            if(creep.transfer(target, RESOURCE_KEANIUM) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        }
    }
};

module.exports = roleBaby;