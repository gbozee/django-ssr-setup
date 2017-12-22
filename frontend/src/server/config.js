
const Output = process.env.FRONTEND_ENV === 'preact' ? require('./preact-server'): require('./react-server')

export default Output
