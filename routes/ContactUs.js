import express from 'express'
import { deleteContactbyid, fetchAllContact, fetchContactbyid, insertContactUs, updateContactbyid } from '../Controllers/contactus.js';

const router = express.Router();

import Authenticate from '../Middlewares/Auth.js';

router.post('/add-query/', Authenticate, insertContactUs)
// router.post('/add-query/', insertContactUs)

router.get('/fetch-contact-list/',fetchAllContact)

router.get('/fetch-contact-list-byid/:id',fetchContactbyid)

router.put('/update-contact-byid/:id',updateContactbyid)
 
router.delete('/delete-contact-byid/:id',deleteContactbyid)
 
export default router;

