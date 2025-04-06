import { VStack, HStack, Text, IconButton, Checkbox, Box, ScaleFade, useColorModeValue, Tooltip } from '@chakra-ui/react'
import { DeleteIcon, TimeIcon } from '@chakra-ui/icons'
import { Todo } from '../App'
import { motion } from 'framer-motion'
import { formatDistanceToNow } from 'date-fns'

const MotionBox = motion(Box)

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

const TodoList = ({ todos, onToggle, onDelete }: TodoListProps) => {
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const hoverBg = useColorModeValue('gray.50', 'gray.700');

  return (
    <Box width="100%">
      <VStack spacing="3" width="100%">
        {todos.length === 0 ? (
          <Box 
            p={6} 
            textAlign="center" 
            color="gray.500"
            border="1px dashed"
            borderColor={borderColor}
            borderRadius="md"
          >
            <Text>No tasks found. Add a new task to get started.</Text>
          </Box>
        ) : (
          todos.map((todo, index) => (
            <ScaleFade key={todo.id} in={true} initialScale={0.95}>
              <MotionBox
                width="100%"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
              >
                <HStack
                  width="100%"
                  p={4}
                  bg="white"
                  borderRadius="md"
                  boxShadow="sm"
                  _hover={{ 
                    bg: hoverBg,
                    boxShadow: 'md',
                    transition: 'all 0.2s ease-in-out'
                  }}
                  transition="all 0.2s"
                  position="relative"
                  overflow="hidden"
                  border="1px"
                  borderColor={borderColor}
                  _before={{
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '3px',
                    height: '100%',
                    bg: todo.completed ? 'green.400' : 'brand.500',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <Checkbox
                    isChecked={todo.completed}
                    onChange={() => onToggle(todo.id)}
                    colorScheme="brand"
                    size="md"
                    transition="all 0.2s"
                    _hover={{ transform: 'scale(1.1)' }}
                  />
                  <Box flex={1}>
                    <Text
                      textDecoration={todo.completed ? 'line-through' : 'none'}
                      color={todo.completed ? 'gray.500' : 'gray.800'}
                      fontSize="md"
                      fontWeight="medium"
                      transition="all 0.2s"
                    >
                      {todo.text}
                    </Text>
                    <Tooltip label={todo.createdAt.toLocaleString()}>
                      <Text fontSize="xs" color="gray.500" mt={1}>
                        <TimeIcon mr={1} boxSize={3} />
                        {formatDistanceToNow(todo.createdAt, { addSuffix: true })}
                      </Text>
                    </Tooltip>
                  </Box>
                  <IconButton
                    aria-label="Delete todo"
                    icon={<DeleteIcon />}
                    onClick={() => onDelete(todo.id)}
                    colorScheme="red"
                    variant="ghost"
                    size="sm"
                    _hover={{ 
                      transform: 'scale(1.1)',
                      transition: 'all 0.2s ease-in-out'
                    }}
                    transition="all 0.2s"
                  />
                </HStack>
              </MotionBox>
            </ScaleFade>
          ))
        )}
      </VStack>
    </Box>
  )
}

export default TodoList 