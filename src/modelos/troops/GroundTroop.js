class GroundTroop extends Troop{

    constructor(imagenRuta, x, y, life, reach, range, cost, playerId, building) {
        super(imagenRuta, x, y, life, reach, range, cost, playerId, building);
    }

    move(x, y, game) {
        if(x < 0 || x >= game.map.length || y < 0 || y >= game.map[0].length || !this.moveAvailable){
            return false;
        }
        var initTile = game.getTileOfTroop(this);
        var initTileCoords = game.getCoordsOfTileInMap(initTile);
        if(game.isReachableMoving([initTileCoords.row, initTileCoords.col], [x, y], this) != null){
            initTile.troop = null;
            game.map[x][y].troop = this;
            this.moveAvailable = false;
            this.x = game.map[x][y].x;
            this.y = game.map[x][y].y;
            return true;
        }
        return false;
    }

}