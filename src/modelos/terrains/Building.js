class Building extends GroundWithBackgroundTerrain {

    constructor(rutaImagen, x, y, defenseLevel, playerOwner) {
        super(rutaImagen, x, y, defenseLevel);
        this.playerOwner = playerOwner;
        this.conquerAvailable = true;
    }

    beConquered(playerId) {
        this.playerOwner = playerId;
        this.conquerAvailable = false;
        return true;
    }
    
}