import { useColorModeValue } from '@/components/ui/color-mode'
import { useProductStore } from '@/store/product'
import { Box, Button, Container, Heading, Input, VStack } from '@chakra-ui/react'
import { ToastContainer, toast } from 'react-toastify';
import React, { useState } from 'react'

const CreatePage = () => {
    const [newProduct, setNewProduct] = useState({
        name:"",
        price:"",
        image:"",
    })


	const {createProduct} = useProductStore()
    const handleAddProduct = async() => {
       const {success, message} = await createProduct(newProduct);
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
	   }else{
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
	   setNewProduct({image:"", name:"", price:""})
    }

  return (
    <Container maxW={"container.sm"}>
			<VStack spacing={8}>
				<Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
					Create New Product
				</Heading>

				<Box w={"full"} bg={useColorModeValue("white", "gray.800")} p={6} rounded={"lg"} shadow={"md"}>
					<VStack spacing={4}>
						<Input
							placeholder='Product Name'
							name='name'
                            value={newProduct.name}
                            onChange={(e) => setNewProduct({...newProduct, name:e.target.value})}
						/>
						<Input
							placeholder='Price'
							name='price'
							type='number'
                            value={newProduct.price}
                            onChange={(e) => setNewProduct({...newProduct, price:e.target.value})}
						/>
						<Input
							placeholder='Image URL'
							name='image'
                            value={newProduct.image}
                            onChange={(e) => setNewProduct({...newProduct, image:e.target.value})}
						/>

						<Button colorScheme='blue' w='full' onClick={handleAddProduct}>
							Add Product
						</Button>
					</VStack>
				</Box>
				<ToastContainer position='top-center'/>
			</VStack>
		</Container>
  )
}

export default CreatePage