const Contact = require("..//models/contactsSchema");
const CheckBody = require("../schemas/schemas");
const FavoriteSchema = require("../schemas/schemaFavorite");

async function getAll(req, res, next) {
  try {
    const { page = 1, limit = 10 } = req.query; // Значення за замовчуванням
    const pageInt = parseInt(page, 10); // Перетворюємо на число
    const limitInt = parseInt(limit, 10); // Перетворюємо на число

    // Отримуємо загальну кількість контактів для пагінації
    const totalContacts = await Contact.countDocuments({ owner: req.user.id });

    // Отримуємо контакти з пагінацією
    const allContacts = await Contact.find({ owner: req.user.id })
      .skip((pageInt - 1) * limitInt)
      .limit(limitInt)
      .exec();

    // Відправляємо відповіді разом з інформацією про пагінацію
    res.json({
      contacts: allContacts,
      totalContacts,
      totalPages: Math.ceil(totalContacts / limitInt),
      currentPage: pageInt,
    });
  } catch (err) {
    next(err);
  }
}

async function add(req, res, next) {
  const { error, value } = CheckBody.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.message });
  }
  try {
    const addCon = await Contact.create({
      ...value,
      owner: req.user.id,
    });
    res.status(201).json(addCon);
  } catch (err) {
    next(err);
  }
}

async function getById(req, res, next) {
  try {
    const { id } = req.params;

    const byId = await Contact.findById(id).exec();

    if (byId === null) {
      return res.status(404).send({ message: "Contact not found" });
    }
    if (byId.owner.toString() !== req.user.id) {
      return res.status(404).send({ message: "Contact not found" });
    }

    res.json(byId);
  } catch (err) {
    next(err);
  }
}

const update = async (req, res, next) => {
  const { error, value } = CheckBody.validate(req.body);

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
    if (upContact.owner.toString() !== req.user.id) {
      return res.status(404).send({ message: "Contact not found" });
    }
    res.json(upContact);
  } catch (err) {
    next(err);
  }
};

const updateFavorite = async (req, res, next) => {
  const { error, value } = FavoriteSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.message });
  }
  const { id } = req.params;
  const body = { favorite: value.favorite };
  try {
    const newFavorite = await Contact.findByIdAndUpdate(id, body, {
      new: true,
    }).exec();

    if (newFavorite === null) {
      return res.status(404).send({ message: "Not found" });
    }
    if (newFavorite.owner.toString() !== req.user.id) {
      return res.status(404).send({ message: "Contact not found" });
    }

    return res.json(await Contact.findById(id).exec());
  } catch (error) {
    next(error);
  }
};

async function remove(req, res, next) {
  try {
    const { id } = req.params;
    const removeId = await Contact.findByIdAndDelete(id).exec();
    if (removeId === null) {
      return res.status(404).send({ message: "Not found" });
    }
    if (removeId.owner.toString() !== req.user.id) {
      return res.status(404).send({ message: "Contact not found" });
    }

    return res.status(200).json({ message: "Contact deleted" });
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
