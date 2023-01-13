export class Sockets {
    private static lijst = {};

    addSocket(socket) {
        Sockets.lijst[socket.id] = socket;
    }

    allSocketsById(id) {
        let returnLijst = [];
        for (let key of Object.keys(Sockets.lijst)) {
            if (Sockets.lijst[key].handshake.query.matchId == id) {
                returnLijst.push(Sockets.lijst[key]);
            }
        }
        return returnLijst;
    }
}
