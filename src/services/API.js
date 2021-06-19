export default class API_Service {
  static APIPATH = "https://still-harbor-70009.herokuapp.com";

  static postSolicitant = async (solicitantID, solicitantData) => {
    await fetch(`${this.APIPATH}/solicitants/${solicitantID}`, {
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
    await fetch(`${this.APIPATH}/solicitants/${solicitantID}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.error(error);
        return error;
      });
  };

  static getSolicitants = async () => {
    await fetch(`${this.APIPATH}/solicitants`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.error(error);
        return error;
      });
  };

  // Debe de comprar el pase de expanción
  static updateSolicitant = async (solicitantID, solicitantData) => {
    try {
      const res = await fetch(`${this.APIPATH}/solicitants/${solicitantID}`, {
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
    await fetch(`${this.APIPATH}/solicitants/${solicitantID}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.error(err);
        return error;
      });
  };

  static getSolicitudeBySolicitantID = async (solicitantID) => {
    try {
      const response = await fetch(
        `${this.APIPATH}/solicitude/solicitant/${solicitantID}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (
        !response ||
        response == undefined ||
        response == "" ||
        response.status === 404
      ) {
        console.log("No response");
        console.log(response.status);
        return null;
      }

      if (response.status < 200 && response.status >= 300) {
        throw "Error at response";
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return error;
    }
  };

  static postSolicitude = async (solicitantID, solicitudData) => {
    try {
      const response = await fetch(`${this.APIPATH}/solicitude/${solicitantID}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(solicitudData),
      });

      if(!response) {
        return null;
      }

      return response;
    }
    catch (error) {
      console.error(error);
      return error;
    }
  }
}
