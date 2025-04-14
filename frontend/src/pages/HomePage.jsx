import ProductCard from '@/components/ProductCard'
import { useProductStore } from '@/store/product'
import { Container, SimpleGrid, Text, VStack } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

const HomePage = () => {

  const { fetchProducts, products } = useProductStore();
  useEffect(() => {
    fetchProducts()
  },[fetchProducts])
  console.log("products", products)

  return (
    <Container maxW="container.xl" py={12}>
      <VStack spacing={8}>
        <Text
					fontSize={"30"}
					fontWeight={"bold"}
          bgGradient={"to-r"}
					gradientFrom="cyan.400"
          gradientTo="blue.500"
					bgClip={"text"}
					textAlign={"center"}
				>
					Current Products 🚀
				</Text>

        <SimpleGrid columns={{base:1,md:2,lg:3}} spacing={20} w={"full"} gap={2.5}>
          {products.map((product) => (
            <ProductCard  key={product._id} product={product} />
          ))}
        </SimpleGrid>

        <Text fontSize='xl' textAlign={"center"} fontWeight='bold' color='gray.500'>
						No products found 😢{" "}
						<Link to={"/create"}>
							<Text as='span' color='blue.500' _hover={{ textDecoration: "underline" }}>
								Create a product
							</Text>
						</Link>
				</Text>
      </VStack>
    </Container>
  )
}

export default HomePage