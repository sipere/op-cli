
import { read } from 'read';
import bcrypt from 'bcryptjs';

async function inputPassword() {
    const password = await read({
      prompt: 'Password: ',
      silent: true,
      replace: '*'
    })
    return password
}

const startGenerateAdmin = async () => {
    console.log('Start generate admin...')
    try {
        const { default: User } = await import('../../../../../app/models/user.js')
        await User.sync()
    
        const isUserExist = await User.findOne({ where: { name: 'admin' } })
        if (isUserExist) {
          console.log('Admin already exists!')
          return;
        }
        const password = await inputPassword()
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
          name: 'admin',
          email: 'admin',
          password: hashedPassword
        })
        console.log('Admin created!')
      } catch (error) {
        console.error('Error creating admin!')
        console.error(error)
      }    
}

export default startGenerateAdmin
