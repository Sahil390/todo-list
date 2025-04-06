import { ChakraProvider, Container, VStack, Heading, Box, Flex, Text, useColorModeValue, Divider } from '@chakra-ui/react'
import TodoList from './components/TodoList'
import AddTodo from './components/AddTodo'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import theme from './theme'

const MotionBox = motion(Box)

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
  createdAt: Date;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  
  // Load todos from localStorage on initial render
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      const parsedTodos = JSON.parse(savedTodos);
      // Convert string dates back to Date objects
      const todosWithDates = parsedTodos.map((todo: any) => ({
        ...todo,
        createdAt: new Date(todo.createdAt)
      }));
      setTodos(todosWithDates);
    }
  }, []);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      text,
      completed: false,
      createdAt: new Date()
    };
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <ChakraProvider theme={theme}>
      <Box minH="100vh" bg="gray.50">
        {/* Header */}
        <Box 
          as="header" 
          bg={bgColor} 
          boxShadow="sm" 
          borderBottom="1px" 
          borderColor={borderColor}
          position="sticky"
          top={0}
          zIndex={10}
        >
          <Container maxW="container.md" py={4}>
            <Flex justify="space-between" align="center">
              <Flex align="center">
                <Box as="span" fontSize="xl" fontWeight="bold" color="brand.500" mr={2}>✓</Box>
                <Heading size="lg" color="brand.500">TaskMaster</Heading>
              </Flex>
              <Flex gap={4}>
                <Text 
                  cursor="pointer" 
                  fontWeight={filter === 'all' ? 'bold' : 'normal'}
                  color={filter === 'all' ? 'brand.500' : 'gray.500'}
                  onClick={() => setFilter('all')}
                >
                  All
                </Text>
                <Text 
                  cursor="pointer" 
                  fontWeight={filter === 'active' ? 'bold' : 'normal'}
                  color={filter === 'active' ? 'brand.500' : 'gray.500'}
                  onClick={() => setFilter('active')}
                >
                  Active
                </Text>
                <Text 
                  cursor="pointer" 
                  fontWeight={filter === 'completed' ? 'bold' : 'normal'}
                  color={filter === 'completed' ? 'brand.500' : 'gray.500'}
                  onClick={() => setFilter('completed')}
                >
                  Completed
                </Text>
              </Flex>
            </Flex>
          </Container>
        </Box>

        {/* Main Content */}
        <Container maxW="container.md" py={8}>
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <VStack spacing="8">
              <AddTodo onAdd={addTodo} />
              
              <Box 
                width="100%" 
                bg={bgColor} 
                borderRadius="lg" 
                boxShadow="md" 
                p={6}
                border="1px"
                borderColor={borderColor}
              >
                <Heading size="md" mb={4}>Tasks ({filteredTodos.length})</Heading>
                <Divider mb={4} />
                <TodoList
                  todos={filteredTodos}
                  onToggle={toggleTodo}
                  onDelete={deleteTodo}
                />
              </Box>
            </VStack>
          </MotionBox>
        </Container>
      </Box>
    </ChakraProvider>
  )
}

export default App
