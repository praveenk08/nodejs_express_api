
import { Contact } from "../Models/Contactus.js";

export const insertContactUs = async (req,res) =>{
    const contactRequest = req.body
       try {
          await Contact.create(contactRequest);
          console.log('API contact',contactRequest);
          res.status(200).json({ message: 'Contact inserted successfully' });
    } catch (error) {
          console.log('API Contact error', res.json({error}));
          res.status(500).json({ error: 'Failed to insert Contact' });
    }
 }

 export const fetchAllContact = async (req,res) =>{
    let contact = await Contact.find(); 
    if(!contact) return res.status(404).json({ message: 'No Contact Found' })    
    res.status(200).json({ contact, message: 'Contact list' });
 }

 export const fetchContactbyid = async (req,res) =>{
    const id = req.params.id
    let contact = await Contact.findById(id);
    if(!contact) return res.status(404).json({ message : 'No Contact Found' })    
    res.status(200).json({ contact, message : 'Contact list by id' });
 }

 export const updateContactbyid = async (req,res) =>{
    const id = req.params.id
    const {name,email,mobile,subject}= req.body
    let updateContact = await Contact.findByIdAndUpdate(id,{name,email,mobile,subject},{new:true});
    if(!updateContact) return res.status(404).json({message :'No contact found '}) 
    res.status(200).json({ updateContact, message : 'Ipdated Contact Successfuly ' });
 }

 export const deleteContactbyid = async (req,res) =>{
    const id = req.params.id
    let deleteContact = await Contact.findByIdAndDelete(id);
    if(!deleteContact) return res.status(404).json({message :'No contact found '}) 
    res.status(200).json({ deleteContact, message : 'Deleted Contact Successfuly ' });
 }