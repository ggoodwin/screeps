//Includes
var roleHarvester = require('role.harvester');
var roleHarvesterAlt = require('role.harvesteralt');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var roleBaby = require('role.baby');
var roleNomad = require('role.nomad');
var roleClaimer = require('role.claimer');
var roleAttacker = require('role.attacker');
var roleMiner = require('role.miner');
var roleWaller = require('role.waller')

//Creep Counts
var h1Max = 1;
var ha1Max = 0;
var b1Max = 1;
var u1Max = 1;
var r1Max = 0;
var m1Max = 0;

var bab1Max = 0;
var n1Max = 0;
var c1Max = 0;
var a1Max = 0;
var w1Max = 0;

//Room 2 Creeps
/*var h2Max = 0;
var b2Max = 0;
var u2Max = 0;
var r2Max = 0;*/

//Room 3 Creeps
/*var h3Max = 0;
var ha3Max = 0;
var b3Max = 0;
var u3Max = 0;
var r3Max = 0;*/

//Not using yet
//This will eventually toggle all creeps to fight enemies.
var defend = 0;

//Set username
var userName = "GMan";

//Name of rooms
var room1Name = "[room W6S79]";
//var room2Name = "[room E42S12]";
//var room3Name = "[room E41S11]";

//Alliance Members
var allianceMembers = ['Zim'];

//Spawns and Rooms
var Spawn1=Game.spawns['Spawn1'];
//var Spawn2=Game.spawns['Spawn2'];
//var Spawn3=Game.spawns['Spawn3'];
//var Spawn4=Game.spawns['Spawn4'];
//var Spawn5=Game.spawns['Spawn5'];
var Room1=Game.spawns['Spawn1'].room;
//var Room2=Game.spawns['Spawn2'].room;
//var Room3=Game.spawns['Spawn3'].room;

//Turn on tower wall healing?
var t1Heal = 1;
//var t2Heal = 1;
//var t3Heal = 1;
var t1H2 = 5000;
//var t2H2 = 5000;
//var t3H2 = 5000;
var t1EnergyThreshold = 500;
//var t2EnergyThreshold = 500;
//var t3EnergyThreshold = 500;

//Towers will only heal if storage is higher than this amount of energy
var t1Hs = 100000;
//var t2Hs = 100000;
//var t3Hs = 100000;

//Show summary on tick?
var r1stats = 0;
//var r2stats = 0;
//var r3stats = 0;

//How many spawn rooms do you have?
//var spawns = 3;

module.exports.loop = function () {

    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    //Spawn Creeps
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var harvesteralts = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvesteralt');
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
    var babies = _.filter(Game.creeps, (creep) => creep.memory.role == 'baby');
    var nomads = _.filter(Game.creeps, (creep) => creep.memory.role == 'nomad');
    var claimers = _.filter(Game.creeps, (creep) => creep.memory.role == 'claimer');
    var attackers = _.filter(Game.creeps, (creep) => creep.memory.role == 'attacker');
    var miners = _.filter(Game.creeps, (creep) => creep.memory.role == 'miner');
    var wallers = _.filter(Game.creeps, (creep) => creep.memory.role == 'waller');

    //Room 2
    /*var r2harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'r2harvester');
    var r2upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'r2upgrader');
    var r2builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'r2builder');
    var r2repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'r2repairer');*/

    //Room 3
    /*var r3harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'r3harvester');
    var r3harvesteralts = _.filter(Game.creeps, (creep) => creep.memory.role == 'r3harvesteralt');
    var r3upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'r3upgrader');
    var r3builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'r3builder');
    var r3repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'r3repairer');*/

    var room1Energy = Room1.energyCapacityAvailable;
    //var room2Energy = Room2.energyCapacityAvailable;
    //var room3Energy = Room3.energyCapacityAvailable;

    var s1Energy = Spawn1.energy;
    /*var s2Energy = Spawn2.energy;
    var s3Energy = Spawn3.energy;
    var s4Energy = Spawn4.energy;
    var s5Energy = Spawn5.energy;*/

    var r1UseSpawn = 0;
    //if (Spawn1.energy != 300)
    //{
        /*if(Spawn4.energy != 300) {
            r1UseSpawn = Spawn5;
        } else {
            r1UseSpawn = Spawn4;
        }*/
    //} else {
        r1UseSpawn = Spawn1;
    //}

    //Harvesters
    if (harvesters.length < h1Max) {
        //If no harvesters and not enough energy to spawn one we make a small harvester
        /*if (newName == ERR_NOT_ENOUGH_ENERGY && harvesters.length == 0) {
            newName = Spawn1.createCustomCreep(Room1.energyAvailable, 'harvester');
        }*/
        //var newName = r1UseSpawn.createCreep([WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE],'H-' + Math.random(),{role:'harvester'});
        var newName = Spawn1.createCreep([WORK,CARRY,MOVE],'H-' + Math.random(),{role:'harvester'});
        console.log(r1UseSpawn + ' Spawning new harvester: ' + newName);
    //Harvesters Alt
    } else if (harvesteralts.length < ha1Max) {
        var newName2 = r1UseSpawn.createCreep([WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE],'HA-' + Math.random(),{role:'harvesteralt'});
        console.log(r1UseSpawn + ' Spawning new harvester alt: ' + newName2);
    //Upgrader
    } else if (upgraders.length < u1Max) {
        var newName4 = r1UseSpawn.createCreep([WORK,CARRY,MOVE],'U-' + Math.random(),{role:'upgrader'});
        console.log(r1UseSpawn + ' Spawning new upgrader: ' + newName4);
    //Repairers
    } else if (repairers.length < r1Max) {
        var newName5 = r1UseSpawn.createCreep([WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE],'R-' + Math.random(),{role:'repairer'});
        console.log(r1UseSpawn + ' Spawning new repairer: ' + newName5);
    //Builders
    } else if (builders.length < b1Max) {
        var newName3 = Spawn1.createCreep([WORK,CARRY,MOVE],'B-' + Math.random(),{role:'builder'});
        //var newName3 = r1UseSpawn.createCreep([MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY],'B-' + Math.random(),{role:'builder'});
        console.log(r1UseSpawn + ' Spawning new builder: ' + newName3);
    //Babies
    } else if (babies.length < bab1Max) {
        var newName6 = r1UseSpawn.createCreep([MOVE],'BAB-' + Math.random(),{role:'baby'});
        console.log(r1UseSpawn + ' Spawning new baby: ' + newName6);
    //Nomads
    } else if (nomads.length < n1Max) {
        var newName7 = r1UseSpawn.createCreep([MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY],'N-' + Math.random(),{role:'nomad'});
        console.log(r1UseSpawn + ' Spawning new nomad: ' + newName7);
    //Claimers
    } else if (claimers.length < c1Max) {
        var newName8 = r1UseSpawn.createCreep([MOVE,CLAIM],'C-' + Math.random(),{role:'claimer'});
        console.log(r1UseSpawn + ' Spawning new claimer: ' + newName8);
    //Miners
    } else if (miners.length < m1Max) {
        var newName10 = r1UseSpawn.createCreep([WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE],'M-' + Math.random(),{role:'miner'});
        console.log(r1UseSpawn + ' Spawning new miner: ' + newName10);
    //Wallers
    } else if (wallers.length < w1Max) {
        var newName11 = r1UseSpawn.createCreep([WORK,WORK,WORK,MOVE,MOVE,MOVE],'W-' + Math.random(), { role: 'waller' });
        console.log(r1UseSpawn + ' Spawning new waller: ' + newName11);
    }

    //Room 2 Spawning
    //if (r2harvesters.length < h2Max) {
        //If no harvesters and not enough energy to spawn one we make a small harvester
        //if (r2newName == ERR_NOT_ENOUGH_ENERGY && harvesters.length == 0) {
        //    r2newName = Spawn2.createCustomCreep(Room2.energyAvailable, 'r2harvester');
        //}
        //var r2newName = Spawn2.createCreep([WORK,CARRY,MOVE],'H-' + Math.random(),{role:'r2harvester'});
        //var r2newName = Spawn2.createCreep([WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE],'H-' + Math.random(),{role:'r2harvester'});
        //console.log('Spawning new room 2 harvester: ' + r2newName);
    //Room 2 Repairers
    /*} else if (r2repairers.length < r2Max) {
        var r2newName4 = Spawn2.createCreep([WORK,CARRY,MOVE],'R-' + Math.random(),{role:'r2repairer'});
        console.log('Spawning new room 2 repairer: ' + r2newName4);*/
    //Room 2 Upgrader
    /*} else if (r2upgraders.length < u2Max) {
        var r2newName3 = Spawn2.createCreep([MOVE,WORK,CARRY],'U-' + Math.random(),{role:'r2upgrader'});
        console.log('Spawning new room 2 upgrader: ' + r2newName3);*/
    //Room 2 Builders
    /*} else if (r2builders.length < b2Max) {
        var r2newName2 = Spawn2.createCreep([MOVE,WORK,CARRY],'B-' + Math.random(),{role:'r2builder'});
        console.log('Spawning new room 2 builder: ' + r2newName2);
    }*/

    //Room 3 Spawning
    //if (r3harvesters.length < h3Max) {
        //If no harvesters and not enough energy to spawn one we make a small harvester
        //if (r2newName == ERR_NOT_ENOUGH_ENERGY && harvesters.length == 0) {
        //    r2newName = Spawn2.createCustomCreep(Room2.energyAvailable, 'r2harvester');
        //}
        //Emergency Creep
        //var r3newName = Spawn3.createCreep([WORK,CARRY,MOVE],'H-' + Math.random(),{role:'r3harvester'});
        //var r3newName = Spawn3.createCreep([WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE],'H' + Math.random(),{role:'r3harvester'});
        //console.log('Spawning new room 3 harvester: ' + r3newName);
    //Room 3 Spawner alt
    //} else if (r3harvesteralts.length < ha3Max) {
        //Emergency
        //var r3newName1 = Spawn3.createCreep([WORK,CARRY,MOVE],'HA-' + Math.random(),{role:'r3harvesteralt'});
        //var r3newName1 = Spawn3.createCreep([WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE],'HA-' + Math.random(),{role:'r3harvesteralt'});
        //console.log('Spawning new room 3 harvester alt: ' + r3newName1);
    //Room 3 Upgrader
    /*} else if (r3upgraders.length < u3Max) {
        var r3newName2 = Spawn3.createCreep([MOVE,WORK,CARRY],'U-' + Math.random(),{role:'r3upgrader'});
        console.log('Spawning new room 3 upgrader: ' + r3newName2);*/
    //Room 3 Repairers
    /*} else if (r3repairers.length < r3Max) {
        var r3newName3 = Spawn3.createCreep([WORK,CARRY,MOVE],'R-' + Math.random(),{role:'r3repairer'});
        console.log('Spawning new room 2 repairer: ' + r3newName3);*/
    //Room 3 Builders
    /*} else if (r3builders.length < b3Max) {
        var r3newName4 = Spawn3.createCreep([MOVE,WORK,CARRY],'B-' + Math.random(),{role:'r3builder'});
        console.log('Spawning new room 3 builder: ' + r3newName4);
    }*/

    //Run role specific code
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if (creep.memory.role == 'harvester') {// || creep.memory.role == 'r2harvester' || creep.memory.role == 'r3harvester') {
            roleHarvester.run(creep);
        }
        if (creep.memory.role == 'harvesteralt') {// || creep.memory.role == 'r3harvesteralt') {
            roleHarvesterAlt.run(creep);
        }
        if (creep.memory.role == 'upgrader') {// || creep.memory.role == 'r2upgrader' || creep.memory.role == 'r3upgrader') {
            roleUpgrader.run(creep);
        }
        if (creep.memory.role == 'builder') {// || creep.memory.role == 'r2builder' || creep.memory.role == 'r3builder') {
            roleBuilder.run(creep);
        }
        if (creep.memory.role == 'repairer') {// || creep.memory.role == 'r2repairer' || creep.memory.role == 'r3repairer') {
            roleRepairer.run(creep);
        }
        if (creep.memory.role == 'baby') {
            roleBaby.run(creep);
        }
        if (creep.memory.role == 'nomad') {
            roleNomad.run(creep);
        }
        if (creep.memory.role == 'claimer') {
            roleClaimer.run(creep);
        }
        if (creep.memory.role == 'attacker') {
            roleAttacker.run(creep);
        }
        if (creep.memory.role == 'miner') {
            roleMiner.run(creep);
        }
        if (creep.memory.role == 'waller') {
            roleWaller.run(creep);
        }
    }

    var r1pop = harvesters.length + harvesteralts.length + repairers.length + builders.length + upgraders.length + babies.length + nomads.length + claimers.length + attackers.length + miners.length + wallers.length;
    //var r2pop = r2harvesters.length + r2builders.length + r2upgraders.length + r2repairers.length;
    //var r3pop = r3harvesters.length + r3harvesteralts.length + r3builders.length + r3upgraders.length + r3repairers.length;

    var energystores = _.filter(Game.structures, (structure) => structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_CONTAINER);

    totalEnergy = 0;
    for (var i in energystores)
    {
        totalEnergy += energystores[i].energy;
    }

    if (r1stats) {
        console.log('-------------------------')
        console.log('Pop:' + r1pop + ' - H:' + harvesters.length + '/' + h1Max + ' HALT:' + harvesteralts.length + '/' + ha1Max + ' - R:' + repairers.length + '/' + r1Max + ' - B:' + builders.length + '/' + b1Max + ' - U:' + upgraders.length + '/' + u1Max + ' - BAB:' + babies.length + '/' + bab1Max + ' - NOM:' + nomads.length + '/' + n1Max + ' - CLM:' + claimers.length + '/' + c1Max + ' - ATK:' + attackers.length + '/' + a1Max + ' - MIN:' + miners.length + '/' + m1Max + ' - WAL:' + wallers.length + '/' + w1Max + ' ......... Energy:' + Room1.energyAvailable);
    }
    /*if (r2stats) {
        console.log('-------------------------')
        console.log('Pop Two:' + r2pop + ' - H:' + r2harvesters.length + '/' + h2Max + ' R:' + r2repairers.length + '/' + r2Max + ' - B:' + r2builders.length + '/' + b2Max + ' - U:' + r2upgraders.length + '/' + u2Max + ' ......... Energy:' + Room2.energyAvailable);
    }
    if (r3stats) {
        console.log('-------------------------')
        console.log('Pop Three:' + r3pop + ' - H:' + r3harvesters.length + '/' + h3Max + ' - HA:' + r3harvesteralts.length + '/' + ha3Max + ' R:' + r3repairers.length + '/' + r3Max + ' - B:' + r3builders.length + '/' + b3Max + ' - U:' + r3upgraders.length + '/' + u3Max + ' ......... Energy:' + Room3.energyAvailable);
    }*/

    //Shuts off tower healing if energy storage is not enough
    var s1 = Room1.find(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType == STRUCTURE_STORAGE && structure.store[RESOURCE_ENERGY] > t1Hs)}});
    var t1Shutoff = 0;
    //var s2 = Room2.find(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType == STRUCTURE_STORAGE && structure.store[RESOURCE_ENERGY] > t2Hs)}});
    //var t2Shutoff = 0;
    //var s3 = Room3.find(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType == STRUCTURE_STORAGE && structure.store[RESOURCE_ENERGY] > t3Hs)}});
    //var t3Shutoff = 0;

    if (s1 == ""){t1Shutoff = 1;}
    //if (s2 == ""){t2Shutoff = 1;}
    //if (s3 == ""){t3Shutoff = 1;}

    //Tower Defense
    var ts1 = Room1.find(FIND_STRUCTURES,{filter: (s) => s.structureType == STRUCTURE_TOWER});
    //var ts2 = Room2.find(FIND_STRUCTURES,{filter: (s) => s.structureType == STRUCTURE_TOWER});
    //var ts3 = Room3.find(FIND_STRUCTURES,{filter: (s) => s.structureType == STRUCTURE_TOWER});

    //Room 1 Tower Code
    for (let t1 of ts1) {
        var tt1 = t1.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        ally = 0;
        for (i=0; i < allianceMembers.length;i++) {
            if (tt1 != undefined && tt1.owner.username == allianceMembers[i]) {
                ally = 1;
            }
        }
        if (tt1 != undefined && ally == 0) {
            t1.attack(tt1);
            console.log("[Room1]ENEMY SIGHTED!")
        }
        else if(t1Heal == 1) {//} && t1Shutoff != 1) {
            var closestDamagedStructure = t1.pos.findClosestByRange(FIND_STRUCTURES,{filter: (structure) => (structure.structureType == STRUCTURE_RAMPART || structure.structureType == STRUCTURE_WALL) && structure.hits < t1H2 && structure.hits != structure.hitsMax});
            if(closestDamagedStructure && t1.energy > 500) {
                t1.repair(closestDamagedStructure);
            }
        }
    }

    //Room 2 Tower Code
    /*for (let t2 of ts2) {
        var tt2 = t2.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        ally = 0;
        for (i=0; i < allianceMembers.length;i++) {
            if (tt2 != undefined && tt2.owner.username == allianceMembers[i]) {
                ally = 1;
            }
        }
        if (tt2 != undefined && ally == 0) {
            t2.attack(tt2);
            console.log("[Room2]ENEMY SIGHTED!")
        }
        else if(t2Heal == 1) {//} && t2Shutoff != 1) {
            var closestDamagedStructure = t2.pos.findClosestByRange(FIND_STRUCTURES, {filter: (structure) => (structure.structureType == STRUCTURE_RAMPART || structure.structureType == STRUCTURE_WALL) && structure.hits < t2H2 && structure.hits != structure.hitsMax});// || structure.structureType == STRUCTURE_WALL) && structure.hits < t2H2 && structure.hits != structure.hitsMax});
            if(closestDamagedStructure && t2.energy > 500) {
                t2.repair(closestDamagedStructure);
            }
        }
    }*/

    //Room 3 Tower Code
    /*for (let t3 of ts3) {
        var tt3 = t3.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        ally = 0;
        for (i=0; i < allianceMembers.length;i++) {
            if (tt3 != undefined && tt3.owner.username == allianceMembers[i]) {
                ally = 1;
            }
        }
        if (tt3 != undefined && ally == 0) {
            t3.attack(tt3);
            console.log("[Room3]ENEMY SIGHTED!")
        }
        else if(t3Heal == 1) {//} && t3Shutoff != 1) {
            var closestDamagedStructure = t3.pos.findClosestByRange(FIND_STRUCTURES, {filter: (structure) => (structure.structureType == STRUCTURE_RAMPART || structure.structureType == STRUCTURE_WALL) && structure.hits < t3H2 && structure.hits != structure.hitsMax});// || structure.structureType == STRUCTURE_WALL) && structure.hits < t3H2 && structure.hits != structure.hitsMax});
            if(closestDamagedStructure && t3.energy > 500) {
                t3.repair(closestDamagedStructure);
            }
        }
    }*/
}
