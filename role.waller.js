var roleWaller = {
    run: function(creep) {
        if (creep.room.name != 'E41S11') {
            creep.say('Wrong Room');
            creep.moveTo(Game.flags.Room3)
        } else {
            var target = Game.getObjectById('5781805797c25fc83bd655c1');
            if (creep.dismantle(target)) {
                creep.moveTo(target);
            }
        }
    }
};

module.exports = roleWaller;