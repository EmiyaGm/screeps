Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], 'Harvester1');
Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], 'Upgrader1');

module.exports.loop = function () {
    var creep1 = Game.creeps['Harvester1'];
    work(creep1);
    var up1 = Game.creeps['Upgrader1'];
    upgrade(up1);
 }
 
 function upgrade(creep) {
     //判断当前小兵是否收集完毕所有能量
     if(creep.store.energy == 0) {
         //找到房间里面的资源，然后赋值（会获得一个数组）
         var sources = creep.room.find(FIND_SOURCES);
         //判断距离，如果里自己很远那么就移动到资源所在的 ERR_NOT_IN_RANGE是目标太远的意思
         if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
             creep.moveTo(sources[0]);
         }
     }//如果能量收集完毕
     else {
         //下面这个是传送能量给基地 RESOURCE_ENERGY是资源的一种类型，我们指定一个目标，还有资源类型就可以传送能量了
         if( creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE ) {
             //这里是移动到基地
             creep.moveTo(creep.room.controller);
         }
     }
 }
 
 function work(creep) {
     //判断当前小兵是否收集完毕所有能量
     if(creep.store.energy < creep.carryCapacity) {
         //找到房间里面的资源，然后赋值（会获得一个数组）
         var sources = creep.room.find(FIND_SOURCES);
         //判断距离，如果里自己很远那么就移动到资源所在的 ERR_NOT_IN_RANGE是目标太远的意思
         if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
             creep.moveTo(sources[0]);
         }
     }//如果能量收集完毕
     else {
         //下面这个是传送能量给基地 RESOURCE_ENERGY是资源的一种类型，我们指定一个目标，还有资源类型就可以传送能量了
         if( creep.transfer(Game.spawns['Spawn1'], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE ) {
             //这里是移动到基地
             creep.moveTo(Game.spawns['Spawn1']);

             if (Game.spawns['Spawn1'].store.getFreeCapacity(RESOURCE_ENERGY) == 200) {
                creep.moveTo(creep.room.controller);
             }
         }
     }
 }