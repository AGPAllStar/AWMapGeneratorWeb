class Troop extends Modelo{

    constructor(imagenRuta, x, y, life, reach, range, cost, playerId, building) {
        super(imagenRuta, x, y);
        this.life = life;
        this.reach = reach;
        this.range = range;
        this.cost = cost;
        this.playerId = playerId;
        building.troop = this;

        this.moveAvailable = true;
        this.attackAvailable = true;
    }

    attack(enemyTerrain, game) {
        var allyTerrain = game.getTileOfTroop(this);
        var allyTerrainCoords = game.getCoordsOfTileInMap(allyTerrain);
        var enemyTerrainCoords = game.getCoordsOfTileInMap(enemyTerrain);
        var enemyTroop = enemyTerrain.troop;
        if(enemyTroop == null || !game.isReachableAttacking([allyTerrainCoords.row, allyTerrainCoords.col], [enemyTerrainCoords.row, enemyTerrainCoords.col], this) || !this.attackAvailable){
            return false;
        }
        var lifeToLose =  Math.ceil(this.life * (MAX_TROOP_LIFE/enemyTroop.life) / enemyTerrain.defenseLevel);
        enemyTroop.life -= lifeToLose;
        this.attackAvailable = false;
        switch(enemyTroop.life) {
            case 1:
                enemyTroop.imagenVida = new Modelo(imagenes.vida_1_tropa, enemyTroop.x, enemyTroop.y);
                break;
            case 2:
                enemyTroop.imagenVida = new Modelo(imagenes.vida_2_tropa, enemyTroop.x, enemyTroop.y);
                break;
            case 3:
                enemyTroop.imagenVida = new Modelo(imagenes.vida_3_tropa, enemyTroop.x, enemyTroop.y);
                break;
            case 4:
                enemyTroop.imagenVida = new Modelo(imagenes.vida_4_tropa, enemyTroop.x, enemyTroop.y);
                break;
            case 5:
                enemyTroop.imagenVida = new Modelo(imagenes.vida_5_tropa, enemyTroop.x, enemyTroop.y);
                break;
            case 6:
                enemyTroop.imagenVida = new Modelo(imagenes.vida_6_tropa, enemyTroop.x, enemyTroop.y);
                break;
            case 7:
                enemyTroop.imagenVida = new Modelo(imagenes.vida_7_tropa, enemyTroop.x, enemyTroop.y);
                break;
            case 8:
                enemyTroop.imagenVida = new Modelo(imagenes.vida_8_tropa, enemyTroop.x, enemyTroop.y);
                break;
            case 9:
                enemyTroop.imagenVida = new Modelo(imagenes.vida_9_tropa, enemyTroop.x, enemyTroop.y);
                break;
        }
        return true;
    }

    move(x, y, game) {
        if(x < 0 || x >= game.map.length || y < 0 || y >= game.map[0].length || !this.moveAvailable){
            return false;
        }
        var initTile = game.getTileOfTroop(this);
        initTile.troop = null;
        game.map[x][y].troop = this;
        this.moveAvailable = false;
        this.x = game.map[x][y].x;
        this.y = game.map[x][y].y;
        return true;
    }

    dibujar(scrollX) {
        super.dibujar(scrollX);
        if(this.imagenVida != null) {
            this.imagenVida.dibujar(scrollX);
        }
    }

}