import { HStack, Input, Button, Box, FormControl, FormErrorMessage, useToast } from '@chakra-ui/react'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { AddIcon } from '@chakra-ui/icons'

const MotionBox = motion(Box)

interface AddTodoProps {
  onAdd: (text: string) => void;
}

const AddTodo = ({ onAdd }: AddTodoProps) => {
  const [text, setText] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const [error, setError] = useState('')
  const toast = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    if (!text.trim()) {
      setError('Task cannot be empty')
      return
    }
    
    if (text.length > 100) {
      setError('Task is too long (max 100 characters)')
      return
    }
    
    onAdd(text.trim())
    setText('')
    
    toast({
      title: 'Task added',
      description: 'Your task has been added successfully',
      status: 'success',
      duration: 2000,
      isClosable: true,
      position: 'top-right',
    })
  }

  return (
    <MotionBox
      width="100%"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <form onSubmit={handleSubmit}>
        <FormControl isInvalid={!!error}>
          <HStack
            spacing={3}
            p={3}
            bg="white"
            borderRadius="lg"
            boxShadow={isFocused ? 'md' : 'sm'}
            transition="all 0.2s ease"
            border="1px"
            borderColor={error ? 'red.300' : isFocused ? 'brand.300' : 'gray.200'}
            _hover={{ boxShadow: 'md' }}
          >
            <Input
              value={text}
              onChange={(e) => {
                setText(e.target.value)
                if (error) setError('')
              }}
              placeholder="What needs to be done?"
              size="md"
              variant="filled"
              bg="gray.50"
              _focus={{
                bg: 'white',
                boxShadow: 'outline',
                borderColor: 'brand.400',
              }}
              _hover={{ bg: 'gray.100' }}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              transition="all 0.2s"
            />
            <Button
              type="submit"
              colorScheme="brand"
              size="md"
              px={6}
              leftIcon={<AddIcon />}
              _hover={{
                transform: 'translateY(-1px)',
                boxShadow: 'md',
              }}
              _active={{
                transform: 'translateY(0)',
              }}
              transition="all 0.2s"
            >
              Add
            </Button>
          </HStack>
          {error && <FormErrorMessage mt={2}>{error}</FormErrorMessage>}
        </FormControl>
      </form>
    </MotionBox>
  )
}

export default AddTodo 