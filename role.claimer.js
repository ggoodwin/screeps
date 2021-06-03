var roleClaimer = {
    run: function(creep) {
        if (creep.room.name != 'E41S11') {
            creep.say('Wrong Room');
            creep.moveTo(Game.flags.Room3);
        } else {
            /*if(creep.claimController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }*/

            if(creep.memory.upgrading && creep.carry.energy == 0) {
        	    creep.memory.upgrading = false;
        	    creep.say('harvesting');
            }
            if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
            	creep.memory.upgrading = true;
            	creep.say('upgrading');
            }

            if(creep.memory.upgrading) {
            	if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
            		creep.moveTo(creep.room.controller);
            	}
            }
            else {
            	var sources = creep.room.find(FIND_SOURCES);
            	if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
            		creep.moveTo(sources[1]);
            	}
            }
        }
    }
};
module.exports = roleClaimer;