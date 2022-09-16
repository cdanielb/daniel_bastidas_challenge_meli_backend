const axios = require("axios");

module.exports = function (app, prefijo) {
  /**
   * Servicio para obtener los resultados del api de mercadolibre, generados por una
   * busqueda realizada por el usuario desde el front de la aplicación
   * @param {string} query.q
   * @return {json}
   */
  app.get(prefijo, async (req, res) => {
    const search = req.query.q;
    axios
      .get(`https://api.mercadolibre.com/sites/MLA/search?q=${search}`, {})
      .then((r) => {
        const pags = Math.ceil(r.data.results.length / 4);
        r.data.results
          ? res.json({
              status: 200,
              success: true,
              data: r.data.results,
              pags: pags,
            })
          : res.json({
              status: 200,
              success: true,
              data: [],
              pags: pags,
            });
      })
      .catch((error) => {
        res.json({
          status: 200,
          success: false,
          data: [],
          pags: 0,
        });
      });
  });

  /**
   * Servicio para obtener la información y descripción de un producto
   * desde el api de mercado libre por medio del id
   * @param {string} params.id
   * @return {json}
   */
  app.get(prefijo + "/:id", async (req, res) => {
    const idItem = req.params.id;
    if (idItem) {
      axios
        .get(`https://api.mercadolibre.com/items/${idItem}`, {})
        .then((r) => {
          axios
            .get(`https://api.mercadolibre.com/items/${idItem}/description`, {})
            .then((d) => {
              r.data.description_item = d.data;
              r.data.price_decimals = r.data.price.toString().split(".")[1];
              res.json({
                status: 200,
                success: true,
                data: r.data,
              });
            });
        })
        .catch((error) => {
          res.json({
            status: 200,
            success: false,
            data: [],
          });
        });
    } else {
      res.json({
        status: 200,
        success: false,
        data: [],
      });
    }
  });
};
