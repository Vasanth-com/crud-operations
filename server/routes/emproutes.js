const {Router} = require('express')

const {createEmp,getEmployee,register,login, editDetails, deleteDetails,getSingleEmp} = require('../controllers/employeecontrollers')

const authMiddleware = require('../middleware/auth')

const router = Router()

router.post('/create',authMiddleware,createEmp);
router.get('/:id',authMiddleware,getSingleEmp)
router.patch('/edit/:id',authMiddleware,editDetails)
router.delete('/delete/:id',authMiddleware,deleteDetails)
router.get('/',getEmployee);


router.post("/register",register)   
router.post("/login",login)


module.exports = router;