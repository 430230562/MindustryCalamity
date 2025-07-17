//require("AsteroidBelt");
require("Lacinia");
//require("Pompeii");
require("Sura");
//require("S3");
//require("S4");
//require("S5");
require("items");
require("liquids");
require("core");

Events.run(EventType.ClientLoadEvent, () => {
    Events.run(EventType.SectorCaptureEvent, () => {
      Time.run(5, () => Vars.state.rules.disableWorldProcessors = false)
    })
  })
//来自早苗

function registerLogicLookup(contentType, contents){
    const { System, Integer} = java.lang;
    const { logicVars } = Vars;
    
    const contentIdToLogicId = Reflect.get(logicVars, "contentIdToLogicId");
    const logicIdToContent = Reflect.get(logicVars, "logicIdToContent");
        
    const order = contentType.ordinal();
    const contentIdLogicIdArray = contentIdToLogicId[order];
    const logicIdContentArray = logicIdToContent[order];
    
    const currentContentId = contentIdLogicIdArray.length;
    const currentLogicId = logicIdContentArray.length;
        
    // Log.info("Length contentIdToLogicId: @, logicIdToContent: @", currentContentId, currentLogicId);
        
    const size = contents.size, maxId = contents.max(floatf(c => c.id)).id;
    
    const newContentIdLogicId = newArray(Integer.TYPE, Math.max(currentContentId, maxId));
    const newLogicIdContent = newArray(UnlockableContent, currentLogicId + size + 1);
    
    // 加回原版逻辑id
    System.arraycopy(contentIdLogicIdArray, 0, newContentIdLogicId, 0, currentContentId);
    System.arraycopy(logicIdContentArray, 0, newLogicIdContent, 0, currentLogicId);
    
    for(let i = 0; i < size; i++){
        let content = contents.get(i);
        let logicId = currentLogicId + i + 1;
        
        newContentIdLogicId[content.id] = logicId;
        newLogicIdContent[logicId] = content;
                
        // Log.info("Register @ to logicId: @", content.name, logicId);
    }
    
    contentIdToLogicId[order] = newContentIdLogicId;
    logicIdToContent[order] = newLogicIdContent;
    
    function newArray(type, length){
        return java.lang.reflect.Array.newInstance(type, length);
    }
}


const {UnitEngine} = UnitType;

const librarySnake = require("library-snake");

const wulfrumSnakeEnd = librarySnake.segment("wulfrum-armored-snake-end", {
    hitSize:18,
    offsetSegment: -0.7,
    health: 20000
}, {});

const wulfrumSnakeBody = librarySnake.segment("wulfrum-armored-snake-body", {
    hitSize:18,
    offsetSegment: -0.7,
    health: 4000
}, {});

const wulfrumSnake = librarySnake.head("wulfrum-armored-snake", {
    body: wulfrumSnakeBody,
    end: wulfrumSnakeEnd,
    lengthSnake:26,
    hitSize:18,
    speed: 2.4,
    health: 20000
}, {});

Attribute.add("flow");
Attribute.add("li");

const originWater = new Floor("origin-water")
const originShallWater = new Floor("origin-shallow-water")
const fastOriginWater = new Floor("origin-water(fast)")
fastOriginWater.attributes.set(Attribute.get("flow"),0.111111111111111);
const rapidsOriginWater = new Floor("origin-water(rapids)")
rapidsOriginWater.attributes.set(Attribute.get("flow"), 0.333333333333333);
const astralWater = new Floor("astral-water")
const astralShallowWater = new Floor("astral-shallow-water")
const fastAstralWater = new Floor("astral-water(fast)")
fastAstralWater.attributes.set(Attribute.get("flow"),0.111111111111111);
const rapidsAstralWater = new Floor("astral-water(rapids)")
rapidsAstralWater.attributes.set(Attribute.get("flow"), 0.333333333333333);

const impact = new ItemTurret("impact")
const asteroid = new ItemTurret("asteroid")
const erupt = new ItemTurret("erupt")
const fissure = new PowerTurret("fissure")
const laser = new PowerTurret("laser")
const gravitation = new TractorBeamTurret("gravitation")
const melt = new ContinuousLiquidTurret("melt")
const rapids = new LiquidTurret("rapids")
const penetration = new ItemTurret("penetration")
const comet = new ItemTurret("comet")
const surge = new ItemTurret("surge")
//
const cutDrill = new BeamDrill("cut-drill")
const electromagneticDrill = new Drill("electromagnetic-drill")
const bombardmentDrill = new BurstDrill("bombardment-drill")
const sandDigger = new WallCrafter("sand-digger")
//物品运输
const track = new Duct("track");
const trackJunction = new Junction("track-junction");
const armoredTrack = new Duct("armored-track");
const trackRouter = new DuctRouter("track-router");
const trackBridge = new DuctBridge("track-bridge");
const overflowTrack = new OverflowDuct("overflow-track");
const underflowTrack = new OverflowDuct("underflow-track");
const trackUnloader = new DirectionalUnloader("track-unloader");
const unitLogisticLoader = new UnitCargoLoader("unit-logistic-loader");
const unitLogisticUnloadPoint = new UnitCargoUnloadPoint("unit-logistic-unload-point");
const armoredContainer = new StorageBlock("armored-container");
const armoredVault = new StorageBlock("armored-vault");
const orbitalLaunchPad = new LaunchPad("orbital-launch-pad");
//液体
/*const liquidConduit = new ArmoredConduit("liquid-conduit")
const liquidConduitRouter = new LiquidRouter("liquid-conduit-router")
const liquidConduitConnector = new LiquidJunction("liquid-conduit-connector")
const liquidConduitBridge = new DirectionLiquidBridge("liquid-conduit-bridge")
const armoredLiquidContainer = new LiquidRouter("armored-liquid-container")*/
//电力
const energyNode = new BeamNode("energy-node")
const energyBattery = new Battery("energy-battery")
let hydraulicGenerator = new ThermalGenerator("hydraulic-generator");
hydraulicGenerator.hasLiquids = true;
hydraulicGenerator.displayEfficiency = true,//显示效率
hydraulicGenerator.attribute = Attribute.get("flow");
const ventTurbineCondenser = new ThermalGenerator("vent-turbine-condenser")
let secureHydraulicGenerator = new ThermalGenerator("secure-hydraulic-generator");
secureHydraulicGenerator.hasLiquids = true;
secureHydraulicGenerator.displayEfficiency = true,
secureHydraulicGenerator.attribute = Attribute.get("flow");
//
const nickelWall = new Wall("nickel-wall")
const nickelWallLarge = new Wall("nickel-wall-large")
const chromiumWall = new Wall("chromium-wall")
const chromiumWallLarge = new Wall("chromium-wall-large")
const automaticArmoredDoor = new AutoDoor("automatic-armored-door")
//工厂
const siliconHeatFurnace = new GenericCrafter("silicon-heat-furnace")
const glassFurnace = new GenericCrafter("glass-furnace")
const electrolyticChamber = new GenericCrafter("electrolytic-chamber")
let nitrideExtractor = new AttributeCrafter("nitride-extractor");
nitrideExtractor.attribute = Attribute.get("li");
//兵厂
const mechManufacturer = new UnitFactory("mech-manufacturer")
const tankManufacturer = new UnitFactory("tank-manufacturer")
const crawlerManufacturer = new UnitFactory("crawler-manufacturer")
const airManufacturer = new UnitFactory("air-manufacturer")
const elementaryRefabricator = new Reconstructor("elementary-refabricator")
const secondRefabricator = new Reconstructor("second-refabricator")
const seniorRefabricator = new Reconstructor("senior-refabricator")
const productionShipyard = new UnitFactory("production-shipyard")
const elementaryShipyard = new Reconstructor("elementary-shipyard")
const secondShipyard = new Reconstructor("second-shipyard")
const seniorShipyard = new Reconstructor("senior-shipyard")
const assemblerCurrent = new UnitAssembler("assembler(current)")
const assemblerAccretion = new UnitAssembler("assembler(accretion)")
const assemblerDust = new UnitAssembler("assembler(dust)")
const rudimentAssemblerModule = new UnitAssemblerModule("rudiment-assembler-module")
const payloadTrack = new PayloadConveyor("payload-track")
const payloadTrackRoutor = new PayloadRouter("payload-track-routor")
const payloadRailLauncher = new PayloadMassDriver("payload-rail-launcher")
const payloadRailLauncherLarge = new PayloadMassDriver("payload-rail-launcher-large")
const payloadRailLauncherHuge = new PayloadMassDriver("payload-rail-launcher-huge")

