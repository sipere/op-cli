import ModelName from '../models/modelFileName.js'

const NameController = {
    async index(req, res) {
        try {
            await NameController.tryIndex(req, res)
        }catch(error) {
            res.status(500)
            res.json({
                success: false,
                message: 'Error! The query is failed!',
                error: error.message
            })
        }
    },
    async tryIndex(req, res) {
        const thingArray = await ModelName.findAll()
        res.status(200)
        res.json({
            success: true,
            data: thingArray
        })
    },
    async show(req, res) {
        try {
            await NameController.tryShow(req, res)
        }catch(error) {
            res.status(500)
            res.json({
                success: false,
                message: 'Error! The query is failed!',
                error: error.message
            })
        }
    },
    async tryShow(req, res) {
        const thingObject = await ModelName.findByPk(req.params.id)
        res.status(200)
        res.json({
            success: true,
            data: thingObject
        })
    },
    async store(req, res) {
        try {
            await NameController.tryStore(req, res)
        }catch(error) {
            res.status(500)
            res.json({
                success: false,
                message: 'Error! The query is failed!',
                error: error.message
            })
        }
    },
    async tryStore(req, res) {
        const thingObject = await ModelName.create(req.body)
        res.status(201)
        res.json({
            success: true,
            data: thingObject
        })
    },
    async update(req, res) {
        try {
            await NameController.tryUpdate(req, res)
        }catch(error) {
            let actualMessage = '';
            if(error.message == 'Fail! Record not found!') {
                actualMessage = error.message
                res.status(404)
            }else {
                res.status(500)
                actualMessage = 'Fail! The query is failed!'
            }
            
            res.json({
                success: false,
                message: actualMessage
            })
        }
    },
    async tryUpdate(req, res) {
        const recordNumber = await ModelName.update(req.body, {
            where: { id: req.params.id }
        })
        if(recordNumber == 0) {
            throw new Error('Fail! Record not found!')
        }
        const thingObject = await ModelName.findByPk(req.params.id)
        res.status(200)
        res.json({
            success: true,
            data: thingObject
        })
    },
    async destroy(req, res) {
        try {
            await NameController.tryDestroy(req, res)
        }catch(error) {
            res.status(500)
            res.json({
                success: false,
                message: 'Error! The query is failed!',
                error: error.message
            })
        }
    },
    async tryDestroy(req, res) {
        const thingObject = await ModelName.destroy({
            where: { id: req.params.id }
        })
        res.status(200)
        res.json({
            success: true,
            data: thingObject
        })
    }
}

export default NameController
