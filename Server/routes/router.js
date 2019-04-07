const express = require('express');
const formidable = require('express-formidable');
const { ObjectID } = require('mongodb');
const mongoUtil = require('../dao/mongoUtil');

const router = express.Router();
router.use(formidable());
router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'POST, PUT, GET, OPTIONS, DELETE');
  next();
});

// add an article route
router.post('/articles', (req, res) => {
  const reqValid = onCreateReqValidation(req);
  if (!reqValid.status) return res.status(422).send(reqValid.errors);

  const newArticle = {
    title: req.fields.title,
    body: req.fields.body,
    created_at: Date.now(),
    updated_at: Date.now(),
  };

  mongoUtil.getCollection().insertOne(
    newArticle,
    (err, result) => {
      if (err) {
        return res.status(500).send('Cannot add the article', err);
      }
      return res.status(201).send(result.ops[0]);
    },
  );
});

// update article route
router.put('/articles/:id', (req, res) => {
  const reqValId = idCheck(req.params.id);
  if (!reqValId.status) return res.status(422).send(reqValId.errors);
  const reqVal = onCreateReqValidation(req);
  if (!reqVal.status) return res.status(422).send(reqVal.errors);

  mongoUtil.getCollection().findOneAndUpdate(
    { _id: ObjectID(req.params.id) },
    {
      $set: {
        title: req.fields.title,
        body: req.fields.body,
        updated_at: Date.now(),
      },
    },
    { returnOriginal: false },
    (err, result) => {
      if (err) {
        return res.status(500).send('Cannot update the article', err);
      }
      return res.status(201).send(result.value);
    },
  );
});

// get an article route
router.get('/articles/:id', (req, res) => {
  const reqVal = idCheck(req.params.id);
  if (!reqVal.status) return res.status(422).send(reqVal.errors);

  mongoUtil.getCollection().find({ _id: ObjectID(req.params.id) }).toArray((err, docs) => {
    if (err) console.log(err);
    if (docs[0]) return res.status(200).send(docs[0]);
    if (!docs[0]) return res.status(404).send({
      errors: [
        { field: 'id', error: 'Not found' },
      ],
    });
  });
});

// get articles route
router.get('/articles', (req, res) => {
  console.log(req);
  const reqVal = onGetReqValidation(req);
  if (!reqVal.status) return res.status(422).send(reqVal.errors);

  // req url params check. set defaults if it's needed
  const p = +req.query.page || 1;
  const l = +req.query.limit || 10;

  mongoUtil.getCollection().find().sort({ created_at: -1 }).toArray((err, docs) => {
    if (err) console.log(err);
    if (!docs[0]) return res.status(200).send('Ooops... There are no articles yet');
    return res.status(200).send({
      count: docs.length,
      page: p,
      limit: l,
      articles: docs.slice(10 * (p - 1), 10 * (p - 1) + l),
    });
  });
});

// Validation functions
//  |   |   |   |
//  v   v   v   v

let onCreateReqValidation = (req) => {
  let errors = [];
  if (!req.fields.title || !req.fields.title.trim()) errors.push({
    field: 'title',
    error: 'title is required',
  });
  if (!req.fields.body || !req.fields.body.trim()) errors.push({
    field: 'body',
    error: 'body is required',
  });
  if (errors.length) return { status: false, errors };
  return { status: true };
};

let onGetReqValidation = (req) => {
  let errors = [];
  if (req.query.page && req.query.page.match(/\D/)) errors.push({
    field: 'page',
    error: `page query is not correct integer: ${req.query.page}`,
  });
  if (req.query.limit && req.query.limit.match(/\D/)) errors.push({
    field: 'limit',
    error: `limit query is not correct integer: ${req.query.limit}`,
  });
  if (req.query.limit && !req.query.limit.match(/\D/) && +req.query.limit > 10) errors.push({
    field: 'limit',
    error: `limit is too large(>10): ${req.query.limit}`,
  });
  if (errors.length) return { status: false, errors };
  return { status: true };
};

let idCheck = (id) => {
  let errors = [];
  try {
    ObjectID(id); // is id correct ObjectID ?
  } catch (e) {
    errors.push({ field: 'id', error: 'id is not correct' });
    return { status: false, errors };
  }
  return { status: true };
};

module.exports = router;
