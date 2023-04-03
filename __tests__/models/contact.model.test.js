const mongoose = require("mongoose");
const Contact = require("../../models/contact.model");

describe("Contact model", () => {
    beforeAll(async () => {
        await mongoose.connect('mongodb://localhost/testdb', {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
      });

      afterAll(async () => {
        await mongoose.connection.close();
      });

      it('should not create a contact without a user_id', async () => {
        const contact = new Contact({
          name: 'John Doe',
          email: 'john@example.com',
          phone: '1234567890',
        });
        let err;
        try {
          await contact.save();
        } catch (error) {
          err = error;
        }
        expect(err).toBeDefined();
        expect(err.errors.user_id).toBeDefined();
      });

      it('should not create a contact without a name', async () => {
        const contact = new Contact({
          user_id: new mongoose.Types.ObjectId(),
          email: 'john@example.com',
          phone: '1234567890',
        });
        let err;
        try {
          await contact.save();
        } catch (error) {
          err = error;
        }
        expect(err).toBeDefined();
        expect(err.errors.name).toBeDefined();
      });
    
      it('should not create a contact without an email', async () => {
        const contact = new Contact({
          user_id: new mongoose.Types.ObjectId(),
          name: 'John Doe',
          phone: '1234567890',
        });
        let err;
        try {
          await contact.save();
        } catch (error) {
          err = error;
        }
        expect(err).toBeDefined();
        expect(err.errors.email).toBeDefined();
      });
    
      it('should not create a contact without a phone number', async () => {
        const contact = new Contact({
          user_id: new mongoose.Types.ObjectId(),
          name: 'John Doe',
          email: 'john@example.com',
        });
        let err;
        try {
          await contact.save();
        } catch (error) {
          err = error;
        }
        expect(err).toBeDefined();
        expect(err.errors.phone).toBeDefined();
      });
    
      it('should create a contact with all required fields', async () => {
        const contact = new Contact({
          user_id: new mongoose.Types.ObjectId(),
          name: 'John Doe',
          email: 'john@example.com',
          phone: '1234567890',
        });
        await contact.save();
        const savedContact = await Contact.findOne({ _id: contact._id });
        expect(savedContact).toBeDefined();
        expect(savedContact.name).toBe('John Doe');
        expect(savedContact.email).toBe('john@example.com');
        expect(savedContact.phone).toBe('1234567890');
      });

      
});
