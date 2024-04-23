// Using models from the folder
const User = require("./models/UserModel")
const Employee = require("./models/EmployeeModel")
const resolvers = {
    Query: {
        login: async (parent, args, context, info) => {
            const {email, password} = args
            // Checking if either of the emial or the password is empty or not
            if(!email || !password) {
                return 'All fields are required'
            }
            // If user is not found in the DB
            const user = await User.findOne({email})
            if(!user) {
                return 'user not found'
            }
            // If password doesn't matches what is stored in the DB
            if(!(await user.isPasswordMatch(password))) {
                return 'bad credentails'
            }
            // If not exception, then logged in
            return 'logged in'
        },
        getAllEmployees: async () => {
            return await Employee.find({})
        },
        searchEmployeeById: async (parent, {id}, context, info) => {
            return await Employee.findById(id)
        },
        updateEmployeeById: async (parent, args, context, info) => {
            const { id } = args
            return await Employee.findByIdAndUpdate(id, args.employee, {new: true})
        },
        deleteEmployeeById: async (parent, { id }, context, info) => {
            await Employee.findByIdAndDelete(id)
            return 'Employee Deleted'
        }   
    },
    Mutation: {
        signup: async (parent, args, context, info) => {
            const user = await User.create(args.user)
            return user
        },
        addEmployee: async (parent, args, context, info) => {
            const employee = await Employee.create(args.employee)
            return employee
        }
    }
}

module.exports = resolvers