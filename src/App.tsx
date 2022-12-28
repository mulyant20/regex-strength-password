import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'

interface isValidPassI {
  name: string
  value: boolean
  message: string
}

const init: isValidPassI[] = [
  {
    name: 'capsLetter',
    value: false,
    message: 'Password harus ada huruf kapital',
  },
  {
    name: 'number',
    value: false,
    message: 'Password Harus ada angka',
  },
  {
    name: 'specialChar',
    value: false,
    message: 'Password harus ada karakter khusus',
  },
  {
    name: 'length',
    value: false,
    message: 'Panjang password harus lebih dari atau sama dengan 8',
  },
]

function App() {
  const [password, setPassword] = useState<string>('')
  const [isStart, setIsStart] = useState<boolean>(false)
  const [isValidated, setIsValidated] = useState<isValidPassI[]>(init)

  const handleOnKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { value } = e.target as HTMLInputElement
    const capsLetterCheck = /[A-Z]/.test(value)
    const numberCheck = /[0-9]/.test(value)
    const specialCharCheck = /[[$&+,:;=?@#|'<>.^*()%!-]/.test(value)
    const lengthCheck = value.length >= 8

    capsLetterCheck
      ? handleValidated('capsLetter', true)
      : handleValidated('capsLetter', false)
    numberCheck
      ? handleValidated('number', true)
      : handleValidated('number', false)
    lengthCheck
      ? handleValidated('length', true)
      : handleValidated('length', false)
    specialCharCheck
      ? handleValidated('specialChar', true)
      : handleValidated('specialChar', false)
  }

  const handleValidated = (name: string, bool: boolean) => {
    const newValidated = isValidated.map((isValid) => {
      if (isValid.name === name) {
        isValid.value = bool
        return isValid
      }
      return isValid
    })
    setIsValidated(newValidated)
  }

  return (
    <div className='max-w-[400px] h-fit mx-auto mt-48 relative'>
      <p className='text-lg font-semibold text-gray-500 mb-2'>Password</p>
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onFocus={() => setIsStart(true)}
        onBlur={() => setIsStart(false)}
        onKeyUp={handleOnKeyUp}
        className='px-6 py-3 rounded border border-gray-300 w-full focus:outline-none text-lg'
      />

      <div className='flex justify-start gap-2 h-2 w-full mt-2 px-[2px]'>
        {isValidated
          .filter((isValid) => isValid.value === true)
          .map((isValid, index) => (
            <div
              key={index}
              className='w-1/4 h-full bg-green-500 rounded-full'
            ></div>
          ))}
      </div>

      {isStart ? (
        <motion.div
          {...validatedBoxAn}
          className='w-full h-20 absolute -translate-y-1/2 top-40'
        >
          <AnimatePresence>
            <ul className='list-disc pl-6 text-sm text-red-400'>
              {isValidated
                .filter((isValid) => isValid.value === false)
                .map((isValid, index) => (
                  <li key={index}>{isValid.message}</li>
                ))}
            </ul>
          </AnimatePresence>
        </motion.div>
      ) : null}
    </div>
  )
}

export default App

const validatedBoxAn = {
  key: 'validateBox',
  initial: { y: '100%', opacity: 0 },
  animate: { y: '-50%', opacity: 1 },
  exit: { y: '100%', opacity: 0 },
  transition: { duration: 0.2, ease: 'easeOut' },
}
