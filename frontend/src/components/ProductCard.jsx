import { Box, Heading, HStack, IconButton, Image, Text } from "@chakra-ui/react"
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { useColorModeValue } from "./ui/color-mode";
import { useProductStore } from "@/store/product";
import { toast } from 'react-toastify';


const ProductCard = ({product}) => {
  const textColor = useColorModeValue("gray.600", "gray.200")
  const bg = useColorModeValue("white","gray.800")

  const {deleteProduct} = useProductStore();

  const handleDeleteProduct = async(pid) => {
    const { success, message } = await deleteProduct(pid);
    if (!success) {
      toast.error(message, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
    else
    {
      toast.success(message, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  }

  return (
    <Box
      shadow="lg"
      rounded="lg"
      overflow="hidden"
      transition="all 0.3s"
      _hover={{transform:"translateY(-5px)", shadow:"xl"}}
      bg={bg}
    >
      <Image src={product.image} alt={product.name} h={48} w="full" objectFit="cover"/>
      <Box p={4}>
        <Heading as="h3" size="md" mb={2}>
          {product.name}
        </Heading>
        <Text fontWeight="bold" fontSize="xl" color={textColor} mb={4}>
          ${product.price}
        </Text>
        <HStack spacing={2}>
          <IconButton colorScheme="blue" style={{backgroundColor:"#1434A4"}}>
            <FaEdit />
          </IconButton>
          <IconButton colorScheme="red" onClick={() => {handleDeleteProduct(product._id)}} style={{backgroundColor:"#D70040"}}>
            <MdDelete/>
          </IconButton>
        </HStack>
      </Box>
    </Box>
  )
}

export default ProductCard