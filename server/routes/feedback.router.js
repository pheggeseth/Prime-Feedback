const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

pool.on('connect', () => console.log('Postgresql feedback router connection'));
pool.on('error', error => console.log('Error connecting to feedback router:', error));

router.get('/', (req, res) => {
  console.log('/feedback GET hit');
  pool.query(`SELECT * FROM "feedback" ORDER BY "id" DESC;`)
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
  const idOfFeedbackToDelete = req.params.id;
  console.log('deleting ', idOfFeedbackToDelete);
  const queryText = 'DELETE FROM "feedback" WHERE "id" = $1;';
  pool.query(queryText, [idOfFeedbackToDelete]).then((result) => {
      res.sendStatus(200);
  }).catch( (error) => {
      console.log('Error in delete', error);
      res.sendStatus(500);
  });
});

module.exports = router;