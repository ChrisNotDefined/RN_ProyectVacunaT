export default class API_Service {
  static APIPATH = "https://still-harbor-70009.herokuapp.com/solicitants";

  static postSolicitant = async (solicitantID, solicitantData) => {
    console.log(solicitantData)
    await fetch(`${this.APIPATH}/${solicitantID}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(solicitantData),
    })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.error(error);
        return error;
      });
  };

  static getSolicitantById = async (solicitantID) => {
    await fetch(`${this.APIPATH}/${solicitantID}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }).then((response) => {
      return response;
    }).catch((error) => {
      console.error(error);
      return error;
    });
  };

  static getSolicitants = async () => {
    await fetch(`${this.APIPATH}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }).then((response) => {
      return response;
    }).catch((error) => {
      console.error(error);
      return error;
    });
  };

  // Debe de comprar el pase de expanción
  static updateSolicitant = async (solicitantID, solicitantData) => {
    try {
      const res = await fetch(`${this.APIPATH}/${solicitantID}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(solicitantData),
      });
      
      if (!res.ok) {
        throw res.statusText;
      }
    } catch (e) {
      console.error(err);
    }
  };


  static deleteSolicitant = async (solicitantID) => {
    await fetch(`${this.APIPATH}/${solicitantID}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    }).then((response) => {
      return response;
    }).catch((error) => {
      console.error(err);
      return error;
    });
  };
}
