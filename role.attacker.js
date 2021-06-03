var roleAttacker = {
    run: function(creep) {
        var target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {
            filter: function(creep) {
                return creep.getActiveBodyparts(ATTACK) >= 1 || creep.getActiveBodyparts(RANGED_ATTACK) >= 1;
            }
        });
        if (!target) {
            target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        }
        if (target) {
            if (creep.attack(target) == ERR_NOT_IN_RANGE) {
                if (creep.moveTo(target) == ERR_NO_BODYPART) {
                    creep.suicide();
                }
            }
        }
        else {
            creep.moveTo(Game.flags.Attackers);
        }
    }
};
module.exports = roleAttacker;