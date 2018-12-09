const flightsModel = function(){
    const viewCatalog = function(){
        let url = 'appdata/' + storage.appKey + '/flights?query={"public":"on"}';

        return requester.get(url);
    }

    const viewMyFlights = function(id){
        let url = 'appdata/' + storage.appKey + `/flights?query={"_acl.creator":"${id}"}`;

        return requester.get(url);
    }

    const addFlight = function(params){
        let url = 'appdata/' + storage.appKey + '/flights';
        let data = {
            destination: params.destination,
            origin: params.origin,
            image: params.image,
            departureDate: params.departureDate,
            departureTime: params.departureTime,
            seats: params.seats,
            costPerSeat: params.cost,
            public: params.public
        }

        return requester.post(url, data);
    }

    const editFlight = function(params, id){
        console.log(params);
        let url = 'appdata/' + storage.appKey + '/flights/' + id;
        let data = {
            destination: params.destination,
            origin: params.origin,
            image: params.image,
            departureDate: params.departureDate,
            departureTime: params.departureTime,
            seats: params.seats,
            costPerSeat: params.cost,
            public: params.public
        }

        return requester.put(url, data);
    }

    const viewFlightDetails = function(id){
        let url = 'appdata/' + storage.appKey + '/flights/' + id;

        return requester.get(url);
    }

    const deleteFlight = function(id){
        let url = 'appdata/' + storage.appKey + '/flights/' + id;

        return requester.del(url);
    }

    return {
        viewCatalog,
        addFlight,
        viewFlightDetails,
        viewMyFlights,
        editFlight,
        deleteFlight
    }
}();