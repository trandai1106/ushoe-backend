const Event = require('../models/event');

const getAllEvent = async () => {
    let event_list = await Event.find();
    return event_list;
};
const getEventByID = async (event_id) => {
    let event = await Event.findById(event_id);
    return event;
};
const checkExist = async (event_id) => {
    const isExist = await Event.exists({ _id: event_id })
    return isExist;
};
const createEvent = async (name, title, description, content) => {
    await Event.create({ name, title, description, content });
};
const updateEvent = async (id, name, title, description, content) => {
    await Event.findByIdAndUpdate(id, { name, title, description, content });
};
const deleteEvent = async (id) => {
    await Event.findByIdAndDelete(id);
};

module.exports = {
    getAllEvent,
    getEventByID,
    checkExist,
    createEvent,
    updateEvent,
    deleteEvent
};