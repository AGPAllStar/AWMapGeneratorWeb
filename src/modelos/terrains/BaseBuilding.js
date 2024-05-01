class BaseBuilding extends Building {

    constructor(x, y, playerOwner) {
        var image = null;
        if(playerOwner == 1){
            image = imagenes.edificio_base_j1;
        }else if(playerOwner == 2) {
            image = imagenes.edificio_base_j2;
        }else{
            image = imagenes.edificio_base;
        }
        super(image, x, y, 3, playerOwner);
    }

    beConquered(playerId) {
        var result = super.beConquered(playerId);
        if(playerId == 1){
            this.imagen = cache[imagenes.edificio_base_j1];
        }else if(playerId == 2) {
            this.imagen = cache[imagenes.edificio_base_j2];
        }else{
            this.imagen = cache[imagenes.edificio_base];
        }
        return result;
    }
    
}