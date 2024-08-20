const express = require("express");
const app = express();
const port = 8080;

const {
  ContactModel,
  Pager,
  sortContacts,
  filterContacts,
  validateContactData,
} = require("@jworkman-fs/asl");

app.use(express.static("../client"));
app.use(express.json());

//GET
app.get("/v1/contacts", async (req, res) => {
  try {
    let contacts = await ContactModel.index();
    let firstResponseSent = false;

    // filtering
    const filterBy = req.get("X-Filter-By");
    const filterOperator = req.get("X-Filter-Operator");
    const filterValue = req.get("X-Filter-Value");

    if (filterBy && filterOperator && filterValue) {
      const filtered = contacts.filter((contact) => {
        if (filterBy === "email" && filterOperator === "eq") {
          return contact.email === filterValue;
        } else if (filterBy === "fname" && filterOperator === "eq") {
          return contact.fname === filterValue;
        } else if (filterBy === "lname" && filterOperator === "eq") {
          return contact.lname === filterValue;
        } else if (filterBy === "id" && filterOperator === "eq") {
          return contact.id === filterValue;
        } else if (filterBy === "birthday" && filterOperator === "eq") {
          return contact.birthday === filterValue;
        }
        return false;
      });

      res.json(
        filtered.length > 0 ? filtered : { message: "Contact not found" }
      );
      firstResponseSent = true;
    }

    // sorting
    const sortBy = req.query.sort;
    const sortDirection = req.query.direction;

    if (sortBy) {
      contacts = sortContacts(contacts, sortBy, sortDirection);
    }

    //pagination
    const page = parseInt(req.query.page, 10) || 1;
    const size = parseInt(req.query.size, 10) || 10;

    const pager = new Pager(contacts, req.query.page, req.query.size);

    if (!firstResponseSent) {
      res.set("X-Page-Total", pager.total);
      res.set("X-Page-Next", String(pager.next()));
      res.set("X-Page-Prev", pager.prev());

      res.status(200).json(contacts.length > 0 ? pager.results() : []);
    }
    console.log("GET request successful");
  } catch (error) {
    if (error.name === "PagerOutOfRangeError") {
      res.status(416).json({ message: error.message });
    } else if (error.name === "InvalidEnumError") {
      res.status(400).json({ message: error.message });
    } else if (error.name === "PagerLimitExceededError") {
      res.status(400).json({ message: error.message });
    } else {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
});

// POST
app.post("/v1/contacts", async (req, res) => {
  try {
    const newContactData = req.body;

    validateContactData(req.body);

    // create new contact
    const newContact = await ContactModel.create(newContactData);

    const newContactUrl = `/v1/contacts/${newContact.id}`;

    res
      .status(303)
      .setHeader("Location", newContactUrl)
      .json({ contact: newContact });
    console.log("POST request successful");
  } catch (error) {
    if (error.name === "InvalidContactError") {
      res.status(400).json({ message: error.message });
    } else if (error.name === "DuplicateContactResourceError") {
      res.status(409).json({ message: error.message });
    } else {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
});

// GET by id
app.get("/v1/contacts/:id", (req, res) => {
  try {
    const contact = ContactModel.show(req.params.id);
    if (contact) {
      res.status(200).json(contact);
      console.log("GET by is successful");
    } else {
      res.status(400).json({ message: error.message });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// PUT by id
app.put("/v1/contacts/:id", (req, res) => {
  try {
    // validate
    validateContactData(req.body);

    // update
    const updatedContact = ContactModel.update(req.params.id, req.body);
    res.status(200).json(updatedContact);
    console.log("PUT request successful");
  } catch (error) {
    if (error.name === "InvalidContactError") {
      res.status(400).json({ message: error.message });
    } else if (error.name === "ContactNotFoundError") {
      res.status(404).json({ message: error.message });
    } else {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
});

// DELETE by id
app.delete("/v1/contacts/:id", (req, res) => {
  try {
    const deletedContact = ContactModel.remove(req.params.id);

    if (deletedContact) {
      res.status(200).json({
        message: "DELETE request successful",
        contactId: req.params.id,
      });
      console.log(
        `DELETE request was successful for contact ID: ${req.params.id}`
      );
    } else {
      res.status(404).json({ message: error.message });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

    
