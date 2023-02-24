const eventService = require('../services/event');
const dataValidation = require('../utils/dataValidation');
const CONFIG_STATUS = require('../config/status.json');

const getAllEvent = async (req, res) => {
    const eventList  = await eventService.getAllEvent();
    return res.send({
        status: CONFIG_STATUS.SUCCESS,
        message: 'Get all events successful',
        data: {
            events: eventList
        }
    });
}
const getEventDetail = async (req, res) => {
    const event_id  = req.params.id;
    
    const isMongooseObjectId = dataValidation.isMongooseObjectId(event_id);
    if (!isMongooseObjectId) {
        return res.send({
            status: CONFIG_STATUS.FAIL,
            message: 'Invalid ID'
        });
    }

    const isExist = await eventService.checkExist(event_id);
    if (!isExist) {
        return res.send({
            status: CONFIG_STATUS.FAIL,
            message: 'Event not found'
        });
    }

    const  event  = await eventService.getEventByID(event_id);
    return res.send({
        status: CONFIG_STATUS.SUCCESS,
        message: 'Get event detail successful',
        data: {
            event: event
        }
    });
}
const createEvent = async (req, res) => {
    const { name, title, description, content } = req.body;

    const isMissRequiredData = dataValidation.isArrayHasBlankOrNullElement([ name, title, description, content ]);
    if (isMissRequiredData) {
        return res.send({
            status: CONFIG_STATUS.FAIL,
            message: 'Missing required data'
        });
    }

    await eventService.createEvent(name, title, description, content);
    return res.send({
        status: CONFIG_STATUS.SUCCESS,
        message: 'Create event successful'
    });
}
const updateEvent = async (req, res) => {
    const { name, title, description, content } = req.body;
    const id = req.params.id;    

    const isMissRequiredData = dataValidation.isArrayHasBlankOrNullElement([id, name, title, description, content ]);
    if (isMissRequiredData) {
        return res.send({
            status: CONFIG_STATUS.FAIL,
            message: 'Missing required data'
        });
    }
    
    const isMongooseObjectId = dataValidation.isMongooseObjectId(id);
    if (!isMongooseObjectId) {
        return res.send({
            status: CONFIG_STATUS.FAIL,
            message: 'Invalid ID'
        });
    }

    const isExist = await eventService.checkExist(id);
    if (!isExist) {
        return res.send({
            status: CONFIG_STATUS.FAIL,
            message: 'Event not found'
        });
    }

    await eventService.updateEvent(id, name, title, description, content);
    return res.send({
        status: CONFIG_STATUS.SUCCESS,
        message: 'Update event successful'
    });
}
const deleteEvent = async (req, res) => {
    const id = req.params.id;    

    const isMissRequiredData = dataValidation.isVariableBlankOrNull(id);
    if (isMissRequiredData) {
        return res.send({
            status: CONFIG_STATUS.FAIL,
            message: 'Invalid ID'
        });
    }
    
    const isMongooseObjectId = dataValidation.isMongooseObjectId(id);
    if (!isMongooseObjectId) {
        return res.send({
            status: CONFIG_STATUS.FAIL,
            message: 'Invalid ID'
        });
    }

    const isExist = await eventService.checkExist(id);
    if (!isExist) {
        return res.send({
            status: CONFIG_STATUS.FAIL,
            message: 'Event not found'
        });
    }

    await eventService.deleteEvent(id);
    return res.send({
        status: CONFIG_STATUS.SUCCESS,
        message: 'Delete event successful'
    });
}
module.exports = {
    getAllEvent,
    getEventDetail,
    createEvent,
    updateEvent,
    deleteEvent
}