class HQBuilding extends Building {

    constructor(x, y, playerOwner) {
        var image = null;
        if(playerOwner == 1){
            image = imagenes.edificio_hq_j1;
        }else if(playerOwner == 2) {
            image = imagenes.edificio_hq_j2;
        }
        super(image, x, y, 4, playerOwner);
    }

    beConquered(playerId) {
        var result = super.beConquered(playerId);
        if(playerId == 1){
            this.imagen = cache[imagenes.edificio_hq_j1];
        }else if(playerId == 2) {
            this.imagen = cache[imagenes.edificio_hq_j2];
        }
        return result;
    }
    
}