const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

pool.on('connect', () => console.log('Postgresql feedback router connection'));
pool.on('error', error => console.log('Error connecting to feedback router:', error));

// get route params with "/route/:paramName, then reference it as req.params.paramName"
router.get('/', (req, res) => {
  // POSTGRESQL SAMPLE GET
  pool.query(`SELECT * FROM "feedback";`)
    .then(results => res.send(results.rows))
    .catch(error => {
      console.log('DB Query Error:', error);
      res.sendStatus(500);
    });
});

router.post('/', (req, res) => {
  const newFeedback = req.body;
  console.log('/feedback POST hit:', newFeedback); 
  const query = `INSERT INTO "feedback" ("feeling", "understanding", "support", "comments") 
    VALUES ($1, $2, $3, $4);`;
  pool.query(query, [
    newFeedback.feeling, 
    newFeedback.understanding, 
    newFeedback.support,
    newFeedback.comments,
  ]).then(() => res.sendStatus(201))
    .catch(error => {
      console.log('/feedback POST error:', error);
      res.sendStatus(500);
  });
});

router.put('/flag', (req, res) => {
  const entry = req.body;
  const queryText = `UPDATE "feedback" SET "flagged" = $1 WHERE "id" = $2;`;
  pool.query(queryText, [!entry.flagged, entry.id])
  .then(result => {
    console.log('/feedback/flag PUT success:', result);
    res.sendStatus(200);
  }).catch(error => {
    console.log('/feedback/flag error:', error);
    res.sendStatus(500);
  });
});

router.delete('/:id', (req, res) => {
  // Model.findByIdAndRemove(req.params.id)
  //  .then(response => res.sendStatus(201))
  //  .catch(() => res.sendStatus(500));

  // POSTGRESQL SAMPLE DELETE
  // const idOfShoeToDelete = req.params.id;
  //   console.log('deleting ', idOfShoeToDelete);
  //   const queryText = 'DELETE FROM "shoes" WHERE "id" = $1;';
  //   pool.query(queryText, [idOfShoeToDelete]).then((result) => {
  //       res.sendStatus(200);
  //   }).catch( (error) => {
  //       console.log('Error in delete', error);
  //       res.sendStatus(500);
  //   });
});

module.exports = router;