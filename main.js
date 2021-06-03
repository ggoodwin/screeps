//Includes
let roleHarvester = require('role.harvester');
let roleHarvesterAlt = require('role.harvesteralt');
let roleUpgrader = require('role.upgrader');
let roleBuilder = require('role.builder');
let roleBuilderAlt = require('role.builderalt');
let roleRepairer = require('role.repairer');
let roleWallRepairer = require('role.wallrepairer');

//Creep Counts
//Harvesters
let h1Max = 1;
//Harvesters Alt
let ha1Max = 0;
//Upgraders
let u1Max = 2;
//Builders
let b1Max = 1;
//Builders alt
let ba1Max = 0;
//Road Repairers
let r1Max = 0;
//Wall Repairers
let wr1Max = 0;

//Display Stats
let r1stats = 1;

//Set screep size
let screepSize = [WORK,WORK,CARRY,CARRY,MOVE];

//Set username
let userName = "GMan";

//Alliance Members
let allianceMembers = ['Zim'];

//Spawns and Rooms
let Spawn1=Game.spawns['Spawn1'];
let Room1=Game.spawns['Spawn1'].room;

//Main Loop
module.exports.loop = function () {

    //clear creeps
    for(let name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    //Tower Code
    var hostiles = Room1.find(FIND_HOSTILE_CREEPS);
    if(hostiles.length > 0) {
        var username = hostiles[0].owner.username;
        Game.notify(`User ${username} spotted in room`);
        var towers = Room1.find(
            FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
        towers.forEach(tower => tower.attack(hostiles[0]));
    }

    //Spawn Creeps
    let harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    let harvesteralts = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvesteralt');
    let upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    let builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    let buildersalt = _.filter(Game.creeps, (creep) => creep.memory.role == 'builderalt');
    let repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
    let wallrepairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'wallrepairer');

    //Energy
    let room1Energy = Room1.energyCapacityAvailable;
    let s1Energy = Spawn1.energy;

    //Harvesters
    if (harvesters.length < h1Max) {
      let newHar = Spawn1.createCreep([WORK,WORK,CARRY,CARRY,MOVE],'H-' + Math.random(),{role:'harvester'});
      console.log(Spawn1 + ' Spawning new harvester: ' + newHar);
    //Harvester Alt
    } else if (harvesteralts.length < ha1Max) {
        let newHaa = Spawn1.createCreep([WORK,WORK,CARRY,CARRY,MOVE],'HA-' + Math.random(),{role:'harvesteralt'});
        console.log(Spawn1 + ' Spawning new harvester alt: ' + newHaa);
    //Upgrader
    } else if (upgraders.length < u1Max) {
        let newUpg = Spawn1.createCreep([WORK,WORK,CARRY,CARRY,MOVE],'U-' + Math.random(),{role:'upgrader'});
        console.log(Spawn1 + ' Spawning new upgrader: ' + newUpg);
    //Builders
    } else if (builders.length < b1Max) {
        let newBui = Spawn1.createCreep([WORK,WORK,CARRY,CARRY,MOVE],'B-' + Math.random(),{role:'builder'});
        console.log(Spawn1 + ' Spawning new builder: ' + newBui);
    //Builders Alt
    } else if (buildersalt.length < ba1Max) {
        let newBuiAlt = Spawn1.createCreep([WORK,WORK,CARRY,CARRY,MOVE],'B-' + Math.random(),{role:'builderalt'});
        console.log(Spawn1 + ' Spawning new builder alt: ' + newBuiAlt);
    //Repairers
    } else if (repairers.length < r1Max) {
        let newRep = Spawn1.createCreep([WORK,WORK,CARRY,CARRY,MOVE],'R-' + Math.random(),{role:'repairer'});
        console.log(Spawn1 + ' Spawning new repairer: ' + newRep);
    } else if (wallrepairers.length < wr1Max) {
        let newWRep = Spawn1.createCreep([WORK,WORK,CARRY,CARRY,MOVE],'WR-' + Math.random(),{role:'wallrepairer'});
        console.log(Spawn1 + ' Spawning new wall repairer: ' + newWRep);
    }

    //Run role specific code
    for(let name in Game.creeps) {
        let creep = Game.creeps[name];
        if (creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if (creep.memory.role == 'harvesteralt') {
            roleHarvesterAlt.run(creep);
        }
        if (creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if (creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if (creep.memory.role == 'builderalt') {
            roleBuilderAlt.run(creep);
        }
        if (creep.memory.role == 'repairer') {
            roleRepairer.run(creep);
        }
        if (creep.memory.role == 'wallrepairer') {
            roleWallRepairer.run(creep);
        }
    }

    // let hostiles = Game.rooms[Room1].find(FIND_HOSTILE_CREEPS);
    // if(hostiles.length > 0) {
    //     var username = hostiles[0].owner.username;
    //     Game.notify(`User ${username} spotted in room ${roomName}`);
    //     var towers = Game.rooms[Room1].find(
    //         FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
    //     towers.forEach(tower => tower.attack(hostiles[0]));
    // }

    //Population
    let r1pop = harvesters.length + harvesteralts.length + builders.length + buildersalt.length + upgraders.length + repairers.length + wallrepairers.length;

    //Energy Stores
    let energystores = _.filter(Game.structures, (structure) => structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_CONTAINER);

    //Total Energy
    totalEnergy = 0;
    for (let i in energystores)
    {
        totalEnergy += energystores[i].energy;
    }

    //Display Stats if enabled
    if (r1stats) {
        console.log('-------------------------')
        console.log('Pop:' + r1pop + ' - H:' + harvesters.length + '/' + h1Max + ' - HA:' + harvesteralts.length + '/' + ha1Max + ' - B:' + builders.length + '/' + b1Max + ' - BA:' + buildersalt.length + '/' + ba1Max + ' - U:' + upgraders.length + '/' + u1Max + ' - R:' + repairers.length + '/' + r1Max + ' - WR:' + wallrepairers.length + '/' + wr1Max + ' ......... Energy:' + Room1.energyCapacityAvailable + ' - ' + totalEnergy);
    }

}