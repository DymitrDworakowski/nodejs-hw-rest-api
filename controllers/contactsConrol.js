const Contact = require("..//models/contactsSchema");
const ContactSchema = require("../schemas/schemas");
const IdSchema = require("../schemas/schemasId");

async function getAll(req, res, next) {
  try {
    const allContats = await Contact.find().exec();
    res.send(allContats);
  } catch (err) {
    next(err);
  }
}

async function add(req, res, next) {
  const { error, value } = ContactSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.message });
  }
  try {
    const addCon = await Contact.create(value);
    console.log(value);
    res.status(201).json(addCon);
  } catch (err) {
    next(err);
  }
}

async function getById(req, res, next) {
  try {
    const validationResult = IdSchema.getContact.validate(req.params);

    if (validationResult.error) {
      return res.status(400).json({ message: "missing field Id " });
    }

    const { id } = validationResult.value;
    
    const byId = await Contact.findById(id).exec();

    if (byId === null) {
      return res.status(404).send({ message: "Contact not found" });
    }

    res.json(byId);
  } catch (err) {
    next(err);
  }
}

const update = async (req, res, next) => {
  const { error, value } = ContactSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const { id } = req.params;
  try {
    const upContact = await Contact.findByIdAndUpdate(id, value, {
      new: true,
    }).exec();

    if (upContact === null) {
      return res.status(404).send({ message: "Contact not found" });
    }
    res.json( upContact);
  } catch (err) {
    next(err);
  }
};

const updateFavorite = async (req, res, next) => {
  const { id } = req.params;
  const body = { favorite: req.body.favorite };
  try {
    await Contact.findByIdAndUpdate(id, body, {
      new: true,
    }).exec();

    if (body.favorite === undefined) {
      return res.status(404).send({ message: "missing field favorite" });
    }

    return res.json(await Contact.findById(id).exec());
  } catch (error) {
    next(error);
  }
};

async function remove(req, res, next) {
  
  try {
    const validationResult = IdSchema.getContact.validate(req.params);

    if (validationResult.error) {
      return res.status(400).json({ message: "missing field Id " });
    }

    const { id } = validationResult.value;
    const removeId = await Contact.findByIdAndDelete(id).exec();
    if (removeId === null) {
      return res.status(404).send({ message: "Not found" });
    }
    res.status(200).json({message: "Contact deleted"});
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getAll,
  getById,
  remove,
  add,
  update,
  updateFavorite,
};
