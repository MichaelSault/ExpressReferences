import { 
    addNewContact, 
    getContacts, 
    getContactWithID,
    updateContact,
    deleteContact
} from "../controllers/crmController";

const routes = (app) => {
    app.route('/contact')
        .get((req, res, next) => {
            // middleware
            console.log(`Request from: ${req.originalUrl}`)
            console.log(`Request type: ${req.method}`)
            next();
        }, getContacts)
        
        // POST endpoint
        .post(addNewContact);

    app.route('/contact/:contactID')
        // GET a specific contact
        .get(getContactWithID)
        // Updating a specific contact
        .put(updateContact)
        // DELETE a specific contact
        .delete(deleteContact)
}

export default routes;