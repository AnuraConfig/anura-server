import express from 'express'
import { getStateManager } from '../stateManager/scoket'

const router = express.Router()

// get all the active rooms and how many client connect to them
router.get('/connected-clients', function (req, res) {
    const stateManagers = getStateManager()
    const rooms = stateManagers.getAllActiveRoom()
    res.send(rooms)
})

export default router